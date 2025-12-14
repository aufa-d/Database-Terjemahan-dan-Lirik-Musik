/* ekstrak id youtube dari url */
function extractYouTubeId(url) {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

/* setup form tambah lagu */
function setupForm() {
  const form = document.getElementById('addSongForm');
  const lyricsBox = document.getElementById('lyrics');
  const translationBox = document.getElementById('translation');

  // auto-resize dengan default 3 baris + limit tinggi
  [lyricsBox, translationBox].forEach(box => {
    box.rows = 3;
    box.style.height = box.scrollHeight + 'px';
    let prevLine = 0;

    box.addEventListener('input', () => {
      // auto-resize tinggi box
      box.style.height = 'auto';
      const maxHeight = window.innerHeight * (2/3);
      const newHeight = box.scrollHeight;
      box.style.height = Math.min(newHeight, maxHeight) + 'px';

      // hitung baris kursor
      const cursorLine = box.value.substr(0, box.selectionStart).split('\n').length;

      // scroll hanya jika pindah baris
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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const titleTranslation = document.getElementById('titleTranslation').value.trim();
    const youtubeUrl = document.getElementById('youtubeUrl').value.trim();
    const lyrics = lyricsBox.value.split('\n');
    const translation = translationBox.value.split('\n');

    if (!title || !youtubeUrl) {
      alert('Judul dan link YouTube wajib diisi');
      return;
    }

    const youtubeId = extractYouTubeId(youtubeUrl);
    if (!youtubeId) {
      alert('Link YouTube tidak valid');
      return;
    }

    const now = new Date().toISOString();

    const newSong = {
      id: title.toLowerCase().replace(/\s+/g, '-'),
      title,
      title_translation: titleTranslation,
      youtube_id: youtubeId,
      lyrics,
      translation,
      created_at: now,
      updated_at: now
    };

    try {
      const res = await fetch('/api/index');
      const songs = await res.json();
      songs.push(newSong);

      await fetch('/api/index', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(songs)
      });

      window.location.href = 'index.html';
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan lagu ke index.json');
    }
  });
}

/* inisialisasi */
function init() {
  setupForm();
}
init();