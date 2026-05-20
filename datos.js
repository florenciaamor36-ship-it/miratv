let canales = [];
const GENRES = {28:'Acción',12:'Aventura',16:'Animación',35:'Comedia',80:'Crimen',99:'Documental',18:'Drama',10751:'Familia',14:'Fantasía',36:'Historia',27:'Terror',10402:'Música',9648:'Misterio',10749:'Romance',878:'Sci-Fi',53:'Suspenso'};

const LISTAS = [
    // iptv-org
    'https://iptv-org.github.io/iptv/countries/ar.m3u',
    'https://iptv-org.github.io/iptv/categories/sports.m3u',
    'https://iptv-org.github.io/iptv/categories/news.m3u',
    'https://iptv-org.github.io/iptv/categories/music.m3u',
    'https://iptv-org.github.io/iptv/categories/kids.m3u',
    'https://iptv-org.github.io/iptv/categories/animation.m3u',
    'https://iptv-org.github.io/iptv/categories/documentary.m3u',
    // Free-TV
    'https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8',
    // vodlat
    'http://vodlat.top:80/get.php?username=Rrodriguez&password=Robert202304&type=m3u_plus',
    'http://vodlat.top:80/get.php?username=IvonVallejo429&password=4LmtqyFUNJxj&type=m3u_plus',
    'http://vodlat.top:80/get.php?username=JUF297LUY0&password=cta27playec&type=m3u_plus',
    'http://vodlat.top:80/get.php?username=Rambito&password=JCCkQ2Ornt&type=m3u_plus',
    'http://vodlat.top:80/get.php?username=12MPremiumOct7&password=y8N12TBkk1&type=m3u_plus',
    'http://vodlat.top:80/get.php?username=ecsrivera0039&password=ixZyi1jmF7&type=m3u_plus&output=m3u8',
    'http://vodlat.top:80/get.php?username=MaRLeNcL&password=LcNeLRaM&type=m3u_plus',
    'http://vodlat.top:80/get.php?username=FE994517323RM&password=fernandocruz23&type=m3u_plus',
    'http://vodlat.top:80/get.php?username=FL2620ALEJANDROM&password=nvePBpa2pUg3&type=m3u_plus',
    'http://vodlat.top:80/get.php?username=ectchisaguano986&password=UUpcNczssP34&type=m3u_plus',
    'http://vodlat.top:80/get.php?username=Iptv0002&password=KX6g5d8d&type=m3u_plus',
    // diablotv
    'http://tv.diablotv.net:8080/get.php?username=ELLtdmaiz204fj&password=ScMZEQzYg&type=m3u_plus',
    // mgoplus
    'http://mgoplus.org:2086/get.php?username=fermin.ruedavalle2508&password=12345678.&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=luis.llasaca2006&password=12345678.&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=marlene.sarango0406&password=12345678.&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=Intertv189&password=12345678&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=User.E.0133&password=Jvc.0133.E&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=ronny.pozomorillo0608&password=12345678.&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=CON021094&password=021094&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=10002624&password=12345678&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=Intertv169&password=12345678&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=00002053&password=12345678&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=00000064&password=12345678&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=10006706&password=12345678&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=0000781&password=12345678&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=00006421&password=12345678&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=00001129&password=12345678&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=Intertv230&password=12345678&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=00006550&password=12345678&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=00001008&password=12345678&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=Intertv36&password=123456&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=ck.john&password=12345678.&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=User.E.0208&password=Jre.0208.E&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=denny.zamora1208&password=12345678.&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=FALCONNET6.JP&password=123456&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=Intertv196&password=12345678&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=Intertv123&password=123456&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=CON014908&password=14908&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=CON021725&password=ON021725&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=User.E.0094&password=Rma.0094.E&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=Zhunio_JIMA&password=octubre2024&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=Intertv33&password=123456&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=User.E.0176&password=Ppl.0176.E&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=00007664&password=12345678&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=RUBENQ.JP&password=123456&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=CanalesVen&password=NF8sq6nCEq&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=1a2&password=1a2&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=Intertv39&password=123456&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=00006949&password=12345678&type=m3u_plus',
    'http://mgoplus.org:2086/get.php?username=Intertv45&password=123456&type=m3u_plus',
    // tkosportz
    'http://tkosportz.live:25461/get.php?username=2OpbYla851&password=IfJokxj1ZX&type=m3u',
    'http://tkosportz.live:25461/get.php?username=8Az1J0OLOn&password=0auJZIgKwR&type=m3u',
    'http://tkosportz.live:25461/get.php?username=donnas5197&password=5197&type=m3u',
    'http://tkosportz.live:25461/get.php?username=dougbroughtonbuzz3&password=U2yOzWJvyT&type=m3u',
    'http://tkosportz.live:25461/get.php?username=ERczilxPqw&password=VhvkXPycaW&type=m3u',
    'http://tkosportz.live:25461/get.php?username=FYIJ48MID1&password=5meRooF75p&type=m3u',
    'http://tkosportz.live:25461/get.php?username=IVn0ISO1OS&password=hpEuX3iaXa&type=m3u',
    'http://tkosportz.live:25461/get.php?username=IXfmFb2InL&password=WG1qKft80M&type=m3u',
    'http://tkosportz.live:25461/get.php?username=mattstrong1&password=6066276874&type=m3u',
    'http://tkosportz.live:25461/get.php?username=MnTxdD1JHG&password=ugLqhHhdpB&type=m3u',
    'http://tkosportz.live:25461/get.php?username=q5wMq0N536&password=LmYcWnIQgp&type=m3u',
    'http://tkosportz.live:25461/get.php?username=rtaylor2023114515&password=TbEZvh18A3&type=m3u',
    'http://tkosportz.live:25461/get.php?username=vRv3YsT50Q&password=mw7PKDkB8C&type=m3u',
    'http://tkosportz.live:25461/get.php?username=WqzqGPliFR&password=A8ZEeTYaAR&type=m3u',
    // redworld
    'http://redworld.pro:8880/get.php?username=JesuM01&password=zDmWdX5gK3fm&type=m3u_plus',
    'http://redworld.pro:8880/get.php?username=vj9V988RnkAJ&password=zkmLnsstTHDW&type=m3u_plus',
    'http://redworld.pro:8880/get.php?username=Jorge.Orre&password=L6Rc6WnsGTbn&type=m3u_plus',
    'http://redworld.pro:8880/get.php?username=Yensi&password=LTZCYUZRqDC5&type=m3u_plus',
    'http://redworld.pro:8880/get.php?username=PebRnV87MJhn&password=XPgex4XmutJe&type=m3u_plus',
    'http://redworld.pro:8880/get.php?username=Mahaduarasy&password=LUy7jKy49kyN&type=m3u_plus',
    'http://redworld.pro:8880/get.php?username=Isabel&password=KAzqMLMa63kR&type=m3u_plus',
    'http://redworld.pro:8880/get.php?username=Lautaro10&password=fmSnwq7PueYc&type=m3u_plus',
    'http://redworld.pro:8880/get.php?username=gracetrivino1&password=eJXvv6ARcHTk&type=m3u_plus',
    'http://redworld.pro:8880/get.php?username=ryurhtqhjg&password=TGkFT7Q3F7dU&type=m3u_plus',
    'http://redworld.pro:8880/get.php?username=armando01&password=7Kkya63fUhFh&type=m3u_plus',
    // fastream
    'http://fastream.xyz:8080/get.php?username=93741122tv&password=YG65E646begUG87T&type=m3u_plus',
    'http://fastream.xyz:8080/get.php?username=946619311tv&password=90mi16&type=m3u_plus',
    'http://fastream.xyz:8080/get.php?username=90441385tv&password=nc8efh28&type=m3u_plus',
    'http://fastream.xyz:8080/get.php?username=948166100tv2&password=2knm9s0gby2&type=m3u_plus',
    'http://fastream.xyz:8080/get.php?username=976721342tv&password=t63jfdnw21&type=m3u_plus',
    'http://fastream.xyz:8080/get.php?username=957349155tv&password=hgds9932&type=m3u_plus',
    'http://fastream.xyz:8080/get.php?username=64786764tv&password=30ttb223&type=m3u_plus',
    'http://fastream.xyz:8080/get.php?username=56994551022wspzero&password=170821zero&type=m3u_plus',
    'http://fastream.xyz:8080/get.php?username=968378728tv&password=wski8738&type=m3u_plus',
    'http://fastream.xyz:8080/get.php?username=993944139tv&password=6s8024&type=m3u_plus',
    'http://fastream.xyz:8080/get.php?username=950014008tv&password=6d0thb&type=m3u_plus',
    'http://fastream.xyz:8080/get.php?username=paolaega&password=paola835&type=m3u_plus',
    'http://fastream.xyz:8080/get.php?username=58487107&password=05102023p&type=m3u_plus',
    'http://fastream.xyz:8080/get.php?username=999917819tv&password=44w6ei&type=m3u_plus',
    'http://fastream.xyz:8080/get.php?username=978228839tv&password=pk3hyb&type=m3u_plus',
    'http://fastream.xyz:8080/get.php?username=995620741tv&password=60689e5&type=m3u_plus',
    'http://fastream.xyz:8080/get.php?username=87388084&password=8fyr7ty4fh&type=m3u_plus',
    'http://fastream.xyz:8080/get.php?username=90727427&password=37rdgc28f&type=m3u_plus',
    'http://fastream.xyz:8080/get.php?username=56967975126wspztv&password=181124ztv&type=m3u_plus',
    'http://fastream.xyz:8080/get.php?username=984653701tv&password=28skn8gh2&type=m3u_plus',
    'http://fastream.xyz:8080/get.php?username=juanpabloperedotapiatv&password=0liihwt&type=m3u_plus',
    'http://fastream.xyz:8080/get.php?username=76951196&password=020423&type=m3u_plus',
    'http://fastream.xyz:8080/get.php?username=998014721&password=040524ztv&type=m3u_plus',
    // canal-pro
    'http://canal-pro.xyz:8080/get.php?username=40724021&password=8YH3HRF7g6r&type=m3u_plus',
    'http://canal-pro.xyz:8080/get.php?username=Evermamani7u6y5f3e2w&password=6h5zh9qne3&type=m3u_plus',
    'http://canal-pro.xyz:8080/get.php?username=992771165tv&password=808dwd&type=m3u_plus',
    'http://canal-pro.xyz:8080/get.php?username=964374735tv&password=4fdc5eg3&type=m3u_plus',
    'http://canal-pro.xyz:8080/get.php?username=ZjqFruWS9YhR&password=jYxxfSzUGPdb&type=m3u_plus',
    'http://canal-pro.xyz:8080/get.php?username=98375923&password=7dhii39ecjo&type=m3u_plus',
    'http://canal-pro.xyz:8080/get.php?username=79495227&password=06082023&type=m3u_plus',
    'http://canal-pro.xyz:8080/get.php?username=Haroldpinzon8i7j6h5g4f&password=WlQjr4XC3m&type=m3u_plus',
    // tvpromas
    'http://tvpromas.com:2082/get.php?username=56935562738wspzero&password=31082023zero&type=m3u_plus',
    'http://tvpromas.com:2082/get.php?username=felipequi&password=55felipe82&type=m3u_plus',
    'http://tvpromas.com:2082/get.php?username=Carlosvillota&password=433nhvc&type=m3u_plus',
    'http://tvpromas.com:2082/get.php?username=56958629057vecino&password=010320iptv&type=m3u_plus',
    // supersonictv
    'http://supersonictv.live:8080/get.php?username=Betty1&password=Betty1&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Darien1&password=Darien1&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Shan1&password=Shan1&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Shacara1&password=Shacara1&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Tedd1&password=Tedd1&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Allen123&password=Allen123&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Calvin123&password=Calvin123&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Henry123&password=Henry123&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Evelyn123&password=Evelyn123&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Marvin123&password=Marvin123&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Devon123&password=Devon123&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Edgar123&password=Edgar123&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Sonya123&password=Sonya123&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Leon123&password=Leon123&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Norman123&password=Norman123&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Neal123&password=Neal123&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Kendrick123&password=Kendrick123&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Nick123&password=Nick123&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Dara123&password=Dara123&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Sherman123&password=Sherman123&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Cherish123&password=Cherish123&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Silas123&password=Silas123&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Tawana123&password=Tawana123&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Ramsey123&password=Ramsey123&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Roslyn123&password=Roslyn123&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Keyonna123&password=Keyonna123&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Desean123&password=Desean123&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Treva123&password=Treva123&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Nash123&password=Nash123&type=m3u_plus',
    'http://supersonictv.live:8080/get.php?username=Joe12345&password=Joe12345&type=m3u_plus',
];

const CORS_PROXIES = [
    'https://api.allorigins.win/raw?url=',
    'https://corsproxy.io/?',
    'https://api.codetabs.com/v1/proxy?quest=',
    'https://cors.eu.org/',
    'https://proxy.cors.sh/',
];

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
    counter('⏳ Cargando canales...');
    let all=[];
    for(let i=0;i<LISTAS.length;i++){
        const url=LISTAS[i];
        counter(`⏳ ${i+1}/${LISTAS.length}...`);
        try{
            const text=await fetchP(url);
            if(!text)continue;
            const p=parseM3U(text);
            const nombre=url.split('/').pop().split('?')[0]||'lista';
            p.forEach(c=>{c.cat=nombre;if(!c.group)c.group=nombre});
            all=all.concat(p);
        }catch(e){}
    }
    if(all.length>0){
        const seen=new Set();
        canales=all.filter(c=>{if(seen.has(c.url))return false;seen.add(c.url);return true});
        renderTV();
        toast(`✅ ${canales.length} canales`);
    }
    hideCounter();
    }
