const TMDB_KEY = 'e1b746f9cd280db21c3616aff490340c';
let favorites = JSON.parse(localStorage.getItem('iptv_fav') || '[]');
let history = JSON.parse(localStorage.getItem('iptv_hist') || '[]');
