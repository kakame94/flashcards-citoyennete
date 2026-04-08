// ============================================================
// CANADIAN CITIZENSHIP FLASHCARDS - Enhanced v2.0
// SM-2 Spaced Repetition | Bilingual | PWA Offline | Gamification
// ============================================================

// === I18N ===
const i18n = {
  fr: {
    title: 'Citoyennet\u00e9 Canadienne',
    subtitle: 'Pr\u00e9paration \u00e0 l\u2019examen \u2014 D\u00e9couvrir le Canada',
    flashcards: 'Flashcards',
    quiz: 'Quiz QCM',
    exam: 'Examen simul\u00e9',
    dates: 'Dates',
    stats: 'Stats',
    chooseChapter: 'Choisir un chapitre',
    allChapters: 'Tous les chapitres',
    cards: 'cartes',
    mastered: 'ma\u00eetris\u00e9es',
    iKnow: '\u2713 Je sais',
    iDontKnow: '\u2717 Je ne sais pas',
    flip: 'Retourner',
    backToChapters: '\u2190 Retour aux chapitres',
    question: 'Question',
    nextQuestion: 'Question suivante \u2192',
    examSimulated: 'Examen simul\u00e9',
    examDesc: '20 questions \u2014 45 minutes \u2014 15/20 pour r\u00e9ussir',
    realExam: 'Examen r\u00e9el',
    realExamDesc: 'R\u00e9sultats \u00e0 la fin',
    learningMode: 'Apprentissage',
    learningModeDesc: 'Feedback apr\u00e8s chaque r\u00e9ponse',
    startExam: 'Commencer l\u2019examen',
    submitExam: 'Soumettre l\u2019examen',
    next: 'Suivante \u2192',
    congrats: 'F\u00e9licitations ! \ud83c\udf89',
    keepStudying: 'Continuez \u00e0 \u00e9tudier \ud83d\udcaa',
    retryExam: 'Refaire un examen',
    yourAnswer: 'Votre r\u00e9ponse',
    correctAnswer: 'Bonne r\u00e9ponse',
    noAnswer: '(aucune)',
    correct: 'Bonne r\u00e9ponse !',
    wrong: 'Mauvaise r\u00e9ponse',
    correctAnswerIs: 'La bonne r\u00e9ponse est',
    datesTitle: '\ud83d\udcc5 Dates & Personnalit\u00e9s cl\u00e9s',
    all: 'Tout',
    holidays: 'F\u00e9ri\u00e9s',
    history: 'Histoire',
    government: 'Gouvernement',
    people: 'Personnes',
    searchPlaceholder: 'Rechercher une date, un nom, un \u00e9v\u00e9nement...',
    quizDates: '\ud83e\udde0 Quiz sur les dates',
    statistics: 'Statistiques',
    cardsStudied: 'Cartes \u00e9tudi\u00e9es',
    masteredLabel: 'Ma\u00eetris\u00e9es',
    quizAccuracy: 'Pr\u00e9cision Quiz',
    examsPassed: 'Examens pass\u00e9s',
    chapterProgress: 'Progression par chapitre',
    examHistory: 'Historique des examens',
    noExams: 'Aucun examen pass\u00e9',
    resetStats: 'R\u00e9initialiser les statistiques',
    resetConfirm: 'R\u00e9initialiser toutes les statistiques ?',
    masteredBadge: 'Ma\u00eetris\u00e9e \u2713',
    dueForReview: '\u00c0 r\u00e9viser',
    welcomeTitle: 'Bienvenue ! \ud83c\udf41',
    welcomeText: 'Pr\u00e9parez votre examen de citoyennet\u00e9 canadienne avec des flashcards intelligentes, des quiz et des examens simul\u00e9s.',
    welcomeTip1: '\ud83e\udde0 R\u00e9p\u00e9tition espac\u00e9e — les cartes difficiles reviennent plus souvent',
    welcomeTip2: '\ud83d\udcca Suivez votre progression chapitre par chapitre',
    welcomeTip3: '\ud83d\udcf1 Fonctionne hors ligne — \u00e9tudiez partout !',
    welcomeStart: 'Commencer \u00e0 \u00e9tudier',
    streak: 'jours cons\u00e9cutifs',
    streakDay: 'jour',
    streakDays: 'jours',
    exportData: 'Exporter mes donn\u00e9es',
    importData: 'Importer des donn\u00e9es',
    importSuccess: 'Donn\u00e9es import\u00e9es avec succ\u00e8s !',
    importError: 'Fichier invalide.',
    shareScore: 'Partager mon r\u00e9sultat',
    shareText: 'J\u2019ai obtenu {score}/20 \u00e0 mon examen de citoyennet\u00e9 canadienne ! \ud83c\udf41',
    offlineReady: '\u2713 Disponible hors ligne',
    online: 'En ligne',
    offline: 'Hors ligne',
    datesQuizQuestion: '{date} \u2014 {event}. Qui ou quoi est associ\u00e9 \u00e0 cette date ?',
    noResults: 'Aucun r\u00e9sultat',
    srFlip: 'Retourner la carte',
    srNextCard: 'Carte suivante',
    srPrevCard: 'Carte pr\u00e9c\u00e9dente',
    reviewNow: 'R\u00e9vision recommand\u00e9e',
    newCards: 'Nouvelles cartes',
    trueLabel: 'Vrai',
    falseLabel: 'Faux',
    trueOrFalse: 'Vrai ou Faux ?',
    langSwitch: 'EN',
  },
  en: {
    title: 'Canadian Citizenship',
    subtitle: 'Exam Preparation \u2014 Discover Canada',
    flashcards: 'Flashcards',
    quiz: 'MCQ Quiz',
    exam: 'Practice Exam',
    dates: 'Dates',
    stats: 'Stats',
    chooseChapter: 'Choose a chapter',
    allChapters: 'All chapters',
    cards: 'cards',
    mastered: 'mastered',
    iKnow: '\u2713 I know',
    iDontKnow: '\u2717 I don\u2019t know',
    flip: 'Flip',
    backToChapters: '\u2190 Back to chapters',
    question: 'Question',
    nextQuestion: 'Next question \u2192',
    examSimulated: 'Practice Exam',
    examDesc: '20 questions \u2014 45 minutes \u2014 15/20 to pass',
    realExam: 'Real Exam',
    realExamDesc: 'Results at the end',
    learningMode: 'Learning',
    learningModeDesc: 'Feedback after each answer',
    startExam: 'Start the exam',
    submitExam: 'Submit exam',
    next: 'Next \u2192',
    congrats: 'Congratulations! \ud83c\udf89',
    keepStudying: 'Keep studying \ud83d\udcaa',
    retryExam: 'Retry exam',
    yourAnswer: 'Your answer',
    correctAnswer: 'Correct answer',
    noAnswer: '(none)',
    correct: 'Correct!',
    wrong: 'Wrong answer',
    correctAnswerIs: 'The correct answer is',
    datesTitle: '\ud83d\udcc5 Key Dates & Figures',
    all: 'All',
    holidays: 'Holidays',
    history: 'History',
    government: 'Government',
    people: 'People',
    searchPlaceholder: 'Search a date, name, or event...',
    quizDates: '\ud83e\udde0 Quiz on dates',
    statistics: 'Statistics',
    cardsStudied: 'Cards studied',
    masteredLabel: 'Mastered',
    quizAccuracy: 'Quiz accuracy',
    examsPassed: 'Exams passed',
    chapterProgress: 'Progress by chapter',
    examHistory: 'Exam history',
    noExams: 'No exams taken',
    resetStats: 'Reset statistics',
    resetConfirm: 'Reset all statistics?',
    masteredBadge: 'Mastered \u2713',
    dueForReview: 'Due for review',
    welcomeTitle: 'Welcome! \ud83c\udf41',
    welcomeText: 'Prepare for your Canadian citizenship exam with smart flashcards, quizzes, and practice exams.',
    welcomeTip1: '\ud83e\udde0 Spaced repetition \u2014 hard cards come back more often',
    welcomeTip2: '\ud83d\udcca Track your progress chapter by chapter',
    welcomeTip3: '\ud83d\udcf1 Works offline \u2014 study anywhere!',
    welcomeStart: 'Start studying',
    streak: 'day streak',
    streakDay: 'day',
    streakDays: 'days',
    exportData: 'Export my data',
    importData: 'Import data',
    importSuccess: 'Data imported successfully!',
    importError: 'Invalid file.',
    shareScore: 'Share my result',
    shareText: 'I scored {score}/20 on my Canadian citizenship exam! \ud83c\udf41',
    offlineReady: '\u2713 Available offline',
    online: 'Online',
    offline: 'Offline',
    datesQuizQuestion: '{date} \u2014 {event}. Who or what is associated with this date?',
    noResults: 'No results',
    srFlip: 'Flip the card',
    srNextCard: 'Next card',
    srPrevCard: 'Previous card',
    reviewNow: 'Review recommended',
    newCards: 'New cards',
    trueLabel: 'True',
    falseLabel: 'False',
    trueOrFalse: 'True or False?',
    langSwitch: 'FR',
  }
};

