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
  return p.correct >= 2 && p.correct > p.wrong;
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

  // Dates
  document.querySelectorAll('.date-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.date-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDateFilter = btn.dataset.filter;
      renderDates();
    });
  });
  document.getElementById('dates-search-input').addEventListener('input', renderDates);
  document.getElementById('btn-quiz-dates').addEventListener('click', startDatesQuiz);

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
  ['chapter-selector', 'flashcard-view', 'quiz-view', 'exam-view', 'stats-view', 'dates-view'].forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });

  if (mode === 'exam') {
    document.getElementById('exam-view').classList.remove('hidden');
    document.getElementById('exam-header').classList.remove('hidden');
    document.getElementById('exam-active').classList.add('hidden');
    document.getElementById('exam-results').classList.add('hidden');
  } else if (mode === 'dates') {
    document.getElementById('dates-view').classList.remove('hidden');
    renderDates();
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

        // Save per-card progress immediately in learn mode
        const key = getCardKey(card.chapId, card.origIndex);
        if (!progress.cards[key]) progress.cards[key] = { correct: 0, wrong: 0, lastSeen: 0 };
        if (isCorrect) progress.cards[key].correct++;
        else progress.cards[key].wrong++;
        progress.cards[key].lastSeen = Date.now();
        saveProgress();

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

    // Save per-card progress from exam
    const key = getCardKey(card.chapId, card.origIndex);
    if (!progress.cards[key]) progress.cards[key] = { correct: 0, wrong: 0, lastSeen: 0 };
    if (isCorrect) {
      progress.cards[key].correct++;
    } else {
      progress.cards[key].wrong++;
    }
    progress.cards[key].lastSeen = Date.now();

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

// === DATES DATA ===
const DATES_DATA = [
  // Jours fériés
  { date: "1er janvier", event: "Jour de l'An", person: "", cat: "feries" },
  { date: "11 janvier", event: "Journée Sir John A. Macdonald", person: "Sir John A. Macdonald — 1er Premier ministre du Canada", cat: "feries" },
  { date: "9 avril", event: "Jour de Vimy", person: "Bataille de la crête de Vimy (1917) — 10 000 victimes", cat: "feries" },
  { date: "Lundi avant le 25 mai", event: "Fête de Victoria", person: "Anniversaire officiel du souverain", cat: "feries" },
  { date: "24 juin", event: "Fête nationale du Québec", person: "Saint-Jean-Baptiste", cat: "feries" },
  { date: "1er juillet", event: "Fête du Canada", person: "Confédération de 1867 — avant 1982 : « Fête du Dominion »", cat: "feries" },
  { date: "1er lundi de sept.", event: "Fête du Travail", person: "", cat: "feries" },
  { date: "2e lundi d'oct.", event: "Action de grâces", person: "", cat: "feries" },
  { date: "11 novembre", event: "Jour du Souvenir", person: "11e heure du 11e jour du 11e mois — John McCrae, « Au champ d'honneur »", cat: "feries" },
  { date: "20 novembre", event: "Journée Sir Wilfrid Laurier", person: "Sir Wilfrid Laurier — portrait sur le billet de 5 $", cat: "feries" },
  { date: "25 décembre", event: "Noël", person: "", cat: "feries" },

  // Histoire — avant la Confédération
  { date: "~1000", event: "Vikings atteignent le Canada", person: "L'Anse aux Meadows (T.-N.-L.) — patrimoine mondial UNESCO", cat: "histoire" },
  { date: "1497", event: "Jean Cabot cartographie la côte Est", person: "Jean Cabot (Giovanni Caboto)", cat: "histoire" },
  { date: "1534", event: "Premier voyage de Jacques Cartier", person: "Jacques Cartier — mot « kanata » (village en iroquois)", cat: "histoire" },
  { date: "1604", event: "Premier établissement européen", person: "Pierre de Monts et Samuel de Champlain — Île Sainte-Croix", cat: "histoire" },
  { date: "1608", event: "Fondation de Québec", person: "Samuel de Champlain", cat: "histoire" },
  { date: "1670", event: "Fondation Compagnie de la Baie d'Hudson", person: "Roi Charles II d'Angleterre", cat: "histoire" },
  { date: "1701", event: "Paix entre Français et Iroquois", person: "Grande Paix de Montréal", cat: "histoire" },
  { date: "1759", event: "Bataille des plaines d'Abraham", person: "Général Wolfe et général Montcalm — tous deux tués", cat: "histoire" },
  { date: "1763", event: "Proclamation royale", person: "Roi George III — droits territoriaux autochtones", cat: "histoire" },
  { date: "1774", event: "Acte de Québec", person: "Liberté religieuse catholique, droit civil français", cat: "histoire" },
  { date: "1776", event: "Arrivée des Loyalistes", person: "40 000+ fuient vers le Canada, dont Joseph Brant (Mohawk)", cat: "histoire" },
  { date: "1791", event: "Acte constitutionnel", person: "Division : Haut-Canada (Ontario) et Bas-Canada (Québec)", cat: "histoire" },
  { date: "1793", event: "Abolition de l'esclavage au Haut-Canada", person: "John Graves Simcoe — 1er lt-gouv., fonde York (Toronto)", cat: "histoire" },
  { date: "1807", event: "Interdiction traite des esclaves (Empire britannique)", person: "Parlement britannique", cat: "histoire" },
  { date: "1812-1814", event: "Guerre de 1812", person: "Brock (Detroit/Queenston Heights), Laura Secord, Salaberry (Châteauguay)", cat: "histoire" },
  { date: "1832", event: "Création de la Bourse de Montréal", person: "", cat: "histoire" },
  { date: "1833", event: "Abolition de l'esclavage dans l'Empire britannique", person: "Parlement britannique", cat: "histoire" },
  { date: "1837-1838", event: "Rébellions au Haut et Bas-Canada", person: "Lord Durham — recommande gouvernement responsable", cat: "histoire" },
  { date: "1847-1848", event: "Premier gouvernement responsable", person: "Nouvelle-Écosse — première colonie à l'obtenir", cat: "histoire" },
  { date: "1849", event: "Gouvernement responsable au Canada", person: "Sir Louis-Hippolyte La Fontaine et Robert Baldwin", cat: "histoire" },
  { date: "1853", event: "Première femme rédactrice en chef", person: "Mary Ann Shadd Cary — The Provincial Freeman", cat: "histoire" },

  // Confédération et après
  { date: "1867", event: "Confédération du Canada", person: "ON, QC, NS, NB — Sir John A. Macdonald, Sir George-Étienne Cartier", cat: "histoire" },
  { date: "1869-1870", event: "Révolte de la rivière Rouge / Création du Manitoba", person: "Louis Riel", cat: "histoire" },
  { date: "1871", event: "La C.-B. rejoint la Confédération", person: "Promesse du chemin de fer transcontinental", cat: "histoire" },
  { date: "1873", event: "Î.-P.-É. rejoint / Création de la Police montée", person: "GRC — QG à Regina, fonde Fort Calgary et Fort MacLeod", cat: "histoire" },
  { date: "1885 (7 nov.)", event: "Achèvement du chemin de fer Canadien Pacifique", person: "Donald Smith (Lord Strathcona) enfonce le dernier crampon", cat: "histoire" },
  { date: "1885", event: "Seconde révolte des Métis / Parc national Banff", person: "Louis Riel exécuté, Gabriel Dumont chef militaire métis", cat: "histoire" },
  { date: "1891", event: "Invention du basketball", person: "James Naismith (Canadien)", cat: "histoire" },
  { date: "1892", event: "Don de la Coupe Stanley", person: "Lord Stanley, gouverneur général", cat: "histoire" },
  { date: "1899-1902", event: "Guerre des Boers (Afrique du Sud)", person: "7 000+ volontaires canadiens, 260+ morts", cat: "histoire" },
  { date: "1905", event: "Création de l'Alberta et de la Saskatchewan", person: "", cat: "histoire" },
  { date: "1909", event: "Création de la Coupe Grey", person: "Gouverneur général Lord Grey — football canadien", cat: "histoire" },
  { date: "1914-1918", event: "Première Guerre mondiale", person: "600 000+ Canadiens servent; 60 000 tués, 170 000 blessés", cat: "histoire" },
  { date: "9 avril 1917", event: "Bataille de la crête de Vimy", person: "Général Sir Arthur Currie — 10 000 victimes", cat: "histoire" },
  { date: "8 août 1918", event: "Bataille d'Amiens", person: "« Jour noir de l'armée allemande »", cat: "histoire" },
  { date: "1916", event: "Manitoba : 1re province à donner le vote aux femmes", person: "", cat: "histoire" },
  { date: "1917-1918", event: "Vote fédéral des femmes", person: "Sir Robert Borden — d'abord les infirmières (1917), puis toutes (1918)", cat: "histoire" },
  { date: "1921", event: "Première femme élue au Parlement fédéral", person: "Agnes Macphail", cat: "histoire" },
  { date: "1921", event: "Rouge et blanc : couleurs nationales officielles", person: "Roi George V", cat: "histoire" },
  { date: "1927", event: "Tour de la Paix terminée / Sécurité de la vieillesse", person: "Édifices du Parlement — Chapelle du Souvenir", cat: "histoire" },
  { date: "1929", event: "Krach boursier — début de la Grande Dépression", person: "Chômage à 27 % en 1933", cat: "histoire" },
  { date: "1934", event: "Création de la Banque du Canada", person: "", cat: "histoire" },
  { date: "1939-1945", event: "Deuxième Guerre mondiale", person: "1 million+ servent; 44 000 tués; 3e marine mondiale", cat: "histoire" },
  { date: "6 juin 1944", event: "Jour J — Débarquement de Normandie", person: "15 000 Canadiens sur la plage Juno", cat: "histoire" },
  { date: "8 mai 1945", event: "Capitulation de l'Allemagne", person: "", cat: "histoire" },
  { date: "14 août 1945", event: "Capitulation du Japon", person: "", cat: "histoire" },
  { date: "1947", event: "Découverte de pétrole en Alberta", person: "Lance l'industrie énergétique moderne", cat: "histoire" },
  { date: "1948", event: "Droit de vote : Canadiens d'origine japonaise", person: "Derniers Canadiens asiatiques à obtenir ce droit", cat: "histoire" },
  { date: "1949", event: "Terre-Neuve rejoint le Canada / OTAN créée", person: "", cat: "histoire" },
  { date: "1950-1953", event: "Guerre de Corée", person: "26 000+ Canadiens servent; 500 morts", cat: "histoire" },
  { date: "1952", event: "Elizabeth II devient reine du Canada", person: "Jubilé d'or en 2002", cat: "histoire" },
  { date: "1957", event: "Prix Nobel de la Paix", person: "Lester B. Pearson — crise de Suez", cat: "histoire" },
  { date: "1960", event: "Droit de vote des Autochtones / Déclaration des droits", person: "Déclaration canadienne des droits", cat: "histoire" },
  { date: "Années 1960", event: "Révolution tranquille au Québec", person: "", cat: "histoire" },
  { date: "1965", event: "Nouveau drapeau canadien hissé / Régime de pensions", person: "Unifolié rouge et blanc", cat: "histoire" },
  { date: "1967", event: "Création de l'Ordre du Canada", person: "Centenaire de la Confédération", cat: "histoire" },
  { date: "1969", event: "Loi sur les langues officielles", person: "Français et anglais = langues officielles", cat: "histoire" },
  { date: "1970", event: "Création de la Francophonie", person: "Association internationale de pays francophones", cat: "histoire" },
  { date: "1972", event: "Série du siècle Canada-URSS", person: "Paul Henderson — « le but du siècle »", cat: "histoire" },
  { date: "1980", event: "Référendum au Québec (1er) / Marathon de l'espoir", person: "Souveraineté défaite — Terry Fox", cat: "histoire" },
  { date: "1980", event: "Ô Canada proclamé hymne national", person: "Chanté pour la 1re fois en 1880 à Québec", cat: "histoire" },
  { date: "1982", event: "Rapatriement de la Constitution", person: "Charte canadienne des droits et libertés — sans l'accord du Québec", cat: "histoire" },
  { date: "1988", event: "Excuses aux Japonais-Canadiens / Libre-échange É.-U.", person: "Compensation pour internement WWII", cat: "histoire" },
  { date: "1994", event: "ALENA entre en vigueur", person: "Canada, États-Unis, Mexique — 444 millions de personnes", cat: "histoire" },
  { date: "1995", event: "Référendum au Québec (2e)", person: "Souveraineté défaite à nouveau", cat: "histoire" },
  { date: "1999", event: "Création du Nunavut", person: "« Notre terre » en inuktitut — 85 % Inuit", cat: "histoire" },
  { date: "2006", event: "Québécois reconnus comme nation / Excuses aux Chinois", person: "Chambre des communes — taxe d'entrée raciste", cat: "histoire" },
  { date: "2008", event: "Excuses pour les pensionnats autochtones", person: "Gouvernement du Canada", cat: "histoire" },

  // Gouvernement
  { date: "1215", event: "Magna Carta", person: "800 ans de liberté ordonnée — fondement du droit canadien", cat: "gouvernement" },
  { date: "1758", event: "Première assemblée élue au Canada", person: "Halifax, Nouvelle-Écosse", cat: "gouvernement" },
  { date: "1857", event: "Ottawa choisie comme capitale", person: "Reine Victoria", cat: "gouvernement" },
  { date: "1867", event: "Loi constitutionnelle (AANB)", person: "Définit les responsabilités fédérales et provinciales", cat: "gouvernement" },
  { date: "1940", event: "Création de l'assurance-chômage", person: "Aujourd'hui « assurance-emploi »", cat: "gouvernement" },

  // Personnes célèbres
  { date: "1854", event: "1re Croix de Victoria canadienne", person: "Alexander Roberts Dunn — Balaclava, guerre de Crimée", cat: "personnes" },
  { date: "1857", event: "1er Noir à recevoir la Croix de Victoria", person: "William Hall — siège de Lucknow, Nouvelle-Écosse", cat: "personnes" },
  { date: "1917", event: "Croix de Victoria — cote 70", person: "Filip Konowal — né en Ukraine, 1er non-britannique", cat: "personnes" },
  { date: "WWI", event: "Croix de Victoria — as de l'aviation", person: "Billy Bishop — Owen Sound, ON; maréchal de l'Air", cat: "personnes" },
  { date: "1943", event: "Croix de Victoria — Casa Berardi (Italie)", person: "Paul Triquet — Cabano, Québec", cat: "personnes" },
  { date: "Août 1945", event: "Dernier Canadien à recevoir la CV", person: "Robert Hampton Gray — Trail, C.-B., pilote naval", cat: "personnes" },
  { date: "1815 (11 janv.)", event: "Naissance de Sir John A. Macdonald", person: "1er PM du Canada — portrait sur billet de 10 $", cat: "personnes" },
  { date: "1920", event: "Fondation du Groupe des Sept", person: "Peinture de paysages canadiens sauvages", cat: "personnes" },
  { date: "Années 1950", event: "Automatistes du Québec", person: "Jean-Paul Riopelle — art moderne abstrait", cat: "personnes" },
  { date: "1980", event: "Marathon de l'espoir", person: "Terry Fox — course à travers le Canada contre le cancer", cat: "personnes" },
  { date: "1985", event: "Tour du monde en fauteuil roulant", person: "Rick Hansen — recherche sur la moelle épinière", cat: "personnes" },
  { date: "1996", event: "2 médailles d'or olympiques en sprint", person: "Donovan Bailey — record mondial, JO d'Atlanta", cat: "personnes" },
  { date: "1979-1988", event: "Wayne Gretzky avec les Oilers d'Edmonton", person: "Plus grand joueur de hockey de tous les temps", cat: "personnes" },
  { date: "2002", event: "Médaille d'or en patinage de vitesse", person: "Catriona Le May Doan — JO d'hiver", cat: "personnes" },
  { date: "2005", event: "Création de la Coupe Clarkson", person: "Adrienne Clarkson — 26e GG, 1re d'origine asiatique, hockey féminin", cat: "personnes" },
  { date: "1915", event: "Poème « Au champ d'honneur »", person: "John McCrae — In Flanders Fields", cat: "personnes" },
  { date: "Invention", event: "Téléphone", person: "Alexander Graham Bell", cat: "personnes" },
  { date: "Invention", event: "Motoneige", person: "Joseph-Armand Bombardier", cat: "personnes" },
  { date: "Invention", event: "Fuseaux horaires standardisés", person: "Sir Sandford Fleming", cat: "personnes" },
  { date: "Invention", event: "Insuline", person: "Sir Frederick Banting et Charles Best — 16 millions de vies sauvées", cat: "personnes" },
  { date: "Invention", event: "Ampoule électrique", person: "Mathew Evans et Henry Woodward — brevet vendu à Edison", cat: "personnes" },
  { date: "Invention", event: "Stimulateur cardiaque", person: "Dr John A. Hopps", cat: "personnes" },
  { date: "Invention", event: "Radio (message vocal sans fil)", person: "Reginald Fessenden", cat: "personnes" },
  { date: "Invention", event: "Canadarm (bras robotique spatial)", person: "SPAR Aérospatiale / Conseil national de recherches", cat: "personnes" },
  { date: "Invention", event: "BlackBerry", person: "Mike Lazaridis et Jim Balsillie (RIM)", cat: "personnes" },
];

let currentDateFilter = 'all';
let datesQuizMode = false;

function renderDates() {
  const list = document.getElementById('dates-list');
  const searchVal = document.getElementById('dates-search-input').value.toLowerCase();
  list.innerHTML = '';

  const filtered = DATES_DATA.filter(d => {
    if (currentDateFilter !== 'all' && d.cat !== currentDateFilter) return false;
    if (searchVal) {
      const text = `${d.date} ${d.event} ${d.person}`.toLowerCase();
      return text.includes(searchVal);
    }
    return true;
  });

  if (filtered.length === 0) {
    list.innerHTML = '<p style="color:var(--gray-400);text-align:center;padding:20px;">Aucun résultat</p>';
    return;
  }

  filtered.forEach((d, i) => {
    const row = document.createElement('div');
    row.className = 'date-row';
    row.innerHTML = `
      <div class="date-badge">${d.date}</div>
      <div class="date-info">
        <div class="date-event">${d.event}</div>
        <div class="date-person">${d.person || '—'}</div>
      </div>
    `;
    row.addEventListener('click', () => row.classList.toggle('revealed'));
    list.appendChild(row);
  });
}

function startDatesQuiz() {
  // Pick 20 random dates and quiz on them
  const pool = shuffle([...DATES_DATA].filter(d => d.person));
  const questions = pool.slice(0, 20);

  const allCards = [];
  data.chapitres.forEach(chap => {
    chap.cartes.forEach((carte, i) => {
      allCards.push({ ...carte, chapId: chap.id, origIndex: i });
    });
  });

  examLearnMode = true;
  examCards = questions.map(q => {
    // Generate wrong answers from other dates
    const others = DATES_DATA.filter(d => d !== q && d.person);
    const wrongChoices = shuffle(others).slice(0, 3).map(d => d.person || d.event);
    const correctAnswer = q.person;

    return {
      question: `${q.date} — ${q.event}. Qui ou quoi est associé à cette date ?`,
      reponse: correctAnswer,
      choix: [correctAnswer, ...wrongChoices],
      explication: `${q.date} : ${q.event} — ${q.person}`,
      chapId: 'dates-quiz',
      origIndex: 0
    };
  });

  examAnswers = new Array(examCards.length).fill(null);
  examIndex = 0;
  examTimeLeft = 45 * 60;

  // Switch to exam view
  switchMode('exam');
  document.getElementById('exam-header').classList.add('hidden');
  document.getElementById('exam-active').classList.remove('hidden');
  document.getElementById('exam-results').classList.add('hidden');

  showExamQuestion();
  startExamTimer();
}

// === START ===
document.addEventListener('DOMContentLoaded', init);
