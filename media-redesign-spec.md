# אפיון: קוראים חכמים 2.0 — תצוגה מבוססת וידאו ותמונות איכותיות

> **מטרה:** להחליף את כל הגרפיקה המצוירת בקוד (SVG/CSS) בתמונות חדות באיכות גבוהה
> וקטעי וידאו, שנוצרים ב-GPT (תמונות) וב-Kling (הנפשה). **התוכן הלימודי נשאר כמו שהוא** —
> משתנה רק השכבה הוויזואלית.

---

## 1. עקרון העל: Style Bible אחיד

כל נכס נוצר עם אותה שפה ויזואלית. **בלי זה נקבל אוסף תמונות שלא מתחברות.**

### הפרומפט הבסיסי שמצורף לכל יצירה (באנגלית):
```
Children's storybook game illustration, painterly style with soft brush textures,
vibrant saturated colors, warm sunlight, high detail 4K quality,
consistent world: green meadows, wooden signs, blue sky —
in the style of modern educational games like Reading Eggs.
No text, no letters, no watermarks.
```

### מוטיב המפלצות (מחייב, החלטה קיימת):
```
silly funny cute monster, round blob body, big googly eyes (or one eye, or three),
tiny antennae, huge open mouth, gross-funny but friendly, NOT scary, ages 8-10
```

### כלל עקביות דמויות
דמות חוזרת (אלף הינשוף, מפלצות, אווטארים) נוצרת פעם אחת כ-**Character Sheet**
(תמונת ייחוס עם הדמות מכמה זוויות). כל תמונה נוספת של הדמות נוצרת באותה שיחת GPT
עם התמונה המקורית מצורפת + "same exact character as in the reference image".

---

## 2. מלאי הנכסים המלא (Asset Inventory)

### 2.1 מסך המפה 🗺️
| נכס | קובץ | סוג | עדיפות |
|-----|------|-----|---------|
| רקע המפה (נוף מלא, בלי שביל ותחנות) | `map-background.png` | תמונה 4K, יחס 16:9 | 🔴 P1 |
| וידאו רקע חי: עננים נעים + מים זורמים בנהר | `map-ambient.mp4` | וידאו לופ 10 שנ׳, muted | 🟡 P2 |
| מדליוני תחנות (9 עיגולי עץ עם אייקון נושא) | `station-0.png` … `station-8.png` | תמונה שקופה 512px | 🟠 P1.5 |
| דגל סיום / שער כניסה לעולם | `map-flag.png` | תמונה שקופה | 🟢 P3 |

### 2.2 הדמות (אווטאר) 🧒
| נכס | קובץ | סוג | עדיפות |
|-----|------|-----|---------|
| Character sheet של הבלוב (5 צבעים × מבט קדמי) | `avatar-{color}.png` | תמונה שקופה 512px | 🔴 P1 |
| וידאו הליכה קצר (לתנועה בין תחנות) | `avatar-walk.mp4` | וידאו שקוף/רקע ירוק 3 שנ׳ | 🟢 P3 |
| אביזרי חנות (4 כובעים, 2 משקפיים, 4 חיות) | `item-{id}.png` | תמונה שקופה 256px | 🟡 P2 |

### 2.3 אלף הינשוף 🦉
| נכס | קובץ | סוג | עדיפות |
|-----|------|-----|---------|
| Character sheet: עומד, מצביע, מוחא כפיים, קורץ | `owl-idle.png`, `owl-point.png`, `owl-clap.png`, `owl-wink.png` | תמונות שקופות 512px | 🔴 P1 |
| וידאו אידל (נשימה + מצמוץ, לופ) | `owl-idle.mp4` | וידאו לופ 4 שנ׳ | 🟡 P2 |

### 2.4 המפלצות 👾
| נכס | קובץ | סוג | עדיפות |
|-----|------|-----|---------|
| Character sheet: 6 צבעים × 3 גרסאות (רגילה/קיקלופ/שלוש עיניים) | `monster-{color}-{variant}.png` | תמונות שקופות 512px | 🔴 P1 |
| מפלצת עם בלון (לארקייד הבלונים) | `monster-balloon-{n}.png` | תמונה שקופה | 🔴 P1 |
| מפלצת עם כנפי עטלף (לארקייד הלילה) | `monster-fly-{n}.png` | תמונה שקופה | 🔴 P1 |
| וידאו לעיסה (למשחק ההאכלה) | `monster-chomp.mp4` | וידאו 2 שנ׳ | 🟢 P3 |

### 2.5 מסכי היחידה 📖
| נכס | קובץ | סוג | עדיפות |
|-----|------|-----|---------|
| רקע מסך יחידה (נוף מטושטש רך) | `unit-background.png` | תמונה 16:9 | 🟠 P1.5 |
| סצנת ההטרמה יחידה 1 (עיר דיגיטלית, בלי מחשב!) | `unit1-priming.png` | תמונה 21:9 | 🔴 P1 |
| רוני בונה עולם (למשפט הראשון) | `unit1-roni.png` | תמונה 21:9 | 🔴 P1 |
| לא מוותרים (לקטע הקצר) | `unit1-retry.png` | תמונה 21:9 | 🔴 P1 |
| רקע ארקייד שמיים | `arcade-sky.png` | תמונה 2:1 | 🟠 P1.5 |
| רקע ארקייד לילה | `arcade-night.png` | תמונה 2:1 | 🟠 P1.5 |