let currentLang = localStorage.getItem('citoyennete-lang') || 'fr';

function t(key) {
  return i18n[currentLang][key] || i18n.fr[key] || key;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('citoyennete-lang', lang);
  updateUI();
}

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

// Progress (SM-2 enhanced)
let progress = loadProgress();

// Touch/swipe state
let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;

// === SM-2 SPACED REPETITION ===
function sm2(card, quality) {
  // quality: 0-5 (0-2 = fail, 3-5 = pass)
  // We use: 0 = wrong, 4 = knew it, 5 = easy
  const c = { ...card };
  if (quality >= 3) {
    if (c.repetitions === 0) {
      c.interval = 1;
    } else if (c.repetitions === 1) {
      c.interval = 6;
    } else {
      c.interval = Math.round(c.interval * c.ease);
    }
    c.repetitions++;
  } else {
    c.repetitions = 0;
    c.interval = 1;
  }
  // Update ease factor
  c.ease = Math.max(1.3, c.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  c.nextReview = Date.now() + c.interval * 24 * 60 * 60 * 1000;
  c.lastSeen = Date.now();
  return c;
}

function getDefaultCardProgress() {
  return { correct: 0, wrong: 0, lastSeen: 0, interval: 0, ease: 2.5, repetitions: 0, nextReview: 0 };
}

// === PERSISTENCE ===
function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem('citoyennete-progress'));
    if (!saved) return defaultProgress();
    // Migrate old format: add SM-2 fields if missing
    if (saved.cards) {
      Object.keys(saved.cards).forEach(key => {
        const c = saved.cards[key];
        if (c.ease === undefined) {
          c.ease = 2.5;
          c.interval = 0;
          c.repetitions = 0;
          c.nextReview = 0;
        }
        // Fix: always recompute repetitions from correct/wrong if they were zeroed out
        // This handles both fresh migration AND the broken v2.0 migration
        if (c.repetitions === 0 && c.correct >= 2 && c.correct > c.wrong) {
          c.repetitions = c.correct;
          c.nextReview = c.lastSeen ? c.lastSeen + 86400000 : 0;
        }
      });
    }
    if (!saved.streak) saved.streak = { current: 0, lastDate: null };
    return saved;
  } catch {
    return defaultProgress();
  }
}

function defaultProgress() {
  return {
    cards: {},
    quizHistory: { correct: 0, total: 0 },
    exams: [],
    streak: { current: 0, lastDate: null }
  };
}

function saveProgress() {
  localStorage.setItem('citoyennete-progress', JSON.stringify(progress));
}

function getCardKey(chapId, idx) {
  return `${chapId}:${idx}`;
}

function getCardProgress(key) {
  return progress.cards[key] || getDefaultCardProgress();
}

function isMastered(key) {
  const p = getCardProgress(key);
  return p.repetitions >= 2 && p.correct > p.wrong;
}

function isDueForReview(key) {
  const p = getCardProgress(key);
  if (p.nextReview === 0) return false; // never studied
  return Date.now() >= p.nextReview;
}

function isNewCard(key) {
  const p = getCardProgress(key);
  return p.lastSeen === 0;
}

// === STREAK ===
function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);
  const s = progress.streak;
  if (s.lastDate === today) return; // already counted today

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (s.lastDate === yesterday) {
    s.current++;
  } else if (s.lastDate !== today) {
    s.current = 1;
  }
  s.lastDate = today;
  saveProgress();
  renderStreakBadge();
}

function renderStreakBadge() {
  const el = document.getElementById('streak-badge');
  if (!el) return;
  const s = progress.streak;
  if (s.current > 0) {
    el.textContent = `\ud83d\udd25 ${s.current} ${s.current === 1 ? t('streakDay') : t('streakDays')}`;
    el.classList.remove('hidden');
  } else {
    el.classList.add('hidden');
  }
}

// === CONFETTI ===
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  canvas.classList.remove('hidden');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ['#D80621', '#ffffff', '#16a34a', '#ea580c', '#fbbf24', '#3b82f6'];
  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: Math.random() * 10 + 5,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      rot: Math.random() * 360,
      vr: (Math.random() - 0.5) * 10
    });
  }

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.vy += 0.05;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (frame < 150) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.classList.add('hidden');
    }
  }
  requestAnimationFrame(animate);
}

// === INIT ===
function init() {
  data = window.__QUESTIONS_DATA;
  bindEvents();
  registerSW();
  checkOnboarding();
  updateStreak();
  renderChapters();
  updateOfflineStatus();
}

function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(() => {
      const el = document.getElementById('offline-badge');
      if (el) {
        el.textContent = t('offlineReady');
        el.classList.add('show');
        setTimeout(() => el.classList.remove('show'), 3000);
      }
    }).catch(() => {});
  }
}

function updateOfflineStatus() {
  const el = document.getElementById('online-status');
  if (!el) return;
  const update = () => {
    el.textContent = navigator.onLine ? t('online') : t('offline');
    el.className = 'online-status ' + (navigator.onLine ? 'online' : 'offline');
  };
  update();
  window.addEventListener('online', update);
  window.addEventListener('offline', update);
}

