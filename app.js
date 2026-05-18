let playerCh = null, detailCh = null, hls = null, currentPage = 'home';

// ============ CARGA PRINCIPAL ============
async function cargarTodo() {
    counter('⏳ Cargando metadata...');
    await cargarMetadata();

    let all = [];
    for (const lista of LISTAS) {
        counter(`⏳ Cargando ${lista.c}...`);
        try {
            const text = await fetchP(lista.u);
            if (!text) continue;
            const parsed = lista.esJSON ? parseStreamsJSON(JSON.parse(text)) : parseM3U(text);
            parsed.forEach(c => { if (!c.cat) c.cat = lista.c; if (!c.group) c.group = lista.c; });
            all = all.concat(parsed);
        } catch (e) {}
        if (all.length > 0) {
            canales = dedup(all);
            renderTV();
        }
    }

    counter('🎬 Cargando películas...');
    await cargarPelis();
    counter('📺 Cargando series...');
    await cargarSeries();

    updateInfo();
    hideCounter();
    saveData();
    toast(`✅ ${canales.length} canales • ${pelisAR.length + pelisLAT.length + pelisES.length + pelisSUB.length} pelis • ${series.length} series`);
}

// ============ CARD ============
function card(c, tp = 'tv') {
    const d = document.createElement('div');
    d.className = 'card';
    const n = c.title || c.name || '?';
    const img = c.poster || c.logo || `https://picsum.photos/400/560?random=${Math.random() * 100}`;
    const bg = { tv: 'bg-tv', movie: 'bg-movie', series: 'bg-series', kids: 'bg-kids', sports: 'bg-sports' };
    d.onclick = () => c.type === 'movie' || c.type === 'series' ? openDetail(c) : openPlayer(c);
    d.innerHTML = `<img src="${img}" class="card-img" loading="lazy" onerror="this.src='https://picsum.photos/400/560?random=${Math.random()*100}'">
        <span class="card-badge ${bg[tp] || 'bg-tv'}">${tp === 'movie' ? '🎬' : tp === 'series' ? '📺' : tp === 'kids' ? '👶' : tp === 'sports' ? '⚽' : 'TV'}</span>
        ${c.rating ? `<span class="card-rating">⭐${c.rating}</span>` : ''}
        <div class="card-bottom"><div class="card-title">${n}</div><div class="card-sub">${c.group || c.year || ''}</div></div>`;
    return d;
}

// ============ SECCIONES COLAPSABLES ============
function makeSection(title, count, items, tp, containerId) {
    const sec = document.createElement('div');
    sec.innerHTML = `<div class="section-header" onclick="toggleSection(this)" data-id="${containerId}">
        <h3>${title} <span style="font-size:0.7rem;color:var(--muted);font-weight:400">(${count})</span></h3>
        <span class="arrow">▶</span>
    </div><div class="section-content"><div class="grid" id="${containerId}"></div></div>`;
    const grid = sec.querySelector('.grid');
    items.forEach(c => grid.appendChild(card(c, tp)));
    return sec;
}

function toggleSection(header) {
    const content = header.nextElementSibling;
    const isOpen = content.classList.contains('open');
    // Cerrar todas las secciones
    document.querySelectorAll('.section-header.open').forEach(h => {
        if (h !== header) { h.classList.remove('open'); h.nextElementSibling.classList.remove('open'); }
    });
    // Abrir/cerrar la actual
    if (isOpen) {
        header.classList.remove('open');
        content.classList.remove('open');
    } else {
        header.classList.add('open');
        content.classList.add('open');
    }
}

// ============ RENDER ============
function renderTV() {
    const container = document.getElementById('tvSections');
    if (!container) return;
    container.innerHTML = '';
    const sections = [
        ['📺 TV Argentina', g('Argentina').concat(g('AR')), 'tv'],
        ['🌎 TV Latinoamérica', g('Latinoamérica'), 'tv'],
        ['🇪🇸 TV España', g('España').concat(g('ES')), 'tv'],
        ['⚽ Deportes', g('Deportes').concat(g('Sports')), 'sports'],
        ['📰 Noticias', g('Noticias').concat(g('News')), 'tv'],
        ['👶 Infantil', g('Infantil').concat(g('Kids')).concat(g('Animación')).concat(g('Animation')), 'kids'],
        ['🎵 Música', g('Música').concat(g('Music')), 'tv'],
        ['📚 Documentales', g('Documentales').concat(g('Documentary')), 'tv'],
    ];
    sections.forEach(([t, items, tp]) => {
        if (items.length) container.appendChild(makeSection(t, items.length, items, tp, 'g' + t.replace(/[^a-zA-Z]/g, '')));
    });
    const first = container.querySelector('.section-header');
    if (first) { first.classList.add('open'); first.nextElementSibling.classList.add('open'); }
}

