/* ============================================================
   קוראים חכמים — העולם: מפה, דמות, חנות, ספר מסע, הרשמה
   ============================================================ */

/* ---------- הדמות ---------- */
function avatarSVG(colorKey) {
  const c = AVATAR_COLORS[colorKey] || AVATAR_COLORS.blue;
  return `
  <svg viewBox="0 0 120 140" aria-hidden="true">
    <!-- רגליים -->
    <ellipse cx="44" cy="128" rx="14" ry="9" fill="${c.dark}"/>
    <ellipse cx="76" cy="128" rx="14" ry="9" fill="${c.dark}"/>
    <!-- ידיים -->
    <ellipse cx="14" cy="86" rx="10" ry="14" fill="${c.body}" transform="rotate(20 14 86)"/>
    <ellipse cx="106" cy="86" rx="10" ry="14" fill="${c.body}" transform="rotate(-20 106 86)"/>
    <!-- גוף -->
    <ellipse cx="60" cy="82" rx="44" ry="48" fill="${c.body}"/>
    <ellipse cx="60" cy="96" rx="28" ry="26" fill="#ffffff" opacity=".35"/>
    <!-- עיניים -->
    <circle cx="44" cy="66" r="13" fill="#fff"/>
    <circle cx="76" cy="66" r="13" fill="#fff"/>
    <circle cx="46" cy="68" r="6" fill="#2b2b2b"/>
    <circle cx="74" cy="68" r="6" fill="#2b2b2b"/>
    <circle cx="48" cy="66" r="2" fill="#fff"/>
    <circle cx="76" cy="66" r="2" fill="#fff"/>
    <!-- לחיים וחיוך -->
    <circle cx="34" cy="84" r="5" fill="#ff8fa0" opacity=".6"/>
    <circle cx="86" cy="84" r="5" fill="#ff8fa0" opacity=".6"/>
    <path d="M46 92 Q60 104 74 92" fill="none" stroke="#2b2b2b" stroke-width="4" stroke-linecap="round"/>
  </svg>`;
}

function itemEmoji(id) {
  const it = SHOP_ITEMS.find(x => x.id === id);
  return it ? it.emoji : '';
}

function renderAvatar(el, cls = '') {
  const a = S.avatar;
  el.innerHTML = `
    <div class="avatar-box ${cls}">
      ${avatarSVG(a.color)}
      ${a.hat ? `<span class="avatar-hat">${itemEmoji(a.hat)}</span>` : ''}
      ${a.face ? `<span class="avatar-face">${itemEmoji(a.face)}</span>` : ''}
      ${a.pet ? `<span class="avatar-pet">${itemEmoji(a.pet)}</span>` : ''}
    </div>`;
}

/* ---------- מעבר בין מסכים ---------- */
function showScreen(name) {
  ['onboarding', 'map', 'unit'].forEach(s =>
    document.getElementById('screen-' + s).classList.toggle('hidden', s !== name));
}

/* ============================================================
   הרשמה (יחידה 0 לייט: שם, דמות, עולם תוכן)
   ============================================================ */
