# -*- coding: utf-8 -*-
"""E2E כללי ליחידה בקורס קוראים חכמים — עובר את כל השלבים כמו לומד אמיתי.
שימוש: python e2e_unit.py <unit-id>"""
import sys, pathlib, time

sys.stdout.reconfigure(encoding="utf-8")
from playwright.sync_api import sync_playwright

UNIT = int(sys.argv[1]) if len(sys.argv) > 1 else 3
APP = pathlib.Path(r"C:\Users\shani\Documents\course creator\courses\hebrew\app\index.html").as_uri()
errors = []

def on_console(msg):
    if msg.type == "error":
        t = msg.text
        if "ERR_FILE_NOT_FOUND" in t or "Failed to load resource" in t:
            return
        errors.append("console: " + t)

def wait_enabled(page, sel, timeout=15000):
    page.wait_for_function(
        f"() => {{ const b = document.querySelector('{sel}'); return b && !b.disabled && b.offsetParent !== null; }}",
        timeout=timeout)
    page.evaluate(f"document.querySelector('{sel}').click()")

def cur_part(page):
    return page.evaluate("() => partIndex >= 0 && currentUnit ? (currentUnit.parts[partIndex] || {}).type : 'intro'")

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1400, "height": 900})
    page.on("console", on_console)
    page.on("pageerror", lambda e: errors.append("pageerror: " + str(e)))

    page.goto(APP)
    page.wait_for_timeout(800)

    completed = list(range(UNIT))
    page.evaluate("""(completed) => {
      localStorage.setItem('smart-readers-save-v1', JSON.stringify({
        name: 'בודק', world: 'sport',
        avatar: { color: 'blue', hat: null, face: null, pet: null },
        coins: 0, owned: [], items: [], words: [],
        completed, onboarded: true, muted: true,
        nikud: false, nikudTipSeen: true }));
    }""", completed)
    page.reload()
    page.wait_for_timeout(800)

    assert page.evaluate(f"() => typeof UNITS !== 'undefined' && !!UNITS[{UNIT}]"), f"UNITS[{UNIT}] לא הוגדר!"
    assert page.evaluate(f"() => unitStatus({UNIT})") == "open", f"תחנה {UNIT} לא פתוחה!"

    page.evaluate(f"() => startUnit({UNIT})")
    page.wait_for_timeout(400)

    n_obj = page.evaluate("() => document.querySelectorAll('.objectives li').length")
    assert n_obj == 4, f"ציפינו ל-4 יעדים, יש {n_obj}"
    wait_enabled(page, "#btn-start-unit")
    page.wait_for_timeout(300)

    steps_done = []
    for guard in range(40):
        ptype = cur_part(page)
        if ptype is None:
            break
        steps_done.append(ptype)

        if ptype == "word-hunt":
            page.evaluate("""() => {
              const part = currentUnit.parts[partIndex];
              const ok = new Set(part.words.filter(w => w.ok).map(w => w.w));
              document.querySelectorAll('#hunt-words .hunt-word').forEach(b => {
                if (ok.has(denikkudize(b.textContent.trim()))) b.click();
              });
            }""")
            wait_enabled(page, "#btn-hunt-next")

        elif ptype == "sentence-hunt":
            page.evaluate("""() => {
              const part = currentUnit.parts[partIndex];
              const btns = document.querySelectorAll('#sentence-big .sentence-word');
              part.targetIdx.forEach(i => btns[i].click());
            }""")
            wait_enabled(page, "#btn-sh-next")

        elif ptype == "catch-game":
            t0 = time.time()
            while time.time() - t0 < 90:
                done = page.evaluate("""() => {
                  const part = currentUnit.parts[partIndex];
                  const t = new Set(part.targets);
                  document.querySelectorAll('.arcade-item').forEach(el => {
                    const w = el.querySelector('.vessel-word');
                    if (w && t.has(denikkudize(w.textContent.trim())) && !el.classList.contains('caught')) el.click();
                  });
                  const b = document.getElementById('btn-arcade-next');
                  return b && !b.disabled;
                }""")
                if done:
                    break
                page.wait_for_timeout(250)
            wait_enabled(page, "#btn-arcade-next")

        elif ptype == "mole-game":
            t0 = time.time()
            while time.time() - t0 < 90:
                done = page.evaluate("""() => {
                  const part = currentUnit.parts[partIndex];
                  const t = new Set(part.targets);
                  document.querySelectorAll('.mole-monster.up').forEach(el => {
                    const w = el.querySelector('.vessel-word');
                    if (w && t.has(denikkudize(w.textContent.trim()))) el.click();
                  });
                  const b = document.getElementById('btn-mole-next');
                  return b && !b.disabled;
                }""")
                if done:
                    break
                page.wait_for_timeout(200)
            wait_enabled(page, "#btn-mole-next")

        elif ptype == "reading":
            page.evaluate("""() => {
              document.querySelectorAll('.read-para').forEach(p => p.querySelector('.sentence').click());
            }""")
            wait_enabled(page, "#btn-read-next")

        elif ptype == "mcq-set":
            nq = page.evaluate("() => currentUnit.parts[partIndex].questions.length")
            for _ in range(nq):
                page.wait_for_timeout(250)
                clicked = page.evaluate("""() => {
                  const part = currentUnit.parts[partIndex];
                  const shown = denikkudize(document.querySelector('.q-text').textContent.trim());
                  const q = part.questions.find(x => x.q === shown);
                  if (!q) return 'not-found: ' + shown;
                  const target = q.options[q.correct];
                  for (const opt of document.querySelectorAll('.q-opt')) {
                    if (denikkudize(opt.querySelector('.chest-label').textContent.trim()) === target) { opt.click(); return 'ok'; }
                  }
                  return 'option-not-found';
                }""")
                assert clicked == "ok", f"mcq: {clicked}"
                wait_enabled(page, "#btn-q-next")

        elif ptype == "feed-game":
            nw = page.evaluate("() => currentUnit.parts[partIndex].words.length")
            for _ in range(nw):
                page.evaluate("""() => {
                  const part = currentUnit.parts[partIndex];
                  const w = denikkudize(document.getElementById('feed-word').textContent.trim());
                  const item = part.words.find(x => x.w === w);
                  if (item) document.querySelector(`.feed-monster[data-fam="${item.fam}"]`).click();
                }""")
                page.wait_for_timeout(750)
            wait_enabled(page, "#btn-feed-next")

        elif ptype == "cloze-title":
            nq = page.evaluate("() => currentUnit.parts[partIndex].questions.length")
            for _ in range(nq):
                page.wait_for_timeout(250)
                page.evaluate("""() => {
                  const part = currentUnit.parts[partIndex];
                  const shown = document.querySelector('.part-kicker').textContent;
                  const q = part.questions.find(x => shown.includes(x.label));
                  document.getElementById('cloze-input').value = q.answers[0];
                  document.getElementById('btn-cloze-check').click();
                }""")
                wait_enabled(page, "#btn-cloze-next")

        elif ptype == "family-expand":
            nr = page.evaluate("() => currentUnit.parts[partIndex].rounds.length")
            for ri in range(nr):
                page.wait_for_timeout(250)
                for wi in range(2):
                    page.evaluate(f"""() => {{
                      const part = currentUnit.parts[partIndex];
                      document.getElementById('fx-input').value = part.rounds[{ri}].ideas[{wi}];
                      document.getElementById('btn-fx-add').click();
                    }}""")
                    page.wait_for_timeout(200)
                wait_enabled(page, "#btn-fx-next")

        elif ptype == "anecdote":
            wait_enabled(page, "#btn-anec-next")

        elif ptype == "summary":
            page.fill("#journey-word", "אימון")
            page.evaluate("document.getElementById('btn-finish-unit').click()")
            page.wait_for_timeout(600)
            break

        page.wait_for_timeout(350)

    item_name = page.evaluate(f"() => JOURNEY_ITEMS[{UNIT}].name")
    body = page.evaluate("() => document.body.innerText")
    assert item_name in body, f"פריט המסע '{item_name}' לא הופיע במסך הפרס"
    assert page.evaluate(f"() => S.completed.includes({UNIT})"), f"יחידה {UNIT} לא סומנה כהושלמה"
    page.evaluate("() => document.getElementById('btn-back-map').click()")
    page.wait_for_timeout(500)
    nxt = UNIT + 1
    assert page.evaluate(f"() => unitStatus({nxt})") == "open", f"תחנה {nxt} לא נפתחה"

    browser.close()

print("שלבים שעברו:", " -> ".join(steps_done))
if errors:
    print("שגיאות קונסולה/דף:")
    for e in errors:
        print("  ", e)
    sys.exit(1)
print(f"E2E ליחידה {UNIT} עבר — {len(steps_done)} שלבים + מסך פרס, אפס שגיאות ✅")