function renderMovies() {
    const container = document.getElementById('movieSections');
    if (!container) return;
    container.innerHTML = '';
    const sections = [
        ['🇦🇷 Películas Argentinas', pelisAR, 'movie'],
        ['🌎 Cine Latino', pelisLAT, 'movie'],
        ['🇪🇸 Cine Español', pelisES, 'movie'],
        ['🌐 Subtituladas', pelisSUB, 'movie'],
    ];
    sections.forEach(([t, items, tp]) => {
        if (items.length) container.appendChild(makeSection(t, items.length, items, tp, 'g' + t.replace(/[^a-zA-Z]/g, '')));
    });
    const first = container.querySelector('.section-header');
    if (first) { first.classList.add('open'); first.nextElementSibling.classList.add('open'); }
}

function renderSeries() {
    const container = document.getElementById('seriesSections');
    if (!container) return;
    container.innerHTML = '';
    if (series.length) container.appendChild(makeSection('📺 Series en Español', series.length, series, 'series', 'gSeries'));
    const first = container.querySelector('.section-header');
    if (first) { first.classList.add('open'); first.nextElementSibling.classList.add('open'); }
}

function updateInfo() {
    const sCh = document.getElementById('sCh');
    const sPelis = document.getElementById('sPelis');
    const sSeries = document.getElementById('sSeries');
    if (sCh) sCh.textContent = canales.length;
    if (sPelis) sPelis.textContent = pelisAR.length + pelisLAT.length + pelisES.length + pelisSUB.length;
    if (sSeries) sSeries.textContent = series.length;
}

// ============ DETALLE ============
async function openDetail(c) {
    detailCh = c;
    document.getElementById('detailTitle').textContent = c.title || c.name || '';
    document.getElementById('detailBackdrop').src = c.backdrop || c.poster || '';
    document.getElementById('detailOverview').textContent = c.overview || 'Sin sinopsis disponible.';
    document.getElementById('detailMeta').innerHTML = `<span>⭐ ${c.rating || '?'}</span><span>📅 ${c.year || '?'}</span>`;
    document.getElementById('detailGenres').innerHTML = (c.genreIds || []).map(id => GENRES[id] ? `<span class="detail-genre">${GENRES[id]}</span>` : '').join('');
    document.getElementById('detailCast').textContent = 'Cargando elenco...';
    document.getElementById('detailOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    if (c.tmdbId) {
        try {
            const r = await fetch(`https://api.themoviedb.org/3/${c.type === 'series' ? 'tv' : 'movie'}/${c.tmdbId}/credits?api_key=${TMDB_KEY}&language=es`);
            const d = await r.json();
            const cast = d.cast?.slice(0, 6).map(a => a.name).join(', ') || '';
            document.getElementById('detailCast').textContent = cast ? `🎭 ${cast}` : '';
        } catch (e) { document.getElementById('detailCast').textContent = ''; }
    }
}

function closeDetail() {
    document.getElementById('detailOverlay').classList.remove('active');
    document.body.style.overflow = '';
    detailCh = null;
}

function playFromDetail() {
    if (detailCh) {
        closeDetail();
        detailCh.type === 'movie' || detailCh.type === 'series' ? openMovie(detailCh) : openPlayer(detailCh);
    }
}

