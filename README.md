# קוראים חכמים

קורס דיגיטלי ממושחק לשיפור הבנת הנקרא בעברית, לתלמידי כיתות ג׳ ו־ד׳.
עולם משחק שלם בהשראת Reading Eggs ו־Matific: מפת מסע עם תחנות, דרקון שגדל עם הלומד,
חנות שדרוגים, ספר מסע, ומשחקוני ארקייד עם מפלצות שמלמדים משפחות מילים והבנת הנקרא.

**סטטוס: הקורס שלם.** כל 8 יחידות התוכן בנויות, מאוירות במלואן ובדוקות E2E,
כולל חגיגת סיום. פרטים מלאים ב-[PROJECT-STATUS.md](PROJECT-STATUS.md).

## קישורים חיים

| מה | איפה |
|-----|------|
| המשחק באוויר | https://zschool-contact.github.io/smart-readers/ |
| ריפו | https://github.com/ZSchool-contact/smart-readers (כל push ל-main מתפרסם אוטומטית ל-GitHub Pages) |
| הרצה מקומית | פותחים את `app/index.html` בדפדפן — אין התקנות, אין שרת |

## מפת התיקיות

```
app/                    האפליקציה עצמה — מה שמתפרסם ורץ אצל הלומדים
  index.html            נקודת הכניסה של המשחק
  css/style.css         כל העיצוב
  js/data.js            כל תוכן היחידות (UNITS 1-8), מפה, חנות, דרקון, סצנות SVG
  js/engine.js          מנוע 12 סוגי המשחקונים + כוח הדרקון + חגיגת הסיום
  js/world.js           מפה, הרשמה, חנות, ספר מסע, פרופיל
  js/state.js           שמירת התקדמות (localStorage, מפתח smart-readers-save-v1)
  js/nikud.js           גלגל ההצלה: מילון ניקוד בכתיב מלא (~1,600 מילים)
  js/sound.js           אפקטים קוליים (WebAudio, בלי קבצים)
  assets/img/           כל איורי ה-AI (תמונה חסרה = fallback מצויר, כלום לא נשבר)

tools/                  סקריפטי בדיקה (uv run --with playwright python tools/...)
  e2e_unit.py <id>      עובר יחידה שלמה כמו לומד — הבדיקה המרכזית
  nikud_coverage.py <id>  כל מילות היחידה קיימות במילון הניקוד
  nikud_mismatch.py     אימות כתיב מלא (חייב להחזיר 0)

image-prompts/          פרומפטים לכל איורי ה-AI (יחידות 2-8, דרקון, פרימיום, חנות, מפה)
source-materials/       קובצי המקור: docx של הסילבוס והיחידות + style-anchor.png

CLAUDE.md               עקרונות הקורס והחלטות עיצוב מחייבות — לקרוא לפני כל שינוי
PROJECT-STATUS.md       סטטוס מלא: מה נעשה, איך, מלכודות שנלמדו וצעדים פתוחים
syllabus.md             סילבוס 9 היחידות המקורי
media-redesign-spec.md  אפיון עתידי: וידאו ואמביינט (פאזה שטרם בוצעה)
index.html              הפניה בלבד (redirect אל app/) — נחוץ ל-GitHub Pages, לא לגעת
```

## מה חשוב לדעת לקראת פריסה

- **שמירת התקדמות היא מקומית לדפדפן** (localStorage). מעבר מכשיר = התחלה מחדש.
  שדרוג לשמירה בענן (Supabase) מוגדר כצעד פתוח — ראו PROJECT-STATUS.
- **חיבור למערכת הלמידה (campus.z-school.co.il)**: המדריך המלא עם כל המלכודות נמצא
  בשורש פרויקט העל: `../../PUBLISHING-TO-TEACHPAL.md` (iframe, postMessage, תשלום).
- **האפליקציה עצמאית לחלוטין** — קובץ HTML אחד + JS/CSS/תמונות, בלי תלות חיצונית
  מלבד גופני Google ו-Lucide מ-CDN. אפשר לארח בכל שרת סטטי.
- **בדיקה לפני כל פרסום**: `uv run --with playwright python tools/e2e_unit.py 1` (או כל יחידה).
  לפני שינויי תוכן, לקרוא את סעיף "איך בונים יחידה" ב-PROJECT-STATUS.

---
פרויקט של זד־סקול · נבנה עם Claude Code

<!-- flowpad:capsule identity
version: 1
data:
  id: 3e2fec7c-52c5-4126-9473-4f65a942868f
flowpad:endcapsule identity -->
