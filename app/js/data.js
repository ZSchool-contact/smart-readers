/* ============================================================
   קוראים חכמים — נתוני התוכן
   כל יחידה היא אובייקט; המנוע (engine.js) יודע לנגן כל part לפי type.
   עיקרון: חשיפה הדרגתית לטקסט — משפט ← קטע קצר ← פסקה ארוכה,
   עם משחקוני ארקייד (תנועה!) בין קטעי הקריאה.
   ============================================================ */

/* --- תחנות המפה: מיקום באחוזים על העולם --- */
const MAP_STATIONS = [
  { id: 0, x: 84, y: 25, emoji: '🎒', title: 'מי אני כקורא?' },
  { id: 1, x: 62, y: 20, emoji: '🎮', title: 'בונים עולמות' },
  { id: 2, x: 40, y: 26, emoji: '🐾', title: 'בעלי חיים מדהימים' },
  { id: 3, x: 17, y: 22, emoji: '🌱', title: 'שפה שמחברת' },
  { id: 4, x: 11, y: 48, emoji: '⚽', title: 'ספורט ומאמץ' },
  { id: 5, x: 34, y: 55, emoji: '🍜', title: 'אוכל מסביב לעולם' },
  { id: 6, x: 58, y: 50, emoji: '🚀', title: 'חלל ומסתורין' },
  { id: 7, x: 82, y: 58, emoji: '🤝', title: 'חברות ואמון' },
  { id: 8, x: 50, y: 83, emoji: '🏆', title: 'הפרויקט שלי' },
];

/* --- קישוטי מפה (אימוג'י דקורטיבי עד שיגיעו תמונות ה-AI) --- */
const MAP_DECO = [
  { x: 6,  y: 30, e: '🌲', s: 42 }, { x: 93, y: 34, e: '🌳', s: 46 },
  { x: 26, y: 36, e: '🌼', s: 22 }, { x: 70, y: 32, e: '🌷', s: 22 },
  { x: 90, y: 70, e: '🌲', s: 52 }, { x: 8,  y: 66, e: '🌳', s: 50 },
  { x: 22, y: 72, e: '🍄', s: 24 }, { x: 68, y: 68, e: '🌻', s: 26 },
  { x: 44, y: 38, e: '🦋', s: 22 }, { x: 60, y: 90, e: '🌺', s: 24 },
  { x: 35, y: 92, e: '🌲', s: 40 }, { x: 78, y: 88, e: '🪨', s: 28 },
];

/* --- עולמות תוכן לבחירה (יחידה 0) --- */
const INTEREST_WORLDS = [
  { id: 'sport',  emoji: '⚽', name: 'ספורט' },
  { id: 'animals', emoji: '🐾', name: 'בעלי חיים' },
  { id: 'space',  emoji: '🚀', name: 'חלל' },
  { id: 'food',   emoji: '🍕', name: 'אוכל' },
  { id: 'adventure', emoji: '🗺️', name: 'הרפתקאות' },
  { id: 'tech',   emoji: '💻', name: 'טכנולוגיה' },
];

/* --- צבעי דמות --- */
const AVATAR_COLORS = {
  blue:   { body: '#4aa3e8', dark: '#2f7fc2', name: 'כחול' },
  green:  { body: '#5cbb4e', dark: '#3f9433', name: 'ירוק' },
  purple: { body: '#a06ae0', dark: '#7d48bd', name: 'סגול' },
  orange: { body: '#f5953b', dark: '#d2751c', name: 'כתום' },
  pink:   { body: '#ef6fa7', dark: '#cc4d86', name: 'ורוד' },
};

