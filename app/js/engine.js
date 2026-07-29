/* ============================================================
   קוראים חכמים — מנוע היחידות
   מנגן כל part לפי type: word-hunt / sentence-hunt / catch-game /
   reading / mcq-set / sort-families / anecdote / summary
   ============================================================ */

let currentUnit = null;
let partIndex = -1;          /* ‎-1 = מסך פתיחת היחידה */
let strikesLeft = 0;
let partCleanup = null;      /* עצירת אנימציות/טיימרים של החלק הנוכחי */

const $card = () => document.getElementById('unit-card');

/* ---------- עזרים כלליים ---------- */
function toast(msg, ms = 2600) {
  const t = document.getElementById('toast');
  t.textContent = typeof NK === 'function' ? NK(msg) : msg;
  t.classList.remove('hidden');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.add('hidden'), ms);
}

function confettiBurst(count = 80) {
  const layer = document.getElementById('confetti-layer');
  const colors = ['#f5b301', '#2f88d0', '#3a9e3d', '#d9534f', '#a06ae0', '#ff8fc0'];
  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = colors[i % colors.length];
    c.style.borderRadius = Math.random() > .5 ? '50%' : '2px';
    c.style.animationDuration = (2 + Math.random() * 2.5) + 's';
    c.style.animationDelay = (Math.random() * .8) + 's';
    layer.appendChild(c);
    setTimeout(() => c.remove(), 5500);
  }
}

function stopPartActivities() {
  if (partCleanup) { partCleanup(); partCleanup = null; }
}

/* ---------- אפס גלילה: הכרטיס מתכווץ להתאים למסך, כמו שקופית ---------- */
let fitObserverStarted = false;

function fitUnitCard() {
  const stage = document.querySelector('.unit-stage');
  const layout = document.getElementById('unit-layout');
  if (!stage || !layout) return;
  layout.style.transform = '';
  const avail = stage.clientHeight - 14;
  const h = layout.offsetHeight;
  if (h > avail && avail > 100) {
    layout.style.transform = `scale(${Math.max(.5, avail / h)})`;
  }
}

function startFitObserver() {
  if (fitObserverStarted) return;
  fitObserverStarted = true;
  /* כל שינוי בגובה התוכן (פידבק שנוסף, משפט שנחשף) מפעיל התאמה מחדש */
  new ResizeObserver(() => requestAnimationFrame(fitUnitCard))
    .observe(document.getElementById('unit-card'));
  window.addEventListener('resize', fitUnitCard);
}

/* נצנוצים סביב אלמנט — חגיגה קטנה על כל הצלחה */
function sparkleBurst(el, count = 6) {
  const r = el.getBoundingClientRect();
  const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    s.className = 'sparkle';
    s.textContent = ['✨', '⭐', '💫'][i % 3];
    const ang = (Math.PI * 2 * i) / count + Math.random() * .6;
    s.style.setProperty('--dx', Math.cos(ang) * (40 + Math.random() * 30) + 'px');
    s.style.setProperty('--dy', Math.sin(ang) * (40 + Math.random() * 30) + 'px');
    s.style.left = cx + 'px';
    s.style.top = cy + 'px';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 800);
  }
}

/* אלף הינשוף "מדבר": הבועה נכתבת אות אחרי אות בקצב קריאה של ילד (לחיצה מדלגת) */
let guideTypeTimer = null;

function animateGuideBubble() {
  const b = document.querySelector('.guide-bubble');
  if (!b) return;
  /* עוצרים הקלדה קודמת שעוד רצה — אחרת היא תדרוס את הטקסט החדש */
  clearInterval(guideTypeTimer);
  const full = b.textContent;
  b.textContent = '';
  b.classList.add('typing');
  let i = 0;
  guideTypeTimer = setInterval(() => {
    i += 1;
    b.textContent = full.slice(0, i);
    if (i >= full.length) { clearInterval(guideTypeTimer); b.classList.remove('typing'); }
  }, 45);
  b.onclick = () => { clearInterval(guideTypeTimer); b.textContent = full; b.classList.remove('typing'); };
}

/* תמונת סצנה לחלק: תמונת AI אם קיימת, אחרת ה-SVG המצויר */
function mountScene(container, part) {
  if (!container) return;
  const fallback = () => { container.innerHTML = SCENE_SVGS[part.sceneSvg] || ''; };
  if (part.sceneImage) {
    const img = new Image();
    img.src = part.sceneImage;
    img.alt = 'איור לקטע';
    img.style.cssText = 'display:block;width:100%;height:auto';
    img.onerror = fallback;
    container.appendChild(img);
  } else {
    fallback();
  }
}

