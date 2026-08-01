# יחידה 6 "חלל ומסתורין" — פרומפטים לכל תמונות היחידה

מסמך עבודה ל-Codex: כל התמונות שיחידה 6 צריכה, עם נתיב שמירה מדויק, יחס, הקשר שימוש ופרומפט.

## 📁 איפה לשמור את התמונות
**כל התמונות נשמרות בתיקייה:** `courses/hebrew/app/assets/img/`
(נתיב מלא במחשב: `C:\Users\shani\Documents\course creator\courses\hebrew\app\assets\img\`)

שם הקובץ חייב להיות **בדיוק** כמו שמצוין בשדה "קובץ" של כל תמונה — האפליקציה כבר מפנה
לנתיבים האלה, וברגע שהקובץ קיים הוא מחליף אוטומטית את ה-placeholder המצויר (SVG).
אם קובץ חסר, שום דבר לא נשבר. גרסאות מקור לפני חיתוך שומרים ב-`app/assets/img/raw/`.

**עוגן סגנוני מחייב לכל הפרומפטים** (זהה לשאר הקורס):
> cheerful children's game illustration, storybook style, vibrant saturated colors, soft painterly texture, suitable for ages 8-10, no text, high quality digital art

**חשוב לעקביות:** מומלץ לייצר קודם את תמונה 0 (גיליון הדמויות), ואז לצרף אותה כרפרנס
לכל שאר התמונות — כך הילדים והאסטרונאוט ייראו אותו דבר בכל הסצנות.

**נושא היחידה:** חלל ומסתורין — שמי לילה, ירח, חלליות, טלסקופים וחוקרים סקרנים.
האווירה: קסם ומסתורין מזמין, לא מפחיד! שמי לילה בכחול עמוק וחם, כוכבים זוהרים, הרבה פליאה.

---

### תמונה 0 — גיליון דמויות היחידה (רפרנס לכל השאר)
**קובץ:** `unit6-characters-ref.png` (לא משולב באפליקציה — משמש רפרנס בלבד) | **יחס:** 16:9
**שימוש:** דף דמויות אחיד: ילד אסטרונאוט, ילדה חוקרת עם טלסקופ, ומפלצת אסטרונאוט קטנה. מצרפים כרפרנס לשאר.
**פרומפט:**
> Character design sheet for a children's reading game, three cute characters side by side on white background: 1) a brave kid astronaut around 9 years old in a puffy white spacesuit with a clear helmet showing his happy face and brown hair, 2) a curious girl around 8 years old with a purple hoodie and a small ponytail, holding a shiny brass telescope, eyes full of wonder, 3) a small round green monster wearing a tiny astronaut helmet with one big friendly eye, floating happily. All rounded and adorable, NOT realistic, cheerful children's game illustration, storybook style, vibrant saturated colors, soft painterly texture, no text, high quality digital art

### תמונה 1 — רקע כרטיס היחידה (שמי חלל קסומים)
**קובץ:** `unit6-card-bg.png` | **יחס:** 16:9
**שימוש:** הרקע בתוך כרטיס הלמידה לכל אורך היחידה.
**חשוב:** מרכז רגוע — הטקסטים יושבים מעליו. שכבת ההבהרה כאן היא ברירת המחדל (58%),
אז מותר לרקע להיות כהה ועשיר; אם אחרי השילוב הוא נראה דהוי מדי, מכוונים `cardBgOverlay` ב-`UNITS[6]` ל-‎0.4.
**פרומפט:**
> Wide 16:9 magical night-space background for a learning screen in a children's game, deep warm indigo sky, a soft glowing crescent moon in one upper corner and a tiny cute rocket with a sparkling trail in the other, gentle scattered stars and faint pastel nebula clouds only near the edges, calm uncluttered empty center, slightly blurred as a background for a learning card, dreamy and inviting not scary, cheerful children's game illustration, storybook style, no text, no characters, high quality digital art

### תמונה 2 — פנורמת החלל (שלב 1 · ההטרמה)
**קובץ:** `unit6-priming.png` | **יחס:** 21:9
**שימוש:** תמונת ציד המילים "מה אתם כבר יודעים על החלל?". הלומדים לוחצים על מילים שמופיעות בתמונה.
**חשוב:** חייבים להופיע ברור: **חללית, ירח, כוכבים, אסטרונאוט ושמש** (חמש מילות המטרה).
אסור שיופיעו: אוטובוס, ים או מטרייה (אלו המסיחים!).
**פרומפט:**
> A wide panoramic view of friendly outer space for kids: a cute white-and-red rocket ship flying with a sparkle trail, a big glowing cratered moon, many bright twinkling stars, a smiling kid astronaut in a white spacesuit floating on a tether waving hello, and a warm golden sun in the far corner, a ringed orange planet in the background, deep blue sky full of wonder, everything rounded and adorable, cheerful children's game illustration, storybook style, vibrant saturated colors, no text, high quality digital art

### תמונה 3 — שרשרת הכוכבים (שלב 2 · המשפט הראשון)
**קובץ:** `unit6-stars.png` | **יחס:** 21:9
**שימוש:** איור מעל המשפט "בלילה ראינו כוכב אחד זוהר, סביבו זהרו עוד כוכבים קטנים, והזוהר שלהם מילא את השמים." (משפחת ז־ה־ר)
**חשוב:** כוכב אחד גדול וזוהר במרכז, סביבו כוכבים קטנים, ושרשרת עדינה של כוכביות נמתחת לרוחב השמים. שני ילדים מביטים מלמטה בפליאה.
**פרומפט:**
> Two children standing on a grassy hill at night looking up amazed at the sky: one huge glowing golden star in the center, smaller twinkling stars scattered around it, and a delicate chain of tiny stars stretching across the whole sky like a sparkling necklace, deep warm blue night, fireflies near the grass, sense of wonder and magic, characters rounded and adorable with big friendly eyes, cheerful children's game illustration, storybook style, vibrant saturated colors, no text, high quality digital art

### תמונה 4 — הירח השכן (שלב 4 · הקטע הקצר)
**קובץ:** `unit6-moon.png` | **יחס:** 21:9
**שימוש:** איור מעל הקטע "הירח, השכן שלנו" — ירח ענק מלא הרים ובורות, עם עקבות אסטרונאוטים.
**חשוב:** שלושת פרטי הקטע חייבים להופיע: הרים על הירח, בורות (מכתשים) עמוקים, ועקבות נעליים של אסטרונאוט. נחמד להוסיף דגל קטן וכדור הארץ קטן ברקע.
**פרומפט:**
> A close view of the moon's surface for kids: rounded gray-cream moon mountains, deep bowl-shaped craters, a trail of astronaut boot footprints leading to a small cheerful flag, planet Earth glowing small and blue in the starry sky above, soft moonlight, peaceful and magical atmosphere, cheerful children's game illustration, storybook style, vibrant saturated colors, no text, no characters, high quality digital art

### תמונה 5 — מפלצת על הירח (שלב 5 · שאלות הקטע)
**קובץ:** `unit6-moon-closeup.png` | **יחס:** 21:9
**שימוש:** תמונת השאלות על קטע הירח. שונה מתמונת הקטע עצמו.
**פרומפט:**
> A small round green monster wearing a tiny astronaut helmet standing proudly on the cratered moon surface next to astronaut footprints, holding a little flag, planet Earth small and blue in the starry background, stars twinkling, rounded and adorable with one big friendly eye, cheerful children's game illustration, storybook style, vibrant saturated colors, no text, high quality digital art

### תמונה 6 — מסע אל החלל (שלב 7 · הפסקה הגדולה)
**קובץ:** `unit6-space-journey.png` | **יחס:** 21:9
**שימוש:** איור מעל הפסקה הגדולה "מסע אל החלל" — וגם הרקע שדרכו עונים על הכותרות.
**חשוב:** שלוש סצנות קטנות בתמונה אחת: חללית ממריאה מכדור הארץ, אסטרונאוט מרחף בחלל, וילדה חוקרת מביטה בטלסקופ. זו תמונת "מסע" — תחושת תנועה מכדור הארץ אל הכוכבים.
**פרומפט:**
> A wide cheerful triptych-style space journey scene in one image: on one side a cute rocket launching from a small blue planet Earth with a sparkling trail, in the middle a happy kid astronaut in a white spacesuit floating among colorful planets and stars, on the other side a curious girl with a purple hoodie looking through a big brass telescope under the night sky, tiny stars connecting all three parts like a path, sense of adventure and discovery, all characters rounded and adorable with big friendly eyes, cheerful children's game illustration, storybook style, vibrant saturated colors, no text, high quality digital art

### תמונה 7 — הטלסקופ הגדול (שלב 10 · שאלת החשיבה הגדולה)
**קובץ:** `unit6-telescope.png` | **יחס:** 21:9
**שימוש:** תמונת שאלת ההסקה "מה לדעתכם החוקרים מחפשים בחלל?".
**פרומפט:**
> A child researcher and a small green monster with an astronaut helmet looking together through a large friendly observatory telescope pointed at a deep starry sky full of mysteries: a glowing comet, a ringed planet and a faint spiral galaxy, big question-mark-shaped constellation subtly formed by tiny stars, warm cozy observatory dome interior, sense of curiosity and wonder, characters rounded and adorable, cheerful children's game illustration, storybook style, vibrant saturated colors, no text, high quality digital art

### תמונה 8 — פריט המסע: מצפן (מסך הפרס)
**קובץ:** `item-6.png` | **יחס:** 1:1, רקע שקוף
**שימוש:** הפריט שנאסף בסוף היחידה לספר המסע (כרגע אימוג'י 🧭). חלק מסדרת `item-0` עד `item-8`.
**פרומפט:**
> Single game collectible item icon: a magical explorer's COMPASS with a golden case and a deep midnight-blue face, the needle shaped like a tiny glowing star pointing toward a small engraved constellation, wisps of stardust swirling around it, centered, slight 3D depth, soft warm glow around the item, transparent background, cheerful children's game illustration style, vibrant colors, storybook shading, no text

---

## מה לא צריך לייצר
- **רקע מסך היחידה (מסביב לכרטיס)** — נשאר רקע העולם הקבוע של הקורס.
  רק הרקע **בתוך** הכרטיס (`unit6-card-bg.png`) ייעודי ליחידה.
- **מפלצות המשחקונים** — קיימות ומשותפות. מפלצת השגיאות של שלב 12 משתמשת ב-`monster-5.png`.
- **רקעי הארקייד והמחבואים** (`arcade-sky.png`, `mole-field-bg.png`) — קיימים ומשותפים.
  ערכת night של משחק התפיסה כבר נראית כמו שמי לילה — מושלם לחלל.
- **תמונות לפעילויות הכתיבה (שלבים 9 ו-11)** — לוחות כתיבה בלי תמונה.
- **אלף הינשוף, רקע המפה, הדרקון** — נכסי עולם משותפים.

## שילוב באפליקציה (למפתחת)
| קובץ | איך משתלב |
|------|-----------|
| `unit6-card-bg.png` | אוטומטי — `cardBg` של `UNITS[6]` כבר מפנה אליו (הבהרה 58%; אם דהוי — `cardBgOverlay: .4`) |
| `unit6-priming.png`, `unit6-stars.png`, `unit6-moon.png`, `unit6-space-journey.png` | אוטומטי — נופל ל-SVG אם חסר |
| `unit6-moon-closeup.png`, `unit6-telescope.png` | אוטומטי — תמונת שאלות (`q.img`), נעלמת בשקט אם חסרה |
| `item-6.png` | אוטומטי! — הרשומה ב-`JOURNEY_ITEMS` כבר מפנה לקובץ עם נפילה לאימוג'י 🧭 אם חסר |

<!-- flowpad:capsule identity
version: 1
data:
  id: 34a6cbcd-61ad-4778-bbc2-4facaad3a019
flowpad:endcapsule identity -->
