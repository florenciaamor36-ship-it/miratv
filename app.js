let playerCh = null, hls = null;

function card(c, tp = 'tv') {
    const d = document.createElement('div'); d.className = 'card';
    const n = c.name || '?', img = c.logo || `https://picsum.photos/400/560?random=${Math.random() * 100}`;
    d.onclick = () => openPlayer(c);
    d.innerHTML = `<img src="${img}" class="card-img" loading="lazy" onerror="this.src='https://picsum.photos/400/560?random=${Math.random()*100}'"><span class="card-badge">TV</span><div class="card-bottom"><div class="card-title">${n}</div><div class="card-sub">${c.group||''}</div></div>`;
    return d;
}

function makeSection(title, count, items, tp) {
    const sec = document.createElement('div');
    sec.innerHTML = `<div class="section-header" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')"><h3>${title} (${count})</h3><span class="arrow">▶</span></div><div class="section-content"><div class="grid"></div></div>`;
    const grid = sec.querySelector('.grid');
    items.forEach(c => grid.appendChild(card(c, tp)));
    return sec;
}

function renderTV() {
    const container = document.getElementById('tvSections');
    if (!container || !canales.length) return;
    const cats = {};
    canales.forEach(c => { const cat = c.group || c.cat || 'General'; if (!cats[cat]) cats[cat] = []; cats[cat].push(c); });
    container.innerHTML = '';
    Object.entries(cats).sort((a,b) => b[1].length - a[1].length).forEach(([cat, items]) => {
        container.appendChild(makeSection(cat, items.length, items, 'tv'));
    });
    const first = container.querySelector('.section-header');
    if (first) { first.classList.add('open'); first.nextElementSibling.classList.add('open'); }
}

function openPlayer(c) {
    playerCh = c; document.getElementById('playerName').textContent = c.name || 'Canal';
    document.getElementById('playerOverlay').classList.add('active'); document.body.style.overflow = 'hidden';
    document.getElementById('playerLoading').style.display = 'flex'; playStream(c.url);
}

function closePlayer() { document.getElementById('playerOverlay').classList.remove('active'); document.body.style.overflow = ''; stop(); playerCh = null; }

function playStream(u) {
    stop(); const v = document.getElementById('videoPlayer'), l = document.getElementById('playerLoading');
    if (u && u.includes('.m3u8') && Hls.isSupported()) {
        hls = new Hls({ enableWorker: true }); hls.loadSource(u); hls.attachMedia(v);
        hls.on(Hls.Events.MANIFEST_PARSED, () => { l.style.display = 'none'; v.style.display = 'block'; v.play().catch(() => { }); });
        hls.on(Hls.Events.ERROR, () => { l.style.display = 'none'; toast('❌ No disponible'); });
    } else if (u) { v.src = u; v.style.display = 'block'; v.play().then(() => l.style.display = 'none').catch(() => l.style.display = 'none'); }
    else { l.style.display = 'none'; toast('❌ Sin stream'); }
}

function stop() { if (hls) { hls.destroy(); hls = null; } const v = document.getElementById('videoPlayer'); v.pause(); v.src = ''; v.load(); v.style.display = 'none'; document.getElementById('playerLoading').style.display = 'none'; }
function togglePlay() { const v = document.getElementById('videoPlayer'); if (v.paused) { v.play(); document.getElementById('playBtn').textContent = '⏸'; } else { v.pause(); document.getElementById('playBtn').textContent = '▶'; } }
function toggleMute() { const v = document.getElementById('videoPlayer'); v.muted = !v.muted; document.getElementById('muteBtn').textContent = v.muted ? '🔇' : '🔊'; }
function seek(s) { const v = document.getElementById('videoPlayer'); if (v.src || hls) v.currentTime = Math.max(0, Math.min((v.duration || Infinity), v.currentTime + s)); }

function switchPage(p) { document.querySelectorAll('.page').forEach(p => p.classList.remove('active')); document.getElementById('page' + p.charAt(0).toUpperCase() + p.slice(1)).classList.add('active'); document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active')); const tabs = { home: 0, movies: 1, series: 2, settings: 3 }; document.querySelectorAll('.tab-item')[tabs[p]]?.classList.add('active'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
function openSearch() { document.getElementById('searchOverlay').classList.add('active'); document.getElementById('searchInput').focus(); }
function closeSearch() { document.getElementById('searchOverlay').classList.remove('active'); document.getElementById('searchInput').value = ''; document.getElementById('searchResults').innerHTML = ''; }
function clearData() { if (confirm('¿Borrar todo?')) { canales = []; localStorage.clear(); renderTV(); toast('🗑️ Borrado'); } }

document.getElementById('playerBack').addEventListener('click', closePlayer);
document.getElementById('playerOverlay').addEventListener('click', function (e) { if (e.target === this) closePlayer(); });
document.getElementById('searchOverlay').addEventListener('click', function (e) { if (e.target === this) closeSearch(); });

let tt; function toast(m) { const t = document.getElementById('toast'); t.textContent = m; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 2000); }

cargarTodo();
