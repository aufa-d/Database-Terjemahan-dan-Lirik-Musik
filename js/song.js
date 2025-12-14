/* mengambil parameter id dari url */
function getSongId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

/* memuat data lagu dari backend */
async function loadSong(id) {
  try {
    const res = await fetch('/api/index');
    const songs = await res.json();
    return songs.find(song => song.id === id);
  } catch (err) {
    console.error(err);
    return null;
  }
}

/* menghapus lagu dari backend */
async function deleteSong(id) {
  try {
    const res = await fetch('/api/index');
    const songs = await res.json();
    const updated = songs.filter(song => song.id !== id);

    await fetch('/api/index', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
  } catch (err) {
    console.error(err);
    alert('Gagal menghapus lagu');
  }
}

/* menampilkan detail lagu */
function renderSong(song) {
  if (!song) {
    document.body.innerHTML = `
      <div class="flex items-center justify-center min-h-screen bg-black text-white">
        <p class="text-center text-gray-400 text-xl">Lagu tidak ditemukan</p>
      </div>
    `;
    return;
  }

  document.getElementById('songTitle').textContent = song.title;
  document.getElementById('songTitleTranslation').textContent = song.title_translation;
  document.getElementById('songVideo').src = `https://www.youtube.com/embed/${song.youtube_id}`;

  // tampilkan tanggal di songMeta
  const metaBox = document.getElementById('songMeta');
  if (metaBox) {
    const created = song.created_at ? formatDateTime(song.created_at) : '-';
    const updated = song.updated_at ? formatDateTime(song.updated_at) : '-';
    metaBox.innerHTML = `
      Ditambahkan: ${created}<br>
      Terakhir diupdate: ${updated}
    `;
  }

  const lyricsContainer = document.getElementById('lyrics');
  const translationContainer = document.getElementById('translation');
  lyricsContainer.innerHTML = '';
  translationContainer.innerHTML = '';

  song.lyrics.forEach(line => {
    const lyricLine = document.createElement('p');
    lyricLine.innerHTML = line.trim() === '' ? '<br>' : line;
    lyricLine.style.whiteSpace = 'pre-line';
    lyricsContainer.appendChild(lyricLine);
  });

  song.translation.forEach(line => {
    const translationLine = document.createElement('p');
    translationLine.innerHTML = line.trim() === '' ? '<br>' : line;
    translationLine.style.whiteSpace = 'pre-line';
    translationContainer.appendChild(translationLine);
  });
}

/* toggle terjemahan */
function setupToggle() {
  document.getElementById('toggleTranslation').addEventListener('click', () => {
    document.getElementById('translation').classList.toggle('hidden');
  });
}

/* setup tombol hapus */
function setupDelete(id) {
  const btn = document.getElementById('deleteSongBtn');
  btn.addEventListener('click', async () => {
    await deleteSong(id);
    window.location.href = 'index.html';
  });
}

/* setup tombol edit */
function setupEdit(id) {
  const btn = document.getElementById('editSongBtn');
  btn.addEventListener('click', () => {
    window.location.href = `edit.html?id=${id}`;
  });
}

/* setup tombol kembali */
function setupBack() {
  const btn = document.getElementById('backBtn');
  btn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

/* inisialisasi */
async function init() {
  const id = getSongId();
  const song = await loadSong(id);
  renderSong(song);
  setupToggle();
  setupDelete(id);
  setupEdit(id);
  setupBack();
}

init();