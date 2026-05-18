const LISTAS = [
    { u: 'https://iptv-org.github.io/iptv/countries/ar.m3u', c: 'Argentina' },
    { u: 'https://iptv-org.github.io/iptv/categories/sports.m3u', c: 'Deportes' },
    { u: 'https://iptv-org.github.io/iptv/categories/news.m3u', c: 'Noticias' },
    { u: 'https://iptv-org.github.io/iptv/categories/music.m3u', c: 'Música' },
];

let canales = [];
const GENRES = {28:'Acción',12:'Aventura',16:'Animación',35:'Comedia',80:'Crimen',99:'Documental',18:'Drama',10751:'Familia',14:'Fantasía',36:'Historia',27:'Terror',10402:'Música',9648:'Misterio',10749:'Romance',878:'Sci-Fi',53:'Suspenso'};

function parseM3U(t){const l=t.split(/\r?\n/),p=[];let c=null;for(const ln of l){const tr=ln.trim();if(tr.startsWith('#EXTINF:')){c={};const i=tr.substring(8);const m=i.match(/^(.+?),(.+)$/);if(m){c.name=m[2].trim();const lg=m[1].match(/tvg-logo="([^"]*)"/);if(lg)c.logo=lg[1];const g=m[1].match(/group-title="([^"]*)"/);if(g)c.group=g[1]}}else if(tr&&!tr.startsWith('#')&&c){c.url=tr;p.push({...c});c=null}}return p}

async function cargarTodo(){
    counter('⏳ Cargando canales...');
    let all=[];
    for(const l of LISTAS){
        try{
            const r=await fetch(l.u);
            if(!r.ok)continue;
            const t=await r.text();
            const p=parseM3U(t);
            p.forEach(c=>{c.cat=l.c;if(!c.group)c.group=l.c});
            all=all.concat(p);
        }catch(e){}
    }
    if(all.length>0){
        canales=all;
        renderTV();
        toast(`✅ ${canales.length} canales`);
    }
    hideCounter();
}

function g(cat){return canales.filter(c=>c.cat===cat||c.group===cat)}
function counter(m){const c=document.getElementById('counter');c.textContent=m;c.classList.add('show')}
function hideCounter(){document.getElementById('counter').classList.remove('show')}
