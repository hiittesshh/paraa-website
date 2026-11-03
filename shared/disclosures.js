// Single source for every legal disclosure (audit S6, rulebook R15).
// Pages keep a static copy as the no-JS fallback; when JS runs, each
// [data-disclosure-id] is overwritten from here, so Compliance edits ONE place.
// Generated from the concept pages on 2 Nov 2026; edit this file from now on.
(function () {
  var TEXT = {
    "nav-explorer-v1": "Illustrative prototype data. Returns in US dollars, net of the illustrative fees in <a href=\"#receipt\">§Fees</a>, time-weighted. Rupee returns differ: a weaker rupee raises your rupee value; a stronger rupee lowers it. See <a href=\"#\">How the rupee changes this</a>.",
    "global-risk-v1": "<p><strong>Investing involves risk, including loss of the money you put in.</strong> Your investment is held and valued in US dollars. If the rupee weakens against the dollar, the rupee value of your investment rises; if the rupee strengthens, it falls. Both can happen in the same period as a fall in the investment itself. Past performance, including any simulation, does not predict future results. Figures marked <em>Illustrative</em> are examples, not records or forecasts. How your money is legally routed and held is <span class=\"placeholder-tag\">TO CONFIRM</span> and is described on <a href=\"#custody\">How your money moves</a>. Nothing on this site is personal investment advice. Read the <a href=\"#\">full risk disclosure</a> before investing.</p>",
    "sebi-mandated-v1": "",
    "nav-centre-v1": "Illustrative prototype data. Returns in US dollars, net of the illustrative fees, time-weighted. Rupee returns differ: a weaker rupee raises your rupee value; a stronger rupee lowers it. Past performance, including any simulation, does not predict future results. Final wording for this page <span class=\"placeholder-tag\">TO CONFIRM</span>.",
    "splitter-v1": "Illustrative. Excludes fees and tax. Not a forecast of any basket.",
    "learn-v1": "Educational content, not personal investment advice. Every figure on this page is <em>Illustrative</em>. Exchange-rate relationships shown here are not forecasts, and past currency movements don't predict future ones.",
    "c-regulator-log-v1": "We publish only what we're permitted to. Absence of an entry doesn't mean no questions were asked.",
    "advisor-earnings-v1": "Illustrative. Not an offer. Trail rate <span class=\"placeholder-tag\">TO CONFIRM</span>. This models your pay, not your clients' returns.",
    "stress-v1": "<strong>Simulated, Illustrative.</strong> Method: [description] <span class=\"placeholder-tag\">TO CONFIRM</span>. Simulations use hindsight and can't capture costs or decisions we would really have made."
  };
  document.querySelectorAll('[data-disclosure-id]').forEach(function (el) {
    var t = TEXT[el.getAttribute('data-disclosure-id')];
    if (t != null) el.innerHTML = t;
  });
})();