/* ---------- ניהול יחידה ---------- */
function startUnit(id) {
  currentUnit = UNITS[id];
  if (!currentUnit) { toast('היחידה הזו עוד בבנייה, נפתח אותה בקרוב! 🔧'); return; }
  partIndex = -1;
  startFitObserver();
  /* רקע איור ליחידה: ייעודי אם קיים, אחרת ברירת המחדל של העולם */
  const unitScreen = document.getElementById('screen-unit');
  if (unitScreen.classList.contains('photo-bg')) {
    const bg = currentUnit.bg || window.DEFAULT_UNIT_BG;
    if (bg) document.documentElement.style.setProperty('--unit-bg-url', `url('${new URL(bg, document.baseURI).href}')`);
  }
  /* רקע איור בתוך המסגרת המאוחדת (אם ליחידה יש) */
  const layout = document.getElementById('unit-layout');
  if (currentUnit.cardBg) {
    document.documentElement.style.setProperty('--unit-card-bg', `url('${new URL(currentUnit.cardBg, document.baseURI).href}')`);
    layout.classList.add('photo-card');
  } else {
    layout.classList.remove('photo-card');
  }
  showScreen('unit');
  updateCoinDisplays();
  buildProgress();
  renderIntro();
}

function buildProgress() {
  const bar = document.getElementById('unit-progress');
  bar.innerHTML = '';
  currentUnit.parts.forEach((_, i) => {
    const seg = document.createElement('div');
    seg.className = 'seg';
    seg.dataset.i = i;
    bar.appendChild(seg);
  });
}

function updateProgress() {
  document.querySelectorAll('#unit-progress .seg').forEach(seg => {
    const i = +seg.dataset.i;
    seg.classList.toggle('done', i < partIndex);
    seg.classList.toggle('now', i === partIndex);
  });
}

function setStrikes(n, total) {
  strikesLeft = n;
  const el = document.getElementById('unit-strikes');
  if (total == null) { el.textContent = ''; return; }
  el.textContent = '❤️'.repeat(n) + '🤍'.repeat(total - n);
}

function nextPart() {
  stopPartActivities();
  partIndex++;
  if (partIndex >= currentUnit.parts.length) { renderRewards(); return; }
  updateProgress();
  const part = currentUnit.parts[partIndex];
  setStrikes(0, null);
  const renderers = {
    'word-hunt': renderWordHunt,
    'sentence-hunt': renderSentenceHunt,
    'catch-game': renderCatchGame,
    'feed-game': renderFeedGame,
    'reading': renderReading,
    'mcq-set': renderMcqSet,
    'sort-families': renderSortFamilies,
    'anecdote': renderAnecdote,
    'summary': renderSummary,
  };
  renderers[part.type](part);
  refreshNikud();
  animateGuideBubble();
  fitUnitCard();
}

/* הפאנל הצדדי הקבוע: שלב, כותרת, אלף הינשוף וההנחיה */
function owlMarkup() {
  return ASSETS.owl ? `<img class="owl-img" src="${OWL_IMAGE}" alt="">` : OWL_SVG;
}

function partHeader(part) {
  document.getElementById('side-kicker').textContent = part.kicker || '';
  document.getElementById('side-title').textContent = part.title || '';
  document.getElementById('side-owl').innerHTML =
    `<div class="guide-owl">${owlMarkup()}<span class="guide-name">${GUIDE_NAME}</span></div>`;
  const bubble = document.getElementById('side-bubble');
  bubble.textContent = part.guide || '';
  bubble.style.display = part.guide ? '' : 'none';
  return '';
}

/* ---------- מסך פתיחת יחידה ---------- */
function renderIntro() {
  updateProgress();
  partHeader({
    kicker: `יחידה ${currentUnit.id} · ${currentUnit.topic}`,
    title: currentUnit.title,
    guide: `שלום ${S.name}! היום נתחיל בקטן ונגדל: משפט אחד, אחר כך קטע קצר, ובסוף פסקה שלמה. ובדרך? נתפוס מילים באוויר! 🎈`,
  });
  $card().innerHTML = `
    <div class="intro-emoji">${currentUnit.emoji}</div>
    <h2 class="part-title" style="text-align:center">יחידה ${currentUnit.id}: ${currentUnit.title}</h2>
    <div class="objectives">
      <h3>בסוף היחידה אדע:</h3>
      <ul>${currentUnit.objectives.map(o => `<li>${o}</li>`).join('')}</ul>
    </div>
    <div class="part-actions"><button class="btn-main" id="btn-start-unit">יוצאים לדרך! 🚀</button></div>
  `;
  refreshNikud();
  animateGuideBubble();
  showNikudCoach();
  fitUnitCard();
  document.getElementById('btn-start-unit').onclick = nextPart;
}

