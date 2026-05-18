let pelisAR = [], pelisLAT = [], pelisES = [], pelisSUB = [], series = [];

async function cargarPelis() {
    for (let page = 1; page <= 10; page++) {
        counter(`🎬 Pelis ${page}/10`);
        try {
            const r = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&with_origin_country=AR&sort_by=popularity.desc&page=${page}`);
            const d = await r.json();
            if (d.results) pelisAR.push(...d.results);
        } catch (e) {}
        try {
            const r = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&with_original_language=es&region=MX&sort_by=popularity.desc&page=${page}`);
            const d = await r.json();
            if (d.results) pelisLAT.push(...d.results);
        } catch (e) {}
        try {
            const r = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&with_original_language=es&region=ES&sort_by=popularity.desc&page=${page}`);
            const d = await r.json();
            if (d.results) pelisES.push(...d.results);
        } catch (e) {}
        try {
            const r = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&sort_by=popularity.desc&page=${page}`);
            const d = await r.json();
            if (d.results) pelisSUB.push(...d.results.filter(m => m.original_language !== 'es'));
        } catch (e) {}
        renderMovies();
    }
    const map = p => p.map(m => ({
        title: m.title, year: (m.release_date || '').split('-')[0],
        rating: (m.vote_average || 0).toFixed(1),
        poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : '',
        backdrop: m.backdrop_path ? `https://image.tmdb.org/t/p/original${m.backdrop_path}` : '',
        overview: m.overview || '', genreIds: m.genre_ids || [], tmdbId: m.id, type: 'movie'
    }));
    pelisAR = dedup(map(pelisAR)); pelisLAT = dedup(map(pelisLAT));
    pelisES = dedup(map(pelisES)); pelisSUB = dedup(map(pelisSUB));
}

async function cargarSeries() {
    let all = [];
    for (let page = 1; page <= 8; page++) {
        counter(`📺 Series ${page}/8`);
        try {
            const r = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_KEY}&with_original_language=es&sort_by=popularity.desc&page=${page}`);
            const d = await r.json();
            if (d.results) all.push(...d.results);
        } catch (e) {}
    }
    series = dedup(all.map(s => ({
        title: s.name, year: (s.first_air_date || '').split('-')[0],
        rating: (s.vote_average || 0).toFixed(1),
        poster: s.poster_path ? `https://image.tmdb.org/t/p/w500${s.poster_path}` : '',
        backdrop: s.backdrop_path ? `https://image.tmdb.org/t/p/original${s.backdrop_path}` : '',
        overview: s.overview || '', genreIds: s.genre_ids || [], tmdbId: s.id, type: 'series'
    })));
    renderSeries();
}