function startOnboarding() {
  showScreen('onboarding');
  const card = document.getElementById('ob-card');
  let picked = { name: '', color: 'blue', world: null };

  const steps = {
    welcome() {
      card.innerHTML = `
        <div class="ob-logo">📚✨</div>
        <h1 class="ob-title">קוראים חכמים</h1>
        <p class="ob-sub">ברוכים הבאים לעולם הקריאה!<br>
        כאן נצא יחד למסע בין תחנות, נאסוף מטבעות ופריטים,<br>ונהפוך לקוראות ולקוראים חכמים.</p>
        <button class="btn-main" id="ob-next">מתחילים! 🚀</button>`;
      card.querySelector('#ob-next').onclick = steps.name;
    },
    name() {
      card.innerHTML = `
        <div class="ob-logo">👋</div>
        <h1 class="ob-title">איך קוראים לך?</h1>
        <p class="ob-sub">השם יופיע על המפה ובספר המסע</p>
        <input class="ob-input" id="ob-name" maxlength="15" placeholder="השם שלי..." autocomplete="off">
        <br><button class="btn-main" id="ob-next" disabled>ממשיכים ⬅</button>`;
      const input = card.querySelector('#ob-name');
      const btn = card.querySelector('#ob-next');
      input.oninput = () => btn.disabled = input.value.trim().length < 2;
      input.onkeydown = e => { if (e.key === 'Enter' && !btn.disabled) btn.click(); };
      btn.onclick = () => { picked.name = input.value.trim(); steps.color(); };
      input.focus();
    },
    color() {
      card.innerHTML = `
        <h1 class="ob-title">בחרו את הדמות שלכם</h1>
        <p class="ob-sub">הדמות תלווה אתכם לאורך כל המסע (אפשר לשדרג אותה בחנות!)</p>
        <div class="ob-avatar-row" id="ob-avatar-preview"></div>
        <div class="ob-choices" id="ob-colors"></div>
        <button class="btn-main" id="ob-next">ממשיכים ⬅</button>`;
      const preview = card.querySelector('#ob-avatar-preview');
      const colorsEl = card.querySelector('#ob-colors');
      function paint() {
        preview.innerHTML = `<div class="avatar-box">${avatarSVG(picked.color)}</div>`;
        colorsEl.querySelectorAll('.ob-choice').forEach(c =>
          c.classList.toggle('selected', c.dataset.color === picked.color));
      }
      Object.entries(AVATAR_COLORS).forEach(([key, c]) => {
        const btn = document.createElement('button');
        btn.className = 'ob-choice';
        btn.dataset.color = key;
        btn.innerHTML = `<span class="big" style="display:inline-block;width:34px;height:34px;border-radius:50%;background:${c.body};border:3px solid ${c.dark}"></span>${c.name}`;
        btn.onclick = () => { picked.color = key; paint(); };
        colorsEl.appendChild(btn);
      });
      paint();
      card.querySelector('#ob-next').onclick = steps.world;
    },
    world() {
      card.innerHTML = `
        <h1 class="ob-title">מה הכי מעניין אתכם?</h1>
        <p class="ob-sub">בחרו עולם תוכן אהוב. ניפגש איתו שוב בהמשך המסע!</p>
        <div class="ob-choices" id="ob-worlds"></div>
        <button class="btn-main" id="ob-next" disabled>ממשיכים ⬅</button>`;
      const worldsEl = card.querySelector('#ob-worlds');
      const btn = card.querySelector('#ob-next');
      INTEREST_WORLDS.forEach(w => {
        const b = document.createElement('button');
        b.className = 'ob-choice';
        b.innerHTML = `<span class="big">${w.emoji}</span>${w.name}`;
        b.onclick = () => {
          picked.world = w.id;
          worldsEl.querySelectorAll('.ob-choice').forEach(x => x.classList.remove('selected'));
          b.classList.add('selected');
          btn.disabled = false;
        };
        worldsEl.appendChild(b);
      });
      btn.onclick = steps.done;
    },
    done() {
      /* שמירת הפרופיל + פרס פתיחה */
      S.name = picked.name;
      S.avatar.color = picked.color;
      S.world = picked.world;
      S.owned.push('color-' + picked.color); /* הצבע שנבחר שייך לשחקן */
      S.coins += 20;
      S.onboarded = true;
      completeUnit(0);
      saveState();

      card.innerHTML = `
        <div class="ob-logo">🎒</div>
        <h1 class="ob-title">קיבלת את תיק המסע!</h1>
        <p class="ob-sub">בתיק נאסוף פריט מכל תחנה שנסיים.<br>
        וגם: <strong>‏20 מטבעות ראשונים 🪙</strong> כבר מחכים לך!</p>
        <button class="btn-main" id="ob-next">אל המפה! 🗺️</button>`;
      confettiBurst(60);
      card.querySelector('#ob-next').onclick = () => showMap(false);
    },
  };
  steps.welcome();
}

