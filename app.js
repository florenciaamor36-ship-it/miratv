async function importarLista(){
    const url=document.getElementById('m3uUrl').value.trim();
    const status=document.getElementById('importStatus');
    if(!url){status.textContent='⚠️ Pegá una URL primero';return}
    status.textContent='⏳ Descargando lista...';
    try{
        const text=await fetchP(url);
        if(!text){status.textContent='❌ No se pudo descargar';return}
        const p=parseM3U(text);
        if(!p.length){status.textContent='❌ No se encontraron canales';return}
        const nombre=url.split('/').pop()?.split('?')[0]||'listaImportada';
        p.forEach(c=>{c.cat=nombre;if(!c.group)c.group=nombre});
        canales=[...canales,...p];
        const seen=new Set();canales=canales.filter(c=>{if(seen.has(c.url))return false;seen.add(c.url);return true});
        renderTV();updateInfo();
        status.textContent=`✅ ${p.length} canales importados de "${nombre}"`;
        document.getElementById('m3uUrl').value='';
        switchPage('home');
    }catch(e){status.textContent='❌ Error al descargar la lista'}
}

function updateInfo(){
    const sCh=document.getElementById('sCh');if(sCh)sCh.textContent=canales.length;
    const sListas=document.getElementById('sListas');if(sListas)sListas.textContent=listasCargadas||'0';
}
