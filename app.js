// === STATE ===
let data = null;
let currentMode = 'flashcard';
let currentChapter = null;
let currentCards = [];
let cardIndex = 0;
let flipped = false;

// Quiz state
let quizCards = [];
let quizIndex = 0;
let quizCorrect = 0;
let quizAnswered = false;

// Exam state
let examCards = [];
let examIndex = 0;
let examAnswers = [];
let examTimer = null;
let examTimeLeft = 45 * 60;
let examLearnMode = false;
let examAnswered = false;

// Spaced repetition data
let progress = loadProgress();

// === INIT ===
function init() {
  // Use inline data (works everywhere including file:// protocol)
  data = window.__QUESTIONS_DATA;
  renderChapters();
  bindEvents();
}

// === PERSISTENCE ===
function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem('citoyennete-progress')) || {
      cards: {},
      quizHistory: { correct: 0, total: 0 },
      exams: []
    };
  } catch {
    return { cards: {}, quizHistory: { correct: 0, total: 0 }, exams: [] };
  }
}

function saveProgress() {
  localStorage.setItem('citoyennete-progress', JSON.stringify(progress));
}

function getCardKey(chapId, idx) {
  return `${chapId}:${idx}`;
}

function getCardProgress(key) {
  return progress.cards[key] || { correct: 0, wrong: 0, lastSeen: 0 };
}

function isMastered(key) {
  const p = getCardProgress(key);
  return p.correct >= 3 && p.correct > p.wrong;
}

// === CHAPTER RENDERING ===
function renderChapters() {
  const grid = document.getElementById('chapter-grid');
  grid.innerHTML = '';
  data.chapitres.forEach(chap => {
    const total = chap.cartes.length;
    const mastered = chap.cartes.filter((_, i) => isMastered(getCardKey(chap.id, i))).length;
    const pct = total > 0 ? Math.round((mastered / total) * 100) : 0;

    const card = document.createElement('div');
    card.className = 'chapter-card';
    card.dataset.id = chap.id;
    card.innerHTML = `
      <div class="icon">${chap.icone}</div>
      <div class="info">
        <div class="title">${chap.titre}</div>
        <div class="count">${total} cartes &mdash; ${mastered} ma&icirc;tris&eacute;es</div>
        <div class="mini-progress"><div class="mini-progress-fill" style="width:${pct}%"></div></div>
      </div>
    `;
    card.addEventListener('click', () => startSession(chap.id));
    grid.appendChild(card);
  });
}

// === NAVIGATION ===
function bindEvents() {
  // Tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => switchMode(tab.dataset.mode));
  });

  // Flashcard controls
  document.getElementById('btn-flip').addEventListener('click', flipCard);
  document.getElementById('btn-know').addEventListener('click', () => answerFlashcard(true));
  document.getElementById('btn-dont-know').addEventListener('click', () => answerFlashcard(false));
  document.getElementById('flashcard').addEventListener('click', flipCard);
  document.getElementById('flashcard').addEventListener('keydown', e => {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flipCard(); }
    if (e.key === 'ArrowRight') answerFlashcard(true);
    if (e.key === 'ArrowLeft') answerFlashcard(false);
  });

  // Back buttons
  document.getElementById('btn-back-flash').addEventListener('click', backToChapters);
  document.getElementById('btn-back-quiz').addEventListener('click', backToChapters);

  // All chapters
  document.getElementById('btn-all-chapters').addEventListener('click', () => startSession(null));

  // Quiz next
  document.getElementById('btn-next-quiz').addEventListener('click', nextQuiz);

  // Exam mode toggle
  document.querySelectorAll('.exam-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.exam-mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      examLearnMode = btn.dataset.exammode === 'learn';
    });
  });

  // Exam
  document.getElementById('btn-start-exam').addEventListener('click', startExam);
  document.getElementById('btn-next-exam').addEventListener('click', nextExamQuestion);
  document.getElementById('btn-retry-exam').addEventListener('click', () => {
    document.getElementById('exam-results').classList.add('hidden');
    document.getElementById('exam-header').classList.remove('hidden');
  });

  // Stats
  document.getElementById('btn-reset-stats').addEventListener('click', () => {
    if (confirm('Réinitialiser toutes les statistiques ?')) {
      progress = { cards: {}, quizHistory: { correct: 0, total: 0 }, exams: [] };
      saveProgress();
      renderStats();
      renderChapters();
    }
  });
}

function switchMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.mode === mode));

  // Hide all views
  ['chapter-selector', 'flashcard-view', 'quiz-view', 'exam-view', 'stats-view'].forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });

  if (mode === 'exam') {
    document.getElementById('exam-view').classList.remove('hidden');
    document.getElementById('exam-header').classList.remove('hidden');
    document.getElementById('exam-active').classList.add('hidden');
    document.getElementById('exam-results').classList.add('hidden');
  } else if (mode === 'stats') {
    document.getElementById('stats-view').classList.remove('hidden');
    renderStats();
  } else {
    document.getElementById('chapter-selector').classList.remove('hidden');
    renderChapters();
  }
}