/* ---------- הטרמה: ציד מילים בתמונה ---------- */
function renderWordHunt(part) {
  const okCount = part.words.filter(w => w.ok).length;
  let found = 0;

  $card().innerHTML = `
    ${partHeader(part)}
    <div class="hunt-scene" id="hunt-scene"></div>
    <div class="hunt-words" id="hunt-words"></div>
    <div id="hunt-feedback"></div>
    <div class="part-actions"><button class="btn-main" id="btn-hunt-next" disabled>ממשיכים ⬅</button></div>
  `;

  const scene = document.getElementById('hunt-scene');
  if (part.sceneImage) {
    const img = new Image();
    img.src = part.sceneImage;
    img.alt = 'תמונת הנושא של היחידה';
    img.style.cssText = 'display:block;width:100%;height:auto';
    img.onerror = () => { scene.innerHTML = SCENE_SVGS[part.sceneSvg] || UNIT1_SCENE_SVG; };
    scene.appendChild(img);
  } else {
    scene.innerHTML = SCENE_SVGS[part.sceneSvg] || UNIT1_SCENE_SVG;
  }

  const wordsEl = document.getElementById('hunt-words');
  part.words.forEach(({ w, ok }) => {
    const btn = document.createElement('button');
    btn.className = 'hunt-word';
    btn.textContent = w;
    btn.onclick = () => {
      if (btn.disabled) return;
      if (ok) {
        btn.classList.add('picked-ok');
        btn.disabled = true;
        Sound.play('pop');
        sparkleBurst(btn, 4);
        addCoins(5, btn);
        found++;
        if (found === okCount) {
          document.getElementById('hunt-feedback').innerHTML =
            `<div class="feedback-box good">🎉 ${part.doneFeedback}</div>`;
          document.getElementById('btn-hunt-next').disabled = false;
        }
      } else {
        btn.classList.add('picked-bad');
        setTimeout(() => btn.classList.remove('picked-bad'), 600);
        Sound.play('wrong');
        toast('המילה הזו לא מופיעה בתמונה, נסו אחרת 👀');
      }
    };
    wordsEl.appendChild(btn);
  });

  document.getElementById('btn-hunt-next').onclick = nextPart;
}

/* ---------- משפט אחד: מציאת מילות משפחה ---------- */
function renderSentenceHunt(part) {
  let found = 0;

  $card().innerHTML = `
    ${partHeader(part)}
    <div class="hunt-scene" id="sh-scene"></div>
    <div class="family-tag">משפחת <strong>${part.family}</strong></div>
    <div class="sentence-big" id="sentence-big"></div>
    <div id="sh-feedback"></div>
    <div class="part-actions"><button class="btn-main" id="btn-sh-next" disabled>ממשיכים ⬅</button></div>
  `;
  mountScene(document.getElementById('sh-scene'), part);

  const wrap = document.getElementById('sentence-big');
  part.words.forEach((w, i) => {
    const btn = document.createElement('button');
    btn.className = 'sentence-word';
    btn.textContent = w;
    btn.onclick = () => {
      if (btn.disabled) return;
      if (part.targetIdx.includes(i)) {
        btn.classList.add('found');
        btn.disabled = true;
        Sound.play('correct');
        sparkleBurst(btn);
        addCoins(10, btn);
        found++;
        if (found === part.targetIdx.length) {
          document.getElementById('sh-feedback').innerHTML =
            `<div class="feedback-box good">🌟 ${part.fbGood}</div>`;
          document.getElementById('btn-sh-next').disabled = false;
          confettiBurst(30);
        }
      } else {
        btn.classList.add('miss');
        setTimeout(() => btn.classList.remove('miss'), 600);
        Sound.play('wrong');
        toast(part.fbBad);
      }
    };
    wrap.appendChild(btn);
  });

  document.getElementById('btn-sh-next').onclick = nextPart;
}

