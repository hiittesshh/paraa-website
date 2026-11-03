/* Concept A, "The Open Book": page logic.
   Part 1 = pure maths (no DOM), exported for node checks.
   Part 2 = DOM wiring, only when a document exists.
   Every number below is ILLUSTRATIVE (spec §0.4). */

/* ======================================================================
   PART 1: PURE FUNCTIONS
   ====================================================================== */

// §0.4 Basket 1 month-end NAV in US$, inception 1 Jul 2024 at 10.00
var NAV_DATA = [
  ['2024-07', 10.00], ['2024-08', 10.12], ['2024-09', 10.31], ['2024-10', 10.18],
  ['2024-11', 10.40], ['2024-12', 10.52], ['2025-01', 10.61], ['2025-02', 10.47],
  ['2025-03', 10.79], ['2025-04', 10.11], ['2025-05', 9.88],  ['2025-06', 9.52],
  ['2025-07', 9.71],  ['2025-08', 9.98],  ['2025-09', 10.39], ['2025-10', 10.30],
  ['2025-11', 10.47], ['2025-12', 10.58], ['2026-01', 10.44], ['2026-02', 10.62],
  ['2026-03', 10.71], ['2026-04', 10.66], ['2026-05', 10.82], ['2026-06', 10.95],
  ['2026-07', 10.88], ['2026-08', 11.02], ['2026-09', 10.97], ['2026-10', 11.06]
];

// Revisions shown in the changelog (A5.7), keyed by NAV month
var REVISIONS = {
  '2026-08': 'Revised 12 Sep 2026: 11.04 to 11.02. A price for one holding came in late and was lower than the estimate we used.'
};

