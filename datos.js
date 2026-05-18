// ============ LISTAS DE CANALES ============
const LISTAS = [
    { u: 'https://iptv-org.github.io/iptv/streams.json', c: 'streams', esJSON: true },
    { u: 'https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8', c: 'FreeTV', esJSON: false }
];

const CHANNELS_URL = 'https://iptv-org.github.io/iptv/channels.json';
let channelsMetadata = [];
let canales = [];

const CORS_PROXIES = [
    'https://api.allorigins.win/raw?url=',
    'https://corsproxy.io/?',
    'https://api.codetabs.com/v1/proxy?quest=',
    'https://cors.eu.org/'
];

const GENRES = {
    28: 'Acción', 12: 'Aventura', 16: 'Animación', 35: 'Comedia', 80: 'Crimen',
    99: 'Documental', 18: 'Drama', 10751: 'Familia', 14: 'Fantasía', 36: 'Historia',
    27: 'Terror', 10402: 'Música', 9648: 'Misterio', 10749: 'Romance', 878: 'Sci-Fi',
    10770: 'TV Movie', 53: 'Suspenso', 10752: 'Bélica', 37: 'Western'
};

function parseM3U(t) {
    const l = t.split(/\r?\n/), p = [];
    let c = null;
    for (const ln of l) {
        const tr = ln.trim();
        if (tr.startsWith('#EXTINF:')) {
            c = {};
            const i = tr.substring(8);
            const m = i.match(/^(.+?),(.+)$/);
            if (m) {
                c.name = m[2].trim();
                const lg = m[1].match(/tvg-logo="([^"]*)"/);
                if (lg) c.logo = lg[1];
                const g = m[1].match(/group-title="([^"]*)"/);
                if (g) c.group = g[1];
            }
        } else if (tr && !tr.startsWith('#') && c) {
            c.url = tr;
            p.push({...c});
            c = null;
        }
    }
    return p;
}

function parseStreamsJSON(data) {
    const p = [];
    for (const ch of data) {
        if (ch.url) {
            const name = ch.name || ch.channel || 'Sin nombre';
            const group = ch.categories?.[0] || ch.category || 'General';
            const meta = channelsMetadata.find(c => c.id === ch.channel || c.name === name);
            p.push({
                name: name,
                url: ch.url,
                group: group,
                logo: meta?.logo || ch.logo || '',
                cat: ch.country || group,
                tvgId: ch.channel || ''
            });
        }
    }
    return p;
}

async function cargarMetadata() {
    try {
        const text = await fetchP(CHANNELS_URL);
        if (text) channelsMetadata = JSON.parse(text);
    } catch (e) {}
}

async function fetchP(url, i = 0) {
    if (i >= CORS_PROXIES.length) {
        try { const r = await fetch(url); if (r.ok) return await r.text(); } catch (e) {}
        return null;
    }
    try {
        const c = new AbortController();
        setTimeout(() => c.abort(), 15000);
        const r = await fetch(CORS_PROXIES[i] + encodeURIComponent(url), { signal: c.signal });
        if (r.ok) return await r.text();
    } catch (e) {}
    return fetchP(url, i + 1);
}

function g(cat) { return canales.filter(c => c.cat === cat || c.group === cat); }
function dedup(arr) {
    const s = new Set();
    return arr.filter(m => { const key = m.tmdbId || m.url || m.name; if (s.has(key)) return false; s.add(key); return true; });
}
function counter(m) { const c = document.getElementById('counter'); c.textContent = m; c.classList.add('show'); }
function hideCounter() { document.getElementById('counter').classList.remove('show'); }
function saveData() {
    localStorage.setItem('iptv_channels', JSON.stringify(canales.slice(0, 2000)));
    localStorage.setItem('iptv_fav', JSON.stringify(favorites));
    localStorage.setItem('iptv_hist', JSON.stringify(history));
}