/* ---------- משחקון ארקייד: תופסים מפלצות מילים בתנועה ---------- */
function renderCatchGame(part) {
  setStrikes(part.strikes, part.strikes);

  const themes = {
    balloons: { dir: 'up', vessel: 'monster-balloon', bgClass: 'arcade-sky' },
    night:    { dir: 'left', vessel: 'monster-fly', bgClass: 'arcade-space' },
    mail:     { dir: 'left', vessel: 'monster-mail', bgClass: 'arcade-mail' },
  };
  const theme = themes[part.theme] || themes.balloons;
  const goal = part.goal || part.targets.length;

  let caught, items, rafId, spawnId, lastT, colorIdx = 0, running = false, streak = 0;

  $card().innerHTML = `
    ${partHeader(part)}
    <div class="arcade-status">
      <span class="family-tag">משפחת <strong>${part.family}</strong></span>
      <span class="combo-badge hidden" id="combo-badge"></span>
      <span class="arcade-count" id="arcade-count"></span>
    </div>
    <div class="arcade ${theme.bgClass}" id="arcade"></div>
    <div id="arcade-feedback"></div>
    <div class="part-actions"><button class="btn-main" id="btn-arcade-next" disabled>ממשיכים ⬅</button></div>
  `;

  const box = document.getElementById('arcade');
  const countEl = document.getElementById('arcade-count');
  document.getElementById('btn-arcade-next').onclick = nextPart;

  function updateCount() {
    countEl.textContent = `נתפסו ${caught} מתוך ${goal}`;
  }

  function pickWord() {
    if (Math.random() < .55) {
      return { w: part.targets[Math.floor(Math.random() * part.targets.length)], ok: true };
    }
    return { w: part.distractors[Math.floor(Math.random() * part.distractors.length)], ok: false };
  }

  function spawn() {
    if (!running) return;
    const { w, ok } = pickWord();
    const el = document.createElement('button');
    el.className = 'arcade-item ' + theme.vessel;
    const mi = colorIdx++;
    const [mc, md] = ARCADE_MONSTER_COLORS[mi % ARCADE_MONSTER_COLORS.length];
    const monsterHtml = ASSETS.monsters
      ? `<img class="monster-img" src="${MONSTER_IMAGES[mi % MONSTER_IMAGES.length]}" alt="">`
      : MONSTER_SVG(mc, md, mi % 3);
    el.innerHTML = `
      ${theme.vessel === 'monster-balloon' ? '<span class="mini-balloon">🎈</span>'
        : theme.vessel === 'monster-mail' ? '<span class="mini-mail">✉️</span>'
        : '<span class="mini-wings">🦇</span>'}
      <span class="monster-body">${monsterHtml}</span>
      <span class="vessel-word">${NK(w)}</span>`;
    const bw = box.clientWidth, bh = box.clientHeight;
    const item = { el, w, ok, alive: true };
    if (theme.dir === 'up') {
      item.x = 10 + Math.random() * (bw - 120);
      item.y = bh + 20;
      item.vy = -(38 + Math.random() * 34);   /* פיקסלים לשנייה */
      item.vx = 0;
    } else {
      item.x = bw + 20;
      item.y = 8 + Math.random() * (bh - 160);
      item.vx = -(70 + Math.random() * 50);
      item.vy = 0;
    }
    el.style.transform = `translate(${item.x}px, ${item.y}px)`;
    el.onclick = () => hit(item);
    box.appendChild(el);
    items.push(item);
  }

  function hit(item) {
    if (!item.alive || !running) return;
    if (item.ok) {
      item.alive = false;
      item.el.classList.add('caught');
      caught++;
      streak++;
      const bonus = streak >= 3 ? 5 : 0;
      if (streak >= 3) {
        Sound.play('streak');
        const badge = document.getElementById('combo-badge');
        badge.textContent = `🔥 רצף ×${streak}!`;
        badge.classList.remove('hidden');
        badge.classList.remove('pulse');
        void badge.offsetWidth;   /* מפעיל מחדש את האנימציה */
        badge.classList.add('pulse');
      } else {
        Sound.play('pop');
      }
      sparkleBurst(item.el, 4);
      addCoins(10 + bonus, item.el);
      updateCount();
      setTimeout(() => item.el.remove(), 400);
      if (caught >= goal) win();
    } else {
      item.el.classList.add('wrong-hit');
      setTimeout(() => item.el.classList.remove('wrong-hit'), 500);
      streak = 0;
      document.getElementById('combo-badge').classList.add('hidden');
      Sound.play('wrong');
      setStrikes(strikesLeft - 1, part.strikes);
      toast(part.fbBad);
      if (strikesLeft <= 0) {
        running = false;
        setTimeout(() => { toast(part.restartMsg, 3200); startRound(); }, 900);
      }
    }
  }

  function killItem(item) {
    item.alive = false;
    item.el.classList.add('faded');
    setTimeout(() => item.el.remove(), 300);
  }

  function tick(t) {
    if (!running) return;
    const dt = lastT ? Math.min((t - lastT) / 1000, .05) : 0;
    lastT = t;
    const bh = box.clientHeight;
    items = items.filter(item => {
      if (!item.alive) return false;
      item.x += item.vx * dt;
      item.y += item.vy * dt;
      item.el.style.transform = `translate(${item.x}px, ${item.y}px)`;
      const gone = theme.dir === 'up' ? item.y < -180 : item.x < -200;
      if (gone) { item.el.remove(); return false; }
      return true;
    });
    rafId = requestAnimationFrame(tick);
  }

  function win() {
    running = false;
    clearInterval(spawnId);
    cancelAnimationFrame(rafId);
    items.forEach(killItem);
    Sound.play('correct');
    confettiBurst(50);
    document.getElementById('arcade-feedback').innerHTML =
      `<div class="feedback-box good">🏆 ${part.doneFeedback}</div>`;
    document.getElementById('btn-arcade-next').disabled = false;
  }

  function startRound() {
    clearInterval(spawnId);
    cancelAnimationFrame(rafId);
    box.innerHTML = '';
    items = [];
    caught = 0;
    streak = 0;
    document.getElementById('combo-badge').classList.add('hidden');
    setStrikes(part.strikes, part.strikes);
    updateCount();
    running = true;
    lastT = 0;
    /* פתיחה עם שלושה פריטים שכבר באוויר */
    spawn();
    setTimeout(spawn, 250);
    setTimeout(spawn, 500);
    spawnId = setInterval(spawn, 950);
    rafId = requestAnimationFrame(tick);
  }

  partCleanup = () => {
    running = false;
    clearInterval(spawnId);
    cancelAnimationFrame(rafId);
  };

  startRound();
}