/* --- פריטי חנות --- */
const SHOP_ITEMS = [
  { id: 'hat-cap',    cat: 'hats', slot: 'hat', emoji: '🧢', name: 'כובע מצחייה', price: 40 },
  { id: 'hat-party',  cat: 'hats', slot: 'hat', emoji: '🥳', name: 'כובע מסיבה', price: 60 },
  { id: 'hat-grad',   cat: 'hats', slot: 'hat', emoji: '🎓', name: 'כובע חכמים', price: 80 },
  { id: 'hat-crown',  cat: 'hats', slot: 'hat', emoji: '👑', name: 'כתר מלכותי', price: 150 },
  { id: 'face-sun',   cat: 'face', slot: 'face', emoji: '🕶️', name: 'משקפי שמש', price: 50 },
  { id: 'face-nerd',  cat: 'face', slot: 'face', emoji: '👓', name: 'משקפי קריאה', price: 45 },
  { id: 'pet-dog',    cat: 'pets', slot: 'pet', emoji: '🐶', name: 'גור כלבים', price: 90 },
  { id: 'pet-cat',    cat: 'pets', slot: 'pet', emoji: '🐱', name: 'חתלתול', price: 90 },
  { id: 'pet-owl',    cat: 'pets', slot: 'pet', emoji: '🦉', name: 'ינשוף חכם', price: 120 },
  { id: 'pet-turtle', cat: 'pets', slot: 'pet', emoji: '🐢', name: 'צב מסע', price: 70 },
  { id: 'color-green',  cat: 'colors', slot: 'color', value: 'green',  name: 'ירוק', price: 60 },
  { id: 'color-purple', cat: 'colors', slot: 'color', value: 'purple', name: 'סגול', price: 60 },
  { id: 'color-orange', cat: 'colors', slot: 'color', value: 'orange', name: 'כתום', price: 60 },
  { id: 'color-pink',   cat: 'colors', slot: 'color', value: 'pink',   name: 'ורוד', price: 60 },
];
const SHOP_CATS = [
  { id: 'hats', name: '🎩 כובעים' },
  { id: 'face', name: '👓 משקפיים' },
  { id: 'pets', name: '🐾 חיות מחמד' },
  { id: 'colors', name: '🎨 צבעי דמות' },
];

/* --- פריטי מסע לפי יחידה (מהסילבוס) --- */
const JOURNEY_ITEMS = {
  0: { emoji: '🎒', name: 'תיק המסע' },
  1: { emoji: '👒', name: 'כובע צהוב' },
  2: { emoji: '🔍', name: 'זכוכית מגדלת' },
  3: { emoji: '🌱', name: 'זרע שורש' },
  4: { emoji: '🗝️', name: 'מפתח מילים' },
  5: { emoji: '⭐', name: 'כוכב נסתר' },
  6: { emoji: '🧭', name: 'מצפן' },
  7: { emoji: '🏅', name: 'תג קורא' },
  8: { emoji: '🏆', name: 'תעודת קורא עצמאי' },
};

/* --- אלף הינשוף — הדמות המלווה של הקורס --- */
const GUIDE_NAME = 'אלף הינשוף';
const OWL_SVG = `
<svg viewBox="0 0 120 130" aria-hidden="true">
  <!-- אוזניים -->
  <path d="M28 28 L38 8 L48 26 Z" fill="#7a5230"/>
  <path d="M92 28 L82 8 L72 26 Z" fill="#7a5230"/>
  <!-- גוף -->
  <ellipse cx="60" cy="72" rx="42" ry="48" fill="#9c6b3c"/>
  <ellipse cx="60" cy="88" rx="28" ry="26" fill="#e8cfa8"/>
  <!-- כנפיים -->
  <ellipse cx="20" cy="76" rx="11" ry="24" fill="#7a5230" transform="rotate(12 20 76)"/>
  <ellipse cx="100" cy="76" rx="11" ry="24" fill="#7a5230" transform="rotate(-12 100 76)"/>
  <!-- עיניים -->
  <circle cx="44" cy="52" r="17" fill="#fff"/>
  <circle cx="76" cy="52" r="17" fill="#fff"/>
  <circle cx="46" cy="54" r="8" fill="#3d2b1a"/>
  <circle cx="74" cy="54" r="8" fill="#3d2b1a"/>
  <circle cx="49" cy="51" r="2.6" fill="#fff"/>
  <circle cx="77" cy="51" r="2.6" fill="#fff"/>
  <!-- מקור -->
  <path d="M53 66 L60 78 L67 66 Q60 62 53 66 Z" fill="#f5953b"/>
  <!-- רגליים -->
  <path d="M46 118 l-5 8 M46 118 l0 9 M46 118 l5 8" stroke="#f5953b" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M74 118 l-5 8 M74 118 l0 9 M74 118 l5 8" stroke="#f5953b" stroke-width="3.5" stroke-linecap="round"/>
</svg>`;

/* ============================================================
   יחידה 1 — בונים עולמות
   מבנה מדורג: משפט ← משחקון ← קטע קצר ← משחקון ← פסקה ← איסוף
   ============================================================ */
const UNITS = {};

