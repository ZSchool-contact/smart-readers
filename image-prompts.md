# קוראים חכמים — פרומפטים ליצירת תמונות העולם

כל תמונה שנוצרת נשמרת בנתיב המצוין תחת `app/assets/img/`.
האפליקציה בנויה כך שאם התמונה חסרה, מוצג placeholder (SVG/CSS) — אפשר להחליף בהדרגה.

**עוגן סגנוני לכל הפרומפטים** (מבוסס על תמונת הוויז'ן `ChatGPT Image Apr 23...png`):
`cheerful children's game illustration, storybook style, vibrant saturated colors, soft painterly texture, green meadows, blue sky with fluffy clouds, wooden signs, suitable for ages 8-10, no text, high quality digital art`

---

### תמונה 1 — רקע מפת העולם
**קובץ:** `map-background.png` | **יחס:** 3:2 (או 16:9)
**שימוש:** רקע מסך המפה (יוגדר כ-background על `.map-world`)
**חשוב:** בלי שביל, בלי תחנות ובלי טקסט — השביל והתחנות מצוירים בקוד מעל התמונה. אזור המרכז צריך להישאר "רגוע" ויזואלית.
**פרומפט:**
> Vast cheerful fantasy meadow landscape viewed from above at a gentle angle, rolling green hills, scattered pine and oak trees, colorful wildflowers, a winding blue river with a small wooden bridge on the right side, waterfall in the far distance, bright blue sky with fluffy clouds and warm sunlight, open grassy areas in the center left empty for game elements, cheerful children's game illustration, storybook style, vibrant saturated colors, soft painterly texture, no text, no characters, no paths, high quality digital art

### תמונה 2 — הדמות (5 גרסאות צבע)
**קבצים:** `avatar-blue.png`, `avatar-green.png`, `avatar-purple.png`, `avatar-orange.png`, `avatar-pink.png`
**יחס:** 1:1, רקע שקוף | **שימוש:** מחליף את ה-SVG של הדמות בכל מקום
**חשוב:** הדמות במרכז, גוף מלא, פנים קדימה, בלי כובע ובלי אביזרים (הם שכבות נפרדות).
**פרומפט (מחליפים את הצבע בכל גרסה):**
> Cute round friendly blob mascot character for a children's reading game, BLUE body, big expressive white eyes with black pupils, warm happy smile, rosy cheeks, tiny arms and feet, standing facing forward, full body centered, transparent background, cheerful children's game illustration, storybook style, soft shading, no hat, no accessories, no text

### תמונה 3 — סצנת ההטרמה של יחידה 1: עיר דיגיטלית בבנייה
**קובץ:** `unit1-priming.png` | **יחס:** 21:9 (רחב ונמוך)
**שימוש:** חלק ההטרמה ביחידה 1 — הילדים מחפשים בתמונה: בנייה, גשר, עיר, כביש, מגדל
**חשוב:** כל חמשת האלמנטים חייבים להופיע ברור! בלי מחשב, בלי ספרייה ובלי בריכה (אלו המסיחים).
**פרומפט:**
> Colorful video game world under construction seen from the side, a digital city with tall towers and buildings, a yellow construction crane building a skyscraper with scaffolding, a wooden bridge crossing a river, a winding road with dashed lines, pixel-art style clouds hinting it is inside a video game, cheerful children's game illustration, storybook style, vibrant saturated colors, no text, no computer, no library, no swimming pool, high quality digital art

### תמונה 3ב — רוני בונה עולם (המשפט הראשון)
**קובץ:** `unit1-roni.png` | **יחס:** 21:9
**שימוש:** שלב 2 ביחידה 1 — איור מעל המשפט "רוני בונה עולם חדש במשחק..."
**פרומפט:**
> A happy child character building a colorful block tower inside a video game screen, placing a green block on top, surrounded by pink blue and yellow blocks, hearts and sparkles showing success, cheerful children's game illustration, storybook style, vibrant saturated colors, no text, high quality digital art

### תמונה 3ג — לא מוותרים (הקטע הקצר)
**קובץ:** `unit1-retry.png` | **יחס:** 21:9
**שימוש:** שלב 4 ביחידה 1 — איור מעל הקטע "למה לא מוותרים?"
**פרומפט:**
> A determined cute character with a raised fist facing a game screen showing a friendly "try again" moment, a small funny monster cheering nearby with a megaphone, night sky with stars, encouraging and positive mood not sad, cheerful children's game illustration, storybook style, no text, high quality digital art

### תמונה 4 — פריטי המסע (9 אייקונים)
**קבצים:** `item-0.png` עד `item-8.png` | **יחס:** 1:1, רקע שקוף
**שימוש:** ספר המסע + מסך הפרס בסוף כל יחידה (כרגע אימוג'י)
**הפריטים:** 0 תיק מסע · 1 כובע צהוב · 2 זכוכית מגדלת · 3 זרע נובט · 4 מפתח עתיק · 5 כוכב זוהר · 6 מצפן · 7 תג/מדליית קורא · 8 תעודה עם חותם
**תבנית פרומפט (מחליפים את שם הפריט):**
> Single game collectible item icon: a YELLOW EXPLORER HAT, centered, slight 3D depth, soft glow around the item, transparent background, cheerful children's game illustration style, vibrant colors, storybook shading, no text

### תמונה 4ב — אלף הינשוף (הדמות המלווה)
**קובץ:** `guide-owl.png` | **יחס:** 1:1, רקע שקוף
**שימוש:** מחליף את ה-SVG של הינשוף בבועות ההדרכה בכל היחידות
**פרומפט:**
> Cute wise owl mascot for a children's reading game, warm brown feathers, cream belly, huge friendly white eyes with black pupils, small orange beak, tiny ear tufts, standing facing forward with a welcoming expression, full body centered, transparent background, cheerful children's game illustration, storybook style, soft shading, no glasses, no text

### תמונה 4ג — רקעי משחקוני הארקייד (אופציונלי)
**קבצים:** `arcade-sky.png` (מפלצות בלונים), `arcade-night.png` (מפלצות לילה) | **יחס:** 2:1
**שימוש:** רקע זירת המשחקון (כרגע גרדיאנטים ב-CSS)
**פרומפט (שמיים):**
> Soft bright daytime sky background for a kids catching game, gentle gradient from deep blue to pale blue, a few distant fluffy clouds, empty center, cheerful children's game illustration, no text, no characters
**פרומפט (לילה):**
> Friendly night sky background for a kids arcade game, dark blue and purple gradient, small twinkling stars and a crescent moon in a corner, cozy and not scary, empty center, cheerful children's game illustration, no text

### 👾 מוטיב המפלצות — הנחיה סגנונית מחייבת
המוטיב האחיד של כל משחקוני הקורס: **מפלצות מגעילות מצחיקות** (חמודות, לא מפחידות).
כל תמונת מפלצת חדשה חייבת להתאים לשלוש הקיימות: גוף עגול, עיניים גדולות (או עין אחת, או שלוש),
מחושים, פה ענק. תוספת קבועה לפרומפטים של מפלצות:
> silly funny cute monster, round blob body, big googly eyes, tiny antennae, huge open mouth, gross-funny but friendly, NOT scary, for children ages 8-10

### תמונה 5 — רקע מסך יחידה
**קובץ:** `unit-background.png` (כללי) או `unit{N}-background.png` (פר יחידה) | **יחס:** 16:9
**שימוש:** רקע איור מאחורי כרטיס הלמידה. סדר עדיפויות בקוד: רקע ייעודי ליחידה ← רקע כללי ← רקע המפה
**סטטוס:** ליחידה 1 קיים `unit1-background.png` שנגזר מסצנת העיר (טשטוש רך). כשמייצרים גרסה ייעודית ב-GPT — לשמור באותו שם והיא תחליף אוטומטית.
**פרומפט (כללי):**
> Soft dreamy meadow landscape with gentle hills and trees, slightly blurred as a background for a learning card, muted pleasant colors, bright sky, cheerful children's game illustration, storybook style, no text, no characters
**פרומפט (יחידה 1):**
> Same illustration style: a wide 16:9 soft dreamy background for a learning screen, a calm blocky video game landscape at the edges, soft pixel clouds, gentle block hills, hint of colorful block towers in the far distance, hazy muted pastel colors, calm uncluttered center, no text, no characters, no crane

---

## שילוב התמונות באפליקציה (למפתחת)
| תמונה | איך משלבים |
|--------|-------------|
| map-background.png | ב-CSS: `.map-world { background: url('../assets/img/map-background.png') center/cover; }` ולהסתיר את `.map-sky`, `.map-ground`, `.map-deco` |
| avatar-*.png | להחליף את `avatarSVG()` ב-world.js בתגית `<img>` לפי צבע |
| unit1-priming.png | עובד אוטומטית — הקוד מנסה לטעון את הקובץ ונופל ל-SVG אם חסר |
| item-*.png | להחליף אימוג'י ב-`JOURNEY_ITEMS` שב-data.js בתגיות img |
