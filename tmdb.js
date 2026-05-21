let peliculas=[],series=[];

async function cargarPelis(){
    let all=[];
    for(let page=1;page<=8;page++){
        for(const p of['AR','MX','ES']){
            try{const r=await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&with_original_language=es&region=${p}&sort_by=popularity.desc&page=${page}`);const d=await r.json();if(d.results)all=all.concat(d.results)}catch(e){}
        }
    }
    const s=new Set();peliculas=all.filter(m=>{if(s.has(m.id))return false;s.add(m.id);return true}).map(m=>({title:m.title,year:(m.release_date||'').split('-')[0],rating:(m.vote_average||0).toFixed(1),poster:m.poster_path?`https://image.tmdb.org/t/p/w500${m.poster_path}`:'',backdrop:m.backdrop_path?`https://image.tmdb.org/t/p/original${m.backdrop_path}`:'',overview:m.overview||'',genreIds:m.genre_ids||[],tmdbId:m.id,type:'movie'}));
}

async function cargarSeries(){
    let all=[];
    for(let page=1;page<=5;page++){
        try{const r=await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_KEY}&with_original_language=es&sort_by=popularity.desc&page=${page}`);const d=await r.json();if(d.results)all=all.concat(d.results)}catch(e){}
    }
    const s=new Set();series=all.filter(m=>{if(s.has(m.id))return false;s.add(m.id);return true}).map(s=>({title:s.name,year:(s.first_air_date||'').split('-')[0],rating:(s.vote_average||0).toFixed(1),poster:s.poster_path?`https://image.tmdb.org/t/p/w500${s.poster_path}`:'',backdrop:s.backdrop_path?`https://image.tmdb.org/t/p/original${s.backdrop_path}`:'',overview:s.overview||'',genreIds:s.genre_ids||[],tmdbId:s.id,type:'series'}));
        }
