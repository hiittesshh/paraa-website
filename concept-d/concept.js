/* Concept D: "Downside First".
   Part 1 = pure maths and formatting (no DOM, so Node can test it).
   Part 2 = DOM wiring, only when running in a browser. */
'use strict';

/* ======================================================================
   PART 1: PURE FUNCTIONS
   ====================================================================== */

// Config gates (02-concepts.md D10). The stress-test archive is built behind a flag.
// Default 'on' (the spec ships the section); Compliance may switch it 'off'.
// A URL override `?stress=off` also works, for reviewing both states.
var CONFIG = { stress: 'on' };

// Fee drag used by the simulator: fixed 2.5% a year (Illustrative, D3).
var FEE_DRAG = 0.025;

// The fee schedule, the same as Concept A's receipt (A5.5, Illustrative). Used by the exit example.
var FEES = { fxIn: 0.005, entry: 0.00, mgmt: 0.015, exit: 0.01, exitUnderMonths: 12, fxOut: 0.005 };

// Shared illustrative dataset §0.4: Basket 1 month-end NAV in US$ (dummy).
var NAV_SERIES = [
  ['2024-07', 10.00], ['2024-08', 10.12], ['2024-09', 10.31], ['2024-10', 10.18], ['2024-11', 10.40], ['2024-12', 10.52],
  ['2025-01', 10.61], ['2025-02', 10.47], ['2025-03', 10.79], ['2025-04', 10.11], ['2025-05', 9.88], ['2025-06', 9.52],
  ['2025-07', 9.71], ['2025-08', 9.98], ['2025-09', 10.39], ['2025-10', 10.30], ['2025-11', 10.47], ['2025-12', 10.58],
  ['2026-01', 10.44], ['2026-02', 10.62], ['2026-03', 10.71], ['2026-04', 10.66], ['2026-05', 10.82], ['2026-06', 10.95],
  ['2026-07', 10.88], ['2026-08', 11.02], ['2026-09', 10.97], ['2026-10', 11.06]
];

// Sample 2026 holidays for the exit estimator (Illustrative, 4 each, D5 §7).
var IN_HOLIDAYS = ['2026-01-26', '2026-03-04', '2026-10-02', '2026-12-25'];
var US_HOLIDAYS = ['2026-01-01', '2026-07-03', '2026-11-26', '2026-12-25'];
var CUTOFF_HHMM = '15:00'; // 3 pm IST, TO CONFIRM

var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var MINUS = '−'; // R10: the minus sign is U+2212

/* ---------- Loss simulator (D3, D6 §2) ----------
   Year by year: asset move, then currency move, then fee drag.
   For 1 year this is exactly the spec's maths; for N years it equals
   A × ((1+s)(1+c)(1−fee))^N, and the three effects always sum to end − A. */
function simulate(amount, s, c, years, feeRate) {
  years = years || 1;
  feeRate = feeRate == null ? FEE_DRAG : feeRate;
  var v = amount, assetEffect = 0, fxEffect = 0, feeEffect = 0;
  for (var y = 0; y < years; y++) {
    var afterAsset = v * (1 + s);
    assetEffect += afterAsset - v;
    var afterFX = afterAsset * (1 + c);
    fxEffect += afterFX - afterAsset;
    var fees = afterFX * feeRate;
    feeEffect -= fees;
    v = afterFX - fees;
  }
  return { start: amount, end: v, change: v - amount, assetEffect: assetEffect, fxEffect: fxEffect, feeEffect: feeEffect };
}

/* ---------- Exit cost example (D6 §3, risks.html): the full fee schedule, not just the exit fee ----------
   Conversion in, then a monthly management fee, then the exit fee (under 12 months), then conversion out.
   Full precision throughout; rounding happens only in formatInr. */