/* ============================================================
   מפת העולם
   ============================================================ */
function buildMapOnce() {
  const world = document.getElementById('map-world');

  /* קישוטים */
  MAP_DECO.forEach(d => {
    const el = document.createElement('div');
    el.className = 'map-deco';
    el.style.cssText = `right:${d.x}%;top:${d.y}%;font-size:${d.s}px`;
    el.textContent = d.e;
    world.appendChild(el);
  });

  /* שביל: קו רחב + נקודות מקווקוות */
  const pts = MAP_STATIONS.map(s => `${100 - s.x},${s.y}`).join(' ');
  const svg = document.querySelector('.map-path-svg');
  document.getElementById('map-path').setAttribute('points', pts);
  const dots = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  dots.setAttribute('points', pts);
  dots.setAttribute('class', 'path-dots');
  svg.appendChild(dots);
}

function currentStationId() {
  const firstOpen = MAP_STATIONS.map(s => s.id).find(i => !isUnitDone(i));
  return firstOpen != null ? firstOpen : MAP_STATIONS[MAP_STATIONS.length - 1].id;
}

function showMap(animateAvatar) {
  showScreen('map');
  updateCoinDisplays();
  document.getElementById('hud-name').textContent = S.name;
  renderAvatar(document.getElementById('hud-mini-avatar'), 'mini');

  /* תחנות */
  const wrap = document.getElementById('map-stations');
  wrap.innerHTML = '';
  MAP_STATIONS.forEach(st => {
    const status = unitStatus(st.id);
    const el = document.createElement('div');
    el.className = `station ${status}`;
    el.style.right = st.x + '%';
    el.style.top = st.y + '%';
    el.style.transform = 'translate(50%, -50%)';
    el.innerHTML = `
      <div class="station-circle" role="button" tabindex="${status === 'locked' ? -1 : 0}"
           aria-label="יחידה ${st.id}: ${st.title}${status === 'locked' ? ' (נעולה)' : ''}">
        ${status === 'locked' ? '🔒' : st.emoji}
        <span class="station-num">${st.id}</span>
        <span class="station-check">✔</span>
      </div>
      <div class="station-label">${st.title}</div>`;
    const circle = el.querySelector('.station-circle');
    circle.onclick = () => stationClick(st, status);
    circle.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); stationClick(st, status); } };
    wrap.appendChild(el);
  });

  /* מיקום הדמות */
  const cur = MAP_STATIONS.find(s => s.id === currentStationId());
  const av = document.getElementById('map-avatar');
  renderAvatar(av);
  if (!animateAvatar) av.style.transition = 'none';
  av.style.right = (cur.x - 6) + '%';
  av.style.top = (cur.y + 7) + '%';
  if (!animateAvatar) requestAnimationFrame(() => av.style.transition = '');
}

function stationClick(st, status) {
  if (status === 'locked') {
    toast('התחנה הזו עוד נעולה. קודם מסיימים את התחנה הזוהרת! ✨');
    return;
  }
  if (st.id === 0) {
    if (status === 'done') { toast(`הפרופיל שלך מוכן, ${S.name}! התחנה הבאה מחכה 🎒`); return; }
    startOnboarding();
    return;
  }
  if (!UNITS[st.id]) {
    toast('היחידה הזו עוד בבנייה אצלנו בנגרייה 🔨 בקרוב!');
    return;
  }
  startUnit(st.id);
}

/* ============================================================
   החנות
   ============================================================ */