### 2.6 וידאו — הרגעים הגדולים 🎬
| נכס | קובץ | שימוש | עדיפות |
|-----|------|--------|---------|
| אינטרו העולם (12–15 שנ׳): טיסה מעל המפה, הינשוף ממריא, הלוגו | `intro-world.mp4` | פעם ראשונה שנכנסים + כפתור "לצפייה שוב" | 🟡 P2 |
| אינטרו יחידה (5–8 שנ׳): זום מהמפה אל תוך נושא היחידה | `unit{N}-intro.mp4` | פתיחת כל יחידה | 🟡 P2 |
| חגיגת סיום יחידה (5 שנ׳): קונפטי, הפריט מסתובב, המפלצות רוקדות | `celebrate.mp4` | מסך הפרס | 🟡 P2 |

---

## 3. פרומפטים מוכנים ל-GPT

### רקע המפה (P1)
> Vast cheerful fantasy meadow landscape from a high gentle angle, rolling green hills, scattered pine and oak trees, colorful wildflowers, winding blue river with a small wooden bridge, waterfall in the far distance, bright blue sky with fluffy clouds, warm golden sunlight, large open grassy areas left empty in the center for game UI elements, [Style Bible], 16:9, no paths, no characters

### אלף הינשוף — Character Sheet (P1)
> Character sheet of a wise cute owl mascot for a children's reading game: warm brown feathers, cream belly, huge friendly white eyes, small orange beak, tiny ear tufts. Show the SAME owl in 4 poses arranged in a grid: standing and smiling, pointing with a wing, clapping wings happily, winking. Transparent background, [Style Bible]

### מפלצת — Character Sheet (P1, חוזרים עליו לכל צבע)
> Character sheet of a silly funny monster for a kids game: round PURPLE blob body, tiny antennae with balls on top, huge open mouth with white teeth and pink tongue. Show the SAME monster in 3 versions in a row: two big googly eyes, one giant cyclops eye, three eyes with tongue sticking out. Gross-funny but friendly, NOT scary. Transparent background, [Style Bible]

### מפלצת בלון / מפלצת מעופפת (P1)
> The same monster from the reference image, holding a red balloon string and floating upward, excited expression, transparent background, [Style Bible]
> The same monster from the reference image, with small purple bat wings flapping, flying to the side at night, mischievous smile, transparent background, [Style Bible]

### סצנות יחידה 1 — הפרומפטים המלאים כבר כתובים ב-[image-prompts/image-prompts.md](image-prompts/image-prompts.md)

---

## 4. פרומפטים ל-Kling (וידאו)

| קליפ | תמונת בסיס | פרומפט הנפשה |
|------|-------------|----------------|
| `map-ambient.mp4` | map-background.png | Clouds drift slowly across the sky, river water flows gently, tree leaves sway in a light breeze, waterfall mist. Camera completely static. Subtle, calm, seamless loop, 10 seconds |
| `owl-idle.mp4` | owl-idle.png | The owl breathes gently, blinks twice, slightly tilts its head. Camera static, loop-friendly, 4 seconds |
| `intro-world.mp4` | map-background.png | Slow cinematic aerial flyover across the meadow world, camera glides forward over the hills toward the horizon, warm morning light, 12 seconds |
| `unit1-intro.mp4` | unit1-priming.png | Slow zoom into the digital city, the construction crane lifts a block into place, pixel clouds drift, 6 seconds |
| `celebrate.mp4` | (פריים מהמפה) | Confetti bursts from the bottom, golden coins rain down and bounce, sparkles, 5 seconds |

---

## 5. שילוב טכני באפליקציה

### מה כבר מוכן בקוד (רק לשים קובץ):
- `unit1-priming.png`, `unit1-roni.png`, `unit1-retry.png` — נטענים אוטומטית, יש fallback מצויר

### מה דורש שינוי קוד קטן (מוגדר כאן, יבוצע כשהתמונות מוכנות):
| נכס | שינוי |
|-----|-------|
| map-background.png | `.map-world { background: url(...) center/cover }` + הסתרת שכבות ה-CSS |
| avatar-*.png | `avatarSVG()` מחזיר `<img>` לפי צבע |
| owl-*.png | `OWL_SVG` מוחלף ב-`<img>`; פוזות לפי הקשר (point בהוראה, clap בהצלחה) |
| monster-*.png | `MONSTER_SVG()` מוחלף ב-`<img>` לפי צבע+גרסה |
| station-*.png | תוכן `.station-circle` |
| וידאו רקע | `<video autoplay muted loop playsinline>` מאחורי שכבת המפה, עם fallback לתמונה |
| אינטרו וידאו | מסך צפייה עם כפתור דילוג, לפני `renderIntro()` |

### כללי קבצים
- תמונות: PNG שקוף לדמויות, WebP/PNG לרקעים. רקעים 2560px רוחב, דמויות 512–1024px
- וידאו: MP4 (H.264), muted, ≤8MB לקליפ, `playsinline` לטובת מובייל
- הכל תחת `app/assets/img/` ו-`app/assets/video/`
- **מובייל**: וידאו רקע נטען רק במסכים רחבים (media query); במובייל נשארת התמונה

---

## 6. סדר עבודה מומלץ

1. **פאזה 1 (משנה הכל):** רקע מפה, character sheets של הינשוף והמפלצות, 3 סצנות יחידה 1, אווטארים → מחליפים בקוד
2. **פאזה 1.5:** מדליוני תחנות, רקעי ארקייד, רקע יחידה
3. **פאזה 2 (וואו):** וידאו אמביינט למפה, אידל לינשוף, אינטרו עולם, חגיגת סיום, אביזרי חנות
4. **פאזה 3 (צ׳רי):** הליכת אווטאר, לעיסת מפלצת, אינטרו פר יחידה

> 💡 **טיפ עבודה עם GPT:** ליצור את כל התמונות באותה שיחה, לצרף את תמונת הוויז'ן המקורית
> ואת ה-character sheets כרפרנס לכל בקשה, ולבקש תיקונים באותה שיחה ("same image but...").
