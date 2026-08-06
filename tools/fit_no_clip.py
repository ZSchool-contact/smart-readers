# -*- coding: utf-8 -*-
"""בדיקת התאמה למסך: אף שלב לא נחתך, וכפתור ההמשך תמיד נגיש ללומד.

הבאג שהוליד את הסקריפט (6.8.26, פידבק מהקמפוס): על מסכים נמוכים כפתור
"לשאלה הבאה" נעלם מתחת לקצה המסך בלי סרגל גלילה, וילדים לא ידעו איך ממשיכים.
הסיבה: max-height על ‎.unit-layout גרם לדפדפן לקצץ את תחתית הכרטיס ולדווח
גובה מקוצץ, כך ש-fitUnitCard() חשב שהכל נכנס ולא הקטין.

ה-E2E הרגיל רץ ב-1400x900 — גובה שבו הכל נכנס ממילא, ולכן לא תפס את זה.
כאן בודקים דווקא מסכים נמוכים.

שימוש: uv run --with playwright python tools/fit_no_clip.py
"""
import sys, pathlib

sys.stdout.reconfigure(encoding="utf-8")
from playwright.sync_api import sync_playwright

APP = (pathlib.Path(__file__).resolve().parent.parent / "app" / "index.html").as_uri()
HEIGHTS = [900, 780, 700, 620, 540, 460, 380]   # בדיקת כפתור ההמשך — בכל הגבהים
SCAN_HEIGHTS = [900, 700, 540]                  # סריקת כל השלבים — מדגם (איטית)

# רינדור שלב ומדידת חריגה מהשטח הנראה
MEASURE = """
async ([unitId, partIdx, nikud]) => {
  document.body.classList.toggle('nikud-on', !!nikud);
  startUnit(unitId);
  partIndex = partIdx - 1;
  nextPart();
  await new Promise(r => setTimeout(r, 260));
  const stage = document.querySelector('.unit-stage');
  const layout = document.getElementById('unit-layout');
  const sr = stage.getBoundingClientRect();
  const lr = layout.getBoundingClientRect();
  return {
    type: currentUnit.parts[partIdx].type,
    overflow: Math.round(lr.bottom - sr.bottom),
    canScroll: stage.scrollHeight > stage.clientHeight + 2,
  };
}
"""

# תשובה נכונה בשאלת רב-ברירה, ואז: האם הפידבק והכפתור בתוך המסך?
ANSWER_MCQ = """
async ([unitId, partIdx]) => {
  startUnit(unitId);
  partIndex = partIdx - 1;
  nextPart();
  await new Promise(r => setTimeout(r, 450));
  const q = UNITS[unitId].parts[partIdx].questions[0];
  const correct = q.options[q.correct].trim();
  [...document.querySelectorAll('#q-options .q-opt')]
    .find(b => b.querySelector('.chest-label').textContent.trim() === correct).click();
  await new Promise(r => setTimeout(r, 1400));
  const stage = document.querySelector('.unit-stage');
  const sr = stage.getBoundingClientRect();
  const inView = el => {
    const r = el.getBoundingClientRect();
    return r.height > 0 && r.top >= sr.top - 1 && r.bottom <= sr.bottom + 1
           && r.bottom <= innerHeight + 1;
  };
  return {
    nextVisible: inView(document.getElementById('btn-q-next')),
    feedbackVisible: inView(document.querySelector('#q-feedback .feedback-box')),
  };
}
"""

def main():
    failures = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for h in HEIGHTS:
            page = browser.new_page(viewport={"width": 1400, "height": h})
            js_errors = []
            page.on("pageerror", lambda e: js_errors.append(str(e)))
            page.goto(APP)
            page.wait_for_function(
                "() => typeof startUnit === 'function' && Object.keys(UNITS).length")
            units = page.evaluate("() => Object.entries(UNITS).map(([k,u]) => [k, u.parts.length])")

            clipped = 0
            scanned = 0
            if h in SCAN_HEIGHTS:
                for nikud in (False, True):
                    for uid, count in units:
                        for pi in range(count):
                            scanned += 1
                            r = page.evaluate(MEASURE, [uid, pi, nikud])
                            # חריגה מותרת רק אם אפשר לגלול אליה
                            if r["overflow"] > 2 and not r["canScroll"]:
                                clipped += 1
                                failures.append(
                                    f"h={h} nikud={int(nikud)} unit={uid} part={pi} ({r['type']}) "
                                    f"נחתך ב-{r['overflow']}px בלי גלילה")

            # שאלת רב-ברירה: הכפתור והפידבק חייבים להיות מול העיניים
            mcq = page.evaluate(ANSWER_MCQ, ["2", 7])
            if not mcq["nextVisible"]:
                failures.append(f"h={h} כפתור 'לשאלה הבאה' לא נראה אחרי תשובה נכונה")
            if not mcq["feedbackVisible"]:
                failures.append(f"h={h} הפידבק לא נראה אחרי תשובה נכונה")
            if js_errors:
                failures.append(f"h={h} שגיאות JS: {js_errors}")

            print(f"h={h:4}  {scanned:3} שלבים נסרקו  |  נחתכו: {clipped}  |  "
                  f"כפתור המשך: {'✓' if mcq['nextVisible'] else '✗'}  "
                  f"פידבק: {'✓' if mcq['feedbackVisible'] else '✗'}")
            page.close()
        browser.close()

    print()
    if failures:
        for f in failures[:25]:
            print("  ✗", f)
        if len(failures) > 25:
            print(f"  ... ועוד {len(failures) - 25}")
        print(f"\nנכשל: {len(failures)} בעיות")
        sys.exit(1)
    print("עבר: שום שלב לא נחתך, וכפתור ההמשך נגיש בכל הגבהים")

main()