function openShop() {
  renderAvatar(document.getElementById('shop-avatar-preview'), '');
  const grid = document.getElementById('shop-grid');
  grid.innerHTML = '';

  SHOP_CATS.forEach(cat => {
    const items = SHOP_ITEMS.filter(i => i.cat === cat.id);
    const title = document.createElement('div');
    title.className = 'shop-cat-title';
    title.textContent = cat.name;
    grid.appendChild(title);
    const row = document.createElement('div');
    row.className = 'shop-row';
    items.forEach(item => {
      const owned = S.owned.includes(item.id);
      const equipped = item.slot === 'color'
        ? S.avatar.color === item.value
        : S.avatar[item.slot] === item.id;
      const el = document.createElement('button');
      el.className = 'shop-item' + (equipped ? ' equipped' : owned ? ' owned' : (S.coins < item.price ? ' cant-afford' : ''));
      el.innerHTML = `
        ${item.slot === 'color'
          ? `<span class="si-swatch" style="background:${AVATAR_COLORS[item.value].body}"></span>`
          : `<span class="si-emoji">${item.emoji}</span>`}
        <span class="si-name">${item.name}</span>
        ${equipped ? '<span class="si-badge">✔ לבוש עליי</span>'
          : owned ? '<span class="si-badge">יש לי! (להלבשה)</span>'
          : `<span class="si-price">🪙 ${item.price}</span>`}`;
      el.onclick = () => shopClick(item, owned, equipped);
      row.appendChild(el);
    });
    grid.appendChild(row);
  });
}

function shopClick(item, owned, equipped) {
  if (!owned) {
    if (!spendCoins(item.price)) {
      toast(`חסרים עוד ${item.price - S.coins} מטבעות. אפשר להרוויח ביחידות! 💪`);
      return;
    }
    S.owned.push(item.id);
    Sound.play('correct');
    toast(`🎉 ${item.name} עכשיו שלך!`);
    equip(item, true);
  } else {
    equip(item, !equipped);
  }
  saveState();
  openShop();
}

function equip(item, on) {
  if (item.slot === 'color') {
    if (on) S.avatar.color = item.value;
  } else {
    S.avatar[item.slot] = on ? item.id : null;
  }
}

/* ============================================================
   ספר המסע
   ============================================================ */
function openBook() {
  const itemsEl = document.getElementById('book-items');
  itemsEl.innerHTML = '<div class="book-items-grid"></div>';
  const grid = itemsEl.firstChild;
  MAP_STATIONS.forEach(st => {
    const got = S.items.find(i => i.unit === st.id);
    const el = document.createElement('div');
    el.className = 'book-item' + (got ? '' : ' empty');
    el.innerHTML = got
      ? `<div class="bi-emoji">${got.emoji}</div><div class="bi-name">${got.name}</div><div class="bi-unit">יחידה ${st.id}</div>`
      : `<div class="bi-emoji">❔</div><div class="bi-name">עוד מחכה...</div><div class="bi-unit">יחידה ${st.id}</div>`;
    grid.appendChild(el);
  });

  const wordsEl = document.getElementById('book-words');
  if (S.words.length === 0) {
    wordsEl.innerHTML = '<p class="book-empty-msg">בסוף כל יחידה בוחרים מילה אחת לקחת איתנו. היא תופיע כאן ✨</p>';
  } else {
    wordsEl.innerHTML = `<div class="book-words-list">${
      S.words.map(w => `<span class="book-word">${w.word}</span>`).join('')
    }</div>`;
  }
}

/* ============================================================
   חלונות צפים + אתחול
   ============================================================ */
function openOverlay(id) { document.getElementById(id).classList.remove('hidden'); }
function closeOverlays() { document.querySelectorAll('.overlay').forEach(o => o.classList.add('hidden')); }

/* טעינה מוקדמת של נכסי ה-GPT — קובץ שנטען מדליק דגל, קובץ חסר משאיר SVG */
function preloadAssets(done) {
  const defs = [['mapBg', MAP_BG_IMAGE], ['owl', OWL_IMAGE], ['monsters', MONSTER_IMAGES[0]], ['unitBg', UNIT_BG_IMAGE]];
  let left = defs.length;
  defs.forEach(([key, src]) => {
    const img = new Image();
    img.onload = () => { ASSETS[key] = true; if (--left === 0) done(); };
    img.onerror = () => { if (--left === 0) done(); };
    img.src = src;
  });
}