function exitCosts(amount, months, rAnnual) {
  rAnnual = rAnnual || 0;
  var fxIn = amount * FEES.fxIn;
  var entry = (amount - fxIn) * FEES.entry;
  var v = amount - fxIn - entry, mgmt = 0;
  for (var m = 0; m < months; m++) {
    v = v * Math.pow(1 + rAnnual, 1 / 12);
    var mgmtM = v * FEES.mgmt / 12;
    v -= mgmtM;
    mgmt += mgmtM;
  }
  var exit = months < FEES.exitUnderMonths ? v * FEES.exit : 0;
  var fxOut = (v - exit) * FEES.fxOut;
  return { fxIn: fxIn, entry: entry, mgmt: mgmt, exit: exit, fxOut: fxOut, net: v - exit - fxOut };
}

/* ---------- Stress-test ₹ column (D5 §4): (1 + basket) × (1 + usdInrChange) − 1 ---------- */
function stressRupee(basket, usdInrChange) {
  return (1 + basket) * (1 + usdInrChange) - 1;
}

/* Two-move combination used in the balance section (D5 §5), before fees */
function combine(a, b) { return (1 + a) * (1 + b) - 1; }

/* ---------- NAV statistics from the dataset (never hard-coded, §0.4) ---------- */
function monthLabel(ym) {
  var p = ym.split('-');
  return MONTHS[Number(p[1]) - 1] + ' ' + p[0];
}
function navStats(series) {
  var first = series[0][1], last = series[series.length - 1][1];
  var months = series.length - 1;
  var since = last / first - 1;
  var strongest = { r: -Infinity }, weakest = { r: Infinity }, negative = 0;
  for (var i = 1; i < series.length; i++) {
    var r = series[i][1] / series[i - 1][1] - 1;
    if (r < 0) negative++;
    if (r > strongest.r) strongest = { r: r, month: monthLabel(series[i][0]) };
    if (r < weakest.r) weakest = { r: r, month: monthLabel(series[i][0]) };
  }
  // Max drawdown: largest fall from a running peak to a later trough.
  var peakIdx = 0, dd = { r: 0, peakIdx: 0, troughIdx: 0 };
  for (var j = 1; j < series.length; j++) {
    if (series[j][1] > series[peakIdx][1]) peakIdx = j;
    var d = series[j][1] / series[peakIdx][1] - 1;
    if (d < dd.r) dd = { r: d, peakIdx: peakIdx, troughIdx: j };
  }
  // Recovery: first month-end above the old peak, after the trough.
  var recIdx = -1;
  for (var k = dd.troughIdx + 1; k < series.length; k++) {
    if (series[k][1] > series[dd.peakIdx][1]) { recIdx = k; break; }
  }
  return {
    sinceInception: since,
    annualised: Math.pow(1 + since, 12 / months) - 1,
    months: months,
    strongest: strongest,
    weakest: weakest,
    maxDrawdown: {
      r: dd.r,
      peak: monthLabel(series[dd.peakIdx][0]),
      trough: monthLabel(series[dd.troughIdx][0]),
      recovered: recIdx > -1 ? monthLabel(series[recIdx][0]) : null,
      recoveryMonths: recIdx > -1 ? recIdx - dd.peakIdx : null
    },
    negativeMonths: negative
  };
}

/* ---------- Exit timeline (D5 §7). Dates are ISO 'YYYY-MM-DD', maths in UTC. ---------- */
function parseIso(iso) { var p = iso.split('-'); return new Date(Date.UTC(+p[0], +p[1] - 1, +p[2])); }
function toIso(d) { return d.toISOString().slice(0, 10); }
function addDays(iso, n) { var d = parseIso(iso); d.setUTCDate(d.getUTCDate() + n); return toIso(d); }
function isBusinessDay(iso, holidays) {
  var wd = parseIso(iso).getUTCDay();
  return wd !== 0 && wd !== 6 && holidays.indexOf(iso) === -1;
}
function nextBusinessDay(iso, holidays) {
  var d = addDays(iso, 1);
  while (!isBusinessDay(d, holidays)) d = addDays(d, 1);
  return d;
}
function addBusinessDays(iso, n, holidays) {
  var d = iso;
  for (var i = 0; i < n; i++) d = nextBusinessDay(d, holidays);
  return d;
}
function exitTimeline(dateIso, timeHHMM) {
  var late = (timeHHMM || '00:00') > CUTOFF_HHMM; // exactly 3 pm still counts as before the cut-off
  // T: the request date, unless after the cut-off or not an Indian business day.
  var t = (!late && isBusinessDay(dateIso, IN_HOLIDAYS)) ? dateIso : nextBusinessDay(dateIso, IN_HOLIDAYS);
  var usd = addBusinessDays(t, 2, US_HOLIDAYS);   // US$ settle: T + 2 (US calendar)
  var inr = addBusinessDays(usd, 2, IN_HOLIDAYS); // ₹ credit: + 2 (Indian calendar)
  return { counted: t, nav: t, usdSettle: usd, inrCredit: inr };
}

