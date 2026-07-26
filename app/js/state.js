/* ============================================================
   קוראים חכמים — ניהול מצב (localStorage)
   ============================================================ */
const SAVE_KEY = 'smart-readers-save-v1';

const DEFAULT_STATE = {
  name: '',
  world: null,                 /* עולם התוכן שנבחר */
  avatar: { color: 'blue', hat: null, face: null, pet: null },
  coins: 0,
  owned: [],                   /* פריטי חנות שנרכשו */
  items: [],                   /* פריטי מסע: [{unit, emoji, name}] */
  words: [],                   /* מילים שנשמרו: [{unit, word}] */
  completed: [],               /* מזהי יחידות שהושלמו */
  onboarded: false,
  muted: false,
  nikud: false,                /* גלגל הצלה: תצוגת ניקוד */
  nikudTipSeen: false,         /* האם הוצג האונבורדינג של גלגל ההצלה */
};

let S = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) return Object.assign(structuredClone(DEFAULT_STATE), JSON.parse(raw));
  } catch (e) { /* שמירה פגומה — מתחילים נקי */ }
  return structuredClone(DEFAULT_STATE);
}

function saveState() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) { /* אין אחסון — ממשיכים בזיכרון */ }
}

function resetState() {
  localStorage.removeItem(SAVE_KEY);
  S = structuredClone(DEFAULT_STATE);
}

/* --- מטבעות --- */
function addCoins(n, anchorEl) {
  S.coins += n;
  saveState();
  updateCoinDisplays();
  Sound.play('coin');
  if (anchorEl) flyCoin(anchorEl, n);
}

function spendCoins(n) {
  if (S.coins < n) return false;
  S.coins -= n;
  saveState();
  updateCoinDisplays();
  return true;
}

function updateCoinDisplays() {
  const hud = document.getElementById('hud-coins');
  const unit = document.getElementById('unit-coins');
  if (hud) hud.textContent = S.coins;
  if (unit) unit.textContent = S.coins;
}

/* אנימציית "+N" ליד אלמנט */
function flyCoin(el, n) {
  const r = el.getBoundingClientRect();
  const span = document.createElement('span');
  span.className = 'fly-coin';
  span.textContent = `+${n} 🪙`;
  span.style.left = (r.left + r.width / 2 - 20) + 'px';
  span.style.top = (r.top - 10) + 'px';
  document.body.appendChild(span);
  setTimeout(() => span.remove(), 1000);
}

/* --- התקדמות יחידות --- */
function isUnitDone(id) { return S.completed.includes(id); }

function unitStatus(id) {
  if (isUnitDone(id)) return 'done';
  /* יחידה פתוחה: הראשונה שעוד לא הושלמה */
  const firstOpen = MAP_STATIONS.map(s => s.id).find(i => !isUnitDone(i));
  return id === firstOpen ? 'open' : 'locked';
}

function completeUnit(id) {
  if (!S.completed.includes(id)) S.completed.push(id);
  const item = JOURNEY_ITEMS[id];
  if (item && !S.items.some(it => it.unit === id)) {
    S.items.push({ unit: id, emoji: item.emoji, name: item.name });
  }
  saveState();
}

function saveJourneyWord(unitId, word) {
  if (word && word.trim()) {
    S.words.push({ unit: unitId, word: word.trim() });
    saveState();
  }
}
