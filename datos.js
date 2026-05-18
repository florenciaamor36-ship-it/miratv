// ============ DATOS EMBEBIDOS - SIN FETCH - SIN CORS ============
let canales = [];
const GENRES = {28:'Acción',12:'Aventura',16:'Animación',35:'Comedia',80:'Crimen',99:'Documental',18:'Drama',10751:'Familia',14:'Fantasía',36:'Historia',27:'Terror',10402:'Música',9648:'Misterio',10749:'Romance',878:'Sci-Fi',53:'Suspenso'};

// ============ PARSE M3U ============
function parseM3U(t){const l=t.split(/\r?\n/),p=[];let c=null;for(const ln of l){const tr=ln.trim();if(tr.startsWith('#EXTINF:')){c={};const i=tr.substring(8);const m=i.match(/^(.+?),(.+)$/);if(m){c.name=m[2].trim();const lg=m[1].match(/tvg-logo="([^"]*)"/);if(lg)c.logo=lg[1];const g=m[1].match(/group-title="([^"]*)"/);if(g)c.group=g[1]}}else if(tr&&!tr.startsWith('#')&&c){c.url=tr;p.push({...c});c=null}}return p}

// ============ LISTA ARGENTINA EMBEBIDA ============
const DATA_AR = `#EXTM3U
#EXTINF:-1 tvg-name="TV Pública" group-title="Argentina",TV Pública
https://tvpublica.com.ar/tvpublica.m3u8
#EXTINF:-1 tvg-name="C5N" group-title="Noticias",C5N
https://c5n.com/c5n.m3u8
#EXTINF:-1 tvg-name="TN" group-title="Noticias",TN
https://tn.com.ar/tn.m3u8
#EXTINF:-1 tvg-name="LN+" group-title="Noticias",LN+
https://lnmas.com.ar/lnmas.m3u8
#EXTINF:-1 tvg-name="A24" group-title="Noticias",A24
https://a24.com/a24.m3u8
#EXTINF:-1 tvg-name="Crónica TV" group-title="Noticias",Crónica TV
https://cronica.com.ar/cronica.m3u8
#EXTINF:-1 tvg-name="Canal 26" group-title="Noticias",Canal 26
https://canal26.com/canal26.m3u8
#EXTINF:-1 tvg-name="Net TV" group-title="Argentina",Net TV
https://nettv.com.ar/nettv.m3u8
#EXTINF:-1 tvg-name="TyC Sports" group-title="Deportes",TyC Sports
https://tycsports.com/tycsports.m3u8
#EXTINF:-1 tvg-name="DeporTV" group-title="Deportes",DeporTV
https://deportv.gob.ar/deportv.m3u8
#EXTINF:-1 tvg-name="Canal 12 Córdoba" group-title="Argentina",Canal 12 Córdoba
https://canal12.com.ar/canal12.m3u8
#EXTINF:-1 tvg-name="Canal 7 Neuquén" group-title="Argentina",Canal 7 Neuquén
https://canal7neuquen.com.ar/canal7.m3u8
#EXTINF:-1 tvg-name="Canal 11 Salta" group-title="Argentina",Canal 11 Salta
https://canal11salta.com.ar/canal11.m3u8
#EXTINF:-1 tvg-name="Canal 9 Litoral" group-title="Argentina",Canal 9 Litoral
https://canal9litoral.com.ar/canal9.m3u8
#EXTINF:-1 tvg-name="Canal 10 Río Negro" group-title="Argentina",Canal 10 Río Negro
https://rionegro.com.ar/canal10.m3u8`;

const DATA_SPORTS = `#EXTM3U
#EXTINF:-1 tvg-name="ESPN" group-title="Deportes",ESPN
https://espn.com/espn.m3u8
#EXTINF:-1 tvg-name="Fox Sports" group-title="Deportes",Fox Sports
https://foxsports.com/foxsports.m3u8
#EXTINF:-1 tvg-name="ESPN 2" group-title="Deportes",ESPN 2
https://espn.com/espn2.m3u8
#EXTINF:-1 tvg-name="ESPN 3" group-title="Deportes",ESPN 3
https://espn.com/espn3.m3u8
#EXTINF:-1 tvg-name="NBA TV" group-title="Deportes",NBA TV
https://nba.com/nbatv.m3u8`;

const DATA_NEWS = `#EXTM3U
#EXTINF:-1 tvg-name="CNN" group-title="Noticias",CNN
https://cnn.com/cnn.m3u8
#EXTINF:-1 tvg-name="BBC" group-title="Noticias",BBC
https://bbc.com/bbc.m3u8
#EXTINF:-1 tvg-name="Fox News" group-title="Noticias",Fox News
https://foxnews.com/foxnews.m3u8
#EXTINF:-1 tvg-name="MSNBC" group-title="Noticias",MSNBC
https://msnbc.com/msnbc.m3u8`;

const DATA_MUSIC = `#EXTM3U
#EXTINF:-1 tvg-name="MTV" group-title="Música",MTV
https://mtv.com/mtv.m3u8
#EXTINF:-1 tvg-name="VH1" group-title="Música",VH1
https://vh1.com/vh1.m3u8`;

// ============ CARGAR TODO ============
function cargarTodo() {
    counter('⏳ Cargando canales...');
    let all = [];
    const fuentes = [
        { data: DATA_AR, cat: 'Argentina' },
        { data: DATA_SPORTS, cat: 'Deportes' },
        { data: DATA_NEWS, cat: 'Noticias' },
        { data: DATA_MUSIC, cat: 'Música' }
    ];
    
    for (const f of fuentes) {
        const p = parseM3U(f.data);
        p.forEach(c => { c.cat = f.cat; if (!c.group) c.group = f.cat; });
        all = all.concat(p);
    }
    
    canales = all;
    toast(`✅ ${canales.length} canales cargados`);
    hideCounter();
    renderTV();
    
    // Cargar películas de TMDB
    cargarPelis();
    cargarSeries();
}

function g(cat) { return canales.filter(c => c.cat === cat || c.group === cat); }
function counter(m) { const c = document.getElementById('counter'); c.textContent = m; c.classList.add('show'); }
function hideCounter() { document.getElementById('counter').classList.remove('show'); }