/* ---------- Fit quiz (D5 §3) ---------- */
var QUIZ_REASONS = {
  'q1:R': { text: 'Money you need within a year shouldn’t sit in something that can fall 15%.' },
  'q1:A': { text: 'One to three years is short. Basket 1’s deepest fall took 14 months to recover (Illustrative).' },
  'q2:R': { text: 'If a 15% fall would make you sell, you would likely turn a temporary fall into a real loss.' },
  'q2:A': { text: 'Worrying is normal. Read how often falls happen before you decide.' },
  'q3:A': { text: 'If you’ll spend this in rupees within 2 years, a stronger rupee could shrink it just when you need it.' },
  'q4:R': { text: 'Emergency money and borrowed money shouldn’t be in something that can fall.' },
  'q5:A': { text: 'You may already hold enough in dollars.', link: { href: 'risks.html#dont', label: 'Check the cheaper DIY routes first' } }
};
function fitResult(answers) {
  var keys = ['q1', 'q2', 'q3', 'q4', 'q5'];
  var reds = [], ambers = [];
  keys.forEach(function (q) {
    if (answers[q] === 'R') reds.push(q + ':R');
    if (answers[q] === 'A') ambers.push(q + ':A');
  });
  if (reds.length) return { verdict: 'no', reasons: reds };
  if (ambers.length) return { verdict: 'maybe', reasons: ambers };
  return { verdict: 'fit', reasons: [] };
}

/* ---------- Formatting (R10 + audit §6 rule 1) ----------
   Round half-up on the size of the number (so −2.5 → −3, as +2.5 → +3), only at display. Never ceil/floor. */
function roundHalfUp(n, step) {
  step = step || 1;
  var r = Math.round(Math.abs(n) / step) * step;
  return n < 0 ? -r : r;
}
function groupIndian(digits) {
  var last3 = digits.slice(-3), rest = digits.slice(0, -3);
  return rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3 : last3;
}
function formatInr(n, signed) {
  var r = roundHalfUp(n);
  var body = '₹' + groupIndian(String(Math.abs(r)));
  if (r < 0) return MINUS + body;
  if (signed && r > 0) return '+' + body;
  return body;
}
function formatPct(x, digits, signed) {
  digits = digits == null ? 1 : digits;
  var v = roundHalfUp(x * 100 * Math.pow(10, digits)) / Math.pow(10, digits);
  var body = Math.abs(v).toFixed(digits) + '%';
  if (v < 0) return MINUS + body;
  if (signed !== false && v > 0) return '+' + body;
  return body;
}
function formatDate(iso, withYear) {
  var d = parseIso(iso);
  return DAYS[d.getUTCDay()] + ' ' + d.getUTCDate() + ' ' + MONTHS[d.getUTCMonth()] + (withYear ? ' ' + d.getUTCFullYear() : '');
}

if (typeof module !== 'undefined') {
  module.exports = {
    CONFIG: CONFIG, FEE_DRAG: FEE_DRAG, FEES: FEES, NAV_SERIES: NAV_SERIES, IN_HOLIDAYS: IN_HOLIDAYS, US_HOLIDAYS: US_HOLIDAYS,
    simulate: simulate, exitCosts: exitCosts, stressRupee: stressRupee, combine: combine, navStats: navStats,
    isBusinessDay: isBusinessDay, nextBusinessDay: nextBusinessDay, addBusinessDays: addBusinessDays,
    exitTimeline: exitTimeline, fitResult: fitResult,
    roundHalfUp: roundHalfUp, formatInr: formatInr, formatPct: formatPct, formatDate: formatDate
  };
}