function backToChapters() {
  ['flashcard-view', 'quiz-view'].forEach(id => document.getElementById(id).classList.add('hidden'));
  document.getElementById('chapter-selector').classList.remove('hidden');
  renderChapters();
}

// === FLASHCARD MODE ===
function startSession(chapId) {
  currentChapter = chapId;
  currentCards = [];

  if (chapId === null) {
    data.chapitres.forEach(chap => {
      chap.cartes.forEach((carte, i) => {
        currentCards.push({ ...carte, chapId: chap.id, origIndex: i });
      });
    });
  } else {
    const chap = data.chapitres.find(c => c.id === chapId);
    chap.cartes.forEach((carte, i) => {
      currentCards.push({ ...carte, chapId: chap.id, origIndex: i });
    });
  }

  // Sort: prioritize cards not mastered, then by spaced repetition
  currentCards.sort((a, b) => {
    const ka = getCardKey(a.chapId, a.origIndex);
    const kb = getCardKey(b.chapId, b.origIndex);
    const ma = isMastered(ka) ? 1 : 0;
    const mb = isMastered(kb) ? 1 : 0;
    if (ma !== mb) return ma - mb;
    const pa = getCardProgress(ka);
    const pb = getCardProgress(kb);
    return pa.lastSeen - pb.lastSeen;
  });

  cardIndex = 0;
  flipped = false;

  if (currentMode === 'flashcard') {
    document.getElementById('chapter-selector').classList.add('hidden');
    document.getElementById('flashcard-view').classList.remove('hidden');
    showFlashcard();
  } else if (currentMode === 'quiz') {
    quizCards = shuffle([...currentCards]);
    quizIndex = 0;
    quizCorrect = 0;
    document.getElementById('chapter-selector').classList.add('hidden');
    document.getElementById('quiz-view').classList.remove('hidden');
    showQuizQuestion();
  }
}

function showFlashcard() {
  if (cardIndex >= currentCards.length) cardIndex = 0;
  const card = currentCards[cardIndex];
  const key = getCardKey(card.chapId, card.origIndex);

  document.getElementById('flash-question').textContent = card.question;
  document.getElementById('flash-answer').textContent = card.reponse;
  document.getElementById('flash-explanation').textContent = card.explication;
  document.getElementById('card-index').textContent = cardIndex + 1;
  document.getElementById('card-total').textContent = currentCards.length;

  const mastered = isMastered(key);
  const badge = document.getElementById('mastery-badge');
  badge.textContent = mastered ? 'Maîtrisée ✓' : '';
  badge.style.background = mastered ? 'var(--green-light)' : '';
  badge.style.color = mastered ? 'var(--green)' : '';

  // Progress
  const pct = ((cardIndex + 1) / currentCards.length) * 100;
  document.getElementById('flashcard-progress').style.width = pct + '%';

  // Reset flip
  flipped = false;
  document.getElementById('flashcard').classList.remove('flipped');
}

function flipCard() {
  flipped = !flipped;
  document.getElementById('flashcard').classList.toggle('flipped', flipped);
}

function answerFlashcard(knew) {
  const card = currentCards[cardIndex];
  const key = getCardKey(card.chapId, card.origIndex);
  if (!progress.cards[key]) progress.cards[key] = { correct: 0, wrong: 0, lastSeen: 0 };

  if (knew) {
    progress.cards[key].correct++;
  } else {
    progress.cards[key].wrong++;
  }
  progress.cards[key].lastSeen = Date.now();
  saveProgress();

  cardIndex++;
  if (cardIndex >= currentCards.length) cardIndex = 0;
  showFlashcard();
}

// === QUIZ MODE ===
function showQuizQuestion() {
  if (quizIndex >= quizCards.length) {
    // Quiz finished, go back
    backToChapters();
    return;
  }

  const card = quizCards[quizIndex];
  quizAnswered = false;

  document.getElementById('quiz-question').textContent = card.question;
  document.getElementById('quiz-index').textContent = quizIndex + 1;
  document.getElementById('quiz-total').textContent = quizCards.length;
  document.getElementById('quiz-progress').style.width = ((quizIndex + 1) / quizCards.length * 100) + '%';

  const choicesDiv = document.getElementById('quiz-choices');
  choicesDiv.innerHTML = '';
  const shuffled = shuffle([...card.choix]);
  const correctAnswer = getCorrectAnswer(card);

  shuffled.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice;
    btn.addEventListener('click', () => answerQuiz(btn, choice, correctAnswer, card));
    choicesDiv.appendChild(btn);
  });

  document.getElementById('quiz-feedback').classList.add('hidden');
  document.getElementById('btn-next-quiz').classList.add('hidden');
}

