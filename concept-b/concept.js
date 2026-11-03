/* Concept B, "Rupee vs Dollar": maths + page behaviour.
   Part 1 is pure functions (no DOM), exported for node checks.
   Part 2 wires the DOM and only runs in a browser. */

/* =====================================================================
   PART 1: PURE MATHS
   ===================================================================== */

/* Spec §0.4: illustrative USD/INR annual averages (₹ per US$).
   Replace with the RBI/FBIL reference-rate series before launch. */
var RATE_POINTS = {
  1980: 7.86, 1985: 12.37, 1990: 17.50, 1991: 22.74, 1995: 32.43, 2000: 44.94, 2002: 48.61,
  2003: 46.58, 2004: 45.32, 2005: 44.10, 2006: 45.31, 2007: 41.35, 2008: 43.51, 2009: 48.41,
  2010: 45.73, 2011: 46.67, 2012: 53.44, 2013: 58.60, 2014: 61.03, 2015: 64.15, 2016: 67.20,
  2017: 65.12, 2018: 68.39, 2019: 70.42, 2020: 74.10, 2021: 73.92, 2022: 78.60, 2023: 82.60,
  2024: 83.68, 2025: 86.50, 2026: 88.00
};
var FIRST_YEAR = 1980;
var LAST_YEAR = 2026;          // "today"
var MIN_BIRTH = 1980;
var MAX_BIRTH = 2025;
var TOO_RECENT_FROM = 2025;    // B3: y >= 2025 shows the "too recent" message

/* Full annual series 1980..2026; unlisted years are interpolated linearly (prototype only). */
function buildSeries(points) {
  var known = Object.keys(points).map(Number).sort(function (a, b) { return a - b; });
  var out = {};
  for (var i = 0; i < known.length - 1; i++) {
    var y0 = known[i], y1 = known[i + 1], r0 = points[y0], r1 = points[y1];
    for (var y = y0; y < y1; y++) out[y] = r0 + (r1 - r0) * (y - y0) / (y1 - y0);
  }
  out[known[known.length - 1]] = points[known[known.length - 1]];
  return out;
}
var RATES = buildSeries(RATE_POINTS);

function rate(y) { return RATES[y]; }

/* Yearly change in ₹ per $ (positive = rupee weakened, negative = rupee strengthened). */
function yearlyChange(k) { return RATES[k] / RATES[k - 1] - 1; }

/* Years in (from+1 .. to) where the rupee strengthened (rate below the previous year). */
function strongYears(from, to) {
  var list = [];
  for (var k = from + 1; k <= to; k++) if (RATES[k] < RATES[k - 1]) list.push(k);
  return list;
}

/* B3 hero maths. */
function birthYearResult(y) {
  var usdThen = 1000 / RATES[y];
  var inrToday = usdThen * RATES[LAST_YEAR];
  var strong = strongYears(y, LAST_YEAR);
  var worstYr = null, worstChange = Infinity;
  for (var k = y + 1; k <= LAST_YEAR; k++) {
    var ch = yearlyChange(k);
    if (ch < worstChange) { worstChange = ch; worstYr = k; }
  }
  return {
    year: y,
    usdThen: usdThen,
    inrToday: inrToday,
    inrTodayShown: Math.round(inrToday), // round half-up only at display (§6 rule 1): 2,713.54 → ₹2,714, matching US$30.84 × 88
    yearsSince: LAST_YEAR - y,
    strongYrs: strong.length,
    strongList: strong,
    worstYr: worstChange < 0 ? worstYr : null,      // null = rupee never strengthened in the window
    worstPct: worstChange < 0 ? worstChange : null,  // e.g. −0.087 for 2007
    tooRecent: y >= TOO_RECENT_FROM
  };
}

/* B5 §3 splitter. r = investment return in US$, c = rupee move (+ = rupee weaker). */
function splitter(A, r, c) {
  var total = (1 + r) * (1 + c) - 1;
  return {
    total: total,
    valueINR: A * (1 + total),
    assetPart: A * r,
    currencyPart: A * c,
    mixPart: A * r * c
  };
}
/* Mirror row: flip the sign of c; if c is 0, use −3%. */
function mirrorC(c) { return c === 0 ? -0.03 : -c; }

