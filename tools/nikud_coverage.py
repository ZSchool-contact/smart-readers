# -*- coding: utf-8 -*-
"""בדיקת כיסוי מילון הניקוד לכל הטקסטים של יחידה. שימוש: python nikud_coverage.py <unit-id>"""
import sys, pathlib
sys.stdout.reconfigure(encoding="utf-8")
from playwright.sync_api import sync_playwright

UNIT = int(sys.argv[1]) if len(sys.argv) > 1 else 3
APP = pathlib.Path(r"C:\Users\shani\Documents\course creator\courses\hebrew\app\index.html").as_uri()

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page()
    pg.goto(APP)
    pg.wait_for_timeout(600)
    missing = pg.evaluate("""(UNIT_ID) => {
      const texts = [];
      const walk = v => {
        if (typeof v === 'string') texts.push(v);
        else if (Array.isArray(v)) v.forEach(walk);
        else if (v && typeof v === 'object') Object.entries(v).forEach(([k, x]) => {
          /* keys = גזעי אימות פנימיים של free-write — לא מוצגים ללומד */
          if (!['sceneImage','sceneSvg','cardBg','img','type','theme','kicker','color','dark','keys'].includes(k)) walk(x);
        });
      };
      walk(UNITS[UNIT_ID]);
      const miss = new Set();
      texts.join(' ').split(/\\s+/).forEach(tok => {
        const m = tok.match(/^[^\\u05d0-\\u05ea]*([\\u05d0-\\u05ea\\u05be]+)[^\\u05d0-\\u05ea]*$/);
        if (!m) return;
        const w = m[1];
        if (w.includes('\\u05be')) return;               // כתיבי שורש כמו ש־מ־ע
        if (w.length < 2) return;
        if (!NIKUD_WORDS[w]) miss.add(w);
      });
      return [...miss];
    }""", UNIT)
    b.close()

if missing:
    print(f"חסרות במילון ({len(missing)}):", ", ".join(missing))
else:
    print(f"כל מילות יחידה {UNIT} מכוסות במילון הניקוד ✅")