UNITS[1] = {
  id: 1,
  title: 'בונים עולמות',
  topic: 'משחקי מחשב',
  emoji: '🎮',
  /* מסביב לכרטיס: רקע העולם (המפה) — ברירת המחדל, לכן אין כאן bg */
  cardBg: 'assets/img/unit1-card-bg.png',      /* רקע איור בתוך כרטיס השיעור עצמו */
  objectives: [
    'למצוא מידע שכתוב בטקסט',
    'לבחור כותרת מתאימה לקטע',
    'לזהות מילים שמשתייכות לאותה משפחת שורש',
    'לתפוס מילים ממשפחה נכונה, גם כשהן זזות מהר!',
  ],
  parts: [
    /* ---- 1. הטרמה: ציד מילים בתמונה ---- */
    {
      type: 'word-hunt',
      kicker: 'שלב 1 · חימום',
      title: 'מה רואים בתמונה?',
      guide: 'שלום! אני אלף הינשוף ואני מלווה אתכם במסע. לחצו על כל המילים שמתאימות למה שרואים בתמונה!',
      sceneImage: 'assets/img/unit1-priming.png',
      words: [
        { w: 'בנייה', ok: true }, { w: 'גשר', ok: true },
        { w: 'ספרייה', ok: false }, { w: 'עיר', ok: true },
        { w: 'מחשב', ok: false }, { w: 'בריכה', ok: false },
        { w: 'כביש', ok: true }, { w: 'מגדל', ok: true },
      ],
      doneFeedback: 'כל הכבוד! אלו בדיוק הדברים שנפגוש היום 🎉',
    },
    /* ---- 2. משפט אחד: מציאת משפחה ---- */
    {
      type: 'sentence-hunt',
      kicker: 'שלב 2 · משפט ראשון',
      title: 'משפחת ב־נ־ה מתחבאת במשפט!',
      guide: 'מתחילים בקטן: משפט אחד בלבד. מצאו בו את שתי המילים ממשפחת השורש ב־נ־ה ולחצו עליהן!',
      family: 'ב־נ־ה',
      sceneImage: 'assets/img/unit1-roni.png',
      sceneSvg: 'RONI_SCENE_SVG',
      words: ['רוני', 'בונה', 'עולם', 'חדש', 'במשחק,', 'ואחרי', 'הרבה', 'ניסיונות', 'הבנייה', 'מצליחה!'],
      targetIdx: [1, 8],
      fbGood: 'מעולה! בונה והבנייה, שתיהן ממשפחת ב־נ־ה. אותו שורש בתוך שתי מילים שונות!',
      fbBad: 'המילה הזו לא ממשפחת ב־נ־ה. חפשו את האותיות ב, נ, ה בתוך המילה 🔎',
    },
    /* ---- 3. משחקון ארקייד: מפלצות בלונים ---- */
    {
      type: 'catch-game',
      theme: 'balloons',
      kicker: 'שלב 3 · משחקון!',
      title: '🎈 מפלצות הבלונים של נ־ס־ה',
      guide: 'עכשיו זזים! מפלצות קטנות בורחות למעלה עם בלונים, וכל אחת מחזיקה מילה. תפסו רק מפלצות עם מילים ממשפחת נ־ס־ה, מהר לפני שהן בורחות!',
      family: 'נ־ס־ה',
      strikes: 3,
      goal: 10,
      targets: ['מנסה', 'ניסיון', 'לנסות', 'ניסיונות', 'ננסה', 'ניסיתי'],
      distractors: ['מחשב', 'כדור', 'חלון', 'ספר', 'גשר', 'שולחן', 'דלת', 'עיפרון'],
      fbBad: 'למפלצת הזו אין מילה ממשפחת נ־ס־ה!',
      restartMsg: 'המפלצות חוזרות! הפעם חפשו את האותיות נ, ס בתוך המילה 🔄',
      doneFeedback: 'תפסתם 10 מפלצות של משפחת נ־ס־ה! 🎈',
    },
    /* ---- 4. קטע קצר ---- */
    {
      type: 'reading',
      kicker: 'שלב 4 · קטע קצר',
      title: 'למה לא מוותרים?',
      guide: 'עכשיו קטע קצרצר, רק שלושה משפטים. קראו וסמנו בלחיצה את המשפט שנראה לכם הכי חשוב.',
      sceneImage: 'assets/img/unit1-retry.png',
      sceneSvg: 'RETRY_SCENE_SVG',
      paragraphs: [
        [
          'כשמצליחים לעבור שלב קשה במשחק, המוח משחרר חומרים שגורמים להרגשה טובה.',
          'זו הסיבה שרוצים לנסות שוב ושוב גם אחרי שנכשלים.',
          'שחקנים טובים הם אלה שממשיכים לנסות.',
        ],
      ],
      shortMode: true,
    },
    /* ---- 5. שאלה אחת על הקטע ---- */
    {
      type: 'mcq-set',
      kicker: 'שלב 5 · שאלת הבנה',
      title: 'רגע של חשיבה',
      guide: 'שאלה אחת על הקטע שקראנו. אפשר להציץ בו שוב, הוא ממש כאן למטה!',
      strikes: 3,
      questions: [
        {
          label: 'מידע מפורש',
          q: 'למה רוצים לנסות שוב ושוב אחרי שנכשלים במשחק?',
          refText: 'כשמצליחים לעבור שלב קשה במשחק, המוח משחרר חומרים שגורמים להרגשה טובה. זו הסיבה שרוצים לנסות שוב ושוב גם אחרי שנכשלים. שחקנים טובים הם אלה שממשיכים לנסות.',
          options: [
            'כי המשחק קל מאוד',
            'כי המוח משחרר חומרים שגורמים להרגשה טובה',
            'כי חברים מבקשים מאיתנו',
          ],
          correct: 1,
          fbGood: 'נכון! כתוב ממש בקטע. המוח שלנו אוהב הצלחה 🧠',
        },
      ],
      fbBadDefault: 'כמעט! התשובה מתחבאת בקטע שלמעלה 💪',
      restartMsg: 'קוראים את הקטע עוד פעם אחת ומנסים שוב 🔄',
    },
    /* ---- 6. משחקון ארקייד: מפלצות לילה מעופפות ---- */
    {
      type: 'catch-game',
      theme: 'night',
      kicker: 'שלב 6 · משחקון!',
      title: '🌙 מפלצות הלילה של ה־צ־ל־ח',
      guide: 'ירד הלילה, והמפלצות המעופפות יצאו לטוס! תפסו רק מפלצות שמחזיקות מילים ממשפחת ה־צ־ל־ח!',
      family: 'ה־צ־ל־ח',
      strikes: 3,
      goal: 10,
      targets: ['הצליח', 'הצלחה', 'מצליחים', 'להצליח', 'נצליח', 'הצלחות'],
      distractors: ['כוכב', 'ירח', 'מסך', 'עכבר', 'אורות', 'לילה', 'שמיים', 'ענן'],
      fbBad: 'למפלצת הזו אין מילה ממשפחת ה־צ־ל־ח!',
      restartMsg: 'המפלצות ממריאות שוב! חפשו את האותיות צ, ל, ח 🔄',
      doneFeedback: 'תפסתם 10 מפלצות לילה של ההצלחה! 🌙',
    },
    /* ---- 7. הפסקה הגדולה ---- */
    {
      type: 'reading',
      kicker: 'שלב 7 · עכשיו אנחנו מוכנים!',
      title: 'בונים עולמות',
      guide: 'אחרי כל האימונים, הגיע הזמן לפסקה אמיתית וגדולה. אתם כבר מכירים את המילים שלה! סמנו את המשפט הכי חשוב. טיפ ממני: הרבה פעמים המשפט החשוב מתחבא בתחילת הפסקה, אבל לא תמיד. לפעמים הוא דווקא מחכה בסוף!',
      paragraphs: [
        [
          'יש ילדים שמצליחים לבנות עולמות שלמים בתוך משחקי מחשב, ולא מדובר רק בכמה בתים קטנים.',
          'הם מתכננים ערים עם כבישים, גשרים ואפילו מבנים מורכבים במיוחד.',
          'לפעמים הם עובדים על אותו עולם במשך שבועות ארוכים, משנים פרטים קטנים ומוסיפים רעיונות חדשים.',
          'יש כאלה שמשתפים את העולם שבנו עם שחקנים אחרים, שממשיכים לפתח אותו.',
          'כך משחק הופך למשהו הרבה יותר גדול ממשחק רגיל.',
        ],
      ],
    },
    /* ---- 8. כותרות לשני הקטעים ---- */
    {
      type: 'mcq-set',
      kicker: 'שלב 8 · בוחרים כותרת',
      title: 'איזו כותרת הכי מדויקת?',
      guide: 'כותרת טובה אומרת את הרעיון הגדול של הקטע, לא רק פרט אחד ממנו. בהצלחה!',
      strikes: 3,
      questions: [
        {
          label: 'הקטע הקצר שקראנו',
          q: 'איזו כותרת הכי מתאימה לקטע על המוח והניסיונות?',
          refText: 'כשמצליחים לעבור שלב קשה במשחק, המוח משחרר חומרים שגורמים להרגשה טובה. זו הסיבה שרוצים לנסות שוב ושוב גם אחרי שנכשלים.',
          options: ['איך ללמוד מתמטיקה', 'משחקים מפחידים', 'למה המוח אוהב להצליח'],
          correct: 2,
          fbGood: 'נכון מאוד! הקטע מסביר מה קורה במוח כשמצליחים 🧠',
        },
        {
          label: 'הפסקה הגדולה',
          q: 'איזו כותרת הכי מתאימה לפסקה על העולמות במשחקים?',
          refText: 'יש ילדים שמצליחים לבנות עולמות שלמים בתוך משחקי מחשב... הם מתכננים ערים עם כבישים, גשרים ואפילו מבנים מורכבים במיוחד... כך משחק הופך למשהו הרבה יותר גדול ממשחק רגיל.',
          options: ['ילדים שאוהבים לישון', 'בונים עולמות דיגיטליים', 'משחקים פשוטים'],
          correct: 1,
          fbGood: 'בדיוק! הפסקה כולה מדברת על בניית עולמות 🏗️',
        },
      ],
      fbBadDefault: 'כמעט! כותרת טובה אומרת את הרעיון הגדול, לא רק פרט אחד',
      restartMsg: 'לפני שבוחרים, קראו את הקטע ושאלו: על מה כולו מדבר? 🔄',
    },
    /* ---- 9. המפלצות הרעבות: מאכילים כל מפלצת במשפחה שלה ---- */
    {
      type: 'feed-game',
      kicker: 'שלב 9 · המפלצות הרעבות!',
      title: '👾 כל מפלצת אוכלת רק משפחה אחת',
      guide: 'המפלצות רעבות, אבל הן בררניות: כל מפלצת אוכלת רק מילים מהמשפחה שלה! לחצו על המפלצת הנכונה כדי להאכיל אותה במילה.',
      strikes: 3,
      eaters: [
        { family: 'ב־נ־ה', color: '#a06ae0', dark: '#7d48bd' },
        { family: 'נ־ס־ה', color: '#ef6fa7', dark: '#cc4d86' },
        { family: 'ל־מ־ד', color: '#5cbb4e', dark: '#3f9433' },
        { family: 'ה־צ־ל־ח', color: '#f5953b', dark: '#d2751c' },
      ],
      words: [
        { w: 'בונה', fam: 0 }, { w: 'בנייה', fam: 0 },
        { w: 'מנסה', fam: 1 }, { w: 'ניסיון', fam: 1 },
        { w: 'לומד', fam: 2 }, { w: 'לימוד', fam: 2 },
        { w: 'הצליח', fam: 3 }, { w: 'הצלחה', fam: 3 },
      ],
      fbBad: 'איכס! המפלצת הזו לא אוכלת את המשפחה הזו. חפשו את אותיות השורש 🔎',
      restartMsg: 'המפלצות שוב רעבות! טיפ: חפשו את אותיות השורש בתוך המילה 🔄',
      doneFeedback: 'כל המפלצות שבעות ומאושרות! איזו האכלה מדויקת 👾',
    },
    /* ---- 10. טעות בכוונה ---- */
    {
      type: 'mcq-set',
      kicker: 'שלב 10 · טעות בכוונה',
      title: 'מצאו את השגיאה! ❌',
      guide: 'מישהו כתב כאן משפט עם שגיאה אחת. רק אתם יכולים לתקן אותה!',
      strikes: 3,
      questions: [
        {
          label: 'המשפט השגוי',
          q: '"הוא עשה הרבה ניסיון ולבסוף הצליח"',
          options: [
            '"הוא עשה הרבה ניסיונות ולבסוף הצליח"',
            '"הוא עשה הרבה ניסיון ולבסוף הצלחה"',
            '"הוא ניסה הרבה ניסיון ולבסוף הצליח"',
          ],
          correct: 0,
          fbGood: 'בדיוק! "ניסיון" זה פעם אחת. כשמדברים על הרבה פעמים אומרים "ניסיונות". אותה משפחה, צורה שונה 💡',
        },
      ],
      fbBadDefault: 'קראו שוב בקול. מה מרגיש לא נכון במשפט?',
      restartMsg: 'ננסה שוב מההתחלה 🔄',
    },
    /* ---- 11. אנקדוטה ---- */
    {
      type: 'anecdote',
      kicker: 'שלב 11 · תגלית של היום',
      title: 'שמתם לב למשהו מגניב? 💡',
      words: ['בונה', 'בנייה', 'לבנות'],
      text: 'שלוש מילים שונות, אבל כולן מדברות על אותה פעולה.\nזה הסוד של משפחות המילים: אותה משמעות בתוך צורות שונות.',
      tip: '🔍 בפעם הבאה שתראו מילה שאתם לא מכירים, חפשו מילה מאותה משפחה שאתם כן מכירים!',
    },
    /* ---- 12. סיכום ---- */
    {
      type: 'summary',
      kicker: 'שלב 12 · סיכום',
      title: 'ספר המסע 📖',
      guide: 'איזה מסע עברנו היום! מסמנים מה למדנו, בוחרים מילה אחת לקחת, וזוכים בפרס!',
      checks: [
        'התחלתי ממשפט אחד וסיימתי פסקה שלמה!',
        'תפסתי מילים באוויר והאכלתי מפלצות בררניות',
        'גיליתי שמילים ממשפחה אחת חולקות אותה משמעות',
      ],
      wordPrompt: 'מילה אחת שאקח איתי מהיחידה:',
    },
  ],
};

