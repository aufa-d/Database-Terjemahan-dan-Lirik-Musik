/* mengekstrak youtube id dari url */
function extractYouTubeId(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1);
    }
    return null;
  } catch {
    return null;
  }
}

/* memformat tanggal menjadi yyyy-mm-dd */
function formatDate(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '-';
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/* memformat tanggal + jam (dd Mon yyyy, hh:mm) */
function formatDateTime(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '-';
  return d.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/* memvalidasi input judul */
function validateTitle(title) {
  return title && title.trim().length > 0;
}

/* memvalidasi input youtube */
function validateYouTube(url) {
  return extractYouTubeId(url) !== null;
}