function init() {
  buildMapOnce();
  if (ASSETS.mapBg) document.getElementById('map-world').classList.add('photo-bg');

  /* הרקע של מסך השיעור וההרשמה — תמיד איור: רקע ייעודי, ואם אין אז רקע המפה */
  const bg = ASSETS.unitBg ? UNIT_BG_IMAGE : (ASSETS.mapBg ? MAP_BG_IMAGE : null);
  if (bg) {
    document.documentElement.style.setProperty('--unit-bg-url', `url('${bg}')`);
    document.getElementById('screen-unit').classList.add('photo-bg');
    document.querySelector('#screen-onboarding .ob-sky').classList.add('photo-bg');
  }

  document.getElementById('btn-shop').onclick = () => { openShop(); openOverlay('overlay-shop'); };
  document.getElementById('btn-book').onclick = () => { openBook(); openOverlay('overlay-book'); };
  document.getElementById('btn-avatar').onclick = () => {
    renderAvatar(document.getElementById('avatar-preview'), '');
    document.getElementById('avatar-stats').innerHTML =
      `🪙 ${S.coins} מטבעות · ✅ ${S.completed.length} תחנות הושלמו · 🎁 ${S.items.length} פריטים בספר המסע`;
    openOverlay('overlay-avatar');
  };

  /* גלגל הצלה: תצוגת ניקוד */
  function paintNikud() {
    ['btn-nikud', 'btn-nikud-unit'].forEach(id =>
      document.getElementById(id).classList.toggle('active', S.nikud));
    document.body.classList.toggle('nikud-on', S.nikud);
  }
  function toggleNikud() {
    S.nikud = !S.nikud;
    saveState();
    paintNikud();
    applyNikudToDom(document.getElementById('unit-card'), S.nikud);
    applyNikudToDom(document.getElementById('map-stations'), S.nikud);
    Sound.play('click');
    toast(S.nikud ? 'גלגל הצלה פתוח: הטקסט מוצג עם ניקוד 🛟' : 'הניקוד הוסתר');
  }
  document.getElementById('btn-nikud').onclick = toggleNikud;
  document.getElementById('btn-nikud-unit').onclick = toggleNikud;
  paintNikud();

  /* השתקה / הפעלת צלילים */
  function paintMute() {
    const icon = S.muted ? '🔇' : '🔊';
    document.getElementById('btn-mute').textContent = icon;
    document.getElementById('btn-mute-unit').textContent = icon;
  }
  function toggleMute() {
    S.muted = !S.muted;
    saveState();
    paintMute();
    if (!S.muted) Sound.play('click');
  }
  document.getElementById('btn-mute').onclick = toggleMute;
  document.getElementById('btn-mute-unit').onclick = toggleMute;
  paintMute();

  /* איפוס בשתי לחיצות (בלי דיאלוג דפדפן) */
  const resetBtn = document.getElementById('btn-reset');
  let armed = false;
  resetBtn.onclick = () => {
    if (!armed) {
      armed = true;
      toast('לחיצה נוספת תמחק את כל ההתקדמות! (נעלם בעוד 3 שניות)', 3000);
      setTimeout(() => armed = false, 3000);
    } else {
      resetState();
      location.reload();
    }
  };

  document.querySelectorAll('[data-close]').forEach(b => b.onclick = closeOverlays);
  document.querySelectorAll('.overlay').forEach(o =>
    o.addEventListener('click', e => { if (e.target === o) closeOverlays(); }));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeOverlays(); });

  document.getElementById('btn-unit-exit').onclick = () => { stopPartActivities(); showMap(false); };

  if (S.onboarded) showMap(false);
  else startOnboarding();
}

document.addEventListener('DOMContentLoaded', () => preloadAssets(init));
