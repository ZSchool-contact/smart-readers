# -*- coding: utf-8 -*-
"""ממיר ערכי ניקוד בכתיב חסר לכתיב מלא מנוקד: שומר את אותיות המילה כפי שהיא
כתובה בלי ניקוד, ומעביר את סימני הניקוד בהתאם (חולם חסר -> חולם מלא וכו').
הרצה: python fix_nikud_male.py          -> תצוגה מקדימה
      python fix_nikud_male.py apply     -> כתיבה ל-nikud.js"""
import sys, re, io

sys.stdout.reconfigure(encoding="utf-8")
PATH = r"C:\Users\shani\Documents\course creator\courses\hebrew\app\js\nikud.js"

MARKS = set(chr(c) for c in range(0x05B0, 0x05BD)) | {chr(0x05C1), chr(0x05C2), chr(0x05C7)}
CHIRIK, CHATAF_KAMATZ, KAMATZ, CHOLAM, CHOLAM_VAV, KUBUTZ, DAGESH = (
    '\u05B4', '\u05B3', '\u05B8', '\u05B9', '\u05BA', '\u05BB', '\u05BC')

def tokenize(voc):
    toks = []
    for ch in voc:
        if ch in MARKS:
            toks[-1][1] += ch
        else:
            toks.append([ch, ''])
    return toks

def strip(voc):
    return ''.join(ch for ch in voc if ch not in MARKS)

def to_male(key, voc):
    toks = tokenize(voc)
    out, j = [], 0
    for ch in key:
        if j < len(toks) and toks[j][0] == ch:
            out.append(toks[j]); j += 1
            continue
        if ch == 'י':
            out.append(['י', ''])
        elif ch == 'ו':
            prev = out[-1]
            if prev[0] == 'ו':                      # ו' עיצורית -> מכפילים בלי לגעת בניקוד
                out.append(['ו', ''])
            elif CHOLAM in prev[1] or CHOLAM_VAV in prev[1]:
                prev[1] = prev[1].replace(CHOLAM, '').replace(CHOLAM_VAV, '')
                out.append(['ו', CHOLAM])
            elif KUBUTZ in prev[1]:
                prev[1] = prev[1].replace(KUBUTZ, '')
                out.append(['ו', DAGESH])          # שורוק
            elif CHATAF_KAMATZ in prev[1]:
                prev[1] = prev[1].replace(CHATAF_KAMATZ, '')
                out.append(['ו', CHOLAM])
            elif KAMATZ in prev[1]:                 # קמץ קטן -> חולם מלא
                prev[1] = prev[1].replace(KAMATZ, '')
                out.append(['ו', CHOLAM])
            else:                                   # ו' עיצורית כפולה
                out.append(['ו', ''])
        else:
            raise ValueError(f"אות לא צפויה '{ch}' במילה {key} ({voc})")
    if j != len(toks):
        raise ValueError(f"יישור נכשל: {key} ({voc})")
    return ''.join(l + m for l, m in out)

src = io.open(PATH, encoding="utf-8").read()
pairs = re.findall(r"'([\u05d0-\u05ea]+)':\s*'([^']+)'", src)

fixed, errors = [], []
for key, voc in pairs:
    if strip(voc) == key:
        continue
    try:
        new = to_male(key, voc)
        assert strip(new) == key, f"בדיקת אותיות נכשלה: {key} -> {new}"
        fixed.append((key, voc, new))
    except Exception as e:
        errors.append(str(e))

print(f"תוקנו: {len(fixed)} | שגיאות: {len(errors)}")
for e in errors:
    print("!! ", e)
for k, old, new in fixed:
    print(f"{k}: {old} -> {new}")

if len(sys.argv) > 1 and sys.argv[1] == "apply" and not errors:
    for k, old, new in fixed:
        needle, repl = f"'{k}': '{old}'", f"'{k}': '{new}'"
        assert src.count(needle) == 1, f"מופע לא יחיד: {needle}"
        src = src.replace(needle, repl)
    io.open(PATH, "w", encoding="utf-8", newline="\n").write(src)
    print("נכתב ל-nikud.js ✅")
