// Centralized API base URL for admin panel
// Replace <MAIN_PROJECT_HOST> with your actual main project hostname after first deploy
// Example: https://haunt-m6ot.vercel.app
(function(){
  // Main project host (where /api lives)
  var DEFAULT_HOST = 'haunt-m6ot.vercel.app';
  var isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  var localBase = 'http://localhost:3000/api';
  var prodBase = DEFAULT_HOST ? ('https://' + DEFAULT_HOST + '/api') : '/api';

  function normalizeApiBase(input) {
    if (!input || typeof input !== 'string') return null;
    var v = input.trim();
    if (!v) return null;

    // allow passing only host
    if (!/^https?:\/\//i.test(v)) {
      v = 'https://' + v;
    }

    // ensure ends with /api
    if (!/\/api\/?$/i.test(v)) {
      v = v.replace(/\/+$/, '') + '/api';
    }
    return v;
  }

  function getOverride() {
    try {
      var params = new URLSearchParams(window.location.search || '');
      var qs = params.get('apiBase') || params.get('api') || '';
      var normalizedQs = normalizeApiBase(qs);
      if (normalizedQs) return normalizedQs;
    } catch (e) {}

    try {
      var saved = window.localStorage ? window.localStorage.getItem('API_BASE_OVERRIDE') : '';
      var normalizedSaved = normalizeApiBase(saved);
      if (normalizedSaved) return normalizedSaved;
    } catch (e2) {}
    return null;
  }

  var overrideBase = (typeof window !== 'undefined') ? getOverride() : null;

  // Expose API_BASE globally
  window.API_BASE = isLocal ? localBase : (overrideBase || prodBase);
})();