/* ======================================================================
   PART 2: DOM WIRING
   ====================================================================== */
if (typeof document !== 'undefined') {
  (function () {
    var $ = function (sel, root) { return (root || document).querySelector(sel); };
    var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

    /* --- Config gate: stress-test archive --- */
    try {
      var qs = new URLSearchParams(window.location.search).get('stress');
      if (qs === 'on' || qs === 'off') CONFIG.stress = qs;
    } catch (e) { /* keep default */ }
    if (CONFIG.stress === 'off') $$('[data-flag="stress"]').forEach(function (el) { el.hidden = true; });

    /* --- Sitewide rebrand bar (dismissal remembered, try/catch per §0.1) --- */
    var bar = $('[data-rebrand-bar]');
    if (bar) {
      try { if (localStorage.getItem('paraa-rebrand-dismissed') === '1') bar.hidden = true; } catch (e) { /* storage blocked */ }
      var close = $('[data-rebrand-close]', bar);
      if (close) close.addEventListener('click', function () {
        bar.hidden = true;
        try { localStorage.setItem('paraa-rebrand-dismissed', '1'); } catch (e) { /* storage blocked */ }
      });
    }

    /* --- "For partners" menu: close on outside click or Escape --- */
    $$('.nav-partners').forEach(function (d) {
      document.addEventListener('click', function (e) { if (!d.contains(e.target)) d.removeAttribute('open'); });
      d.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { d.removeAttribute('open'); $('summary', d).focus(); }
      });
    });

    /* --- Dataset-derived figures (computed, not hard-coded) --- */
    var stats = navStats(NAV_SERIES);
    var navText = {
      weakest: formatPct(stats.weakest.r),
      strongest: formatPct(stats.strongest.r),
      drawdown: formatPct(stats.maxDrawdown.r),
      recovery: String(stats.maxDrawdown.recoveryMonths),
      weakestInr: formatInr(100000 * (1 + stats.weakest.r)),
      drawdownInr: formatInr(100000 * (1 + stats.maxDrawdown.r))
    };
    $$('[data-nav]').forEach(function (el) {
      var v = navText[el.getAttribute('data-nav')];
      if (v != null) el.textContent = v;
    });
    var defaultEnd = simulate(100000, -0.15, -0.05, 1).end;
    $$('[data-sim-about]').forEach(function (el) { el.textContent = formatInr(defaultEnd); });

    /* --- 6-month exit example, from the fee schedule --- */
    var exitEx = exitCosts(100000, 6, 0);
    $$('[data-exit-cost]').forEach(function (el) {
      var v = exitEx[el.getAttribute('data-exit-cost')];
      if (v != null) el.textContent = formatInr(v);
    });

    /* --- Stress table ₹ column from the formula --- */
    $$('[data-stress-row]').forEach(function (row) {
      var b = Number(row.getAttribute('data-basket'));
      var u = Number(row.getAttribute('data-usdinr'));
      var cell = $('[data-stress-inr]', row);
      if (!cell) return;
      var r = stressRupee(b, u);
      // Simulated, so no gain/loss colour (audit D4): keep the sign, say "simulated".
      cell.textContent = formatPct(r) + (r < 0 ? ' (simulated loss)' : r > 0 ? ' (simulated gain)' : ' (simulated)');
    });

    /* --- Loss simulator(s) --- */
    $$('[data-sim]').forEach(function (root) {
      var el = function (role) { return $('[data-role="' + role + '"]', root); };
      var amount = el('amount'), asset = el('asset'), fx = el('fx'), years = el('years');
      var presets = $$('[data-preset]', root);

      function parseAmount() {
        var n = Number(String(amount.value).replace(/[^\d]/g, ''));
        return isFinite(n) ? Math.min(n, 1000000000) : 0;
      }
      function fxWords(v) { return v < 0 ? 'rupee stronger' : v > 0 ? 'rupee weaker' : 'no change'; }

      function paintRow(name, value, scale) {
        var span = el('bar-' + name), out = el('val-' + name);
        var w = scale > 0 ? Math.min(100, Math.abs(value) / scale * 100) : 0;
        span.style.width = (Math.round(value) === 0 ? 0 : Math.max(w, 2)) + '%';
        span.classList.toggle('is-neg', value < 0);
        span.classList.toggle('is-pos', value > 0);
        var word = Math.round(value) < 0 ? ' loss' : Math.round(value) > 0 ? ' gain' : '';
        out.textContent = formatInr(value, true) + word;
      }

      function update() {
        var A = parseAmount();
        var s = Number(asset.value) / 100;
        var c = Number(fx.value) / 100;
        var n = years ? Number(years.value) : 1;
        var r = simulate(A, s, c, n);

        el('asset-out').textContent = formatPct(s, 0);
        asset.setAttribute('aria-valuetext', formatPct(s, 0));
        el('fx-out').textContent = formatPct(c, 0) + ' · ' + fxWords(c);
        fx.setAttribute('aria-valuetext', formatPct(c, 0) + ', ' + fxWords(c));
        if (years) {
          var yLabel = n + (n === 1 ? ' year' : ' years');
          el('years-out').textContent = yLabel;
          years.setAttribute('aria-valuetext', yLabel);
        }

        var endR = Math.round(r.end), diff = endR - A;
        var period = n === 1 ? 'in a year like this' : 'over ' + n + ' years like this';
        el('end').textContent = formatInr(endR);
        var sum = el('summary');
        sum.textContent = '';
        var verb = diff < 0 ? 'lost ' : diff > 0 ? 'gained ' : 'ended level, ';
        sum.appendChild(document.createTextNode('You’d have ' + verb));
        if (diff !== 0) {
          var b = document.createElement('strong');
          b.textContent = formatInr(Math.abs(diff));
          sum.appendChild(b);
          sum.appendChild(document.createTextNode(' '));
        }
        sum.appendChild(document.createTextNode(period + '.'));

        // Bars share one scale (30% of the amount) so sizes compare across states.
        var scale = Math.max(A * 0.3, Math.abs(r.assetEffect), Math.abs(r.fxEffect), Math.abs(r.feeEffect));
        paintRow('asset', r.assetEffect, scale);
        paintRow('fx', r.fxEffect, scale);
        paintRow('fee', r.feeEffect, scale);

        presets.forEach(function (p) {
          var v = p.getAttribute('data-preset').split(',').map(Number);
          p.setAttribute('aria-pressed', String(v[0] === Number(asset.value) && v[1] === Number(fx.value)));
        });
      }

      [asset, fx, years].forEach(function (i) { if (i) i.addEventListener('input', update); });
      amount.addEventListener('input', update);
      amount.addEventListener('blur', function () { amount.value = groupIndian(String(parseAmount())); update(); });
      presets.forEach(function (p) {
        p.addEventListener('click', function () {
          var v = p.getAttribute('data-preset').split(',');
          asset.value = v[0]; fx.value = v[1];
          update();
        });
      });
      update();
    });

    /* --- Fit quiz --- */
    var quiz = $('[data-quiz]');
    if (quiz) {
      var qEls = $$('.quiz-q', quiz);
      var resultBox = $('[data-quiz-result]');
      var back = $('[data-quiz-back]', quiz), next = $('[data-quiz-next]', quiz);
      var progress = $('[data-quiz-progress]', quiz);
      var current = 0;
      var mq = window.matchMedia('(max-width: 640px)');

      function showStep() {
        var stepper = mq.matches;
        quiz.classList.toggle('is-stepper', stepper);
        qEls.forEach(function (q, i) { q.classList.toggle('is-current', i === current); });
        if (progress) progress.textContent = 'Question ' + (current + 1) + ' of ' + qEls.length;
        back.disabled = current === 0;
        quiz.classList.toggle('is-last', current === qEls.length - 1);
      }
      back.addEventListener('click', function () { if (current > 0) { current--; showStep(); qEls[current].querySelector('input').focus(); } });
      next.addEventListener('click', function () {
        if (current < qEls.length - 1) { current++; showStep(); qEls[current].querySelector('input').focus(); }
      });
      if (mq.addEventListener) mq.addEventListener('change', showStep);
      showStep();

      quiz.addEventListener('submit', function (e) {
        e.preventDefault();
        var answers = {}, missing = [];
        qEls.forEach(function (q, i) {
          var name = q.getAttribute('data-q');
          var picked = $('input[name="' + name + '"]:checked', q);
          if (picked) answers[name] = picked.value; else missing.push(i + 1);
        });
        resultBox.textContent = '';
        var h = document.createElement('h3');
        h.className = 'h5';
        if (missing.length) {
          h.textContent = 'Answer every question to see a result.';
          var pm = document.createElement('p');
          pm.className = 'body-md muted';
          pm.textContent = 'Still open: question ' + missing.join(', ') + '. Your answers stay on this page.';
          resultBox.appendChild(h); resultBox.appendChild(pm);
          return;
        }
        var res = fitResult(answers);
        resultBox.setAttribute('data-verdict', res.verdict);
        h.textContent = res.verdict === 'no' ? 'Not for you right now.'
          : res.verdict === 'maybe' ? 'Possibly. Weigh these first:' : 'It could fit.';
        resultBox.appendChild(h);
        if (res.reasons.length) {
          var ul = document.createElement('ul');
          ul.className = 'quiz-reasons';
          res.reasons.forEach(function (k) {
            var li = document.createElement('li'), r = QUIZ_REASONS[k];
            li.textContent = r.text + ' ';
            if (r.link) {
              var a = document.createElement('a');
              a.className = 'link-arrow'; a.href = r.link.href; a.textContent = r.link.label;
              li.appendChild(a);
            }
            ul.appendChild(li);
          });
          resultBox.appendChild(ul);
        }
        if (res.verdict === 'fit') {
          var p = document.createElement('p');
          p.textContent = 'Read the 2-minute brief before you decide.';
          resultBox.appendChild(p);
        }
        // Any red answer: no app CTA, by design (D5 §3).
        if (res.verdict !== 'no') {
          var cta = document.createElement('a');
          cta.className = 'btn btn-primary';
          cta.href = 'risks.html#brief';
          cta.textContent = res.verdict === 'maybe' ? 'Read the risk brief' : 'Read the 2-minute risk brief';
          resultBox.appendChild(cta);
        }
        var note = document.createElement('p');
        note.className = 'body-sm muted';
        note.textContent = 'Your answers stay on this page.';
        resultBox.appendChild(note);
      });
    }

    /* --- Exit timeline estimator --- */
    var exitForm = $('[data-exit]');
    if (exitForm) {
      var dIn = $('[data-role="exit-date"]', exitForm), tIn = $('[data-role="exit-time"]', exitForm);
      var now = new Date();
      var pad = function (n) { return (n < 10 ? '0' : '') + n; };
      dIn.value = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
      tIn.value = pad(now.getHours()) + ':' + pad(now.getMinutes());
      var renderExit = function () {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dIn.value)) return;
        var t = exitTimeline(dIn.value, tIn.value || '00:00');
        $('[data-exit-out="counted"]').textContent = formatDate(t.counted, true);
        $('[data-exit-out="usd"]').textContent = formatDate(t.usdSettle, false);
        $('[data-exit-out="inr"]').textContent = formatDate(t.inrCredit, false);
      };
      dIn.addEventListener('input', renderExit);
      tIn.addEventListener('input', renderExit);
      renderExit();
    }

    /* --- Platform checker: points to regulators' lists, verifies nothing itself --- */
    var checker = $('[data-checker]');
    if (checker) {
      checker.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = $('[data-role="checker-name"]', checker).value.trim();
        var panel = $('[data-checker-result]');
        $('[data-checker-echo]', panel).textContent = name ? '“' + name + '”' : 'the platform’s name';
        panel.hidden = false;
      });
    }

    /* --- Footer year (generated) --- */
    $$('[data-year-now]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
  })();
}
