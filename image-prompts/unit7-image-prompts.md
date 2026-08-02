# יחידה 7 "חברות ואמון" — פרומפטים לכל תמונות היחידה

מסמך עבודה ל-Codex: כל התמונות שיחידה 7 צריכה, עם נתיב שמירה מדויק, יחס, הקשר שימוש ופרומפט.

## 📁 איפה לשמור את התמונות
**כל התמונות נשמרות בתיקייה:** `courses/hebrew/app/assets/img/`
(נתיב מלא במחשב: `C:\Users\shani\Documents\course creator\courses\hebrew\app\assets\img\`)

שם הקובץ חייב להיות **בדיוק** כמו שמצוין בשדה "קובץ" של כל תמונה — האפליקציה כבר מפנה
לנתיבים האלה, וברגע שהקובץ קיים הוא מחליף אוטומטית את ה-placeholder המצויר (SVG).
אם קובץ חסר, שום דבר לא נשבר. גרסאות מקור לפני חיתוך שומרים ב-`app/assets/img/raw/`.

**עוגן סגנוני מחייב לכל הפרומפטים** (זהה לשאר הקורס):
> cheerful children's game illustration, storybook style, vibrant saturated colors, soft painterly texture, suitable for ages 8-10, no text, high quality digital art

**חשוב לעקביות:** מומלץ לייצר קודם את תמונה 0 (גיליון הדמויות), ואז לצרף אותה כרפרנס
לכל שאר התמונות — כך רוני ויעל ייראו אותו דבר בכל הסצנות.

**נושא היחידה:** חברות ואמון — עזרה, סליחה, געגוע ופיוס. סיפור מרכזי על שתי חברות,
רוני (שיער חום אסוף, קפוצ׳ון סגול) ויעל (תלתלים, חולצה ורודה). אווירה חמה ורגשית.

---

### תמונה 0 — גיליון דמויות היחידה (רפרנס לכל השאר)
**קובץ:** `unit7-characters-ref.png` (לא משולב באפליקציה — משמש רפרנס בלבד) | **יחס:** 16:9
**שימוש:** דף דמויות אחיד: רוני, יעל ומפלצת דוור קטנה. מצרפים כרפרנס לשאר התמונות.
**פרומפט:**
> Character design sheet for a children's reading game, three cute characters side by side on white background: 1) a girl around 9 years old named Roni with brown hair in a low ponytail, purple hoodie, warm confident smile, 2) a girl around 9 years old named Yael with curly brown hair, pink shirt and a yellow scarf, playful cheerful expression, 3) a small round green monster wearing a blue mail-carrier cap holding a white envelope with a red heart seal, one big friendly eye. All rounded and adorable, NOT realistic, cheerful children's game illustration, storybook style, vibrant saturated colors, soft painterly texture, no text, high quality digital art

### תמונה 1 — רקע כרטיס היחידה (גינה חמימה של חברות)
**קובץ:** `unit7-card-bg.png` | **יחס:** 16:9
**שימוש:** הרקע בתוך כרטיס הלמידה לכל אורך היחידה.
**חשוב:** מרכז רגוע — הטקסטים יושבים מעליו. שכבת ההבהרה היא ברירת המחדל (58%);
אם אחרי השילוב הרקע דהוי מדי או חזק מדי, מכוונים `cardBgOverlay` ב-`UNITS[7]` (כמו .45 של יחידה 6).
**פרומפט:**
> Wide 16:9 warm friendship-themed background for a learning screen in a children's game, a cozy park in golden afternoon light, a wooden bench and a leafy tree at one side, a swing set silhouette far at the other side, tiny paper hearts and dandelion seeds floating near the top corners, soft warm bokeh, calm uncluttered empty center, slightly blurred as a background for a learning card, cheerful children's game illustration, storybook style, no text, no characters, high quality digital art

### תמונה 2 — דנה עוזרת (שלב 2 · המשפט הראשון)
**קובץ:** `unit7-helping.png` | **יחס:** 21:9
**שימוש:** איור מעל המשפט "דנה תמיד עוזרת לכולם, אתמול היא מיהרה לעזור לילד שנפל, והעזרה שלה שימחה את כולם."
**חשוב:** ילדה מושיטה יד לילד שנפל בחצר בית הספר, ילדים מסביב מחייכים. רגע של עזרה, לא של מצוקה.
**פרומפט:**
> A kind girl reaching out her hand to help a boy who fell near the school playground, the boy already smiling as he takes her hand, a scraped knee but no tears, two other children nearby clapping happily, warm sunny schoolyard with a hopscotch pattern, sparkles around the joined hands showing kindness, all characters rounded and adorable with big friendly eyes, cheerful children's game illustration, storybook style, vibrant saturated colors, no text, high quality digital art

### תמונה 3 — האוצר השקוף (שלב 4 · הקטע הקצר)
**קובץ:** `unit7-trust.png` | **יחס:** 21:9
**שימוש:** איור מעל הקטע "האוצר השקוף" — אמון בין חברים.
**חשוב:** שני חברים נשבעים שבועת זרת, וביניהם מרחף יהלום שקוף וזוהר — האמון שאי אפשר לראות.
**פרומפט:**
> Two children making a pinky-promise, and floating between them a large translucent glowing crystal-clear diamond made of soft light, as if their promise created it, gentle sparkles around the gem, warm sunset park background, the children rounded and adorable with big friendly eyes looking at each other with trust, magical but warm atmosphere, cheerful children's game illustration, storybook style, vibrant saturated colors, no text, high quality digital art

### תמונה 4 — שבועת הזרת (שלב 5 · שאלות הקטע)
**קובץ:** `unit7-promise.png` | **יחס:** 21:9
**שימוש:** תמונת השאלות על קטע האמון. שונה מתמונת הקטע עצמו.
**פרומפט:**
> A close-up of two children's hands making a pinky promise, tiny golden sparkles swirling around the linked pinkies, a small round green monster with a blue mail-carrier cap peeking from the corner smiling warmly, soft warm blurred park background, rounded and adorable style, cheerful children's game illustration, storybook style, vibrant saturated colors, no text, high quality digital art

### תמונה 5 — רוני ויעל (שלבים 7–9 · הסיפור הגדול והכותרות)
**קובץ:** `unit7-friends.png` | **יחס:** 21:9
**שימוש:** איור מעל סיפור חמש הפסקאות — וגם הרקע שדרכו כותבים את הכותרות העצמאיות.
**חשוב:** מסע רגשי בתמונה אחת, משמאל לימין כמו קומיקס עדין: (1) שתי החברות צוחקות יחד,
(2) רוני מחכה לבדה בגשם עם מטרייה, (3) השתיים מחובקות תחת קשת בענן. בלי טקסט!
**פרומפט:**
> A wide gentle triptych-style emotional journey of two girl friends in one image: on one side Roni with a ponytail and purple hoodie and Yael with curly hair and pink shirt laughing together on a bench, in the middle Roni alone under an umbrella in soft blue rain looking sad, on the other side the two girls hugging warmly under a bright rainbow after the rain, the light shifting from golden to blue to bright again across the image, all characters rounded and adorable with big friendly eyes, cheerful children's game illustration, storybook style, vibrant saturated colors, no text, high quality digital art

### תמונה 6 — רוני בגשם (שלב 8 · שאלות הסיפור)
**קובץ:** `unit7-rain.png` | **יחס:** 21:9
**שימוש:** תמונת השאלות על הסיפור — הרגע שבו רוני חיכתה לבדה.
**פרומפט:**
> A girl with a brown ponytail and purple hoodie sitting alone on a park bench holding a small red umbrella, soft blue rain falling, an empty swing beside her, puddles reflecting warm street lamps, she looks a little sad but safe and warm, gentle melancholic but cozy mood suitable for children, rounded and adorable with big friendly eyes, cheerful children's game illustration, storybook style, vibrant saturated colors, no text, high quality digital art

### תמונה 7 — פריט המסע: תג קורא (מסך הפרס)
**קובץ:** `item-7.png` | **יחס:** 1:1, רקע שקוף
**שימוש:** הפריט שנאסף בסוף היחידה לספר המסע (כרגע אימוג'י 🏅). חלק מסדרת `item-0` עד `item-8`.
**פרומפט:**
> Single game collectible item icon: a golden READER'S BADGE medal, a shining gold medallion with an embossed open book and a small heart at its center, hanging from a ribbon in warm red and purple, tiny sparkles around it, centered, slight 3D depth, soft warm glow around the item, transparent background, cheerful children's game illustration style, vibrant colors, storybook shading, no text

---

## מה לא צריך לייצר
- **רקע מסך היחידה (מסביב לכרטיס)** — נשאר רקע העולם הקבוע של הקורס.
  רק הרקע **בתוך** הכרטיס (`unit7-card-bg.png`) ייעודי ליחידה.
- **מפלצות המשחקונים** — קיימות ומשותפות. מפלצת השגיאות של שלב 11 משתמשת ב-`monster-6.png`.
- **רקעי הארקייד והמחבואים** — קיימים ומשותפים. ערכת ה-mail של משחק התפיסה (מפלצות
  דואר עם מעטפות) קיימת מיחידה 3 ומושלמת לנושא המכתבים בין חברים.
- **תמונות להטרמה (שלב 1)** — משחק ההאכלה לא משתמש בתמונות סצנה.
- **תמונות לפעילויות הכתיבה (שלבים 9, 10, 12)** — לוחות כתיבה בלי תמונה
  (שלב 9 מציג את פסקאות הסיפור כטקסט).
- **אלף הינשוף, רקע המפה, הדרקון** — נכסי עולם משותפים.

## שילוב באפליקציה (למפתחת)
| קובץ | איך משתלב |
|------|-----------|
| `unit7-card-bg.png` | אוטומטי — `cardBg` של `UNITS[7]` כבר מפנה אליו (הבהרה 58%; לכוונן `cardBgOverlay` אם צריך) |
| `unit7-helping.png`, `unit7-trust.png`, `unit7-friends.png` | אוטומטי — נופל ל-SVG אם חסר |
| `unit7-promise.png`, `unit7-rain.png` | אוטומטי — תמונת שאלות (`q.img`), נעלמת בשקט אם חסרה |
| `item-7.png` | אוטומטי! — הרשומה ב-`JOURNEY_ITEMS` כבר מפנה לקובץ עם נפילה לאימוג'י 🏅 אם חסר |

<!-- flowpad:capsule identity
version: 1
data:
  id: 3edfdbcc-929c-4a89-873b-a4a7ad2b8702
flowpad:endcapsule identity -->