// === ONBOARDING ===
function checkOnboarding() {
  if (!localStorage.getItem('citoyennete-onboarded')) {
    showOnboarding();
  }
}

function showOnboarding() {
  const overlay = document.getElementById('onboarding-overlay');
  if (overlay) overlay.classList.remove('hidden');
}

function dismissOnboarding() {
  localStorage.setItem('citoyennete-onboarded', '1');
  const overlay = document.getElementById('onboarding-overlay');
  if (overlay) overlay.classList.add('hidden');
}

// === CHAPTER RENDERING ===
function renderChapters() {
  const grid = document.getElementById('chapter-grid');
  grid.innerHTML = '';
  data.chapitres.forEach(chap => {
    const total = chap.cartes.length;
    const masteredCount = chap.cartes.filter((_, i) => isMastered(getCardKey(chap.id, i))).length;
    const dueCount = chap.cartes.filter((_, i) => isDueForReview(getCardKey(chap.id, i))).length;
    const newCount = chap.cartes.filter((_, i) => isNewCard(getCardKey(chap.id, i))).length;
    const pct = total > 0 ? Math.round((masteredCount / total) * 100) : 0;

    const card = document.createElement('div');
    card.className = 'chapter-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${chap.titre} - ${masteredCount}/${total} ${t('mastered')}`);
    card.dataset.id = chap.id;

    // Build badges
    let badges = '';
    if (dueCount > 0) {
      badges += `<span class="chapter-badge due">${dueCount} ${t('dueForReview')}</span>`;
    }
    if (newCount > 0 && newCount < total) {
      badges += `<span class="chapter-badge new">${newCount} ${t('newCards')}</span>`;
    }

    card.innerHTML = `
      <div class="icon">${chap.icone}</div>
      <div class="info">
        <div class="title">${chap.titre}</div>
        <div class="count">${total} ${t('cards')} &mdash; ${masteredCount} ${t('mastered')}</div>
        ${badges}
        <div class="mini-progress"><div class="mini-progress-fill" style="width:${pct}%"></div></div>
      </div>
      <div class="chapter-pct" aria-hidden="true">${pct}%</div>
    `;
    card.addEventListener('click', () => startSession(chap.id));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); startSession(chap.id); } });
    grid.appendChild(card);
  });
}

// === NAVIGATION ===
function bindEvents() {
  // Language toggle
  document.getElementById('btn-lang')?.addEventListener('click', () => {
    setLang(currentLang === 'fr' ? 'en' : 'fr');
  });

  // Onboarding
  document.getElementById('btn-start-onboarding')?.addEventListener('click', dismissOnboarding);

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

  // Swipe gestures on flashcard
  const fc = document.getElementById('flashcard');
  fc.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    touchStartTime = Date.now();
  }, { passive: true });
  fc.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    const dy = e.changedTouches[0].screenY - touchStartY;
    const dt = Date.now() - touchStartTime;
    // Require horizontal swipe > 60px, faster than 500ms, more horizontal than vertical
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5 && dt < 500) {
      if (dx > 0) {
        answerFlashcard(true); // swipe right = know
      } else {
        answerFlashcard(false); // swipe left = don't know
      }
    }
  }, { passive: true });

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

  // Share
  document.getElementById('btn-share-score')?.addEventListener('click', shareExamScore);

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
    if (confirm(t('resetConfirm'))) {
      progress = defaultProgress();
      saveProgress();
      renderStats();
      renderChapters();
      renderStreakBadge();
    }
  });

  // Export / Import
  document.getElementById('btn-export')?.addEventListener('click', exportProgress);
  document.getElementById('btn-import')?.addEventListener('click', () => {
    document.getElementById('import-file')?.click();
  });
  document.getElementById('import-file')?.addEventListener('change', importProgress);
}

function updateUI() {
  // Update all translatable UI elements
  document.querySelector('h1').textContent = '\ud83c\udf41 ' + t('title');
  document.querySelector('.subtitle').textContent = t('subtitle');

  document.querySelector('[data-mode="flashcard"]').textContent = t('flashcards');
  document.querySelector('[data-mode="quiz"]').textContent = t('quiz');
  document.querySelector('[data-mode="exam"]').textContent = t('exam');
  document.querySelector('[data-mode="dates"]').textContent = t('dates');
  document.querySelector('[data-mode="stats"]').textContent = t('stats');

  document.querySelector('#chapter-selector h2').textContent = t('chooseChapter');
  document.getElementById('btn-all-chapters').textContent = t('allChapters');

  document.getElementById('btn-dont-know').innerHTML = t('iDontKnow');
  document.getElementById('btn-flip').textContent = t('flip');
  document.getElementById('btn-know').innerHTML = t('iKnow');
  document.getElementById('btn-back-flash').textContent = t('backToChapters');
  document.getElementById('btn-back-quiz').textContent = t('backToChapters');

  document.querySelector('#exam-view #exam-header h2').textContent = t('examSimulated');
  document.querySelector('#exam-view #exam-header p').textContent = t('examDesc');
  document.querySelector('[data-exammode="real"] .mode-label').textContent = t('realExam');
  document.querySelector('[data-exammode="real"] .mode-desc').textContent = t('realExamDesc');
  document.querySelector('[data-exammode="learn"] .mode-label').textContent = t('learningMode');
  document.querySelector('[data-exammode="learn"] .mode-desc').textContent = t('learningModeDesc');
  document.getElementById('btn-start-exam').textContent = t('startExam');

  document.querySelector('#dates-view h2').textContent = t('datesTitle');
  document.getElementById('dates-search-input').placeholder = t('searchPlaceholder');
  document.getElementById('btn-quiz-dates').textContent = t('quizDates');

  const dateFilters = document.querySelectorAll('.date-filter');
  const filterLabels = ['all', 'holidays', 'history', 'government', 'people'];
  dateFilters.forEach((btn, i) => { if (filterLabels[i]) btn.textContent = t(filterLabels[i]); });

  document.querySelector('#stats-view h2').textContent = t('statistics');
  const statLabels = document.querySelectorAll('.stat-label');
  const statKeys = ['cardsStudied', 'masteredLabel', 'quizAccuracy', 'examsPassed'];
  statLabels.forEach((el, i) => { if (statKeys[i]) el.textContent = t(statKeys[i]); });

  document.querySelectorAll('#stats-view h3')[0].textContent = t('chapterProgress');
  document.querySelectorAll('#stats-view h3')[1].textContent = t('examHistory');
  document.getElementById('btn-reset-stats').textContent = t('resetStats');

  const btnExport = document.getElementById('btn-export');
  if (btnExport) btnExport.textContent = '\ud83d\udce4 ' + t('exportData');
  const btnImport = document.getElementById('btn-import');
  if (btnImport) btnImport.textContent = '\ud83d\udce5 ' + t('importData');

  const btnLang = document.getElementById('btn-lang');
  if (btnLang) btnLang.textContent = '\ud83c\udf10 ' + t('langSwitch');

  // Onboarding
  const obTitle = document.querySelector('#onboarding-overlay .onboarding-title');
  if (obTitle) obTitle.textContent = t('welcomeTitle');
  const obText = document.querySelector('#onboarding-overlay .onboarding-text');
  if (obText) obText.textContent = t('welcomeText');
  const tips = document.querySelectorAll('#onboarding-overlay .onboarding-tip');
  if (tips[0]) tips[0].textContent = t('welcomeTip1');
  if (tips[1]) tips[1].textContent = t('welcomeTip2');
  if (tips[2]) tips[2].textContent = t('welcomeTip3');
  const obBtn = document.getElementById('btn-start-onboarding');
  if (obBtn) obBtn.textContent = t('welcomeStart');

  renderChapters();
  renderStreakBadge();
  updateOfflineStatus();

  // Re-render current view
  if (currentMode === 'stats') renderStats();
  if (currentMode === 'dates') renderDates();
}

function switchMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.mode === mode));

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

  // SM-2 smart sort: due for review first, then new, then mastered
  currentCards.sort((a, b) => {
    const ka = getCardKey(a.chapId, a.origIndex);
    const kb = getCardKey(b.chapId, b.origIndex);
    const pa = getCardProgress(ka);
    const pb = getCardProgress(kb);

    // Priority: due for review > new > not due yet
    const scoreA = isDueForReview(ka) ? 0 : isNewCard(ka) ? 1 : 2;
    const scoreB = isDueForReview(kb) ? 0 : isNewCard(kb) ? 1 : 2;
    if (scoreA !== scoreB) return scoreA - scoreB;

    // Within same priority, sort by next review date (earliest first)
    return pa.nextReview - pb.nextReview;
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
  const due = isDueForReview(key);
  const badge = document.getElementById('mastery-badge');
  if (mastered && !due) {
    badge.textContent = t('masteredBadge');
    badge.style.background = 'var(--green-light)';
    badge.style.color = 'var(--green)';
  } else if (due) {
    badge.textContent = t('dueForReview');
    badge.style.background = 'var(--orange-light)';
    badge.style.color = 'var(--orange)';
  } else {
    badge.textContent = '';
    badge.style.background = '';
    badge.style.color = '';
  }

  const pct = ((cardIndex + 1) / currentCards.length) * 100;
  document.getElementById('flashcard-progress').style.width = pct + '%';

  flipped = false;
  document.getElementById('flashcard').classList.remove('flipped');

  // Swipe hint for mobile on first card
  if (cardIndex === 0 && 'ontouchstart' in window) {
    const fc = document.getElementById('flashcard');
    fc.classList.add('swipe-hint');
    setTimeout(() => fc.classList.remove('swipe-hint'), 1500);
  }
}

function flipCard() {
  flipped = !flipped;
  document.getElementById('flashcard').classList.toggle('flipped', flipped);
}

function answerFlashcard(knew) {
  const card = currentCards[cardIndex];
  const key = getCardKey(card.chapId, card.origIndex);
  if (!progress.cards[key]) progress.cards[key] = getDefaultCardProgress();

  // SM-2: quality 4 = knew, 1 = didn't know
  const quality = knew ? 4 : 1;
  const updated = sm2(progress.cards[key], quality);
  if (knew) updated.correct++;
  else updated.wrong++;
  progress.cards[key] = updated;
  saveProgress();
  updateStreak();

  // Check if chapter just got fully mastered
  if (knew && currentChapter) {
    const chap = data.chapitres.find(c => c.id === currentChapter);
    if (chap) {
      const allMastered = chap.cartes.every((_, i) => isMastered(getCardKey(chap.id, i)));
      if (allMastered) {
        launchConfetti();
      }
    }
  }

  cardIndex++;
  if (cardIndex >= currentCards.length) cardIndex = 0;
  showFlashcard();
}

// === QUIZ MODE ===
function showQuizQuestion() {
  if (quizIndex >= quizCards.length) {
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
    btn.setAttribute('role', 'radio');
    btn.setAttribute('aria-checked', 'false');
    btn.addEventListener('click', () => answerQuiz(btn, choice, correctAnswer, card));
    choicesDiv.appendChild(btn);
  });

  document.getElementById('quiz-feedback').classList.add('hidden');
  document.getElementById('btn-next-quiz').classList.add('hidden');
}

function getCorrectAnswer(card) {
  return card.choix[0];
}

function answerQuiz(btn, chosen, correct, card) {
  if (quizAnswered) return;
  quizAnswered = true;

  const key = getCardKey(card.chapId, card.origIndex);
  if (!progress.cards[key]) progress.cards[key] = getDefaultCardProgress();

  const isCorrect = chosen === correct;
  const feedback = document.getElementById('quiz-feedback');

  document.querySelectorAll('#quiz-choices .choice-btn').forEach(b => {
    b.classList.add('disabled');
    b.setAttribute('aria-disabled', 'true');
    if (b.textContent === correct) b.classList.add('correct');
  });

  if (isCorrect) {
    btn.classList.add('correct');
    btn.setAttribute('aria-checked', 'true');
    feedback.className = 'quiz-feedback correct';
    feedback.innerHTML = `<strong>\u2713 ${t('correct')}</strong><br>${card.explication}`;
    quizCorrect++;
    const updated = sm2(progress.cards[key], 4);
    updated.correct++;
    progress.cards[key] = updated;
    progress.quizHistory.correct++;
  } else {
    btn.classList.add('wrong');
    feedback.className = 'quiz-feedback wrong';
    feedback.innerHTML = `<strong>\u2717 ${t('wrong')}</strong><br>${t('correctAnswerIs')} : <strong>${correct}</strong><br>${card.explication}`;
    const updated = sm2(progress.cards[key], 1);
    updated.wrong++;
    progress.cards[key] = updated;
  }

  progress.quizHistory.total++;
  saveProgress();
  updateStreak();

  feedback.classList.remove('hidden');
  document.getElementById('btn-next-quiz').classList.remove('hidden');
  document.getElementById('btn-next-quiz').textContent = t('nextQuestion');
}

function nextQuiz() {
  quizIndex++;
  showQuizQuestion();
}

// === EXAM MODE ===
// Convert a QCM card into a true/false card (~30% of exam questions)
function toTrueFalse(card) {
  const isTrue = Math.random() > 0.5;
  const correctAnswer = getCorrectAnswer(card);
  let statement;
  if (isTrue) {
    // Build a clean affirmative statement with the correct answer
    statement = buildAffirmation(card.question, correctAnswer);
  } else {
    // Build a statement with a wrong answer
    const wrongChoices = card.choix.slice(1);
    const wrongAnswer = wrongChoices[Math.floor(Math.random() * wrongChoices.length)];
    statement = buildAffirmation(card.question, wrongAnswer);
  }
  return {
    ...card,
    isTrueFalse: true,
    tfStatement: statement,
    tfCorrectAnswer: isTrue ? t('trueLabel') : t('falseLabel'),
    tfExplication: card.explication + (isTrue ? '' : ` (${t('correctAnswerIs')} : ${correctAnswer})`)
  };
}