/* ---------- המפלצות הרעבות: מאכילים כל מפלצת במשפחה שלה ---------- */
function renderFeedGame(part) {
  setStrikes(part.strikes, part.strikes);
  let queue, idx, busy = false;

  function build() {
    idx = 0;
    busy = false;
    queue = [...part.words].sort(() => Math.random() - .5);
    setStrikes(part.strikes, part.strikes);

    $card().innerHTML = `
      ${partHeader(part)}
      <div class="feed-status" id="feed-status"></div>
      <div class="feed-word-zone">
        <div class="feed-word" id="feed-word"></div>
      </div>
      <div class="feed-monsters" id="feed-monsters"></div>
      <div id="feed-feedback"></div>
      <div class="part-actions"><button class="btn-main hidden" id="btn-feed-next">ממשיכים ⬅</button></div>
    `;

    const row = document.getElementById('feed-monsters');
    part.eaters.forEach((e, fi) => {
      const m = document.createElement('button');
      m.className = 'feed-monster';
      m.dataset.fam = fi;
      m.innerHTML = `
        ${ASSETS.monsters
          ? `<img class="monster-img" src="${MONSTER_IMAGES[fi % MONSTER_IMAGES.length]}" alt="">`
          : MONSTER_SVG(e.color, e.dark, fi % 3)}
        <span class="feed-family">${e.family}</span>
        <span class="fed-count" id="fed-count-${fi}"></span>`;
      m.onclick = () => feed(fi, m);
      row.appendChild(m);
    });

    document.getElementById('btn-feed-next').onclick = nextPart;
    refreshNikud();
    showWord();
  }

  function showWord() {
    const status = document.getElementById('feed-status');
    status.textContent = `מילה ${idx + 1} מתוך ${queue.length}`;
    const wEl = document.getElementById('feed-word');
    wEl.textContent = NK(queue[idx].w);
    wEl.classList.remove('word-in');
    void wEl.offsetWidth;
    wEl.classList.add('word-in');
  }

  function feed(fi, monsterEl) {
    if (busy) return;
    const cur = queue[idx];
    if (fi === cur.fam) {
      busy = true;
      /* המילה עפה אל פה המפלצת */
      const wEl = document.getElementById('feed-word');
      const from = wEl.getBoundingClientRect();
      const to = monsterEl.getBoundingClientRect();
      const clone = wEl.cloneNode(true);
      clone.className = 'feed-word flying';
      clone.style.left = from.left + 'px';
      clone.style.top = from.top + 'px';
      document.body.appendChild(clone);
      wEl.style.visibility = 'hidden';
      requestAnimationFrame(() => {
        clone.style.transform =
          `translate(${to.left + to.width / 2 - from.left - from.width / 2}px, ${to.top + to.height * .55 - from.top}px) scale(.15)`;
        clone.style.opacity = '.4';
      });
      setTimeout(() => {
        clone.remove();
        wEl.style.visibility = '';
        Sound.play('chomp');
        monsterEl.classList.add('eating');
        setTimeout(() => monsterEl.classList.remove('eating'), 550);
        sparkleBurst(monsterEl, 4);
        addCoins(10, monsterEl);
        const counter = document.getElementById(`fed-count-${fi}`);
        counter.textContent = '🍪'.repeat((counter.textContent.length / 2 | 0) + 1);
        idx++;
        if (idx >= queue.length) {
          document.querySelectorAll('.feed-monster').forEach(m => m.classList.add('happy'));
          Sound.play('correct');
          confettiBurst(50);
          document.getElementById('feed-word').textContent = '😋';
          document.getElementById('feed-status').textContent = 'כולן שבעות!';
          document.getElementById('feed-feedback').innerHTML =
            `<div class="feedback-box good">🏆 ${part.doneFeedback}</div>`;
          document.getElementById('btn-feed-next').classList.remove('hidden');
        } else {
          showWord();
          busy = false;
        }
      }, 480);
    } else {
      monsterEl.classList.add('spit');
      setTimeout(() => monsterEl.classList.remove('spit'), 500);
      Sound.play('wrong');
      setStrikes(strikesLeft - 1, part.strikes);
      toast(part.fbBad);
      if (strikesLeft <= 0) {
        busy = true;
        setTimeout(() => { toast(part.restartMsg, 3200); build(); animateGuideBubble(); }, 1000);
      }
    }
  }

  build();
}

