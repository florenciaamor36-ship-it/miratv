function renderVOD() {
    const container = document.getElementById('vodGrid'); // Suponiendo que creamos este div
    const vodItems = allTvChannels.filter(item => {
        const url = item.url.toLowerCase();
        return url.includes('.mp4') || url.includes('.mkv') || url.includes('/movie/') || url.includes('/series/');
    });

    const spanishVOD = vodItems.filter(item => {
        const group = (item.group || '').toLowerCase();
        const name = (item.name || '').toLowerCase();
        return group.includes('latino') || group.includes('españa') || group.includes('castellano') ||
               name.includes('(lat)') || name.includes('(esp)');
    });

    // Agrupar por géneros o categorías del m3u
    const categories = {};
    spanishVOD.forEach(item => {
        const cat = item.group || 'Otros';
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(item);
    });

    container.innerHTML = '';
    for (const [name, items] of Object.entries(categories)) {
        const row = document.createElement('div');
        row.className = 'vod-row';
        row.innerHTML = `
            <div class="vod-row-title">${name}</div>
            <div class="vod-carousel">
                ${items.map(item => `
                    <div class="vod-card" onclick="openPlayer(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                        <img src="${item.logo || 'placeholder.jpg'}" onerror="this.src='https://via.placeholder.com/200x300?text=${encodeURIComponent(item.name)}'">
                        <div class="vod-card-info">${item.name}</div>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(row);
    }
}
