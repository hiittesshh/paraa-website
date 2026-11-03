// Motion + small behaviours, shared by all concepts. Minimal by brief:
// fades/reveals and smooth state changes only. Content is fully visible without JS,
// because the hidden "pre-reveal" state is only applied once this script runs.
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  // 1) Scroll reveal: add data-reveal to any element; data-reveal-delay="1..4" staggers.
  if (!reduce && 'IntersectionObserver' in window) {
    root.classList.add('js-motion');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });
  }

  // 2) Mobile nav toggle
  document.querySelectorAll('.nav-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var nav = btn.closest('.nav');
      var open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!open));
      btn.setAttribute('aria-expanded', String(!open));
    });
  });

  // 3) Accessible tabs: [role=tablist] > [role=tab][aria-controls]
  document.querySelectorAll('[role="tablist"]').forEach(function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    function select(tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var k = e.key, n = null;
        if (k === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
        if (k === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (n) { e.preventDefault(); n.focus(); select(n); }
      });
    });
    select(tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || tabs[0]);
  });

  // 4) Small formatting helper concepts can use for calculators
  window.Paraa = {
    inr: function (n) { return '₹' + Math.round(n).toLocaleString('en-IN'); },
    usd: function (n) { return '$' + Math.round(n).toLocaleString('en-US'); },
    pct: function (n, d) { return (n >= 0 ? '+' : '') + n.toFixed(d == null ? 1 : d) + '%'; }
  };
})();
