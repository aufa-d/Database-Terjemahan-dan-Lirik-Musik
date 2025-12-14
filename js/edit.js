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

/* menyimpan perubahan lagu ke backend */
async function saveSong(updatedSong) {
  try {
    const res = await fetch('/api/index');
    const songs = await res.json();

    const idx = songs.findIndex(song => song.id === updatedSong.id);
    if (idx !== -1) {
      songs[idx] = updatedSong;
    }

    await fetch('/api/index', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(songs)
    });
  } catch (err) {
    console.error(err);
    alert('Gagal menyimpan perubahan');
  }
}

/* setup form edit */
async function setupForm() {
  const id = getSongId();
  const song = await loadSong(id);

  if (!song) {
    alert('Lagu tidak ditemukan');
    window.location.href = 'index.html';
    return;
  }

  const lyricsBox = document.getElementById('lyrics');
  const translationBox = document.getElementById('translation');

  // isi form dengan data lama
  document.getElementById('title').value = song.title;
  document.getElementById('titleTranslation').value = song.title_translation;
  document.getElementById('youtubeUrl').value = `https://youtu.be/${song.youtube_id}`;
  lyricsBox.value = song.lyrics.join('\n');
  translationBox.value = song.translation.join('\n');

  // auto-resize dengan default 3 baris + limit tinggi
  [lyricsBox, translationBox].forEach(box => {
    box.rows = 3;
    box.style.height = box.scrollHeight + 'px';
    let prevLine = 0;

    box.addEventListener('input', () => {
      box.style.height = 'auto';
      const maxHeight = window.innerHeight * (2/3);
      const newHeight = box.scrollHeight;
      box.style.height = Math.min(newHeight, maxHeight) + 'px';

      const cursorLine = box.value.substr(0, box.selectionStart).split('\n').length;

      if (cursorLine !== prevLine) {
        const rect = box.getBoundingClientRect();
        const targetCenter = window.innerHeight / 2;
        window.scrollTo({
          top: window.scrollY + rect.top - targetCenter + rect.height / 2,
          behavior: 'smooth'
        });
        prevLine = cursorLine;
      }
    });
  });

  const form = document.getElementById('editSongForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const updatedSong = {
      ...song,
      title: document.getElementById('title').value.trim(),
      title_translation: document.getElementById('titleTranslation').value.trim(),
      youtube_id: song.youtube_id,
      lyrics: lyricsBox.value.split('\n'),
      translation: translationBox.value.split('\n'),
      updated_at: new Date().toISOString()
    };

    await saveSong(updatedSong);
    window.location.href = `song.html?id=${id}`;
  });
}

/* inisialisasi */
function init() {
  setupForm();
}
init();