/* מפלצת מצחיקה — המוטיב המרכזי של כל משחקוני הקורס.
   variant: 0 רגילה · 1 קיקלופ (עין אחת) · 2 שלוש עיניים ולשון בחוץ */
function MONSTER_SVG(color, dark, variant = 0) {
  const eyes = variant === 1
    ? `<circle cx="60" cy="42" r="15" fill="#fff"/>
       <circle cx="60" cy="44" r="7" fill="#222"/>
       <circle cx="63" cy="41" r="2.4" fill="#fff"/>`
    : variant === 2
    ? `<circle cx="40" cy="40" r="9" fill="#fff"/><circle cx="60" cy="34" r="9" fill="#fff"/><circle cx="80" cy="40" r="9" fill="#fff"/>
       <circle cx="41" cy="42" r="4" fill="#222"/><circle cx="60" cy="36" r="4" fill="#222"/><circle cx="79" cy="42" r="4" fill="#222"/>`
    : `<circle cx="45" cy="42" r="11" fill="#fff"/>
       <circle cx="75" cy="42" r="11" fill="#fff"/>
       <circle cx="47" cy="44" r="5" fill="#222"/>
       <circle cx="73" cy="44" r="5" fill="#222"/>
       <circle cx="49" cy="42" r="1.8" fill="#fff"/>
       <circle cx="75" cy="42" r="1.8" fill="#fff"/>`;
  const tongue = variant === 2
    ? `<path d="M68 86 Q74 100 64 102 Q58 96 62 87 Z" fill="#e86a6a"/>`
    : '';
  return `
<svg viewBox="0 0 120 112" aria-hidden="true">
  <!-- מחושים -->
  <path d="M42 20 Q38 8 32 6" fill="none" stroke="${dark}" stroke-width="4" stroke-linecap="round"/>
  <circle cx="31" cy="5" r="5" fill="${dark}"/>
  <path d="M78 20 Q82 8 88 6" fill="none" stroke="${dark}" stroke-width="4" stroke-linecap="round"/>
  <circle cx="89" cy="5" r="5" fill="${dark}"/>
  <!-- גוף -->
  <ellipse cx="60" cy="62" rx="46" ry="44" fill="${color}"/>
  <circle cx="28" cy="46" r="6" fill="${dark}" opacity=".45"/>
  <circle cx="92" cy="40" r="5" fill="${dark}" opacity=".45"/>
  <circle cx="86" cy="82" r="7" fill="${dark}" opacity=".35"/>
  ${eyes}
  <!-- פה גדול -->
  <g class="monster-mouth">
    <ellipse cx="60" cy="76" rx="22" ry="15" fill="#4a1515"/>
    <path d="M40 70 Q60 62 80 70 L80 73 Q60 66 40 73 Z" fill="#fff"/>
    <ellipse cx="60" cy="85" rx="11" ry="5.5" fill="#e86a6a"/>
  </g>
  ${tongue}
</svg>`;
}