/* ---------- קריאה וסימון משפט מרכזי ---------- */
function renderReading(part) {
  $card().innerHTML = `
    ${partHeader(part)}
    ${part.sceneSvg || part.sceneImage ? `<div class="hunt-scene${part.sceneSize === 'small' ? ' small' : ''}" id="read-scene"></div>` : ''}
    <div id="read-paras"></div>
    <p class="read-hint">💡 לחיצה על משפט מסמנת אותו. אפשר לשנות בחירה בכל רגע</p>
    <div class="part-actions">
      <button class="btn-main" id="btn-read-next" disabled>סיימתי לקרוא ולסמן ⬅</button>
    </div>
  `;
  mountScene(document.getElementById('read-scene'), part);

  const wrap = document.getElementById('read-paras');
  const marked = new Array(part.paragraphs.length).fill(false);
  const single = part.paragraphs.length === 1;

  part.paragraphs.forEach((sentences, pi) => {
    const p = document.createElement('div');
    p.className = 'read-para' + (part.shortMode ? ' short' : '');
    if (!single) p.innerHTML = `<span class="para-num">פסקה ${pi + 1}</span>`;
    sentences.forEach(s => {
      const span = document.createElement('span');
      span.className = 'sentence';
      span.textContent = s + ' ';
      span.onclick = () => {
        p.querySelectorAll('.sentence').forEach(x => x.classList.remove('marked'));
        span.classList.add('marked');
        Sound.play('click');
        if (!marked[pi]) { marked[pi] = true; addCoins(5, span); }
        p.classList.add('marked');
        if (marked.every(Boolean)) document.getElementById('btn-read-next').disabled = false;
      };
      p.appendChild(span);
    });
    wrap.appendChild(p);
  });

  document.getElementById('btn-read-next').onclick = () => {
    toast(single ? 'יפה מאוד! סימנתם את המשפט המרכזי 🌟' : 'איזו קריאה! סימנתם משפט מרכזי בכל פסקה 🌟');
    nextPart();
  };
}

