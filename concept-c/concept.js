// Concept C, "The Firm": pure maths at the head of the file (testable in Node), DOM wiring below.

// ---------- Pure functions ----------

// C6.3 earnings model: annual = N × T × p, monthly = annual / 12, aum = N × T.
function earnings(clients, avgPerClient, trailRate) {
  var aum = clients * avgPerClient;
  var annual = aum * trailRate;
  return { annual: annual, monthly: annual / 12, aum: aum };
}

// Rounding rule (audit §6): compute at full precision, round half-up to a whole unit
// only when displaying. Negatives round on their absolute value, so −2.5 shows as −3.
function roundHalfUp(n) {
  var a = Math.abs(n);
  var r = Math.floor(a + 0.5);
  return n < 0 ? -r : r;
}

// Indian digit grouping (R10) for rupees: 10000000 -> "1,00,00,000". Rounds at display only.
function groupIndian(n) {
  var neg = roundHalfUp(n) < 0;
  var s = String(Math.abs(roundHalfUp(n)));
  var last3 = s.slice(-3);
  var rest = s.slice(0, -3);
  if (rest) last3 = ',' + last3;
  rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return (neg ? '−' : '') + rest + last3;   // U+2212 minus sign
}

function formatINR(n) {
  var g = groupIndian(n);
  return g.charAt(0) === '−' ? '−₹' + g.slice(1) : '₹' + g;
}

// Short form in lakh / crore: 10000000 -> "₹1 crore", 1250000 -> "₹12.5 lakh".
function formatINRWords(n) {
  function trim(x) { return String(Math.round(x * 100) / 100); }
  if (n >= 1e7) return '₹' + trim(n / 1e7) + ' crore';
  if (n >= 1e5) return '₹' + trim(n / 1e5) + ' lakh';
  return formatINR(n);
}

// International grouping for dollars (audit §6 rule 3): 110000 -> "110,000". Rounds at display only.
function groupIntl(n) {
  var g = Math.abs(roundHalfUp(n)).toLocaleString('en-US');
  return (roundHalfUp(n) < 0 ? '−' : '') + g;   // U+2212 minus sign
}

function formatUSD(n) {
  var g = groupIntl(n);
  return g.charAt(0) === '−' ? '−$' + g.slice(1) : '$' + g;
}

// C5.5 skin-in-the-game total, summed from the rows rather than hard-coded.
function sumHoldings(values) {
  return values.reduce(function (a, b) { return a + b; }, 0);
}

if (typeof module !== 'undefined') {
  module.exports = {
    earnings: earnings, roundHalfUp: roundHalfUp, groupIndian: groupIndian, formatINR: formatINR,
    formatINRWords: formatINRWords, groupIntl: groupIntl, formatUSD: formatUSD, sumHoldings: sumHoldings
  };
}

// ---------- DOM wiring ----------
if (typeof document !== 'undefined') {
  (function () {
    // Footer year (§0.2 item 6)
    document.querySelectorAll('[data-year], [data-year-now]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

    // Rebrand bar: dismissal stored in localStorage, wrapped in try/catch (§0.1)
    var KEY = 'paraa-rebrand-dismissed';
    var bar = document.querySelector('[data-rebrand-bar]');
    if (bar) {
      try { if (localStorage.getItem(KEY) === '1') bar.hidden = true; } catch (e) { /* storage blocked */ }
      var close = bar.querySelector('[data-rebrand-close]');
      if (close) close.addEventListener('click', function () {
        bar.hidden = true;
        try { localStorage.setItem(KEY, '1'); } catch (e) { /* storage blocked */ }
      });
    }

    // "For partners" dropdown: close on Escape or outside click
    var menus = document.querySelectorAll('.nav-menu');
    document.addEventListener('click', function (e) {
      menus.forEach(function (m) { if (m.open && !m.contains(e.target)) m.open = false; });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      menus.forEach(function (m) {
        if (m.open) { m.open = false; m.querySelector('summary').focus(); }
      });
    });

    // Skin-in-the-game total (C5.5)
    var skin = document.querySelector('[data-skin-table]');
    var totalEl = document.querySelector('[data-skin-total]');
    if (skin && totalEl) {
      var vals = Array.prototype.map.call(skin.querySelectorAll('[data-usd]'), function (td) { return Number(td.getAttribute('data-usd')); });
      totalEl.textContent = formatUSD(sumHoldings(vals));   // US$ uses international grouping (audit §6)
    }

    // Earnings model (C6.3)
    var n = document.getElementById('earn-n');
    var t = document.getElementById('earn-t');
    var p = document.getElementById('earn-p');
    if (n && t && p) {
      var rate = Number(p.getAttribute('data-rate'));
      var update = function () {
        var N = Number(n.value), T = Number(t.value);
        var r = earnings(N, T, rate);
        document.getElementById('earn-n-out').textContent = N;
        document.getElementById('earn-t-out').textContent = formatINR(T);
        n.setAttribute('aria-valuetext', N + (N === 1 ? ' client' : ' clients'));
        t.setAttribute('aria-valuetext', formatINR(T));
        document.getElementById('earn-annual').textContent = formatINR(r.annual);
        document.getElementById('earn-monthly').textContent = formatINR(r.monthly);
        document.getElementById('earn-aum').textContent = formatINR(r.aum) + ' (' + formatINRWords(r.aum) + ')';
      };
      n.addEventListener('input', update);
      t.addEventListener('input', update);
      update();
    }

    // Call form: inline note for investors (C5.12)
    var who = document.querySelector('[data-investor-select]');
    var note = document.querySelector('[data-investor-note]');
    if (who && note) {
      var sync = function () { note.hidden = who.value !== 'Investor'; };
      who.addEventListener('change', sync);
      sync();
    }

    // Prototype forms: check required fields, then show the spec's confirmation copy
    document.querySelectorAll('[data-proto-form]').forEach(function (form) {
      var status = document.getElementById(form.getAttribute('data-proto-form'));
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var missing = Array.prototype.filter.call(form.querySelectorAll('[required]'), function (f) { return !f.checkValidity(); });
        if (missing.length) {
          var labels = missing.map(function (f) { return form.querySelector('label[for="' + f.id + '"]').textContent.trim(); });
          status.textContent = 'Please fill in: ' + labels.join(', ') + '.';
          missing[0].focus();
          return;
        }
        // Success copy is text; a TO CONFIRM marker is rendered as a real placeholder-tag (C10).
        status.textContent = status.getAttribute('data-success');
        var tag = status.getAttribute('data-success-tag');
        if (tag) {
          var span = document.createElement('span');
          span.className = 'placeholder-tag';
          span.textContent = tag;
          status.appendChild(document.createTextNode(' '));
          status.appendChild(span);
        }
        form.reset();
        if (note) note.hidden = true;
      });
    });
  })();
}
