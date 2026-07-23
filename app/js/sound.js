/* ============================================================
   קוראים חכמים — אפקטים קוליים
   מסונתז ב-WebAudio, בלי קובצי אודיו. נוצר רק אחרי מחוות משתמש
   (כל ההשמעות מגיעות מתוך לחיצות, אז מדיניות autoplay מרוצה).
   ============================================================ */
const Sound = {
  _ctx: null,

  ctx() {
    if (!this._ctx) this._ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (this._ctx.state === 'suspended') this._ctx.resume();
    return this._ctx;
  },

  /* צליל בודד: תדר, משך, צורת גל, השהיה, עוצמה, גלישת תדר */
  tone(freq, dur = .15, type = 'sine', delay = 0, vol = .12, slideTo = null) {
    const ctx = this.ctx();
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo) osc.frequency.linearRampToValueAtTime(slideTo, t0 + dur);
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(vol, t0 + .015);
    gain.gain.exponentialRampToValueAtTime(.001, t0 + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + .05);
  },

  play(name) {
    if (typeof S !== 'undefined' && S.muted) return;
    try {
      switch (name) {
        case 'correct':
          this.tone(660, .12); this.tone(880, .2, 'sine', .09);
          break;
        case 'wrong':
          this.tone(200, .18, 'sawtooth', 0, .07);
          this.tone(160, .22, 'sawtooth', .12, .07);
          break;
        case 'pop':
          this.tone(520, .1, 'triangle', 0, .2, 180);
          break;
        case 'coin':
          this.tone(990, .07, 'square', 0, .05);
          this.tone(1320, .13, 'square', .06, .05);
          break;
        case 'chomp':
          this.tone(160, .12, 'sine', 0, .28, 60);
          this.tone(110, .1, 'sine', .1, .2, 50);
          break;
        case 'streak':
          this.tone(880, .08); this.tone(1100, .08, 'sine', .06);
          this.tone(1320, .16, 'sine', .12);
          break;
        case 'fanfare':
          this.tone(523, .16, 'triangle', 0, .14);
          this.tone(659, .16, 'triangle', .13, .14);
          this.tone(784, .16, 'triangle', .26, .14);
          this.tone(1047, .4, 'triangle', .39, .16);
          break;
        case 'click':
          this.tone(420, .06, 'sine', 0, .06);
          break;
      }
    } catch (e) { /* אין אודיו — ממשיכים בשקט */ }
  },
};