/* B5 §5 LRS planner. */
var LRS_LIMIT_USD = 250000;
var LRS_RATE = 88.00;
function lrsPlan(alreadyUSD, plannedINR, fx, limit) {
  fx = fx || LRS_RATE; limit = limit || LRS_LIMIT_USD;
  var plannedUSD = plannedINR / fx;
  var used = alreadyUSD + plannedUSD;
  var left = limit - used;
  return { plannedUSD: plannedUSD, used: used, left: left, share: Math.min(Math.max(used / limit, 0), 1), over: left < 0 };
}

/* B6 ch 2 inflation toy: implied rupee drift ≈ ((1+i_in)/(1+i_us))^n − 1 */
function inflationDrift(iIn, iUs, n) { return Math.pow((1 + iIn) / (1 + iUs), n) - 1; }

/* §0.4 illustrative fee schedule (every value TO CONFIRM). Performance fee excluded from maths. */
var FEES = { convIn: 0.005, entry: 0, mgmtYearly: 0.015, exitUnder12m: 0.01, convOut: 0.005 };
function feeReceipt(A, months, f) {
  f = f || FEES;
  var convIn = A * f.convIn;
  var afterIn = A - convIn;
  var entry = afterIn * f.entry;
  var invested = afterIn - entry;
  var mgmt = invested * (1 - Math.pow(1 - f.mgmtYearly / 12, months)); // accrued monthly, 0% assumed return (R5)
  var afterMgmt = invested - mgmt;
  var exit = months < 12 ? afterMgmt * f.exitUnder12m : 0;
  var afterExit = afterMgmt - exit;
  var convOut = afterExit * f.convOut;
  var total = convIn + entry + mgmt + exit + convOut;
  // totalShown = the raw total rounded half-up to the rupee, never directionally (§6 rule 1): 2,472.37 → ₹2,472
  return { convIn: convIn, entry: entry, mgmt: mgmt, exit: exit, convOut: convOut, total: total, totalShown: Math.round(total) };
}

/* Formatting (R10): ₹ in Indian grouping, US$ in international grouping (§6 rule 3),
   U+2212 minus, one decimal on percentages. */