function getCorrectAnswer(card) {
  // The correct answer is always the FIRST choice in the data
  return card.choix[0];
}

function answerQuiz(btn, chosen, correct, card) {
  if (quizAnswered) return;
  quizAnswered = true;

  const key = getCardKey(card.chapId, card.origIndex);
  if (!progress.cards[key]) progress.cards[key] = { correct: 0, wrong: 0, lastSeen: 0 };

  const isCorrect = chosen === correct;
  const feedback = document.getElementById('quiz-feedback');

  document.querySelectorAll('.choice-btn').forEach(b => {
    b.classList.add('disabled');
    if (b.textContent === correct) b.classList.add('correct');
  });

  if (isCorrect) {
    btn.classList.add('correct');
    feedback.className = 'quiz-feedback correct';
    feedback.innerHTML = `<strong>✓ Bonne réponse !</strong><br>${card.explication}`;
    quizCorrect++;
    progress.cards[key].correct++;
    progress.quizHistory.correct++;
  } else {
    btn.classList.add('wrong');
    feedback.className = 'quiz-feedback wrong';
    feedback.innerHTML = `<strong>✗ Mauvaise réponse</strong><br>La bonne réponse est : <strong>${correct}</strong><br>${card.explication}`;
    progress.cards[key].wrong++;
  }

  progress.cards[key].lastSeen = Date.now();
  progress.quizHistory.total++;
  saveProgress();

  feedback.classList.remove('hidden');
  document.getElementById('btn-next-quiz').classList.remove('hidden');
}

function nextQuiz() {
  quizIndex++;
  showQuizQuestion();
}

// === EXAM MODE ===
function startExam() {
  // Pick 20 random questions from all chapters
  const allCards = [];
  data.chapitres.forEach(chap => {
    chap.cartes.forEach((carte, i) => {
      allCards.push({ ...carte, chapId: chap.id, origIndex: i });
    });
  });
  examCards = shuffle(allCards).slice(0, 20);
  examAnswers = new Array(20).fill(null);
  examIndex = 0;
  examTimeLeft = 45 * 60;

  document.getElementById('exam-header').classList.add('hidden');
  document.getElementById('exam-active').classList.remove('hidden');
  document.getElementById('exam-results').classList.add('hidden');

  showExamQuestion();
  startExamTimer();
}

function showExamQuestion() {
  const card = examCards[examIndex];
  examAnswered = false;
  document.getElementById('exam-question').textContent = card.question;
  document.getElementById('exam-index').textContent = examIndex + 1;
  document.getElementById('exam-progress').style.width = ((examIndex + 1) / 20 * 100) + '%';

  const choicesDiv = document.getElementById('exam-choices');
  choicesDiv.innerHTML = '';
  const shuffled = shuffle([...card.choix]);
  const correctAnswer = getCorrectAnswer(card);

  // Hide feedback
  const feedback = document.getElementById('exam-feedback');
  feedback.classList.add('hidden');
  feedback.innerHTML = '';

  shuffled.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    if (examAnswers[examIndex] === choice) btn.style.borderColor = 'var(--red)';
    btn.textContent = choice;
    btn.addEventListener('click', () => {
      if (examAnswered) return;
      examAnswers[examIndex] = choice;

      if (examLearnMode) {
        // Learn mode: show feedback immediately
        examAnswered = true;
        const isCorrect = choice === correctAnswer;

        document.querySelectorAll('#exam-choices .choice-btn').forEach(b => {
          b.classList.add('disabled');
          if (b.textContent === correctAnswer) b.classList.add('correct');
        });

        if (isCorrect) {
          btn.classList.add('correct');
          feedback.className = 'quiz-feedback correct';
          feedback.innerHTML = `<strong>✓ Bonne réponse !</strong><br>${card.explication}`;
        } else {
          btn.classList.add('wrong');
          feedback.className = 'quiz-feedback wrong';
          feedback.innerHTML = `<strong>✗ Mauvaise réponse</strong><br>La bonne réponse est : <strong>${correctAnswer}</strong><br>${card.explication}`;
        }
        feedback.classList.remove('hidden');
      } else {
        // Real exam mode: just highlight selection
        document.querySelectorAll('#exam-choices .choice-btn').forEach(b => {
          b.style.borderColor = b.textContent === choice ? 'var(--red)' : '';
          b.style.background = b.textContent === choice ? 'var(--red-light)' : '';
        });
      }
    });
    choicesDiv.appendChild(btn);
  });

  const nextBtn = document.getElementById('btn-next-exam');
  nextBtn.textContent = examIndex === 19 ? 'Soumettre l\'examen' : 'Suivante →';
}