function buildAffirmation(question, answer) {
  // Simply present the answer as a clean factual statement
  // Format: "La bonne réponse à [question] est : [answer]"
  // But cleaner: just show the answer as a direct affirmation
  return answer + '.';
}

function startExam() {
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
  document.getElementById('exam-index').textContent = examIndex + 1;
  document.getElementById('exam-progress').style.width = ((examIndex + 1) / 20 * 100) + '%';

  const choicesDiv = document.getElementById('exam-choices');
  choicesDiv.innerHTML = '';

  const feedback = document.getElementById('exam-feedback');
  feedback.classList.add('hidden');
  feedback.innerHTML = '';

  // QCM only (4 choices like the real exam)
  document.getElementById('exam-question').textContent = card.question;
  const choices = shuffle([...card.choix]);
  const correctAnswer = getCorrectAnswer(card);
  choicesDiv.classList.remove('tf-layout');

  choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    if (examAnswers[examIndex] === choice) btn.style.borderColor = 'var(--red)';
    btn.textContent = choice;
    btn.addEventListener('click', () => {
      if (examAnswered) return;
      examAnswers[examIndex] = choice;

      if (examLearnMode) {
        examAnswered = true;
        const isCorrect = choice === correctAnswer;

        const key = getCardKey(card.chapId, card.origIndex);
        if (!progress.cards[key]) progress.cards[key] = getDefaultCardProgress();
        const updated = sm2(progress.cards[key], isCorrect ? 4 : 1);
        if (isCorrect) updated.correct++;
        else updated.wrong++;
        progress.cards[key] = updated;
        saveProgress();

        document.querySelectorAll('#exam-choices .choice-btn').forEach(b => {
          b.classList.add('disabled');
          if (b.textContent === correctAnswer) b.classList.add('correct');
        });

        const expText = card.explication;
        if (isCorrect) {
          btn.classList.add('correct');
          feedback.className = 'quiz-feedback correct';
          feedback.innerHTML = `<strong>\u2713 ${t('correct')}</strong><br>${expText}`;
        } else {
          btn.classList.add('wrong');
          feedback.className = 'quiz-feedback wrong';
          feedback.innerHTML = `<strong>\u2717 ${t('wrong')}</strong><br>${t('correctAnswerIs')} : <strong>${correctAnswer}</strong><br>${expText}`;
        }
        feedback.classList.remove('hidden');
      } else {
        document.querySelectorAll('#exam-choices .choice-btn').forEach(b => {
          b.style.borderColor = b.textContent === choice ? 'var(--red)' : '';
          b.style.background = b.textContent === choice ? 'var(--red-light)' : '';
        });
      }
    });
    choicesDiv.appendChild(btn);
  });

  const nextBtn = document.getElementById('btn-next-exam');
  nextBtn.textContent = examIndex === 19 ? t('submitExam') : t('next');
}

function nextExamQuestion() {
  if (examAnswers[examIndex] === null) {
    document.getElementById('exam-choices').style.animation = 'pulse 0.3s';
    setTimeout(() => document.getElementById('exam-choices').style.animation = '', 300);
    return;
  }

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

    const key = getCardKey(card.chapId, card.origIndex);
    if (!progress.cards[key]) progress.cards[key] = getDefaultCardProgress();
    if (!examLearnMode) {
      const updated = sm2(progress.cards[key], isCorrect ? 4 : 1);
      if (isCorrect) updated.correct++;
      else updated.wrong++;
      progress.cards[key] = updated;
    }

    const questionText = card.question;
    const div = document.createElement('div');
    div.className = `result-item ${isCorrect ? 'correct' : 'wrong'}`;
    div.innerHTML = `
      <div class="result-q">${i + 1}. ${questionText}</div>
      <div class="result-a">${isCorrect ? '\u2713' : '\u2717'} ${t('yourAnswer')} : ${examAnswers[i] || t('noAnswer')}${!isCorrect ? '<br>' + t('correctAnswer') + ' : ' + correctAnswer : ''}</div>
    `;
    details.appendChild(div);
  });

  const passed = correct >= 15;
  document.getElementById('exam-result-title').textContent = passed ? t('congrats') : t('keepStudying');
  const scoreEl = document.getElementById('exam-result-score');
  scoreEl.textContent = `${correct}/20`;
  scoreEl.className = `result-score ${passed ? 'pass' : 'fail'}`;

  // Show share button
  const shareBtn = document.getElementById('btn-share-score');
  if (shareBtn) {
    shareBtn.dataset.score = correct;
    shareBtn.classList.remove('hidden');
  }

  if (passed) launchConfetti();

  progress.exams.push({ date: new Date().toISOString(), score: correct, passed });
  saveProgress();
  updateStreak();
}

// === SHARE ===
function shareExamScore() {
  const score = document.getElementById('btn-share-score')?.dataset.score || '?';
  const text = t('shareText').replace('{score}', score);
  if (navigator.share) {
    navigator.share({ title: t('title'), text }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('btn-share-score');
      const orig = btn.textContent;
      btn.textContent = '\u2713 Copied!';
      setTimeout(() => btn.textContent = orig, 2000);
    }).catch(() => {});
  }
}