/* מפתח שמות סצנות ל-SVG (ל-mountScene במנוע) — מוגדר בסוף הקובץ */
const SCENE_SVGS = {};

/* --- נכסי תמונה שנוצרו ב-GPT. אם קובץ חסר, הקוד נופל חזרה ל-SVG --- */
const ASSETS = { mapBg: false, owl: false, monsters: false, unitBg: false };
const MONSTER_IMAGES = [
  'assets/img/monster-1.png', 'assets/img/monster-2.png', 'assets/img/monster-3.png',
  'assets/img/monster-4.png', 'assets/img/monster-5.png', 'assets/img/monster-6.png',
];
const OWL_IMAGE = 'assets/img/owl-idle.png';
const MAP_BG_IMAGE = 'assets/img/map-background.png';
const UNIT_BG_IMAGE = 'assets/img/unit-background.png';

/* צבעי מפלצות למשחקוני הארקייד */
const ARCADE_MONSTER_COLORS = [
  ['#a06ae0', '#7d48bd'], ['#ef6fa7', '#cc4d86'], ['#5cbb4e', '#3f9433'],
  ['#f5953b', '#d2751c'], ['#4aa3e8', '#2f7fc2'], ['#e05c5c', '#b53c3c'],
];

/* רוני בונה עולם — תמונת המשפט הראשון (עד תמונת ה-AI) */
const RONI_SCENE_SVG = `
<svg viewBox="0 0 800 300" role="img" aria-label="רוני בונה מגדל קוביות צבעוני בתוך משחק מחשב">
  <rect width="800" height="300" fill="#bfe3f7"/>
  <circle cx="690" cy="55" r="30" fill="#ffd94d"/>
  <ellipse cx="180" cy="55" rx="50" ry="16" fill="#fff" opacity=".9"/>
  <rect y="230" width="800" height="70" fill="#7cc94e"/>
  <!-- מסגרת מסך משחק -->
  <rect x="180" y="30" width="440" height="240" rx="14" fill="#3d3d4d"/>
  <rect x="192" y="42" width="416" height="216" rx="8" fill="#dff6ff"/>
  <rect x="192" y="210" width="416" height="48" fill="#8fd45f"/>
  <!-- מגדל קוביות -->
  <rect x="330" y="162" width="46" height="46" rx="6" fill="#ef6fa7"/>
  <rect x="378" y="162" width="46" height="46" rx="6" fill="#4aa3e8"/>
  <rect x="354" y="114" width="46" height="46" rx="6" fill="#f5b301"/>
  <rect x="354" y="64" width="46" height="46" rx="6" fill="#5cbb4e" opacity=".65" stroke="#3f9433" stroke-dasharray="6 5" stroke-width="3"/>
  <!-- רוני (דמות בלוב סגולה) מחזיקה קובייה -->
  <ellipse cx="255" cy="185" rx="34" ry="36" fill="#a06ae0"/>
  <circle cx="245" cy="172" r="9" fill="#fff"/><circle cx="267" cy="172" r="9" fill="#fff"/>
  <circle cx="247" cy="174" r="4" fill="#222"/><circle cx="265" cy="174" r="4" fill="#222"/>
  <path d="M244 196 Q255 205 266 196" fill="none" stroke="#222" stroke-width="3.5" stroke-linecap="round"/>
  <rect x="284" y="150" width="30" height="30" rx="5" fill="#5cbb4e"/>
  <ellipse cx="288" cy="182" rx="9" ry="12" fill="#a06ae0" transform="rotate(-30 288 182)"/>
  <!-- לבבות הצלחה -->
  <text x="540" y="80" font-size="26">💚</text>
  <text x="570" y="110" font-size="20">✨</text>
</svg>`;

