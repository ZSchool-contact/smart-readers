/* ============================================================
   קוראים חכמים — גשר ל-TeachPal (campus.z-school.co.il)
   ============================================================
   כשהאפליקציה רצה בתוך iframe של מערכת הלמידה, כל השלמת יחידה
   מדווחת להורה ב-postMessage, וההתקדמות שנצברה קודם מסונכרנת
   פעם אחת בעלייה. בריצה עצמאית (קובץ מקומי / GitHub Pages ישיר)
   אף הודעה לא נשלחת והחוויה לא משתנה. */

/* נרשם על window במפורש — const גלובלי לא נגיש דרך window (מלכודת מוכרת) */
window.LMS = {
  MSG_TYPE: 'smart-readers-unit-complete',

  embedded() {
    try { return window.parent && window.parent !== window; } catch (e) { return true; }
  },

  /* מדווח על השלמת יחידה. ההודעה נבלעת אם אין הורה מאזין. */
  report(unitId) {
    if (!this.embedded()) return;
    try {
      window.parent.postMessage({ type: this.MSG_TYPE, unitId: unitId }, '*');
    } catch (e) { /* דיווח הוא שכבה נוספת — כשל בו לא עוצר את המשחק */ }
  },

  /* התקדמות שנצברה לפני החיבור למערכת (או במכשיר הזה בריצה עצמאית)
     מדווחת בעלייה; המערכת מתעלמת ממה שכבר רשום אצלה. */
  syncAll() {
    if (!this.embedded()) return;
    S.completed.forEach(id => this.report(id));
  },
};

LMS.syncAll();
