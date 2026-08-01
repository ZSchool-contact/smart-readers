# יחידה 8 "הפרויקט שלי" — פרומפטים לכל תמונות היחידה

מסמך עבודה ל-Codex: כל התמונות שיחידת הסיום צריכה, עם נתיב שמירה מדויק, יחס, הקשר שימוש ופרומפט.

## 📁 איפה לשמור את התמונות
**כל התמונות נשמרות בתיקייה:** `courses/hebrew/app/assets/img/`
(נתיב מלא במחשב: `C:\Users\shani\Documents\course creator\courses\hebrew\app\assets\img\`)

שם הקובץ חייב להיות **בדיוק** כמו שמצוין בשדה "קובץ" — האפליקציה כבר מפנה לנתיבים האלה,
וברגע שהקובץ קיים הוא מחליף אוטומטית את ה-placeholder המצויר. קובץ חסר = כלום לא נשבר.

**עוגן סגנוני מחייב לכל הפרומפטים** (זהה לשאר הקורס):
> cheerful children's game illustration, storybook style, vibrant saturated colors, soft painterly texture, suitable for ages 8-10, no text, high quality digital art

**נושא היחידה:** יחידת הסיום החגיגית! הלומד בוחר אחת משלוש הרפתקאות קריאה:
האי של הסודות (מגלת ארצות) / הרובוט שעל מאדים / הדולפינים החכמים.
האווירה: חגיגה, ניצחון, גאווה — עם קונפטי ותחושת גמר משחק.

---

### תמונה 1 — רקע כרטיס היחידה (חגיגת הסיום)
**קובץ:** `unit8-card-bg.png` | **יחס:** 16:9
**שימוש:** הרקע בתוך כרטיס הלמידה לכל אורך היחידה.
**חשוב:** מרכז רגוע — הטקסטים יושבים מעליו. אווירת גמר חגיגית אך לא עמוסה.
אם אחרי השילוב צריך, מכוונים `cardBgOverlay` ב-`UNITS[8]`.
**פרומפט:**
> Wide 16:9 festive grand-finale background for a children's learning game, soft warm golden sky like a celebration evening, tiny colorful confetti and streamers floating only near the top corners, a hint of a winner's podium and a waving flag silhouette far at the sides, gentle golden bokeh, calm uncluttered empty center, slightly blurred as a background for a learning card, cheerful children's game illustration, storybook style, no text, no characters, high quality digital art

### תמונה 2 — האי של הסודות (מסלול ההרפתקאות)
**קובץ:** `unit8-adventure.png` | **יחס:** 21:9
**שימוש:** איור מעל הרפתקת הקריאה על נועה מגלת הארצות.
**חשוב:** מגלת ארצות ילדה עם כובע הרפתקנים, סירה קשורה לסלע, חוף מוזהב, ופתח מערה מסתורי
שמציץ ממנו זוהר קסום. מסקרן ולא מפחיד!
**פרומפט:**
> A brave girl explorer around 9 years old with an adventurer hat jumping from her small wooden boat onto a golden beach of a mysterious island, a dark cave entrance in the cliff with a soft magical glow peeking from inside, seagulls above, turquoise water, sense of exciting discovery not fear, rounded and adorable with big friendly eyes, cheerful children's game illustration, storybook style, vibrant saturated colors, no text, high quality digital art

### תמונה 3 — הרובוט שעל מאדים (מסלול הטכנולוגיה)
**קובץ:** `unit8-tech.png` | **יחס:** 21:9
**שימוש:** איור מעל הרפתקת הקריאה על הרובוט החוקר.
**חשוב:** רובוט חמוד על שישה גלגלים על אדמת מאדים האדומה, מצלם וקודח, כדור הארץ קטן וכחול
בשמים. עקבות גלגלים באבק.
**פרומפט:**
> An adorable small exploration rover robot with six wheels and big friendly camera eyes rolling across the red rocky surface of Mars, drilling a tiny hole with one arm and photographing with another, wheel tracks in the red dust behind it, planet Earth glowing small and blue in the dark starry sky, red mountains in the distance, curious and cheerful mood, cheerful children's game illustration, storybook style, vibrant saturated colors, no text, high quality digital art

### תמונה 4 — הדולפינים החכמים (מסלול בעלי החיים)
**קובץ:** `unit8-animals.png` | **יחס:** 21:9
**שימוש:** איור מעל הרפתקת הקריאה על הדולפינים.
**חשוב:** שני דולפינים מזנקים מהגלים זה מול זה כאילו הם משוחחים, עם תווי צליל קטנים ביניהם
(השריקות שהן שמות!). שמש, חוף רחוק, התזות מים.
**פרומפט:**
> Two happy dolphins leaping from sparkling blue waves toward each other as if talking, small musical notes and sound ripples floating between them showing their whistle language, splashes of water drops in the sunlight, a distant sandy beach on the horizon, joyful and warm sea atmosphere, rounded and adorable with big friendly eyes, cheerful children's game illustration, storybook style, vibrant saturated colors, no text, high quality digital art

### תמונה 5 — פריט המסע: תעודת קורא עצמאי (מסך הפרס הגדול!)
**קובץ:** `item-8.png` | **יחס:** 1:1, רקע שקוף
**שימוש:** הפריט האחרון של הקורס — הפרס הגדול מכולם (כרגע אימוג'י 🏆). חלק מסדרת `item-0` עד `item-8`.
**פרומפט:**
> Single game collectible item icon: a magnificent golden TROPHY CUP holding a rolled diploma certificate with a red wax seal and ribbon, an open book engraved on the trophy base, radiant golden glow and celebratory sparkles and tiny confetti around it, the most prestigious reward of the whole game, centered, slight 3D depth, transparent background, cheerful children's game illustration style, vibrant colors, storybook shading, no text

---

## מה לא צריך לייצר
- **רקע מסך היחידה (מסביב לכרטיס)** — נשאר רקע העולם הקבוע.
- **מפלצות, רקעי ארקייד ומחבואים** — קיימים ומשותפים (יחידה 8 עושה בהם שימוש כבד:
  קרב המילים, סבב האלופים וסעודת הסיום כולם על נכסים קיימים).
- **תמונות לבחירת המסלול (שלב 2)** — כרטיסי הבחירה בנויים מאימוג'י וטקסט.
- **תמונות לפעילויות הכתיבה (שלבים 4, 8, 9, 10)** — לוחות כתיבה בלי תמונה.
- **אלף הינשוף, רקע המפה, הדרקון** — נכסי עולם משותפים.

## שילוב באפליקציה (למפתחת)
| קובץ | איך משתלב |
|------|-----------|
| `unit8-card-bg.png` | אוטומטי — `cardBg` של `UNITS[8]` |
| `unit8-adventure.png`, `unit8-tech.png`, `unit8-animals.png` | אוטומטי — נופל ל-SVG אם חסר |
| `item-8.png` | אוטומטי! — `JOURNEY_ITEMS` כבר מפנה לקובץ עם נפילה לאימוג'י 🏆 אם חסר |

<!-- flowpad:capsule identity
version: 1
data:
  id: 1ffc3239-5e4a-4ba9-a813-b515d96ebe2f
flowpad:endcapsule identity -->