function nextExamQuestion() {
  if (examAnswers[examIndex] === null) {
    document.getElementById('exam-choices').style.animation = 'pulse 0.3s';
    setTimeout(() => document.getElementById('exam-choices').style.animation = '', 300);
    return;
  }

  // In learn mode, must have seen feedback before moving on
  if (examLearnMode && !examAnswered) return;

  if (examIndex === 19) {
    finishExam();
  } else {
    examIndex++;
    showExamQuestion();
  }
}

function startExamTimer() {
  clearInterval(examTimer);
  updateTimerDisplay();
  examTimer = setInterval(() => {
    examTimeLeft--;
    updateTimerDisplay();
    if (examTimeLeft <= 0) {
      clearInterval(examTimer);
      finishExam();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const mins = Math.floor(examTimeLeft / 60);
  const secs = examTimeLeft % 60;
  const el = document.getElementById('exam-timer');
  el.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  el.classList.toggle('warning', examTimeLeft < 300);
}

function finishExam() {
  clearInterval(examTimer);
  document.getElementById('exam-active').classList.add('hidden');
  document.getElementById('exam-results').classList.remove('hidden');

  let correct = 0;
  const details = document.getElementById('exam-result-details');
  details.innerHTML = '';

  examCards.forEach((card, i) => {
    const correctAnswer = getCorrectAnswer(card);
    const isCorrect = examAnswers[i] === correctAnswer;
    if (isCorrect) correct++;

    const div = document.createElement('div');
    div.className = `result-item ${isCorrect ? 'correct' : 'wrong'}`;
    div.innerHTML = `
      <div class="result-q">${i + 1}. ${card.question}</div>
      <div class="result-a">${isCorrect ? '✓' : '✗'} Votre réponse : ${examAnswers[i] || '(aucune)'}${!isCorrect ? '<br>Bonne réponse : ' + correctAnswer : ''}</div>
    `;
    details.appendChild(div);
  });

  const passed = correct >= 15;
  document.getElementById('exam-result-title').textContent = passed ? 'Félicitations ! 🎉' : 'Continuez à étudier 💪';
  const scoreEl = document.getElementById('exam-result-score');
  scoreEl.textContent = `${correct}/20`;
  scoreEl.className = `result-score ${passed ? 'pass' : 'fail'}`;

  // Save exam history
  progress.exams.push({
    date: new Date().toISOString(),
    score: correct,
    passed: passed
  });
  saveProgress();
}

// === STATS ===
function renderStats() {
  // Total studied
  const studied = Object.keys(progress.cards).length;
  document.getElementById('stat-total-studied').textContent = studied;

  // Mastered
  const mastered = Object.keys(progress.cards).filter(k => isMastered(k)).length;
  document.getElementById('stat-mastered').textContent = mastered;

  // Quiz accuracy
  const acc = progress.quizHistory.total > 0
    ? Math.round((progress.quizHistory.correct / progress.quizHistory.total) * 100)
    : 0;
  document.getElementById('stat-accuracy').textContent = acc + '%';

  // Exams
  document.getElementById('stat-exams').textContent = progress.exams.length;

  // Chapter stats
  const chapStats = document.getElementById('chapter-stats');
  chapStats.innerHTML = '';
  data.chapitres.forEach(chap => {
    const total = chap.cartes.length;
    const mast = chap.cartes.filter((_, i) => isMastered(getCardKey(chap.id, i))).length;
    const pct = total > 0 ? Math.round((mast / total) * 100) : 0;

    const row = document.createElement('div');
    row.className = 'chapter-stat-row';
    row.innerHTML = `
      <span class="name">${chap.icone} ${chap.titre}</span>
      <div class="progress-bar-container"><div class="progress-bar" style="width:${pct}%;background:var(--green)"></div></div>
      <span class="pct">${pct}%</span>
    `;
    chapStats.appendChild(row);
  });

  // Exam history
  const histDiv = document.getElementById('exam-history');
  histDiv.innerHTML = '';
  if (progress.exams.length === 0) {
    histDiv.innerHTML = '<p style="color:var(--gray-400);font-size:0.9rem;">Aucun examen passé</p>';
  } else {
    progress.exams.slice().reverse().forEach(exam => {
      const d = new Date(exam.date);
      const dateStr = d.toLocaleDateString('fr-CA') + ' ' + d.toLocaleTimeString('fr-CA', { hour: '2-digit', minute: '2-digit' });
      const row = document.createElement('div');
      row.className = 'exam-history-row';
      row.innerHTML = `
        <span>${dateStr}</span>
        <span class="score ${exam.passed ? 'pass' : 'fail'}">${exam.score}/20 ${exam.passed ? '✓' : '✗'}</span>
      `;
      histDiv.appendChild(row);
    });
  }
}

// === UTILS ===
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// === START ===
document.addEventListener('DOMContentLoaded', init);
