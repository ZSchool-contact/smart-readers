# -*- coding: utf-8 -*-
"""מוצא מילות מילון שהצורה המנוקדת שלהן משנה את האותיות (כתיב חסר מול מלא)."""
import sys, pathlib
sys.stdout.reconfigure(encoding="utf-8")
from playwright.sync_api import sync_playwright

APP = pathlib.Path(r"C:\Users\shani\Documents\course creator\courses\hebrew\app\index.html").as_uri()

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page()
    pg.goto(APP)
    pg.wait_for_timeout(600)
    pairs = pg.evaluate("""() =>
      Object.entries(NIKUD_WORDS)
        .filter(([k, v]) => denikkudize(v) !== k)
        .map(([k, v]) => k + ' => ' + v)
    """)
    b.close()

print(f"אי-התאמות: {len(pairs)}")
for x in pairs:
    print(x)
