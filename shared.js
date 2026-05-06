// shared.js — Hasbro Family Game Time
// Player session (sessionStorage) + leaderboard (localStorage)

var HG = (function () {
  var SESSION_KEY = 'hg_players';
  var LEADERBOARD_KEY = 'hg_scores';

  // ── Players ──────────────────────────────────────────────
  function getPlayers() {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || '[]'); }
    catch (e) { return []; }
  }

  function setPlayers(arr) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(arr));
  }

  function hasPlayers() {
    return getPlayers().length >= 1;
  }

  // ── Leaderboard ──────────────────────────────────────────
  function getScores() {
    try { return JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || '{}'); }
    catch (e) { return {}; }
  }

  function recordScore(playerName, game, value) {
    var scores = getScores();
    if (!scores[playerName]) scores[playerName] = {};
    scores[playerName][game] = value;
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(scores));
  }

  function clearScores() {
    localStorage.removeItem(LEADERBOARD_KEY);
  }

  // ── Device ───────────────────────────────────────────────
  function isMobile() {
    return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      || navigator.maxTouchPoints > 1;
  }

  // ── Utils ─────────────────────────────────────────────────
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  return {
    getPlayers: getPlayers,
    setPlayers: setPlayers,
    hasPlayers: hasPlayers,
    getScores: getScores,
    recordScore: recordScore,
    clearScores: clearScores,
    isMobile: isMobile,
    shuffle: shuffle
  };
})();