/* ---------- רב ברירה (הבנה / כותרות / טעות בכוונה) ---------- */
function renderMcqSet(part) {
  let qi = 0;
  let firstTry = true;
  setStrikes(part.strikes, part.strikes);

  function renderQuestion() {
    const q = part.questions[qi];
    firstTry = true;

    $card().innerHTML = `
      ${partHeader(part)}
      ${part.questions.length > 1 ? `<div class="q-count">שאלה ${qi + 1} מתוך ${part.questions.length}</div>` : ''}
      <div class="part-kicker">🔎 ${q.label}</div>
      ${q.img ? `<img class="q-img${q.imgSmall ? ' tiny' : ''}" src="${q.img}" alt="" onerror="this.remove()">` : ''}
      <div class="q-text">${q.q}</div>
      ${q.refText ? `<div class="q-ref">📖 ${q.refText}</div>` : ''}
      <div class="q-options chests" id="q-options"></div>
      <div id="q-feedback"></div>
      <div class="part-actions"><button class="btn-main hidden" id="btn-q-next"></button></div>
    `;

    refreshNikud();
    const letters = ['א', 'ב', 'ג', 'ד'];
    const optsEl = document.getElementById('q-options');
    /* ערבוב סדר התשובות — שהתשובה הנכונה לא תהיה תמיד באותו מקום */
    const order = q.options.map((_, i) => i).sort(() => Math.random() - .5);
    order.forEach((oi, pos) => {
      const btn = document.createElement('button');
      btn.className = 'q-opt chest';
      btn.innerHTML = `
        <span class="chest-box">${CHEST_CLOSED_SVG(letters[pos])}</span>
        <span class="chest-label">${q.options[oi]}</span>`;
      btn.onclick = () => answer(btn, oi);
      optsEl.appendChild(btn);
    });

    function answer(btn, oi) {
      if (oi === q.correct) {
        btn.classList.add('correct', 'opened');
        btn.querySelector('.chest-box').innerHTML = CHEST_OPEN_SVG;
        optsEl.querySelectorAll('.q-opt').forEach(b => b.disabled = true);
        Sound.play('correct');
        sparkleBurst(btn, 8);
        addCoins(firstTry ? 10 : 5, btn);
        document.getElementById('q-feedback').innerHTML =
          `<div class="feedback-box good">✅ ${q.fbGood}</div>`;
        const next = document.getElementById('btn-q-next');
        next.classList.remove('hidden');
        const last = qi === part.questions.length - 1;
        next.textContent = last ? 'סיימנו את הפעילות! ⬅' : 'לשאלה הבאה ⬅';
        next.onclick = () => {
          if (last) nextPart();
          else { qi++; renderQuestion(); }
        };
      } else {
        btn.classList.add('wrong');
        btn.disabled = true;
        firstTry = false;
        Sound.play('wrong');
        setStrikes(strikesLeft - 1, part.strikes);
        document.getElementById('q-feedback').innerHTML =
          `<div class="feedback-box bad">🤔 ${q.fbBad || part.fbBadDefault}</div>`;
        if (strikesLeft <= 0) {
          setTimeout(() => {
            toast(part.restartMsg, 3200);
            qi = 0;
            setStrikes(part.strikes, part.strikes);
            renderQuestion();
          }, 1200);
        }
      }
    }
  }

  renderQuestion();
}

/* ---------- מיון משפחות מילים (גרירה + הקשה) ---------- */
function renderSortFamilies(part) {
  setStrikes(part.strikes, part.strikes);
  let selectedChip = null;
  let placedCount = 0;

  function build() {
    placedCount = 0;
    selectedChip = null;
    $card().innerHTML = `
      ${partHeader(part)}
      <div class="sort-pool" id="sort-pool"></div>
      <div class="sort-bins" id="sort-bins"></div>
      <div class="part-actions"><button class="btn-main hidden" id="btn-sort-next">ממשיכים ⬅</button></div>
    `;

    const pool = document.getElementById('sort-pool');
    const binsEl = document.getElementById('sort-bins');

    const bins = part.families.map((root, fi) => {
      const bin = document.createElement('div');
      bin.className = 'sort-bin';
      bin.dataset.fam = fi;
      bin.innerHTML = `<div class="sort-bin-root">${root}</div><div class="bin-items"></div>`;
      bin.onclick = () => { if (selectedChip) tryPlace(selectedChip, fi, bin); };
      bin.ondragover = e => { e.preventDefault(); bin.classList.add('over'); };
      bin.ondragleave = () => bin.classList.remove('over');
      bin.ondrop = e => {
        e.preventDefault();
        bin.classList.remove('over');
        const w = e.dataTransfer.getData('text/plain');
        const chip = pool.querySelector(`[data-w="${w}"]`);
        if (chip) tryPlace(chip, fi, bin);
      };
      binsEl.appendChild(bin);
      return bin;
    });

    [...part.words].sort(() => Math.random() - .5).forEach(({ w, fam }) => {
      const chip = document.createElement('button');
      chip.className = 'sort-chip';
      chip.textContent = w;
      chip.dataset.w = w;
      chip.dataset.fam = fam;
      chip.draggable = true;
      chip.onclick = () => {
        if (selectedChip === chip) { chip.classList.remove('selected'); selectedChip = null; armBins(false); return; }
        pool.querySelectorAll('.sort-chip').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        selectedChip = chip;
        armBins(true);
      };
      chip.ondragstart = e => {
        e.dataTransfer.setData('text/plain', w);
        chip.classList.add('dragging');
      };
      chip.ondragend = () => chip.classList.remove('dragging');
      pool.appendChild(chip);
    });

    function armBins(on) { bins.forEach(b => b.classList.toggle('armed', on)); }

    function tryPlace(chip, fi, bin) {
      const correctFam = +chip.dataset.fam;
      if (fi === correctFam) {
        const placed = document.createElement('span');
        placed.className = 'placed';
        placed.textContent = chip.dataset.w;
        bin.querySelector('.bin-items').appendChild(placed);
        Sound.play('pop');
        addCoins(5, bin);
        chip.remove();
        selectedChip = null;
        armBins(false);
        placedCount++;
        if (placedCount === part.words.length) {
          toast('כל המילים מצאו את המשפחה שלהן! 🎉');
          document.getElementById('btn-sort-next').classList.remove('hidden');
        }
      } else {
        bin.classList.add('flash-bad');
        setTimeout(() => bin.classList.remove('flash-bad'), 500);
        chip.classList.remove('selected');
        selectedChip = null;
        armBins(false);
        Sound.play('wrong');
        setStrikes(strikesLeft - 1, part.strikes);
        toast(part.fbBad);
        if (strikesLeft <= 0) {
          setTimeout(() => {
            toast(part.restartMsg, 3200);
            setStrikes(part.strikes, part.strikes);
            build();
          }, 1000);
        }
      }
    }

    document.getElementById('btn-sort-next').onclick = nextPart;
  }

  build();
}