var MINUS = '−';
function fmtINR(n) { var v = Math.round(n); return (v < 0 ? MINUS : '') + '₹' + Math.abs(v).toLocaleString('en-IN'); }
function fmtINRSigned(n) { var v = Math.round(n); return (v > 0 ? '+' : v < 0 ? MINUS : '') + '₹' + Math.abs(v).toLocaleString('en-IN'); }
function fmtUSD(n, dp) { return '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: dp || 0, maximumFractionDigits: dp || 0 }); }
function fmtUSDIntl(n) { var v = Math.round(n); return (v < 0 ? MINUS : '') + 'US$' + Math.abs(v).toLocaleString('en-US'); }
function fmtPct(x, dp) {
  dp = dp == null ? 1 : dp;
  var s = Math.abs(x * 100).toFixed(dp);
  if (Number(s) === 0) return (0).toFixed(dp) + '%';
  return (x > 0 ? '+' : MINUS) + s + '%';
}
function fmtPctAbs(x, dp) { return Math.abs(x * 100).toFixed(dp == null ? 1 : dp) + '%'; }

if (typeof module !== 'undefined') {
  module.exports = {
    RATE_POINTS: RATE_POINTS, RATES: RATES, rate: rate, yearlyChange: yearlyChange, strongYears: strongYears,
    birthYearResult: birthYearResult, splitter: splitter, mirrorC: mirrorC, lrsPlan: lrsPlan,
    inflationDrift: inflationDrift, feeReceipt: feeReceipt,
    fmtINR: fmtINR, fmtINRSigned: fmtINRSigned, fmtUSD: fmtUSD, fmtUSDIntl: fmtUSDIntl, fmtPct: fmtPct
  };
}

/* =====================================================================
   PART 2: DOM WIRING (browser only)
   ===================================================================== */
if (typeof document !== 'undefined') {
  (function () {
    /* ---- Config gate (B5 §5). Spec: the LRS planner ships only if the confirmed route IS LRS;
       otherwise a "Your route" explainer replaces it. The route is not yet confirmed (ASSUMPTIONS B6);
       the prototype defaults to 'lrs' so the specified section can be reviewed.
       Values: 'lrs' | 'ifsc' | 'other'. Reviewers can override with ?route=ifsc in the URL. */
    var CONFIG = { route: 'lrs' };
    try {
      var qp = new URLSearchParams(window.location.search).get('route');
      if (qp === 'lrs' || qp === 'ifsc' || qp === 'other') CONFIG.route = qp;
    } catch (e) { /* keep default */ }

    function $(sel, root) { return (root || document).querySelector(sel); }
    function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
    function num(el, fallback) { var v = parseFloat(el && el.value); return isNaN(v) ? fallback : v; }
    function setText(el, t) { if (el) el.textContent = t; }
    var SVGNS = 'http://www.w3.org/2000/svg';

    /* ---- Route gate ---- */
    $all('[data-route-show]').forEach(function (el) {
      var routes = el.getAttribute('data-route-show').split(' ');
      el.hidden = routes.indexOf(CONFIG.route) === -1;
    });

    /* ---- Footer year (0.2 item 6) ---- */
    $all('[data-current-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

    /* ---- Rebrand bar (0.1): dismissal stored in localStorage, wrapped in try/catch ---- */
    var REBRAND_KEY = 'paraa-rebrand-dismissed';
    var bar = $('.rebrand-bar');
    if (bar) {
      try { if (window.localStorage.getItem(REBRAND_KEY) === '1') bar.hidden = true; } catch (e) { /* storage blocked */ }
      var close = $('.rebrand-close', bar);
      if (close) close.addEventListener('click', function () {
        bar.hidden = true;
        try { window.localStorage.setItem(REBRAND_KEY, '1'); } catch (e) { /* storage blocked */ }
      });
    }

    /* ---- Fee receipt figure used in copy (computed, not hard-coded) ---- */
    var fee = feeReceipt(100000, 12);
    $all('[data-fee-receipt]').forEach(function (el) { el.textContent = fmtINR(fee.totalShown); });

    /* =================================================================
       B3 hero: birth-year calculator + year strip + share card
       ================================================================= */
    var calc = $('[data-calc]');
    var current = null; // last rendered result

    function renderStrip(svg, readout, y) {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      var W = 600, H = 140, base = H / 2, pad = 10;
      var years = [];
      for (var k = y + 1; k <= LAST_YEAR; k++) years.push(k);
      var maxAbs = years.reduce(function (m, k) { return Math.max(m, Math.abs(yearlyChange(k))); }, 0.01);
      var slot = (W - pad * 2) / (years.length + 1);
      var bw = Math.max(2, Math.min(14, slot * 0.6));

      var line = document.createElementNS(SVGNS, 'line');
      line.setAttribute('x1', pad); line.setAttribute('x2', W - pad);
      line.setAttribute('y1', base); line.setAttribute('y2', base);
      line.setAttribute('class', 'ys-base');
      svg.appendChild(line);

      var bars = [];
      years.forEach(function (k, i) {
        var ch = yearlyChange(k);
        var h = Math.max(2, Math.abs(ch) / maxAbs * (base - pad));
        var x = pad + slot * (i + 1.5) - bw / 2;
        var r = document.createElementNS(SVGNS, 'rect');
        r.setAttribute('x', x.toFixed(1)); r.setAttribute('width', bw.toFixed(1));
        r.setAttribute('y', (ch >= 0 ? base - h : base).toFixed(1)); r.setAttribute('height', h.toFixed(1));
        r.setAttribute('class', ch >= 0 ? 'ys-up' : 'ys-down');
        r.setAttribute('data-year', k);
        // wide invisible hit area so thin bars are easy to hover/tap
        var hit = document.createElementNS(SVGNS, 'rect');
        hit.setAttribute('x', (pad + slot * (i + 1)).toFixed(1)); hit.setAttribute('width', slot.toFixed(1));
        hit.setAttribute('y', 0); hit.setAttribute('height', H); hit.setAttribute('class', 'ys-hit');
        hit.setAttribute('data-index', i);
        svg.appendChild(r); svg.appendChild(hit);
        bars.push(r);
      });

      var dot = document.createElementNS(SVGNS, 'circle');
      dot.setAttribute('cx', pad + slot * 0.5); dot.setAttribute('cy', base); dot.setAttribute('r', 6);
      dot.setAttribute('class', 'ys-dot');
      svg.appendChild(dot);

      svg.setAttribute('aria-label', 'Yearly change in the rupee from ' + y + ' to ' + LAST_YEAR +
        '. Bars above the line are years the rupee weakened; bars below are years it strengthened. Use the left and right arrow keys to read each year.');

      var active = -1;
      function show(i) {
        if (i < 0 || i >= years.length) return;
        if (active > -1) bars[active].classList.remove('is-active');
        active = i; bars[i].classList.add('is-active');
        var k = years[i], ch = yearlyChange(k);
        readout.textContent = k + ': ₹' + RATES[k].toFixed(2) + ' per $ · rupee ' +
          (ch < 0 ? '+' + fmtPctAbs(ch) + ' stronger' : fmtPctAbs(ch) + ' weaker');
      }
      svg.onmousemove = function (e) { var t = e.target; if (t && t.hasAttribute('data-index')) show(+t.getAttribute('data-index')); };
      svg.onclick = svg.onmousemove;
      svg.onfocus = function () { if (active < 0) show(0); else show(active); };
      svg.onkeydown = function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); show(Math.min(years.length - 1, active + 1)); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); show(Math.max(0, active - 1)); }
        if (e.key === 'Home') { e.preventDefault(); show(0); }
        if (e.key === 'End') { e.preventDefault(); show(years.length - 1); }
      };
      readout.textContent = 'Hover, tap or focus the strip to read a year.';
    }

    if (calc) {
      var input = $('#birth-year', calc), range = $('#birth-year-range', calc);
      var out = $('[data-calc-output]', calc), live = $('[data-calc-live]', calc);
      var hint = $('#birth-year-hint', calc), shareBtn = $('[data-share]', calc);
      var strip = $('[data-year-strip]', calc), readout = $('[data-strip-readout]', calc);
      var normal = $('[data-calc-normal]', calc), recent = $('[data-calc-recent]', calc);
      var sampleBadge = $('[data-sample-badge]', calc);

      function render(y, isSample) {
        var res = birthYearResult(y);
        current = res;
        out.classList.toggle('is-sample', !!isSample);
        sampleBadge.hidden = !isSample;
        normal.hidden = res.tooRecent; recent.hidden = !res.tooRecent;
        shareBtn.disabled = res.tooRecent || !!isSample; // nothing to share until a real year is entered
        if (!res.tooRecent) {
          setText($('[data-o="big"]', out), fmtINR(res.inrTodayShown));
          setText($('[data-o="year"]', out), String(y));
          setText($('[data-o="usd"]', out), 'US' + fmtUSD(res.usdThen, 2));
          setText($('[data-o="inr"]', out), fmtINR(res.inrTodayShown));
          var won = $('[data-o="won"]', out);
          if (res.worstYr) {
            won.innerHTML = 'But in <strong>' + res.strongYrs + ' of the ' + res.yearsSince + ' years</strong> since, the rupee got stronger. ' +
              'The worst was <strong>' + res.worstYr + ': ' + fmtPct(res.worstPct) + '</strong> for anyone holding dollars.';
          } else {
            won.innerHTML = 'In <strong>none of the ' + res.yearsSince + ' years</strong> since did the rupee get stronger on these annual averages. ' +
              'It still can: moves within a year are not shown here.';
          }
        }
        renderStrip(strip, readout, y);
        if (!isSample) {
          live.textContent = res.tooRecent ? 'Too recent to say much.' :
            '₹1,000 in ' + y + ' is ' + fmtINR(res.inrTodayShown) + ' in dollar terms today. The rupee got stronger in ' +
            res.strongYrs + ' of the ' + res.yearsSince + ' years since.';
        }
      }

      function onYear(v, from) {
        var y = parseInt(v, 10);
        if (isNaN(y) || y < MIN_BIRTH || y > MAX_BIRTH) {
          hint.textContent = v === '' ? 'Between 1980 and 2025.' : 'Enter a year between 1980 and 2025.';
          hint.classList.toggle('is-error', v !== '');
          input.setAttribute('aria-invalid', v !== '' ? 'true' : 'false');
          live.textContent = '';
          render(1995, true); // fall back to the greyed sample until the year is valid
          return;
        }
        hint.textContent = 'Between 1980 and 2025.'; hint.classList.remove('is-error');
        input.setAttribute('aria-invalid', 'false');
        if (from !== 'range') range.value = y;
        if (from !== 'input') input.value = y;
        render(y, false);
      }
      input.addEventListener('input', function () { onYear(input.value, 'input'); });
      range.addEventListener('input', function () { onYear(range.value, 'range'); });
      render(1995, true); // greyed sample before input (B3)

      // Primary CTA: focus the year input, scroll it into view on mobile
      $all('[data-run-numbers]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          input.scrollIntoView({ behavior: 'smooth', block: 'center' });
          input.focus({ preventScroll: true });
        });
      });

      /* ---- B7 "Honest share card": 1080×1350 PNG, light theme, downside locked in the same block ---- */
      var shareOut = $('[data-share-out]', calc);
      shareBtn.addEventListener('click', function () {
        if (!current || current.tooRecent) return;
        var res = current;
        var draw = function () {
          var canvas = drawShareCard(res);
          var caption = 'My rupee since ' + res.year + ', both directions. paraa.capital/rupee';
          canvas.toBlob(function (blob) {
            if (!blob) return;
            var file = null;
            try { file = new File([blob], 'paraa-rupee-' + res.year + '.png', { type: 'image/png' }); } catch (e) { /* old browser */ }
            if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
              navigator.share({ files: [file], text: caption }).catch(function () { /* user cancelled */ });
            } else {
              var a = document.createElement('a');
              a.href = URL.createObjectURL(blob); a.download = 'paraa-rupee-' + res.year + '.png';
              document.body.appendChild(a); a.click(); a.remove();
              setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
            }
            shareOut.hidden = false;
            $('#share-caption', shareOut).value = caption;
          }, 'image/png');
        };
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw); else draw();
      });
    }

    function drawShareCard(res) {
      var cs = getComputedStyle(document.documentElement);
      var t = function (n) { return cs.getPropertyValue(n).trim(); };
      var C = { bg: t('--bg'), alt: t('--bg-alt'), text: t('--text'), muted: t('--text-muted'), faint: t('--text-faint'),
        border: t('--border-strong'), accent: t('--accent'), accentText: t('--accent-text'), soft: t('--accent-soft'),
        onAccent: t('--on-accent'), neg: t('--negative') };
      var W = 1080, H = 1350, P = 88;
      var cv = document.createElement('canvas'); cv.width = W; cv.height = H;
      var g = cv.getContext('2d');
      var F = function (w, s) { return w + ' ' + s + 'px Manrope, system-ui, sans-serif'; };
      function wrap(text, x, y, maxW, lh) {
        var words = text.split(' '), line = '';
        for (var i = 0; i < words.length; i++) {
          var test = line ? line + ' ' + words[i] : words[i];
          if (g.measureText(test).width > maxW && line) { g.fillText(line, x, y); line = words[i]; y += lh; } else line = test;
        }
        g.fillText(line, x, y); return y + lh;
      }
      function rr(x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }

      g.fillStyle = C.bg; g.fillRect(0, 0, W, H);
      // brand
      g.fillStyle = C.accent; rr(P, P, 56, 56, 14); g.fill();
      g.fillStyle = C.onAccent; g.font = F(800, 32); g.textBaseline = 'middle'; g.fillText('P', P + 18, P + 30);
      g.fillStyle = C.text; g.font = F(800, 34); g.fillText('Paraa Capital', P + 76, P + 30);
      g.textBaseline = 'alphabetic';
      // eyebrow + title
      g.fillStyle = C.accentText; g.font = F(800, 26); g.fillText('THE RUPEE, HONESTLY', P, 260);
      g.fillStyle = C.text; g.font = F(700, 60);
      var y = wrap('My rupee since ' + res.year + ', both directions.', P, 340, W - P * 2, 72);

      // locked block: headline + downside at equal size, Illustrative badge inside
      var bx = P, by = y + 10, bw = W - P * 2, bh = 560;
      g.fillStyle = C.alt; rr(bx, by, bw, bh, 32); g.fill();
      g.strokeStyle = C.border; g.lineWidth = 2; g.stroke();
      g.font = F(800, 24); var badge = 'Illustrative', bwid = g.measureText(badge).width + 40;
      g.fillStyle = C.soft; rr(bx + 48, by + 48, bwid, 48, 24); g.fill();
      g.fillStyle = C.accentText; g.fillText(badge, bx + 68, by + 81);
      var S = 46, LH = 60, inner = bw - 96;
      g.fillStyle = C.text; g.font = F(800, S);
      var yy = wrap('₹1,000 in ' + res.year + ' is ' + fmtINR(res.inrTodayShown) + ' in dollar terms today.', bx + 48, by + 170, inner, LH);
      var down = res.worstYr
        ? 'But the rupee won in ' + res.strongYrs + ' of ' + res.yearsSince + ' years. Worst: ' + res.worstYr + ', ' + fmtPct(res.worstPct) + '.'
        : 'The rupee won in none of ' + res.yearsSince + ' years on these averages. It still can.';
      yy = wrap(down, bx + 48, yy + 16, inner, LH);
      g.fillStyle = C.muted; g.font = F(500, 26);
      wrap('This is the currency alone, not an investment. Part of the rupee’s fall reflects India’s higher inflation.', bx + 48, yy + 20, inner, 38);

      // mini year strip
      var sy = by + bh + 150, sx = P, sw = W - P * 2, years = [];
      for (var k = res.year + 1; k <= LAST_YEAR; k++) years.push(k);
      var maxAbs = years.reduce(function (m, k) { return Math.max(m, Math.abs(yearlyChange(k))); }, 0.01);
      var slot = sw / (years.length + 1), barW = Math.max(4, Math.min(20, slot * 0.6));
      g.strokeStyle = C.border; g.lineWidth = 2; g.beginPath(); g.moveTo(sx, sy); g.lineTo(sx + sw, sy); g.stroke();
      years.forEach(function (k, i) {
        var ch = yearlyChange(k), h = Math.max(3, Math.abs(ch) / maxAbs * 100);
        g.fillStyle = ch >= 0 ? C.muted : C.neg;
        g.fillRect(sx + slot * (i + 1.5) - barW / 2, ch >= 0 ? sy - h : sy, barW, h);
      });
      g.fillStyle = C.accent; g.beginPath(); g.arc(sx + slot * 0.5, sy, 10, 0, Math.PI * 2); g.fill();
      g.fillStyle = C.muted; g.font = F(600, 22);
      g.fillText('Above the line: rupee weaker. Below the line: rupee stronger.', sx, sy + 150);

      // source + url
      g.fillStyle = C.faint; g.font = F(500, 22);
      g.fillText('Exchange rates: illustrative annual averages, not official data. Past moves don’t predict future ones.', P, H - 120);
      g.fillStyle = C.text; g.font = F(700, 26); g.fillText('paraa.capital/rupee', P, H - 76);
      return cv;
    }

    /* =================================================================
       B5 §3 / B6 ch 5: currency-effect splitter (any [data-splitter])
       ================================================================= */
    $all('[data-splitter]').forEach(function (box) {
      var A = $('[data-s="amount"]', box), R = $('[data-s="r"]', box), Cc = $('[data-s="c"]', box);
      function q(n) { return $('[data-so="' + n + '"]', box); }
      function update() {
        var a = Math.max(0, num(A, 100000)), r = num(R, 6) / 100, c = num(Cc, 3) / 100;
        var s = splitter(a, r, c);
        setText(q('r'), fmtPct(r));
        setText(q('c'), fmtPct(c) + (c > 0 ? ' (rupee weaker)' : c < 0 ? ' (rupee stronger)' : ' (no move)'));
        setText(q('value'), fmtINR(s.valueINR));
        setText(q('total'), fmtPct(s.total, 2) + ' in rupees');
        setText(q('asset'), fmtINRSigned(s.assetPart));
        setText(q('currency'), fmtINRSigned(s.currencyPart));
        setText(q('mix'), fmtINRSigned(s.mixPart));
        [['asset', s.assetPart], ['currency', s.currencyPart], ['mix', s.mixPart]].forEach(function (p) {
          var el = q(p[0]); if (el) { el.classList.toggle('pos', p[1] > 0.5); el.classList.toggle('neg', p[1] < -0.5); }
        });
        // stacked bar: segment width = share of total absolute movement
        var parts = [s.assetPart, s.currencyPart, s.mixPart];
        var sum = parts.reduce(function (m, v) { return m + Math.abs(v); }, 0) || 1;
        ['asset', 'currency', 'mix'].forEach(function (n, i) {
          var seg = $('[data-seg="' + n + '"]', box);
          if (seg) { seg.style.width = (Math.abs(parts[i]) / sum * 100).toFixed(2) + '%'; seg.classList.toggle('is-neg', parts[i] < 0); }
        });
        var mc = mirrorC(c), m = splitter(a, r, mc);
        setText(q('mirrorc'), fmtPct(mc));
        setText(q('mirror'), fmtINR(m.valueINR));
      }
      [A, R, Cc].forEach(function (el) { if (el) el.addEventListener('input', update); });
      $all('[data-preset-c]', box).forEach(function (b) {
        b.addEventListener('click', function () {
          Cc.value = b.getAttribute('data-preset-c');
          if (b.hasAttribute('data-preset-r')) R.value = b.getAttribute('data-preset-r');
          update();
        });
      });
      update();
    });

    /* =================================================================
       B5 §5 / B6 ch 3: LRS limit planner (any [data-lrs])
       ================================================================= */
    $all('[data-lrs]').forEach(function (box) {
      var already = $('[data-l="already"]', box), planned = $('[data-l="planned"]', box);
      function q(n) { return $('[data-lo="' + n + '"]', box); }
      function update() {
        var p = lrsPlan(Math.max(0, num(already, 0)), Math.max(0, num(planned, 0)));
        setText(q('planned'), fmtUSDIntl(p.plannedUSD));
        setText(q('used'), fmtUSDIntl(p.used));
        setText(q('left'), p.over ? 'None. Over by ' + fmtUSDIntl(-p.left) : fmtUSDIntl(p.left));
        setText(q('pct'), (p.used / LRS_LIMIT_USD * 100).toFixed(1) + '% of the yearly limit');
        var fill = q('bar'); if (fill) fill.style.width = (p.share * 100).toFixed(2) + '%';
        var warn = q('warn'); if (warn) warn.hidden = !p.over;
      }
      [already, planned].forEach(function (el) { if (el) el.addEventListener('input', update); });
      update();
    });

    /* =================================================================
       B6 ch 1: self-check (instant feedback, nothing stored)
       ================================================================= */
    $all('[data-selfcheck]').forEach(function (fs) {
      var fb = $('[data-feedback]', fs);
      $all('input[type="radio"]', fs).forEach(function (rad) {
        rad.addEventListener('change', function () {
          var ok = rad.hasAttribute('data-correct');
          fb.textContent = (ok ? 'Correct. ' : 'Not quite. ') + fs.getAttribute('data-explain');
          fb.classList.toggle('is-ok', ok); fb.classList.toggle('is-no', !ok);
        });
      });
    });

    /* =================================================================
       B6 ch 2: inflation toy
       ================================================================= */
    $all('[data-inflation]').forEach(function (box) {
      var iin = $('[data-i="in"]', box), ius = $('[data-i="us"]', box), n = $('[data-i="n"]', box);
      function update() {
        var a = num(iin, 5) / 100, b = num(ius, 2.5) / 100, yrs = Math.max(0, Math.min(50, num(n, 10)));
        var d = inflationDrift(a, b, yrs);
        setText($('[data-io="drift"]', box), fmtPctAbs(d));
        setText($('[data-io="dir"]', box), d > 0.0005 ? 'weaker' : d < -0.0005 ? 'stronger' : 'unchanged');
        setText($('[data-io="years"]', box), String(yrs));
      }
      [iin, ius, n].forEach(function (el) { if (el) el.addEventListener('input', update); });
      update();
    });
  })();
}
