let canales = [];
let playerCh = null, hls = null;

const CORS_PROXIES = ['https://api.allorigins.win/raw?url=','https://corsproxy.io/?','https://api.codetabs.com/v1/proxy?quest=','https://cors.eu.org/','https://proxy.cors.sh/'];

function parseM3U(t){const l=t.split(/\r?\n/),p=[];let c=null;for(const ln of l){const tr=ln.trim();if(tr.startsWith('#EXTINF:')){c={};const i=tr.substring(8);const m=i.match(/^(.+?),(.+)$/);if(m){c.name=m[2].trim();const lg=m[1].match(/tvg-logo="([^"]*)"/);if(lg)c.logo=lg[1];const g=m[1].match(/group-title="([^"]*)"/);if(g)c.group=g[1]}}else if(tr&&!tr.startsWith('#')&&c){c.url=tr;p.push({...c});c=null}}return p}

async function fetchP(url,i=0){if(i>=CORS_PROXIES.length){try{const r=await fetch(url);if(r.ok)return await r.text()}catch(e){}return null}try{const c=new AbortController();setTimeout(()=>c.abort(),15000);const r=await fetch(CORS_PROXIES[i]+encodeURIComponent(url),{signal:c.signal});if(r.ok)return await r.text()}catch(e){}return fetchP(url,i+1)}

function card(c){const d=document.createElement('div');d.className='card';const n=c.name||'?',img=c.logo||`https://picsum.photos/400/560?random=${Math.random()*100}`;d.onclick=()=>openPlayer(c);d.innerHTML=`<img src="${img}" class="card-img" loading="lazy" onerror="this.src='https://picsum.photos/400/560?random=${Math.random()*100}'"><span class="card-badge">TV</span><div class="card-bottom"><div class="card-title">${n}</div><div class="card-sub">${c.group||''}</div></div>`;return d}

function renderTV(){const container=document.getElementById('tvSections');if(!container||!canales.length){container.innerHTML='<p style="text-align:center;color:var(--muted);padding:40px">No hay canales. Andá a Ajustes (⚙️) para importar una lista.</p>';return}const cats={};canales.forEach(c=>{const cat=c.group||'General';if(!cats[cat])cats[cat]=[];cats[cat].push(c)});container.innerHTML='';Object.entries(cats).forEach(([cat,items])=>{const sec=document.createElement('div');sec.innerHTML=`<div class="section-header open" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')"><h3>${cat} (${items.length})</h3><span class="arrow">▶</span></div><div class="section-content open"><div class="grid"></div></div>`;const grid=sec.querySelector('.grid');items.forEach(c=>grid.appendChild(card(c)));container.appendChild(sec)})}

async function importarLista(){const url=document.getElementById('m3uUrl').value.trim();const status=document.getElementById('importStatus');if(!url){status.textContent='⚠️ Pegá una URL primero';return}status.textContent='⏳ Descargando...';try{const text=await fetchP(url);if(!text){status.textContent='❌ No se pudo descargar';return}const p=parseM3U(text);if(!p.length){status.textContent='❌ No se encontraron canales';return}canales=p;renderTV();status.textContent=`✅ ${p.length} canales importados`;document.getElementById('m3uUrl').value='';switchPage('home')}catch(e){status.textContent='❌ Error al descargar'}}

function openPlayer(c){playerCh=c;document.getElementById('playerName').textContent=c.name||'Canal';document.getElementById('playerOverlay').classList.add('active');document.body.style.overflow='hidden';document.getElementById('playerLoading').style.display='flex';playStream(c.url)}
function closePlayer(){document.getElementById('playerOverlay').classList.remove('active');document.body.style.overflow='';stop();playerCh=null}
function playStream(u){stop();const v=document.getElementById('videoPlayer'),l=document.getElementById('playerLoading');if(u&&u.includes('.m3u8')&&Hls.isSupported()){hls=new Hls({enableWorker:true});hls.loadSource(u);hls.attachMedia(v);hls.on(Hls.Events.MANIFEST_PARSED,()=>{l.style.display='none';v.style.display='block';v.play().catch(()=>{})});hls.on(Hls.Events.ERROR,()=>{l.style.display='none';toast('❌ No disponible')})}else if(u){v.src=u;v.style.display='block';v.play().then(()=>l.style.display='none').catch(()=>l.style.display='none')}else{l.style.display='none';toast('❌ Sin stream')}}
function stop(){if(hls){hls.destroy();hls=null}const v=document.getElementById('videoPlayer');v.pause();v.src='';v.load();v.style.display='none';document.getElementById('playerLoading').style.display='none'}
function togglePlay(){const v=document.getElementById('videoPlayer');if(v.paused){v.play();document.getElementById('playBtn').textContent='⏸'}else{v.pause();document.getElementById('playBtn').textContent='▶'}}
function toggleMute(){const v=document.getElementById('videoPlayer');v.muted=!v.muted;document.getElementById('muteBtn').textContent=v.muted?'🔇':'🔊'}
function seek(s){const v=document.getElementById('videoPlayer');if(v.src||hls)v.currentTime=Math.max(0,Math.min((v.duration||Infinity),v.currentTime+s))}
function switchPage(p){document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));document.getElementById('page'+p.charAt(0).toUpperCase()+p.slice(1)).classList.add('active');document.querySelectorAll('.tab-item').forEach(t=>t.classList.remove('active'));const tabs={home:0,movies:1,series:2,settings:3};document.querySelectorAll('.tab-item')[tabs[p]]?.classList.add('active');window.scrollTo({top:0,behavior:'smooth'})}
function openSearch(){document.getElementById('searchOverlay').classList.add('active');document.getElementById('searchInput').focus()}
function closeSearch(){document.getElementById('searchOverlay').classList.remove('active');document.getElementById('searchInput').value='';document.getElementById('searchResults').innerHTML=''}
function clearData(){if(confirm('¿Borrar todo?')){canales=[];renderTV();toast('🗑️ Borrado')}}

document.getElementById('playerBack').addEventListener('click',closePlayer);
document.getElementById('playerOverlay').addEventListener('click',function(e){if(e.target===this)closePlayer()});
document.getElementById('searchOverlay').addEventListener('click',function(e){if(e.target===this)closeSearch()});

let tt;function toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),2000)}
