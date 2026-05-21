const TMDB_KEY='e1b746f9cd280db21c3616aff490340c';
const GENRES={28:'Acción',12:'Aventura',16:'Animación',35:'Comedia',80:'Crimen',99:'Documental',18:'Drama',10751:'Familia',14:'Fantasía',36:'Historia',27:'Terror',10402:'Música',9648:'Misterio',10749:'Romance',878:'Sci-Fi',53:'Suspenso'};
const CORS_PROXIES=['https://api.allorigins.win/raw?url=','https://corsproxy.io/?','https://api.codetabs.com/v1/proxy?quest=','https://cors.eu.org/','https://proxy.cors.sh/'];

const LISTAS_ES=[
    'https://iptv-org.github.io/iptv/countries/ar.m3u',
    'https://iptv-org.github.io/iptv/categories/sports.m3u',
    'https://iptv-org.github.io/iptv/categories/news.m3u',
    'https://iptv-org.github.io/iptv/categories/music.m3u',
    'http://tv.diablotv.net:8080/get.php?username=dmarzano&password=d7e5a26a86a0&type=m3u_plus',
    'http://tv.diablotv.net:8080/get.php?username=VanessaCastaneda284&password=cpbCeCrFA4&type=m3u_plus',
    'http://canal-pro.xyz:8080/get.php?username=40724021&password=8YH3HRF7g6r&type=m3u_plus',
    'http://redworld.pro:8880/get.php?username=JesuM01&password=zDmWdX5gK3fm&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Betty1&password=Betty1&type=m3u_plus',
    'http://tvpromas.com:2082/get.php?username=zcenter57&password=10072019&type=m3u_plus',
];

function parseM3U(t){const l=t.split(/\r?\n/),p=[];let c=null;for(const ln of l){const tr=ln.trim();if(tr.startsWith('#EXTINF:')){c={};const i=tr.substring(8);const m=i.match(/^(.+?),(.+)$/);if(m){c.name=m[2].trim();const lg=m[1].match(/tvg-logo="([^"]*)"/);if(lg)c.logo=lg[1];const g=m[1].match(/group-title="([^"]*)"/);if(g)c.group=g[1]}}else if(tr&&!tr.startsWith('#')&&c){c.url=tr;p.push({...c});c=null}}return p}
function counter(m){const c=document.getElementById('counter');c.textContent=m;c.classList.add('show')}
function hideCounter(){document.getElementById('counter').classList.remove('show')}
async function fetchP(url,i=0){if(i>=CORS_PROXIES.length){try{const r=await fetch(url);if(r.ok)return await r.text()}catch(e){}return null}try{const c=new AbortController();setTimeout(()=>c.abort(),15000);const r=await fetch(CORS_PROXIES[i]+encodeURIComponent(url),{signal:c.signal});if(r.ok)return await r.text()}catch(e){}return fetchP(url,i+1)}