/* ---------- אנקדוטה ---------- */
function renderAnecdote(part) {
  $card().innerHTML = `
    ${partHeader(part)}
    <div class="anecdote-card">
      <span class="bulb">💡</span>
      <div class="anecdote-words">${part.words.map(w => `<span>${w}</span>`).join('')}</div>
      <p class="anecdote-text">${part.text.replace(/\n/g, '<br>')}</p>
      <div class="anecdote-tip">${part.tip}</div>
    </div>
    <div class="part-actions"><button class="btn-main" id="btn-anec-next">איזה יופי! ממשיכים ⬅</button></div>
  `;
  document.getElementById('btn-anec-next').onclick = nextPart;
}

/* ---------- סיכום ---------- */
function renderSummary(part) {
  $card().innerHTML = `
    ${partHeader(part)}
    <div class="summary-checks">
      ${part.checks.map(c => `<div class="summary-check">✅ <span>${c}</span></div>`).join('')}
    </div>
    <div class="word-input-wrap">
      <label for="journey-word">✨ ${part.wordPrompt}</label>
      <input class="ob-input" id="journey-word" maxlength="20" placeholder="כתבו כאן מילה...">
      <div class="part-actions"><button class="btn-main" id="btn-finish-unit">מסיימים את היחידה! 🏁</button></div>
    </div>
  `;
  document.getElementById('btn-finish-unit').onclick = () => {
    const word = document.getElementById('journey-word').value;
    saveJourneyWord(currentUnit.id, word);
    partIndex++;
    renderRewards();
  };
}

/* ---------- מסך פרסים ---------- */
function renderRewards() {
  stopPartActivities();
  updateProgress();
  const item = JOURNEY_ITEMS[currentUnit.id];
  const alreadyDone = isUnitDone(currentUnit.id);
  const stageBefore = creatureStage(contentUnitsDone());
  completeUnit(currentUnit.id);
  const stageAfter = creatureStage(contentUnitsDone());
  const evolved = stageAfter > stageBefore;
  if (!alreadyDone) { S.coins += 50; saveState(); }
  updateCoinDisplays();
  Sound.play('fanfare');
  confettiBurst(100);
  setStrikes(0, null);

  partHeader({
    kicker: 'סיום היחידה 🏁',
    title: currentUnit.title,
    guide: 'התחלת ממשפט אחד וסיימת פסקה שלמה. אני גאה בך! נתראה בתחנה הבאה 🦉',
  });
  $card().innerHTML = `
    <div class="reward-stage">
      <h2 class="part-title" style="text-align:center">🎉 כל הכבוד, ${S.name}!</h2>
      <p>סיימת את יחידה ${currentUnit.id}: ${currentUnit.title}</p>
      <div class="reward-item-circle">${item.emoji}</div>
      <p><strong>${item.name}</strong> נוסף לספר המסע שלך!</p>
      ${evolved ? `
      <div class="evolution-box">
        <div class="evolution-title">✨ רגע... משהו קורה! ✨</div>
        <div class="evolution-pair">
          <div class="avatar-box evo-old">${CREATURE_SVG(S.avatar.color, stageBefore)}</div>
          <div class="evo-arrow">⬅</div>
          <div class="avatar-box evo-new">${CREATURE_SVG(S.avatar.color, stageAfter)}</div>
        </div>
        <div class="evolution-name">היצור שלך התפתח: <strong>${CREATURE_STAGES[stageAfter].name}</strong>!</div>
      </div>` : ''}
      <div class="reward-coins">${alreadyDone ? 'היחידה הושלמה שוב, איזה תרגול!' : '‏+50 🪙 בונוס השלמת יחידה'}</div>
      <div class="part-actions"><button class="btn-main" id="btn-back-map">חוזרים למפה 🗺️</button></div>
    </div>
  `;
  refreshNikud();
  animateGuideBubble();
  fitUnitCard();
  document.getElementById('btn-back-map').onclick = () => showMap(true);
}