// === EXPORT / IMPORT ===
function exportProgress() {
  const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `citoyennete-progress-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importProgress(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if (imported.cards && imported.quizHistory) {
        progress = imported;
        if (!progress.streak) progress.streak = { current: 0, lastDate: null };
        saveProgress();
        renderChapters();
        renderStats();
        renderStreakBadge();
        alert(t('importSuccess'));
      } else {
        alert(t('importError'));
      }
    } catch {
      alert(t('importError'));
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

// === STATS ===
function renderStats() {
  const studied = Object.keys(progress.cards).length;
  document.getElementById('stat-total-studied').textContent = studied;

  const mastered = Object.keys(progress.cards).filter(k => isMastered(k)).length;
  document.getElementById('stat-mastered').textContent = mastered;

  const acc = progress.quizHistory.total > 0
    ? Math.round((progress.quizHistory.correct / progress.quizHistory.total) * 100)
    : 0;
  document.getElementById('stat-accuracy').textContent = acc + '%';

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
    histDiv.innerHTML = `<p style="color:var(--gray-400);font-size:0.9rem;">${t('noExams')}</p>`;
  } else {
    progress.exams.slice().reverse().forEach(exam => {
      const d = new Date(exam.date);
      const dateStr = d.toLocaleDateString('fr-CA') + ' ' + d.toLocaleTimeString('fr-CA', { hour: '2-digit', minute: '2-digit' });
      const row = document.createElement('div');
      row.className = 'exam-history-row';
      row.innerHTML = `
        <span>${dateStr}</span>
        <span class="score ${exam.passed ? 'pass' : 'fail'}">${exam.score}/20 ${exam.passed ? '\u2713' : '\u2717'}</span>
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
  // Jours f\u00e9ri\u00e9s
  { date: "1er janvier", event: "Jour de l'An", person: "", cat: "feries" },
  { date: "11 janvier", event: "Journ\u00e9e Sir John A. Macdonald", person: "Sir John A. Macdonald \u2014 1er Premier ministre du Canada", cat: "feries" },
  { date: "9 avril", event: "Jour de Vimy", person: "Bataille de la cr\u00eate de Vimy (1917) \u2014 10 000 victimes", cat: "feries" },
  { date: "Lundi avant le 25 mai", event: "F\u00eate de Victoria", person: "Anniversaire officiel du souverain", cat: "feries" },
  { date: "24 juin", event: "F\u00eate nationale du Qu\u00e9bec", person: "Saint-Jean-Baptiste", cat: "feries" },
  { date: "1er juillet", event: "F\u00eate du Canada", person: "Conf\u00e9d\u00e9ration de 1867 \u2014 avant 1982 : \u00ab F\u00eate du Dominion \u00bb", cat: "feries" },
  { date: "1er lundi de sept.", event: "F\u00eate du Travail", person: "", cat: "feries" },
  { date: "2e lundi d'oct.", event: "Action de gr\u00e2ces", person: "", cat: "feries" },
  { date: "11 novembre", event: "Jour du Souvenir", person: "11e heure du 11e jour du 11e mois \u2014 John McCrae, \u00ab Au champ d'honneur \u00bb", cat: "feries" },
  { date: "20 novembre", event: "Journ\u00e9e Sir Wilfrid Laurier", person: "Sir Wilfrid Laurier \u2014 portrait sur le billet de 5 $", cat: "feries" },
  { date: "25 d\u00e9cembre", event: "No\u00ebl", person: "", cat: "feries" },

  // Histoire \u2014 avant la Conf\u00e9d\u00e9ration
  { date: "~1000", event: "Vikings atteignent le Canada", person: "L'Anse aux Meadows (T.-N.-L.) \u2014 patrimoine mondial UNESCO", cat: "histoire" },
  { date: "1497", event: "Jean Cabot cartographie la c\u00f4te Est", person: "Jean Cabot (Giovanni Caboto)", cat: "histoire" },
  { date: "1534", event: "Premier voyage de Jacques Cartier", person: "Jacques Cartier \u2014 mot \u00ab kanata \u00bb (village en iroquois)", cat: "histoire" },
  { date: "1604", event: "Premier \u00e9tablissement europ\u00e9en", person: "Pierre de Monts et Samuel de Champlain \u2014 \u00cele Sainte-Croix", cat: "histoire" },
  { date: "1608", event: "Fondation de Qu\u00e9bec", person: "Samuel de Champlain", cat: "histoire" },
  { date: "1670", event: "Fondation Compagnie de la Baie d'Hudson", person: "Roi Charles II d'Angleterre", cat: "histoire" },
  { date: "1701", event: "Paix entre Fran\u00e7ais et Iroquois", person: "Grande Paix de Montr\u00e9al", cat: "histoire" },
  { date: "1759", event: "Bataille des plaines d'Abraham", person: "G\u00e9n\u00e9ral Wolfe et g\u00e9n\u00e9ral Montcalm \u2014 tous deux tu\u00e9s", cat: "histoire" },
  { date: "1763", event: "Proclamation royale", person: "Roi George III \u2014 droits territoriaux autochtones", cat: "histoire" },
  { date: "1774", event: "Acte de Qu\u00e9bec", person: "Libert\u00e9 religieuse catholique, droit civil fran\u00e7ais", cat: "histoire" },
  { date: "1776", event: "Arriv\u00e9e des Loyalistes", person: "40 000+ fuient vers le Canada, dont Joseph Brant (Mohawk)", cat: "histoire" },
  { date: "1791", event: "Acte constitutionnel", person: "Division : Haut-Canada (Ontario) et Bas-Canada (Qu\u00e9bec)", cat: "histoire" },
  { date: "1793", event: "Abolition de l'esclavage au Haut-Canada", person: "John Graves Simcoe \u2014 1er lt-gouv., fonde York (Toronto)", cat: "histoire" },
  { date: "1807", event: "Interdiction traite des esclaves (Empire britannique)", person: "Parlement britannique", cat: "histoire" },
  { date: "1812-1814", event: "Guerre de 1812", person: "Brock (Detroit/Queenston Heights), Laura Secord, Salaberry (Ch\u00e2teauguay)", cat: "histoire" },
  { date: "1832", event: "Cr\u00e9ation de la Bourse de Montr\u00e9al", person: "", cat: "histoire" },
  { date: "1833", event: "Abolition de l'esclavage dans l'Empire britannique", person: "Parlement britannique", cat: "histoire" },
  { date: "1837-1838", event: "R\u00e9bellions au Haut et Bas-Canada", person: "Lord Durham \u2014 recommande gouvernement responsable", cat: "histoire" },
  { date: "1847-1848", event: "Premier gouvernement responsable", person: "Nouvelle-\u00c9cosse \u2014 premi\u00e8re colonie \u00e0 l'obtenir", cat: "histoire" },
  { date: "1849", event: "Gouvernement responsable au Canada", person: "Sir Louis-Hippolyte La Fontaine et Robert Baldwin", cat: "histoire" },
  { date: "1853", event: "Premi\u00e8re femme r\u00e9dactrice en chef", person: "Mary Ann Shadd Cary \u2014 The Provincial Freeman", cat: "histoire" },

  // Conf\u00e9d\u00e9ration et apr\u00e8s
  { date: "1867", event: "Conf\u00e9d\u00e9ration du Canada", person: "ON, QC, NS, NB \u2014 Sir John A. Macdonald, Sir George-\u00c9tienne Cartier", cat: "histoire" },
  { date: "1869-1870", event: "R\u00e9volte de la rivi\u00e8re Rouge / Cr\u00e9ation du Manitoba", person: "Louis Riel", cat: "histoire" },
  { date: "1871", event: "La C.-B. rejoint la Conf\u00e9d\u00e9ration", person: "Promesse du chemin de fer transcontinental", cat: "histoire" },
  { date: "1873", event: "\u00ce.-P.-\u00c9. rejoint / Cr\u00e9ation de la Police mont\u00e9e", person: "GRC \u2014 QG \u00e0 Regina, fonde Fort Calgary et Fort MacLeod", cat: "histoire" },
  { date: "1885 (7 nov.)", event: "Ach\u00e8vement du chemin de fer Canadien Pacifique", person: "Donald Smith (Lord Strathcona) enfonce le dernier crampon", cat: "histoire" },
  { date: "1885", event: "Seconde r\u00e9volte des M\u00e9tis / Parc national Banff", person: "Louis Riel ex\u00e9cut\u00e9, Gabriel Dumont chef militaire m\u00e9tis", cat: "histoire" },
  { date: "1891", event: "Invention du basketball", person: "James Naismith (Canadien)", cat: "histoire" },
  { date: "1892", event: "Don de la Coupe Stanley", person: "Lord Stanley, gouverneur g\u00e9n\u00e9ral", cat: "histoire" },
  { date: "1899-1902", event: "Guerre des Boers (Afrique du Sud)", person: "7 000+ volontaires canadiens, 260+ morts", cat: "histoire" },
  { date: "1905", event: "Cr\u00e9ation de l'Alberta et de la Saskatchewan", person: "", cat: "histoire" },
  { date: "1909", event: "Cr\u00e9ation de la Coupe Grey", person: "Gouverneur g\u00e9n\u00e9ral Lord Grey \u2014 football canadien", cat: "histoire" },
  { date: "1914-1918", event: "Premi\u00e8re Guerre mondiale", person: "600 000+ Canadiens servent; 60 000 tu\u00e9s, 170 000 bless\u00e9s", cat: "histoire" },
  { date: "9 avril 1917", event: "Bataille de la cr\u00eate de Vimy", person: "G\u00e9n\u00e9ral Sir Arthur Currie \u2014 10 000 victimes", cat: "histoire" },
  { date: "8 ao\u00fbt 1918", event: "Bataille d'Amiens", person: "\u00ab Jour noir de l'arm\u00e9e allemande \u00bb", cat: "histoire" },
  { date: "1916", event: "Manitoba : 1re province \u00e0 donner le vote aux femmes", person: "", cat: "histoire" },
  { date: "1917-1918", event: "Vote f\u00e9d\u00e9ral des femmes", person: "Sir Robert Borden \u2014 d'abord les infirmi\u00e8res (1917), puis toutes (1918)", cat: "histoire" },
  { date: "1921", event: "Premi\u00e8re femme \u00e9lue au Parlement f\u00e9d\u00e9ral", person: "Agnes Macphail", cat: "histoire" },
  { date: "1921", event: "Rouge et blanc : couleurs nationales officielles", person: "Roi George V", cat: "histoire" },
  { date: "1927", event: "Tour de la Paix termin\u00e9e / S\u00e9curit\u00e9 de la vieillesse", person: "\u00c9difices du Parlement \u2014 Chapelle du Souvenir", cat: "histoire" },
  { date: "1929", event: "Krach boursier \u2014 d\u00e9but de la Grande D\u00e9pression", person: "Ch\u00f4mage \u00e0 27 % en 1933", cat: "histoire" },
  { date: "1934", event: "Cr\u00e9ation de la Banque du Canada", person: "", cat: "histoire" },
  { date: "1939-1945", event: "Deuxi\u00e8me Guerre mondiale", person: "1 million+ servent; 44 000 tu\u00e9s; 3e marine mondiale", cat: "histoire" },
  { date: "6 juin 1944", event: "Jour J \u2014 D\u00e9barquement de Normandie", person: "15 000 Canadiens sur la plage Juno", cat: "histoire" },
  { date: "8 mai 1945", event: "Capitulation de l'Allemagne", person: "", cat: "histoire" },
  { date: "14 ao\u00fbt 1945", event: "Capitulation du Japon", person: "", cat: "histoire" },
  { date: "1947", event: "D\u00e9couverte de p\u00e9trole en Alberta", person: "Lance l'industrie \u00e9nerg\u00e9tique moderne", cat: "histoire" },
  { date: "1948", event: "Droit de vote : Canadiens d'origine japonaise", person: "Derniers Canadiens asiatiques \u00e0 obtenir ce droit", cat: "histoire" },
  { date: "1949", event: "Terre-Neuve rejoint le Canada / OTAN cr\u00e9\u00e9e", person: "", cat: "histoire" },
  { date: "1950-1953", event: "Guerre de Cor\u00e9e", person: "26 000+ Canadiens servent; 500 morts", cat: "histoire" },
  { date: "1952", event: "Elizabeth II devient reine du Canada", person: "Jubil\u00e9 d'or en 2002", cat: "histoire" },
  { date: "1957", event: "Prix Nobel de la Paix", person: "Lester B. Pearson \u2014 crise de Suez", cat: "histoire" },
  { date: "1960", event: "Droit de vote des Autochtones / D\u00e9claration des droits", person: "D\u00e9claration canadienne des droits", cat: "histoire" },
  { date: "Ann\u00e9es 1960", event: "R\u00e9volution tranquille au Qu\u00e9bec", person: "", cat: "histoire" },
  { date: "1965", event: "Nouveau drapeau canadien hiss\u00e9 / R\u00e9gime de pensions", person: "Unifoli\u00e9 rouge et blanc", cat: "histoire" },
  { date: "1967", event: "Cr\u00e9ation de l'Ordre du Canada", person: "Centenaire de la Conf\u00e9d\u00e9ration", cat: "histoire" },
  { date: "1969", event: "Loi sur les langues officielles", person: "Fran\u00e7ais et anglais = langues officielles", cat: "histoire" },
  { date: "1970", event: "Cr\u00e9ation de la Francophonie", person: "Association internationale de pays francophones", cat: "histoire" },
  { date: "1972", event: "S\u00e9rie du si\u00e8cle Canada-URSS", person: "Paul Henderson \u2014 \u00ab le but du si\u00e8cle \u00bb", cat: "histoire" },
  { date: "1980", event: "R\u00e9f\u00e9rendum au Qu\u00e9bec (1er) / Marathon de l'espoir", person: "Souverainet\u00e9 d\u00e9faite \u2014 Terry Fox", cat: "histoire" },
  { date: "1980", event: "\u00d4 Canada proclam\u00e9 hymne national", person: "Chant\u00e9 pour la 1re fois en 1880 \u00e0 Qu\u00e9bec", cat: "histoire" },
  { date: "1982", event: "Rapatriement de la Constitution", person: "Charte canadienne des droits et libert\u00e9s \u2014 sans l'accord du Qu\u00e9bec", cat: "histoire" },
  { date: "1988", event: "Excuses aux Japonais-Canadiens / Libre-\u00e9change \u00c9.-U.", person: "Compensation pour internement WWII", cat: "histoire" },
  { date: "1994", event: "ALENA entre en vigueur", person: "Canada, \u00c9tats-Unis, Mexique \u2014 444 millions de personnes", cat: "histoire" },
  { date: "1995", event: "R\u00e9f\u00e9rendum au Qu\u00e9bec (2e)", person: "Souverainet\u00e9 d\u00e9faite \u00e0 nouveau", cat: "histoire" },
  { date: "1999", event: "Cr\u00e9ation du Nunavut", person: "\u00ab Notre terre \u00bb en inuktitut \u2014 85 % Inuit", cat: "histoire" },
  { date: "2006", event: "Qu\u00e9b\u00e9cois reconnus comme nation / Excuses aux Chinois", person: "Chambre des communes \u2014 taxe d'entr\u00e9e raciste", cat: "histoire" },
  { date: "2008", event: "Excuses pour les pensionnats autochtones", person: "Gouvernement du Canada", cat: "histoire" },

  // Gouvernement
  { date: "1215", event: "Magna Carta", person: "800 ans de libert\u00e9 ordonn\u00e9e \u2014 fondement du droit canadien", cat: "gouvernement" },
  { date: "1758", event: "Premi\u00e8re assembl\u00e9e \u00e9lue au Canada", person: "Halifax, Nouvelle-\u00c9cosse", cat: "gouvernement" },
  { date: "1857", event: "Ottawa choisie comme capitale", person: "Reine Victoria", cat: "gouvernement" },
  { date: "1867", event: "Loi constitutionnelle (AANB)", person: "D\u00e9finit les responsabilit\u00e9s f\u00e9d\u00e9rales et provinciales", cat: "gouvernement" },
  { date: "1940", event: "Cr\u00e9ation de l'assurance-ch\u00f4mage", person: "Aujourd'hui \u00ab assurance-emploi \u00bb", cat: "gouvernement" },

  // Personnes c\u00e9l\u00e8bres
  { date: "1854", event: "1re Croix de Victoria canadienne", person: "Alexander Roberts Dunn \u2014 Balaclava, guerre de Crim\u00e9e", cat: "personnes" },
  { date: "1857", event: "1er Noir \u00e0 recevoir la Croix de Victoria", person: "William Hall \u2014 si\u00e8ge de Lucknow, Nouvelle-\u00c9cosse", cat: "personnes" },
  { date: "1917", event: "Croix de Victoria \u2014 cote 70", person: "Filip Konowal \u2014 n\u00e9 en Ukraine, 1er non-britannique", cat: "personnes" },
  { date: "WWI", event: "Croix de Victoria \u2014 as de l'aviation", person: "Billy Bishop \u2014 Owen Sound, ON; mar\u00e9chal de l'Air", cat: "personnes" },
  { date: "1943", event: "Croix de Victoria \u2014 Casa Berardi (Italie)", person: "Paul Triquet \u2014 Cabano, Qu\u00e9bec", cat: "personnes" },
  { date: "Ao\u00fbt 1945", event: "Dernier Canadien \u00e0 recevoir la CV", person: "Robert Hampton Gray \u2014 Trail, C.-B., pilote naval", cat: "personnes" },
  { date: "1815 (11 janv.)", event: "Naissance de Sir John A. Macdonald", person: "1er PM du Canada \u2014 portrait sur billet de 10 $", cat: "personnes" },
  { date: "1920", event: "Fondation du Groupe des Sept", person: "Peinture de paysages canadiens sauvages", cat: "personnes" },
  { date: "Ann\u00e9es 1950", event: "Automatistes du Qu\u00e9bec", person: "Jean-Paul Riopelle \u2014 art moderne abstrait", cat: "personnes" },
  { date: "1980", event: "Marathon de l'espoir", person: "Terry Fox \u2014 course \u00e0 travers le Canada contre le cancer", cat: "personnes" },
  { date: "1985", event: "Tour du monde en fauteuil roulant", person: "Rick Hansen \u2014 recherche sur la moelle \u00e9pini\u00e8re", cat: "personnes" },
  { date: "1996", event: "2 m\u00e9dailles d'or olympiques en sprint", person: "Donovan Bailey \u2014 record mondial, JO d'Atlanta", cat: "personnes" },
  { date: "1979-1988", event: "Wayne Gretzky avec les Oilers d'Edmonton", person: "Plus grand joueur de hockey de tous les temps", cat: "personnes" },
  { date: "2002", event: "M\u00e9daille d'or en patinage de vitesse", person: "Catriona Le May Doan \u2014 JO d'hiver", cat: "personnes" },
  { date: "2005", event: "Cr\u00e9ation de la Coupe Clarkson", person: "Adrienne Clarkson \u2014 26e GG, 1re d'origine asiatique, hockey f\u00e9minin", cat: "personnes" },
  { date: "1915", event: "Po\u00e8me \u00ab Au champ d'honneur \u00bb", person: "John McCrae \u2014 In Flanders Fields", cat: "personnes" },
  { date: "Invention", event: "T\u00e9l\u00e9phone", person: "Alexander Graham Bell", cat: "personnes" },
  { date: "Invention", event: "Motoneige", person: "Joseph-Armand Bombardier", cat: "personnes" },
  { date: "Invention", event: "Fuseaux horaires standardis\u00e9s", person: "Sir Sandford Fleming", cat: "personnes" },
  { date: "Invention", event: "Insuline", person: "Sir Frederick Banting et Charles Best \u2014 16 millions de vies sauv\u00e9es", cat: "personnes" },
  { date: "Invention", event: "Ampoule \u00e9lectrique", person: "Mathew Evans et Henry Woodward \u2014 brevet vendu \u00e0 Edison", cat: "personnes" },
  { date: "Invention", event: "Stimulateur cardiaque", person: "Dr John A. Hopps", cat: "personnes" },
  { date: "Invention", event: "Radio (message vocal sans fil)", person: "Reginald Fessenden", cat: "personnes" },
  { date: "Invention", event: "Canadarm (bras robotique spatial)", person: "SPAR A\u00e9rospatiale / Conseil national de recherches", cat: "personnes" },
  { date: "Invention", event: "BlackBerry", person: "Mike Lazaridis et Jim Balsillie (RIM)", cat: "personnes" },
];