// ============ REPRODUCTOR ============
function openPlayer(c) {
    playerCh = c;
    document.getElementById('playerName').textContent = c.name || c.title || 'Canal';
    document.getElementById('playerOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    document.getElementById('videoPlayer').style.display = 'none';
    document.getElementById('moviePlayer').style.display = 'none';
    document.getElementById('playerLoading').style.display = 'flex';
    playStream(c.url);
}

function openMovie(c) {
    playerCh = c;
    document.getElementById('playerName').textContent = c.title || 'Película';
    document.getElementById('playerOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    document.getElementById('videoPlayer').style.display = 'none';
    document.getElementById('moviePlayer').style.display = 'block';
    document.getElementById('playerLoading').style.display = 'flex';
    document.getElementById('moviePlayer').src = `https://vidlink.pro/${c.type === 'series' ? 'tv' : 'movie'}/${c.tmdbId}`;
    document.getElementById('moviePlayer').onload = () => document.getElementById('playerLoading').style.display = 'none';
}

function closePlayer() {
    document.getElementById('playerOverlay').classList.remove('active');
    document.body.style.overflow = '';
    stop();
    document.getElementById('moviePlayer').src = '';
    playerCh = null;
}

function playStream(u) {
    stop();
    const v = document.getElementById('videoPlayer'), l = document.getElementById('playerLoading');
    if (u && u.includes('.m3u8') && Hls.isSupported()) {
        hls = new Hls({ enableWorker: true });
        hls.loadSource(u);
        hls.attachMedia(v);
        hls.on(Hls.Events.MANIFEST_PARSED, () => { l.style.display = 'none'; v.style.display = 'block'; v.play().catch(() => { }); });
        hls.on(Hls.Events.ERROR, () => { l.style.display = 'none'; toast('❌ No disponible'); });
    } else if (u) {
        v.src = u;
        v.style.display = 'block';
        v.play().then(() => l.style.display = 'none').catch(() => l.style.display = 'none');
    } else {
        l.style.display = 'none';
        toast('❌ Sin stream');
    }
}

function stop() {
    if (hls) { hls.destroy(); hls = null; }
    const v = document.getElementById('videoPlayer');
    v.pause(); v.src = ''; v.load(); v.style.display = 'none';
    document.getElementById('playerLoading').style.display = 'none';
}

function togglePlay() {
    const v = document.getElementById('videoPlayer');
    if (v.paused) { v.play(); document.getElementById('playBtn').textContent = '⏸'; }
    else { v.pause(); document.getElementById('playBtn').textContent = '▶'; }
}

function toggleMute() {
    const v = document.getElementById('videoPlayer');
    v.muted = !v.muted;
    document.getElementById('muteBtn').textContent = v.muted ? '🔇' : '🔊';
}

function seek(s) {
    const v = document.getElementById('videoPlayer');
    if (v.src || hls) v.currentTime = Math.max(0, Math.min((v.duration || Infinity), v.currentTime + s));
}

// ============ NAVEGACIÓN ============
function switchPage(p) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const pageMap = { home: 'pageHome', movies: 'pageMovies', series: 'pageSeries', settings: 'pageSettings' };
    const el = document.getElementById(pageMap[p]);
    if (el) el.classList.add('active');
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    const tabs = { home: 0, movies: 1, series: 2, settings: 3 };
    const tabEls = document.querySelectorAll('.tab-item');
    if (tabEls[tabs[p]]) tabEls[tabs[p]].classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (p === 'settings') updateInfo();
}

// ============ BÚSQUEDA ============
function openSearch() {
    document.getElementById('searchOverlay').classList.add('active');
    document.getElementById('searchInput').focus();
}

function closeSearch() {
    document.getElementById('searchOverlay').classList.remove('active');
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '';
}

document.getElementById('searchInput').addEventListener('input', function (e) {
    const q = e.target.value.toLowerCase(), d = document.getElementById('searchResults');
    if (!q) { d.innerHTML = ''; return; }
    const all = [
        ...canales.map(c => ({ ...c, sn: c.name || '' })),
        ...pelisAR.map(m => ({ ...m, sn: m.title || '', type: 'movie' })),
        ...pelisLAT.map(m => ({ ...m, sn: m.title || '', type: 'movie' })),
        ...pelisES.map(m => ({ ...m, sn: m.title || '', type: 'movie' })),
        ...pelisSUB.map(m => ({ ...m, sn: m.title || '', type: 'movie' })),
        ...series.map(s => ({ ...s, sn: s.title || '', type: 'series' }))
    ];
    const r = all.filter(c => c.sn.toLowerCase().includes(q)).slice(0, 30);
    d.innerHTML = r.map(c => `<div style="display:flex;align-items:center;gap:10px;padding:8px;border-radius:8px;cursor:pointer" onclick="c.type==='movie'||c.type==='series'?openDetail(c):openPlayer(c);closeSearch()"><img src="${c.poster||c.logo||'https://picsum.photos/44/44'}" style="width:40px;height:40px;border-radius:5px;object-fit:cover"><div><div style="font-weight:600;font-size:0.8rem">${c.sn}</div><div style="font-size:0.65rem;color:var(--muted)">${c.group||c.year||''}</div></div></div>`).join('');
});

function clearData() {
    if (confirm('¿Borrar todo?')) {
        canales = []; pelisAR = []; pelisLAT = []; pelisES = []; pelisSUB = []; series = [];
        favorites = []; history = [];
        localStorage.clear();
        updateInfo();
        renderTV(); renderMovies(); renderSeries();
        toast('🗑️ Borrado');
    }
}

// ============ EVENTOS ============
document.getElementById('playerBack').addEventListener('click', closePlayer);
document.getElementById('playerOverlay').addEventListener('click', function (e) { if (e.target === this) closePlayer(); });
document.getElementById('searchOverlay').addEventListener('click', function (e) { if (e.target === this) closeSearch(); });
window.addEventListener('scroll', () => document.querySelector('.header').classList.toggle('scrolled', window.scrollY > 50));

// ============ TOAST ============
let tt;
function toast(m) {
    const t = document.getElementById('toast');
    t.textContent = m;
    t.classList.add('show');
    clearTimeout(tt);
    tt = setTimeout(() => t.classList.remove('show'), 2000);
}

// ============ INICIO ============
cargarTodo();
