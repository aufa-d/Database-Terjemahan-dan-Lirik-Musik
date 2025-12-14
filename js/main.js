/* memuat data dari backend */
async function loadData() {
  try {
    const response = await fetch('/api/index');
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

/* menampilkan daftar lagu */
function renderSongs(songs) {
  const songList = document.getElementById('songList');
  songList.innerHTML = '';

  if (songs.length === 0) {
    songList.innerHTML = '<p class="col-span-full text-center text-gray-400">Tidak ditemukan</p>';
    return;
  }

  songs.forEach(song => {
    const created = song.created_at ? formatDateTime(song.created_at) : '-';
    const updated = song.updated_at ? formatDateTime(song.updated_at) : '-';

    const item = document.createElement('div');
    item.className = 'bg-gray-900 p-4 rounded-md cursor-pointer transform transition duration-300 ease-in-out hover:bg-gray-800 hover:scale-[1.02] hover:shadow-lg';

    item.innerHTML = `
      <div class="w-full aspect-video mb-4">
        <img src="https://img.youtube.com/vi/${song.youtube_id}/hqdefault.jpg" 
             alt="Thumbnail" 
             class="w-full h-full object-cover rounded-md">
      </div>
      <h3 class="text-xl font-bold">${song.title}</h3>
      <p class="text-gray-400">${song.title_translation || ''}</p>
      <p class="text-gray-500 text-sm">
        Ditambahkan: ${created}<br>
        Terakhir diupdate: ${updated}
      </p>
    `;
    item.onclick = () => {
      window.location.href = `song.html?id=${song.id}`;
    };
    songList.appendChild(item);
  });
}

/* fungsi pencarian */
function setupSearch(allSongs) {
  const searchBox = document.getElementById('searchBox');
  searchBox.addEventListener('input', () => {
    const query = searchBox.value.toLowerCase();
    const filtered = allSongs.filter(song =>
      (song.title || '').toLowerCase().includes(query) ||
      (song.title_translation || '').toLowerCase().includes(query)
    );
    renderSongs(filtered);
  });
}

/* fungsi tambah lagu */
function setupAddSong() {
  const addBtn = document.getElementById('addSongBtn');
  addBtn.addEventListener('click', () => {
    window.location.href = 'add.html';
  });
}

/* inisialisasi beranda */
async function init() {
  let songs = await loadData();

  // urutkan berdasarkan updated_at (terbaru di atas), fallback ke created_at
  songs.sort((a, b) => {
    const dateA = new Date(a.updated_at || a.created_at || 0);
    const dateB = new Date(b.updated_at || b.created_at || 0);
    return dateB - dateA; // descending order
  });

  renderSongs(songs);
  setupSearch(songs);
  setupAddSong();
}

init();