let currentDateFilter = 'all';

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
    list.innerHTML = `<p style="color:var(--gray-400);text-align:center;padding:20px;">${t('noResults')}</p>`;
    return;
  }

  filtered.forEach(d => {
    const row = document.createElement('div');
    row.className = 'date-row';
    row.setAttribute('role', 'button');
    row.setAttribute('tabindex', '0');
    row.innerHTML = `
      <div class="date-badge">${d.date}</div>
      <div class="date-info">
        <div class="date-event">${d.event}</div>
        <div class="date-person">${d.person || '\u2014'}</div>
      </div>
    `;
    row.addEventListener('click', () => row.classList.toggle('revealed'));
    row.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); row.classList.toggle('revealed'); } });
    list.appendChild(row);
  });
}

function startDatesQuiz() {
  const pool = shuffle([...DATES_DATA].filter(d => d.person));
  const questions = pool.slice(0, 20);

  examLearnMode = true;
  examCards = questions.map(q => {
    const others = DATES_DATA.filter(d => d !== q && d.person);
    const wrongChoices = shuffle(others).slice(0, 3).map(d => d.person || d.event);
    const correctAnswer = q.person;

    return {
      question: t('datesQuizQuestion').replace('{date}', q.date).replace('{event}', q.event),
      reponse: correctAnswer,
      choix: [correctAnswer, ...wrongChoices],
      explication: `${q.date} : ${q.event} \u2014 ${q.person}`,
      chapId: 'dates-quiz',
      origIndex: 0
    };
  });

  examAnswers = new Array(examCards.length).fill(null);
  examIndex = 0;
  examTimeLeft = 45 * 60;

  switchMode('exam');
  document.getElementById('exam-header').classList.add('hidden');
  document.getElementById('exam-active').classList.remove('hidden');
  document.getElementById('exam-results').classList.add('hidden');

  showExamQuestion();
  startExamTimer();
}

// === START ===
document.addEventListener('DOMContentLoaded', init);