/* לא מוותרים — תמונת הקטע הקצר (עד תמונת ה-AI) */
const RETRY_SCENE_SVG = `
<svg viewBox="0 0 800 300" role="img" aria-label="דמות נחושה מול מסך משחק שמציע לנסות שוב">
  <rect width="800" height="300" fill="#2a2e66"/>
  <circle cx="120" cy="60" r="3" fill="#fff"/><circle cx="240" cy="40" r="2" fill="#fff"/>
  <circle cx="680" cy="50" r="3" fill="#ffe58a"/><circle cx="600" cy="90" r="2" fill="#fff"/>
  <circle cx="90" cy="140" r="2" fill="#fff"/><circle cx="720" cy="160" r="2" fill="#fff"/>
  <!-- מסך המשחק -->
  <rect x="250" y="40" width="300" height="200" rx="14" fill="#3d3d4d"/>
  <rect x="262" y="52" width="276" height="176" rx="8" fill="#1c2144"/>
  <text x="400" y="120" font-size="34" text-anchor="middle" fill="#ffd94d" font-family="Rubik, sans-serif" font-weight="bold">נסו שוב!</text>
  <text x="400" y="170" font-size="30" text-anchor="middle" fill="#ef6fa7">💪 ⭐ 💪</text>
  <!-- דמות נחושה -->
  <ellipse cx="160" cy="215" rx="42" ry="44" fill="#4aa3e8"/>
  <circle cx="148" cy="200" r="10" fill="#fff"/><circle cx="174" cy="200" r="10" fill="#fff"/>
  <circle cx="151" cy="202" r="4.5" fill="#222"/><circle cx="171" cy="202" r="4.5" fill="#222"/>
  <path d="M144 190 L158 194 M180 190 L166 194" stroke="#222" stroke-width="3" stroke-linecap="round"/>
  <path d="M148 228 Q160 236 172 228" fill="none" stroke="#222" stroke-width="4" stroke-linecap="round"/>
  <ellipse cx="205" cy="180" rx="10" ry="14" fill="#4aa3e8" transform="rotate(40 205 180)"/>
  <!-- מפלצת מעודדת -->
  <ellipse cx="660" cy="230" rx="36" ry="34" fill="#5cbb4e"/>
  <circle cx="660" cy="216" r="12" fill="#fff"/><circle cx="660" cy="218" r="5.5" fill="#222"/>
  <ellipse cx="660" cy="244" rx="14" ry="8" fill="#4a1515"/>
  <path d="M628 208 Q620 196 612 194" fill="none" stroke="#3f9433" stroke-width="4" stroke-linecap="round"/>
  <text x="660" y="180" font-size="22" text-anchor="middle">📣</text>
</svg>`;

