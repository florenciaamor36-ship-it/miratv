let canales = [];
let listasCargadas = 0;
let totalListas = 0;
const GENRES = {28:'Acción',12:'Aventura',16:'Animación',35:'Comedia',80:'Crimen',99:'Documental',18:'Drama',10751:'Familia',14:'Fantasía',36:'Historia',27:'Terror',10402:'Música',9648:'Misterio',10749:'Romance',878:'Sci-Fi',53:'Suspenso'};

const LISTAS = [
    'https://iptv-org.github.io/iptv/countries/ar.m3u',
    'https://iptv-org.github.io/iptv/categories/sports.m3u',
    'https://iptv-org.github.io/iptv/categories/news.m3u',
    'https://iptv-org.github.io/iptv/categories/music.m3u',
    'https://iptv-org.github.io/iptv/categories/kids.m3u',
    'https://iptv-org.github.io/iptv/categories/animation.m3u',
    'https://iptv-org.github.io/iptv/categories/documentary.m3u',
    'https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8',
    'http://vodlat.top:80/get.php?username=Rrodriguez&password=Robert202304&type=m3u_plus',
    'http://vodlat.top:80/get.php?username=IvonVallejo429&password=4LmtqyFUNJxj&type=m3u_plus',
    'http://tv.diablotv.net:8080/get.php?username=ELLtdmaiz204fj&password=ScMZEQzYg&type=m3u_plus',
    'http://redworld.pro:8880/get.php?username=JesuM01&password=zDmWdX5gK3fm&type=m3u_plus',
    'http://fastream.xyz:8080/get.php?username=93741122tv&password=YG65E646begUG87T&type=m3u_plus',
    'http://canal-pro.xyz:8080/get.php?username=40724021&password=8YH3HRF7g6r&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Betty1&password=Betty1&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=roelle0923&password=roelle0923&type=m3u_plus',
    'http://x.266227.xyz:8080/get.php?username=Burakbora@34&password=03.11.2022&type=m3u_plus',
    'http://line.4k-beast.co:80/get.php?username=C0:23:8D:A5:E0:6F&password=424537&type=m3u',
    'http://www.pandar.xyz:88/get.php?username=pqPt8ZQvHVnq&password=E8RpsmzntqKrAXn&type=m3u',
    'http://ky-iptv.com:80/get.php?username=erics863&password=sabers873&type=m3u_plus',
    'http://vocotv.pro:8080/get.php?username=IPTV123&password=IPTV123&type=m3u_plus',
    'http://adler-iptv.net/get.php?username=algieria364&password=witten465&type=m3u_plus',
    'http://aztkplay.pro/get.php?username=Kathymaldo2&password=ZXkzvt2jFU&type=m3u_plus',
];
totalListas = LISTAS.length;

const CORS_PROXIES = ['https://api.allorigins.win/raw?url=','https://corsproxy.io/?','https://api.codetabs.com/v1/proxy?quest=','https://cors.eu.org/','https://proxy.cors.sh/'];

function parseM3U(t){const l=t.split(/\r?\n/),p=[];let c=null;for(const ln of l){const tr=ln.trim();if(tr.startsWith('#EXTINF:')){c={};const i=tr.substring(8);const m=i.match(/^(.+?),(.+)$/);if(m){c.name=m[2].trim();const lg=m[1].match(/tvg-logo="([^"]*)"/);if(lg)c.logo=lg[1];const g=m[1].match(/group-title="([^"]*)"/);if(g)c.group=g[1]}}else if(tr&&!tr.startsWith('#')&&c){c.url=tr;p.push({...c});c=null}}return p}
function g(cat){return canales.filter(c=>c.cat===cat||c.group===cat)}
function counter(m){const c=document.getElementById('counter');c.textContent=m;c.classList.add('show')}
function hideCounter(){document.getElementById('counter').classList.remove('show')}

async function fetchP(url,i=0){
    if(i>=CORS_PROXIES.length){try{const r=await fetch(url);if(r.ok)return await r.text()}catch(e){}return null}
    try{const c=new AbortController();setTimeout(()=>c.abort(),15000);const r=await fetch(CORS_PROXIES[i]+encodeURIComponent(url),{signal:c.signal});if(r.ok)return await r.text()}catch(e){}
    return fetchP(url,i+1)
}

async function cargarTodo(){
    listasCargadas=0;canales=[];renderTV();await cargarSiguienteLista();
}

async function cargarSiguienteLista(){
    if(listasCargadas>=LISTAS.length){hideCounter();document.getElementById('divCargarMas').innerHTML='<p style="color:#4ade80;font-weight:600">✅ Todas las listas cargadas • '+canales.length+' canales</p>';return}
    const url=LISTAS[listasCargadas];
    counter(`⏳ Cargando lista ${listasCargadas+1} de ${totalListas}...`);
    try{
        const text=await fetchP(url);
        if(text){
            const p=parseM3U(text);
            const nombre=url.split('/').pop()?.split('?')[0]||'lista';
            p.forEach(c=>{c.cat=nombre;if(!c.group)c.group=nombre});
            const seen=new Set();
            canales=[...canales,...p].filter(c=>{if(seen.has(c.url))return false;seen.add(c.url);return true});
        }
    }catch(e){}
    listasCargadas++;
    renderTV();
    updateProgreso();
    if(listasCargadas<LISTAS.length)setTimeout(()=>cargarSiguienteLista(),500);
}

function updateProgreso(){
    const txt=document.getElementById('txtProgreso');
    if(txt)txt.textContent=`${listasCargadas} de ${totalListas} listas • ${canales.length} canales`;
    const btn=document.getElementById('btnCargarMas');
    if(btn)btn.textContent=listasCargadas>=totalListas?'✅ Completado':'⏸ Continuar carga';
                                                 }