// A10 / R4: performance figures can be switched off. Default on; "?perf=off" overrides.
var CONFIG = { perf: 'on' };
// "?perf=off&x=1" -> 'off'; anything else -> CONFIG.perf
function perfSetting(search) {
  var m = /[?&]perf=([^&#]*)/.exec(search || '');
  return m && decodeURIComponent(m[1]).toLowerCase() === 'off' ? 'off' : CONFIG.perf;
}

var MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var MINUS = '−';

function navs(data) { return data.map(function (d) { return d[1]; }); }
function indexOfMonth(data, ym) {
  for (var i = 0; i < data.length; i++) if (data[i][0] === ym) return i;
  return -1;
}

// "2025-04" -> "Apr 2025"
function monthLabel(ym) {
  var p = ym.split('-');
  return MONTH_NAMES[+p[1] - 1] + ' ' + p[0];
}
// "2026-10" -> "31 Oct 2026" (month-end date)
function monthEndLabel(ym) {
  var p = ym.split('-');
  var last = new Date(Date.UTC(+p[0], +p[1], 0)).getUTCDate();
  return last + ' ' + MONTH_NAMES[+p[1] - 1] + ' ' + p[0];
}

// Month-on-month returns. r[0] is null (inception month has no prior NAV).
function monthlyReturns(v) {
  return v.map(function (x, i) { return i === 0 ? null : x / v[i - 1] - 1; });
}

// R = NAV[to] / NAV[from] - 1
function rangeReturn(v, from, to) { return v[to] / v[from] - 1; }

// (1+R)^(12/months) - 1, only when months >= 12; else null ("not annualised")
function annualise(R, months) {
  if (months < 12) return null;
  return Math.pow(1 + R, 12 / months) - 1;
}

// DD[t] = NAV[t] / max(NAV[from..t]) - 1; returns the series, the minimum,
// and the peak -> trough span of that minimum (for chart shading)
function drawdown(v, from, to) {
  var peak = v[from], peakIdx = from, series = [];
  var max = 0, maxPeakIdx = from, troughIdx = from;
  for (var t = from; t <= to; t++) {
    if (v[t] > peak) { peak = v[t]; peakIdx = t; }
    var dd = v[t] / peak - 1;
    series.push(dd);
    if (dd < max) { max = dd; maxPeakIdx = peakIdx; troughIdx = t; }
  }
  return { series: series, max: max, peakIdx: maxPeakIdx, troughIdx: troughIdx };
}

// Negative months inside a range: months counted are from+1..to
function negativeMonths(v, from, to) {
  var r = monthlyReturns(v), count = 0;
  for (var i = from + 1; i <= to; i++) if (r[i] < 0) count++;
  return { count: count, total: to - from };
}

// Strongest and weakest single month over the whole series
function extremeMonths(v) {
  var r = monthlyReturns(v), hi = 1, lo = 1;
  for (var i = 1; i < r.length; i++) {
    if (r[i] > r[hi]) hi = i;
    if (r[i] < r[lo]) lo = i;
  }
  return { strongest: { idx: hi, value: r[hi] }, weakest: { idx: lo, value: r[lo] } };
}

// Time underwater for the max drawdown: months from the peak until the first
// month-end above that peak. recoverIdx = -1 if not yet recovered.
function recovery(v) {
  var dd = drawdown(v, 0, v.length - 1), recoverIdx = -1;
  for (var i = dd.troughIdx + 1; i < v.length; i++) {
    if (v[i] > v[dd.peakIdx]) { recoverIdx = i; break; }
  }
  return {
    peakIdx: dd.peakIdx, troughIdx: dd.troughIdx, recoverIdx: recoverIdx,
    months: recoverIdx < 0 ? null : recoverIdx - dd.peakIdx
  };
}

// Calendar-year grid: each year's monthly returns plus an annual total,
// total = product(1 + monthly) - 1
function calendarYears(data) {
  var r = monthlyReturns(navs(data)), years = {}, order = [];
  data.forEach(function (d, i) {
    var y = d[0].slice(0, 4), m = +d[0].slice(5, 7);
    if (!years[y]) { years[y] = { year: +y, months: {}, total: null, partial: false, count: 0 }; order.push(y); }
    years[y].months[m] = r[i];   // null for the inception month
  });
  return order.map(function (y) {
    var row = years[y], prod = 1, n = 0;
    for (var m = 1; m <= 12; m++) {
      if (typeof row.months[m] === 'number') { prod *= 1 + row.months[m]; n++; }
    }
    row.count = n;
    row.total = n ? prod - 1 : null;
    row.partial = n < 12;
    return row;
  });
}

// For "Calendar years" preset: from = Dec of the previous year (or inception),
// to = Dec of that year (or the latest month)
function yearRange(data, year) {
  var from = indexOfMonth(data, (year - 1) + '-12');
  var to = indexOfMonth(data, year + '-12');
  if (from < 0) from = 0;
  if (to < 0) to = data.length - 1;
  return { from: from, to: to };
}

// A5.5 fee receipt. A in ₹, t in months, rAnnual as a fraction (0.05 = 5% a year).
// FX is held at 88.00 so only fees move.
var FEES = { fxIn: 0.005, entry: 0.00, mgmt: 0.015, exit: 0.01, exitUnderMonths: 12, fxOut: 0.005 };
function feeReceipt(A, t, rAnnual) {
  var fxIn = A * FEES.fxIn;
  var entry = (A - fxIn) * FEES.entry;
  var V = A - fxIn - entry;
  var mgmtTotal = 0;
  for (var m = 0; m < t; m++) {
    V = V * Math.pow(1 + rAnnual, 1 / 12);
    var mgmtM = V * FEES.mgmt / 12;
    V -= mgmtM;
    mgmtTotal += mgmtM;
  }
  var exit = t < FEES.exitUnderMonths ? V * FEES.exit : 0;
  var fxOut = (V - exit) * FEES.fxOut;
  var net = V - exit - fxOut;
  var costs = fxIn + entry + mgmtTotal + exit + fxOut;
  return { fxIn: fxIn, entry: entry, mgmt: mgmtTotal, exit: exit, fxOut: fxOut, total: costs, costPct: costs / A, net: net };
}

// Stat-source period for a range starting at index `from`: inception is 1 Jul 2024,
// any later start is that month's month-end NAV date.
function sinceLabel(data, from) {
  return from === 0 ? 'since 1 Jul 2024' : 'since ' + monthEndLabel(data[from][0]);
}

// Whole days between two ISO dates (UTC, so time zones can't shift it)
function daysBetween(isoFrom, isoTo) {
  var a = isoFrom.split('-'), b = isoTo.split('-');
  return Math.round((Date.UTC(+b[0], +b[1] - 1, +b[2]) - Date.UTC(+a[0], +a[1] - 1, +a[2])) / 86400000);
}

// ---- Formatting (R10) ----
function groupIndian(intStr) {
  var last3 = intStr.slice(-3), rest = intStr.slice(0, -3);
  if (!rest) return last3;
  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3;
}
function formatINR(n) {
  var neg = n < 0, s = String(Math.round(Math.abs(n)));
  return (neg ? MINUS : '') + '₹' + groupIndian(s);
}
// fraction -> "+4.1%" / "−6.3%" (U+2212 minus)
function formatPct(x, digits, unsigned) {
  var d = digits == null ? 1 : digits;
  var v = Math.abs(x * 100).toFixed(d);
  if (+v === 0) return (0).toFixed(d) + '%';
  if (unsigned) return v + '%';
  return (x < 0 ? MINUS : '+') + v + '%';
}
function formatUSD(n) { return '$' + n.toFixed(2); }

// CSV: date,basket,nav_usd,monthly_return,revised(bool),revision_note,signed_by
function buildCsv(data) {
  var r = monthlyReturns(navs(data));
  var lines = ['date,basket,nav_usd,monthly_return,revised,revision_note,signed_by'];
  data.forEach(function (d, i) {
    var note = REVISIONS[d[0]] || '';
    var p = d[0].split('-');
    var iso = d[0] + '-' + String(new Date(Date.UTC(+p[0], +p[1], 0)).getUTCDate()).padStart(2, '0');
    lines.push([
      iso,
      '"Basket 1 (Illustrative, name TO CONFIRM)"',
      d[1].toFixed(2),
      r[i] === null ? '' : r[i].toFixed(6),
      note ? 'true' : 'false',
      '"' + note.replace(/"/g, '""') + '"',
      '"Administrator TO CONFIRM"'
    ].join(','));
  });
  return lines.join('\n') + '\n';
}

// All headline figures in one place (used by data-calc slots)
function headline(data) {
  var v = navs(data), last = v.length - 1, months = last;
  var R = rangeReturn(v, 0, last);
  var ex = extremeMonths(v), rec = recovery(v), neg = negativeMonths(v, 0, last);
  return {
    latestNav: v[last], latestMonth: data[last][0],
    sinceInception: R, months: months, annualised: annualise(R, months),
    strongest: ex.strongest.value, strongestMonth: data[ex.strongest.idx][0],
    weakest: ex.weakest.value, weakestMonth: data[ex.weakest.idx][0],
    maxDrawdown: drawdown(v, 0, last).max,
    peakMonth: data[rec.peakIdx][0], troughMonth: data[rec.troughIdx][0],
    recoverMonth: rec.recoverIdx < 0 ? null : data[rec.recoverIdx][0],
    underwaterMonths: rec.months,
    negCount: neg.count, negTotal: neg.total
  };
}

if (typeof module !== 'undefined') {
  module.exports = {
    NAV_DATA: NAV_DATA, FEES: FEES, CONFIG: CONFIG, perfSetting: perfSetting, sinceLabel: sinceLabel, navs: navs, indexOfMonth: indexOfMonth,
    monthLabel: monthLabel, monthEndLabel: monthEndLabel, monthlyReturns: monthlyReturns,
    rangeReturn: rangeReturn, annualise: annualise, drawdown: drawdown,
    negativeMonths: negativeMonths, extremeMonths: extremeMonths, recovery: recovery,
    calendarYears: calendarYears, yearRange: yearRange, feeReceipt: feeReceipt,
    daysBetween: daysBetween, formatINR: formatINR, formatPct: formatPct, formatUSD: formatUSD,
    buildCsv: buildCsv, headline: headline
  };
}

/* ======================================================================
   PART 2: DOM WIRING
   ====================================================================== */
if (typeof document !== 'undefined') {
  (function () {
    var V = navs(NAV_DATA);
    var MR = monthlyReturns(V);
    var H = headline(NAV_DATA);
    var SVGNS = 'http://www.w3.org/2000/svg';

    function $(sel, root) { return (root || document).querySelector(sel); }
    function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
    function signClass(el, x) {
      el.classList.remove('pos', 'neg');
      if (x > 0) el.classList.add('pos');
      if (x < 0) el.classList.add('neg');
    }
    function todayISO() {
      var d = new Date();
      return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    }

    /* ---- §0.1 Rebrand bar: dismissal stored in localStorage (try/catch) ---- */
    var bar = $('[data-rebrand-bar]');
    if (bar) {
      var KEY = 'paraa-rebrand-dismissed';
      try { if (localStorage.getItem(KEY) === '1') bar.hidden = true; } catch (e) { /* storage blocked: keep showing */ }
      var close = $('[data-rebrand-close]', bar);
      if (close) close.addEventListener('click', function () {
        bar.hidden = true;
        try { localStorage.setItem(KEY, '1'); } catch (e) { /* ignore */ }
      });
    }

    /* ---- Computed figures: any element with data-calc gets its value from the dataset ---- */
    var CALC = {
      latestNav: function () { return formatUSD(H.latestNav); },
      sinceInception: function (el) { signClass(el, H.sinceInception); return formatPct(H.sinceInception); },
      annualised: function (el) { signClass(el, H.annualised); return formatPct(H.annualised); },
      strongest: function (el) { signClass(el, H.strongest); return formatPct(H.strongest); },
      strongestMonth: function () { return monthLabel(H.strongestMonth); },
      weakest: function (el) { signClass(el, H.weakest); return formatPct(H.weakest); },
      weakestMonth: function () { return monthLabel(H.weakestMonth); },
      maxDrawdown: function (el) { signClass(el, H.maxDrawdown); return formatPct(H.maxDrawdown); },
      underwater: function () { return H.underwaterMonths + ' months'; },
      underwaterSpan: function () { return monthLabel(H.peakMonth) + ' → ' + monthLabel(H.recoverMonth); },
      negMonths: function () { return H.negCount + ' of ' + H.negTotal; },
      months: function () { return String(H.months); }
    };
    $$('[data-calc]').forEach(function (el) {
      var key = el.getAttribute('data-calc');
      if (key === 'mret') {                       // one month's return, data-month="YYYY-MM"
        var i = indexOfMonth(NAV_DATA, el.getAttribute('data-month'));
        if (i > 0) { signClass(el, MR[i]); el.textContent = formatPct(MR[i]); }
      } else if (CALC[key]) {
        el.textContent = CALC[key](el);
      }
    });

    /* ---- A10 performance switch: ?perf=off hides every return figure ---- */
    if (perfSetting(window.location.search) === 'off') {
      $$('[data-hero-stats]').forEach(function (el) { el.hidden = true; });
      $$('[data-stat="ret"], [data-stat="ann"]').forEach(function (el) {
        var stat = el.closest('.stat');
        if (stat) stat.hidden = true;
      });
      $$('[data-perf-col]').forEach(function (el) { el.hidden = true; });
      $$('[data-perf-span]').forEach(function (el) { el.colSpan = 3; });   // 5 cols minus the 2 return columns
    }

    /* ---- A5.8 Days since last logged incident ---- */
    $$('[data-days-since]').forEach(function (el) {
      el.textContent = String(Math.max(0, daysBetween(el.getAttribute('data-days-since'), todayISO())));
    });

    /* ---- §0.2 Footer year ---- */
    $$('[data-year-now]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

    /* ---- CSV download (Blob, client-side) ---- */
    $$('[data-download-csv]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var blob = new Blob([buildCsv(NAV_DATA)], { type: 'text/csv;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url; a.download = 'paraa-basket-1-nav-history-illustrative.csv';
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      });
    });

    /* ---- nav-chart: inline SVG line chart, redrawn at the container's real width ---- */
    function svgEl(tag, attrs, parent) {
      var el = document.createElementNS(SVGNS, tag);
      for (var k in attrs) el.setAttribute(k, attrs[k]);
      if (parent) parent.appendChild(el);
      return el;
    }

    function renderChart(host, from, to, readout) {
      host.innerHTML = '';
      var W = Math.max(280, host.clientWidth || 640);
      var Ht = Math.round(Math.min(340, Math.max(220, W * 0.42)));
      var pad = { l: 52, r: 14, t: 14, b: 30 };
      var slice = V.slice(from, to + 1);
      var lo = Math.floor(Math.min.apply(null, slice) * 10) / 10;
      var hi = Math.ceil(Math.max.apply(null, slice) * 10) / 10;
      if (hi === lo) { hi += 0.1; lo -= 0.1; }
      var n = to - from;
      var x = function (i) { return pad.l + (n === 0 ? 0 : (i - from) / n) * (W - pad.l - pad.r); };
      var y = function (val) { return pad.t + (1 - (val - lo) / (hi - lo)) * (Ht - pad.t - pad.b); };
      var dd = drawdown(V, from, to);
      var ret = rangeReturn(V, from, to);

      var svg = svgEl('svg', {
        width: W, height: Ht, viewBox: '0 0 ' + W + ' ' + Ht, role: 'img', 'class': 'nc-svg',
        'aria-label': 'Basket 1 NAV in US dollars, ' + monthLabel(NAV_DATA[from][0]) + ' to ' + monthLabel(NAV_DATA[to][0]) +
          '. Return ' + formatPct(ret) + '. Largest fall ' + formatPct(dd.max) +
          (dd.max < 0 ? ', ' + monthLabel(NAV_DATA[dd.peakIdx][0]) + ' to ' + monthLabel(NAV_DATA[dd.troughIdx][0]) : '') + '. Illustrative.'
      }, host);

      // drawdown shading (peak -> trough), behind everything
      if (dd.max < 0) {
        svgEl('rect', { x: x(dd.peakIdx), y: pad.t, width: Math.max(2, x(dd.troughIdx) - x(dd.peakIdx)), height: Ht - pad.t - pad.b, 'class': 'nc-dd' }, svg);
        var ddLabel = svgEl('text', { x: x(dd.peakIdx) + 6, y: pad.t + 14, 'class': 'nc-dd-label' }, svg);
        ddLabel.textContent = 'Largest fall ' + formatPct(dd.max);
      }
      // y-axis: 4 ticks
      for (var k = 0; k < 4; k++) {
        var val = lo + (hi - lo) * k / 3, yy = y(val);
        svgEl('line', { x1: pad.l, x2: W - pad.r, y1: yy, y2: yy, 'class': 'nc-grid' }, svg);
        var t = svgEl('text', { x: pad.l - 8, y: yy + 4, 'text-anchor': 'end', 'class': 'nc-tick' }, svg);
        t.textContent = '$' + val.toFixed(2);
      }
      // x-axis: label every 6th month of the series (plus the ends for short ranges)
      for (var i = from; i <= to; i++) {
        if (i % 6 === 0 || (n < 6 && (i === from || i === to))) {
          var lx = svgEl('text', { x: x(i), y: Ht - 8, 'text-anchor': i === from ? 'start' : (i === to ? 'end' : 'middle'), 'class': 'nc-tick' }, svg);
          var p = NAV_DATA[i][0].split('-');
          lx.textContent = MONTH_NAMES[+p[1] - 1] + ' ' + p[0].slice(2);
        }
      }
      // the line (gold, 2px)
      var d = '';
      for (var j = from; j <= to; j++) d += (j === from ? 'M' : 'L') + x(j).toFixed(1) + ' ' + y(V[j]).toFixed(1);
      svgEl('path', { d: d, 'class': 'nc-line' }, svg);

      // keyboard-focusable points: HTML buttons over the SVG, roving tabindex
      var layer = document.createElement('div');
      layer.className = 'nc-points';
      layer.setAttribute('role', 'group');
      layer.setAttribute('aria-label', 'Monthly NAV points. Use the arrow keys to move between months.');
      host.appendChild(layer);
      var pts = [];
      for (var q = from; q <= to; q++) {
        (function (idx) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'nc-pt';
          b.style.left = x(idx) + 'px';
          b.style.top = y(V[idx]) + 'px';
          var change = MR[idx] === null ? 'inception' : formatPct(MR[idx]);
          var label = monthLabel(NAV_DATA[idx][0]) + ', NAV ' + V[idx].toFixed(2) + ', ' + change;
          b.setAttribute('aria-label', label);
          b.tabIndex = idx === to ? 0 : -1;
          var show = function () { if (readout) readout.textContent = label.replace('NAV ', 'NAV $') + ' (Illustrative)'; };
          b.addEventListener('focus', show);
          b.addEventListener('mouseenter', show);
          b.addEventListener('keydown', function (e) {
            var pos = pts.indexOf(b), next = null;
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = pts[Math.min(pts.length - 1, pos + 1)];
            if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = pts[Math.max(0, pos - 1)];
            if (e.key === 'Home') next = pts[0];
            if (e.key === 'End') next = pts[pts.length - 1];
            if (next) { e.preventDefault(); b.tabIndex = -1; next.tabIndex = 0; next.focus(); }
          });
          layer.appendChild(b);
          pts.push(b);
        })(q);
      }
    }

    /* ---- A5.3 / A6.3 NAV explorer ---- */
    $$('[data-nav-explorer]').forEach(function (root) {
      var fromSel = $('[data-from]', root), toSel = $('[data-to]', root);
      var host = $('[data-chart]', root), readout = $('[data-readout]', root);
      var yearSel = $('[data-year]', root), yearField = $('[data-year-field]', root);
      var presets = $$('input[name="' + (root.getAttribute('data-preset-name') || '_none') + '"]', root);
      var last = NAV_DATA.length - 1;

      NAV_DATA.forEach(function (d, i) {
        fromSel.add(new Option(monthLabel(d[0]), String(i), i === 0, i === 0));
        toSel.add(new Option(monthLabel(d[0]), String(i), i === last, i === last));
      });
      if (yearSel) {
        calendarYears(NAV_DATA).forEach(function (row) {
          yearSel.add(new Option(row.year + (row.partial ? ' (part year)' : ''), String(row.year)));
        });
      }

      function setStat(name, text, sign) {
        var el = $('[data-stat="' + name + '"]', root);
        if (!el) return;
        el.textContent = text;
        if (sign !== undefined) signClass(el, sign);
      }

      function update() {
        var f = +fromSel.value, t = +toSel.value;
        if (f >= t) {                               // keep at least one month in range
          if (document.activeElement === fromSel) { t = Math.min(last, f + 1); f = t - 1; }
          else { f = Math.max(0, t - 1); t = f + 1; }
          fromSel.value = String(f); toSel.value = String(t);
        }
        var R = rangeReturn(V, f, t), months = t - f, ann = annualise(R, months);
        var dd = drawdown(V, f, t), neg = negativeMonths(V, f, t);
        setStat('ret', formatPct(R), R);
        setStat('ann', ann === null ? 'Not annualised (under 12 months)' : formatPct(ann), ann === null ? 0 : ann);
        var annEl = $('[data-stat="ann"]', root);
        if (annEl) annEl.classList.toggle('stat-value-note', ann === null);
        setStat('dd', formatPct(dd.max), dd.max);
        setStat('neg', neg.count + ' of ' + neg.total);
        $$('[data-stat="since"]', root).forEach(function (el) { el.textContent = sinceLabel(NAV_DATA, f); });
        setStat('range',monthLabel(NAV_DATA[f][0]) + ' to ' + monthLabel(NAV_DATA[t][0]) + ', ' + months + ' months');
        renderChart(host, f, t, readout);
        if (readout) readout.textContent = 'Focus or hover a point to read its value.';
      }

      function setPreset(value) {
        presets.forEach(function (p) { p.checked = p.value === value; });
        if (yearField) yearField.hidden = value !== 'years';
      }

      fromSel.addEventListener('change', function () { setPreset('custom'); update(); });
      toSel.addEventListener('change', function () { setPreset('custom'); update(); });
      presets.forEach(function (p) {
        p.addEventListener('change', function () {
          setPreset(p.value);
          if (p.value === 'inception') { fromSel.value = '0'; toSel.value = String(last); update(); }
          if (p.value === 'years' && yearSel) { yearSel.dispatchEvent(new Event('change')); }
          if (p.value === 'custom') fromSel.focus();
        });
      });
      if (yearSel) yearSel.addEventListener('change', function () {
        var r = yearRange(NAV_DATA, +yearSel.value);
        fromSel.value = String(r.from); toSel.value = String(r.to); update();
      });

      update();
      var rt;
      window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(update, 150); });
      // a chart inside a hidden tab has zero width: redraw when it becomes visible
      $$('[role="tab"]').forEach(function (tab) { tab.addEventListener('click', function () { setTimeout(update, 0); }); });
    });

    /* ---- A6.8 Comparison chart: Basket 1 / USD cash (benchmark TO CONFIRM) ---- */
    $$('[data-compare]').forEach(function (root) {
      var host = $('[data-chart]', root), readout = $('[data-readout]', root);
      var status = $('[data-compare-status]', root);
      var btns = $$('[data-series]', root);
      function draw() { renderChart(host, 0, NAV_DATA.length - 1, readout); }
      btns.forEach(function (b) {
        b.addEventListener('click', function () {
          var on = b.getAttribute('aria-pressed') !== 'true';
          if (b.getAttribute('data-series') === 'basket') return;   // the basket line always shows
          b.setAttribute('aria-pressed', String(on));
          if (status) status.hidden = !on;
        });
      });
      draw();
      var rt;
      window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(draw, 150); });
    });

    /* ---- A6.4 month-grid ---- */
    $$('[data-month-grid]').forEach(function (tbody) {
      tbody.innerHTML = '';   // replace the static no-JS rows with the computed ones
      calendarYears(NAV_DATA).forEach(function (row) {
        var tr = document.createElement('tr');
        var th = document.createElement('th');
        th.scope = 'row';
        th.textContent = String(row.year);
        tr.appendChild(th);
        for (var m = 1; m <= 12; m++) {
          var td = document.createElement('td');
          td.className = 'r';
          var v = row.months[m];
          if (typeof v === 'number') { td.textContent = formatPct(v); signClass(td, v); }
          else if (v === null) { td.textContent = 'Start'; td.classList.add('faint'); }
          else { td.textContent = '–'; td.classList.add('faint'); td.setAttribute('aria-label', 'No data'); }
          tr.appendChild(td);
        }
        var tot = document.createElement('td');
        tot.className = 'r mg-total';
        tot.textContent = formatPct(row.total) + (row.partial ? ' (' + row.count + ' mo)' : '');
        signClass(tot, row.total);
        tr.appendChild(tot);
        tbody.appendChild(tr);
      });
    });

    /* ---- A5.5 Fee receipt ---- */
    $$('[data-receipt]').forEach(function (root) {
      var amt = $('[data-in="amount"]', root), months = $('[data-in="months"]', root), ret = $('[data-in="return"]', root);
      var amtHint = $('[data-amount-hint]', root);
      var MIN = 10000, MAX = 5000000;
      function out(name, text) { var el = $('[data-out="' + name + '"]', root); if (el) el.textContent = text; }
      function calc() {
        var raw = parseFloat(String(amt.value).replace(/[^0-9.]/g, ''));
        var A = isNaN(raw) ? 100000 : Math.min(MAX, Math.max(MIN, raw));
        if (amtHint) amtHint.textContent = (isNaN(raw) || raw < MIN || raw > MAX)
          ? 'Enter an amount between ₹10,000 and ₹50,00,000. Showing ' + formatINR(A) + '.'
          : 'Between ₹10,000 and ₹50,00,000. Now: ' + formatINR(A) + '.';
        var t = +months.value, r = +ret.value / 100;
        var res = feeReceipt(A, t, r);
        out('months', t + (t === 1 ? ' month' : ' months'));
        out('return', formatPct(r) + ' a year');
        out('amount', formatINR(A));
        out('fxIn', formatINR(res.fxIn));
        out('entry', formatINR(res.entry));
        out('mgmt', formatINR(res.mgmt));
        out('exit', formatINR(res.exit));
        out('exitNote', t < 12 ? 'applies: held under 12 months' : 'not charged: held 12 months or more');
        out('fxOut', formatINR(res.fxOut));
        out('total', formatINR(res.total) + ' (' + formatPct(res.costPct, 2, true) + ')');
        out('net', formatINR(res.net));
        out('summary', 'On ' + formatINR(A) + ' for ' + t + ' months at an assumed ' + formatPct(r) +
          ' a year, you would pay ' + formatINR(res.total) + ' in fees and receive ' + formatINR(res.net) + '. Illustrative.');
      }
      [amt, months, ret].forEach(function (el) { el.addEventListener('input', calc); });
      calc();
    });
  })();
}