/* placeholder לתמונת ההטרמה של יחידה 1 — סצנת עיר נבנית (עד תמונת ה-AI) */
const UNIT1_SCENE_SVG = `
<svg viewBox="0 0 800 340" role="img" aria-label="עיר דיגיטלית בבנייה: מגדלים, גשר, כביש, מנוף ומחשב">
  <rect width="800" height="340" fill="#bfe3f7"/>
  <circle cx="700" cy="60" r="34" fill="#ffd94d"/>
  <ellipse cx="150" cy="60" rx="55" ry="18" fill="#fff" opacity=".9"/>
  <ellipse cx="420" cy="40" rx="45" ry="15" fill="#fff" opacity=".9"/>
  <rect y="250" width="800" height="90" fill="#7cc94e"/>
  <path d="M0 300 L800 300" stroke="#8d8d8d" stroke-width="34"/>
  <path d="M0 300 L800 300" stroke="#fff" stroke-width="4" stroke-dasharray="26 22"/>
  <rect x="70" y="120" width="80" height="130" fill="#5b8fd4" rx="4"/>
  <rect x="82" y="132" width="18" height="18" fill="#dff0fb"/><rect x="112" y="132" width="18" height="18" fill="#dff0fb"/>
  <rect x="82" y="162" width="18" height="18" fill="#dff0fb"/><rect x="112" y="162" width="18" height="18" fill="#dff0fb"/>
  <rect x="82" y="192" width="18" height="18" fill="#ffe58a"/><rect x="112" y="192" width="18" height="18" fill="#dff0fb"/>
  <rect x="180" y="80" width="70" height="170" fill="#e8955f" rx="4"/>
  <rect x="192" y="94" width="16" height="16" fill="#fdf6e3"/><rect x="220" y="94" width="16" height="16" fill="#fdf6e3"/>
  <rect x="192" y="124" width="16" height="16" fill="#fdf6e3"/><rect x="220" y="124" width="16" height="16" fill="#ffe58a"/>
  <rect x="192" y="154" width="16" height="16" fill="#fdf6e3"/><rect x="220" y="154" width="16" height="16" fill="#fdf6e3"/>
  <rect x="290" y="140" width="90" height="110" fill="#c9c9c9" rx="4"/>
  <line x1="290" y1="170" x2="380" y2="170" stroke="#9c6b3c" stroke-width="5"/>
  <line x1="290" y1="205" x2="380" y2="205" stroke="#9c6b3c" stroke-width="5"/>
  <line x1="305" y1="140" x2="305" y2="250" stroke="#9c6b3c" stroke-width="5"/>
  <line x1="360" y1="140" x2="360" y2="250" stroke="#9c6b3c" stroke-width="5"/>
  <line x1="430" y1="250" x2="430" y2="70" stroke="#f5b301" stroke-width="10"/>
  <line x1="430" y1="80" x2="560" y2="80" stroke="#f5b301" stroke-width="8"/>
  <line x1="545" y1="80" x2="545" y2="140" stroke="#6b543c" stroke-width="4"/>
  <rect x="527" y="140" width="36" height="26" fill="#d9534f" rx="3"/>
  <path d="M580 250 Q670 160 780 250" fill="none" stroke="#8a5a2b" stroke-width="12"/>
  <line x1="600" y1="250" x2="600" y2="222" stroke="#8a5a2b" stroke-width="6"/>
  <line x1="650" y1="250" x2="650" y2="196" stroke="#8a5a2b" stroke-width="6"/>
  <line x1="700" y1="250" x2="700" y2="200" stroke="#8a5a2b" stroke-width="6"/>
  <line x1="750" y1="250" x2="750" y2="230" stroke="#8a5a2b" stroke-width="6"/>
  <text x="60" y="310" font-size="30">🌼</text>
</svg>`;

/* רישום הסצנות במפתח (אחרי שכולן הוגדרו) */
SCENE_SVGS.UNIT1_SCENE_SVG = UNIT1_SCENE_SVG;
SCENE_SVGS.RONI_SCENE_SVG = RONI_SCENE_SVG;
SCENE_SVGS.RETRY_SCENE_SVG = RETRY_SCENE_SVG;
