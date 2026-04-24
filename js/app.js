const PUBMED_BASE = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';
const TOOL  = 'clinpathid-article-finder';
const EMAIL = 'clinpathid.dev@gmail.com';

let savedArticles = [];
let expandedJournalIndex = null;
let currentPreviewArticle = null;
let allArticles = {};

try {
  savedArticles = JSON.parse(localStorage.getItem('clinpathid_saved_v1') || '[]');
} catch (e) { savedArticles = []; }

function persistSaved() {
  try { localStorage.setItem('clinpathid_saved_v1', JSON.stringify(savedArticles)); } catch (e) {}
}
function isSaved(pmid) { return savedArticles.some(a => a.pmid === pmid); }
function updateSavedBadge() {
  const el = document.getElementById('saved-count');
  if (el) el.textContent = savedArticles.length ? `(${savedArticles.length})` : '';
}

function badge(cls, text) {
  return `<span class="badge badge-${cls}">${text}</span>`;
}
function journalBadges(jm) {
  if (!jm) return '';
  let b = badge('q' + jm.q.slice(1), jm.q);
  b += badge('topic', jm.topic);
  if (jm.free) b += badge('free', 'Free APC');
  if (jm.oa)   b += badge('oa', 'OA');
  return b;
}

// ─── TABS ──────────────────────────────────────────────────────────────────────
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    const t = btn.dataset.tab;
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + t).classList.add('active');
    if (t === 'saved') renderSaved();
  });
});

// ─── JOURNAL TAB ───────────────────────────────────────────────────────────────
function renderJournals() {
  const topic  = document.getElementById('f-topic').value;
  const q      = document.getElementById('f-q').value;
  const apc    = document.getElementById('f-apc').value;
  const oa     = document.getElementById('f-oa').value;
  const search = document.getElementById('f-search').value.toLowerCase();

  const filtered = JOURNALS.filter(j => {
    if (topic && j.topic !== topic) return false;
    if (q && j.q !== q) return false;
    if (apc === 'free' && !j.free) return false;
    if (apc === 'paid' && j.free) return false;
    if (oa === 'yes' && !j.oa) return false;
    if (search && !j.name.toLowerCase().includes(search)) return false;
    return true;
  });

  document.getElementById('journal-count').textContent = `Menampilkan ${filtered.length} jurnal`;

  const grid = document.getElementById('journal-grid');
  if (!filtered.length) {
    grid.innerHTML = '<div class="empty">Tidak ada jurnal yang sesuai filter.</div>';
    return;
  }

  grid.innerHTML = filtered.map((j, i) => {
    const expanded = expandedJournalIndex === i;
    return `<div class="jcard${expanded ? ' expanded' : ''}" onclick="toggleJournal(${i})">
      <div class="jcard-top">
        <div class="jcard-name">${j.name}</div>
        <div class="jcard-badges">
          ${badge('q' + j.q.slice(1), j.q)}
          ${j.oa   ? badge('oa', 'OA') : ''}
          ${j.free ? badge('free', 'Free APC') : ''}
        </div>
      </div>
      <div class="jcard-meta">
        <span>${j.topic}</span>
        <span>IF: ${j.if.toFixed(1)}</span>
        <span>SJR: ${j.sjr}</span>
      </div>
      <div class="jcard-detail">
        <div class="detail-row"><span class="detail-label">Publisher</span><span class="detail-val">${j.publisher}</span></div>
        <div class="detail-row"><span class="detail-label">APC</span><span class="detail-val">${j.apc}</span></div>
        <div class="detail-row"><span class="detail-label">Open Access</span><span class="detail-val">${j.oa ? 'Ya' : 'Tidak'}</span></div>
        <div class="detail-row"><span class="detail-label">Scimago 2025</span><span class="detail-val">${j.q} &mdash; SJR ${j.sjr}</span></div>
        <a class="detail-link" href="${j.submit}" target="_blank" rel="noopener">Halaman submit &rarr;</a>
      </div>
    </div>`;
  }).join('');
}

function toggleJournal(i) {
  expandedJournalIndex = expandedJournalIndex === i ? null : i;
  renderJournals();
}

['f-topic','f-q','f-apc','f-oa'].forEach(id =>
  document.getElementById(id).addEventListener('change', renderJournals)
);
document.getElementById('f-search').addEventListener('input', renderJournals);

document.getElementById('export-btn').addEventListener('click', () => {
  const topic = document.getElementById('f-topic').value;
  const q     = document.getElementById('f-q').value;
  const filtered = JOURNALS.filter(j => {
    if (topic && j.topic !== topic) return false;
    if (q && j.q !== q) return false;
    return true;
  });
  const rows = [['Nama Jurnal','Topik','Kuartil','IF','SJR','Open Access','Free APC','Biaya APC','Publisher','Link Submit']];
  filtered.forEach(j => rows.push([j.name, j.topic, j.q, j.if, j.sjr, j.oa?'Ya':'Tidak', j.free?'Ya':'Tidak', j.apc, j.publisher, j.submit]));
  const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'clinpathid_journals_scimago2025.csv'; a.click();
  URL.revokeObjectURL(url);
});

// ─── ARTICLE SEARCH ────────────────────────────────────────────────────────────
async function doSearch() {
  const kw    = document.getElementById('q-input').value.trim();
  const topic = document.getElementById('q-topic').value;
  const yr    = document.getElementById('q-year').value;

  if (!kw && !topic) {
    document.getElementById('article-results').innerHTML =
      '<div class="empty">Masukkan kata kunci atau pilih topik terlebih dahulu.</div>';
    return;
  }

  const btn = document.getElementById('search-btn');
  btn.disabled = true; btn.textContent = 'Mencari...';

  const ra = document.getElementById('article-results');
  ra.innerHTML = '<div class="loading"><div class="spinner"></div>Mencari di PubMed...</div>';
  closeModal();

  let parts = [];
  if (kw)    parts.push(kw);
  if (topic) parts.push(topic);
  if (yr) {
    const now = new Date().getFullYear();
    parts.push(`${now - parseInt(yr)}:${now}[pdat]`);
  }
  const query = parts.join(' AND ');

  try {
    // Step 1: esearch
    const sUrl = `${PUBMED_BASE}/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retmax=15&retmode=json&sort=relevance&tool=${TOOL}&email=${EMAIL}`;
    const sRes = await fetch(sUrl);
    if (!sRes.ok) throw new Error(`HTTP ${sRes.status}`);
    const sData = await sRes.json();
    const ids = sData.esearchresult.idlist;

    if (!ids.length) {
      ra.innerHTML = '<div class="empty">Tidak ditemukan artikel. Coba kata kunci yang berbeda.</div>';
      btn.disabled = false; btn.textContent = 'Cari'; return;
    }

    // Step 2: efetch
    const fUrl = `${PUBMED_BASE}/efetch.fcgi?db=pubmed&id=${ids.join(',')}&retmode=xml&tool=${TOOL}&email=${EMAIL}`;
    const fRes = await fetch(fUrl);
    if (!fRes.ok) throw new Error(`HTTP ${fRes.status}`);
    const xmlText = await fRes.text();

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    const articles = xmlDoc.querySelectorAll('PubmedArticle');

    allArticles = {};
    let html = `<div class="result-count">Ditemukan ${sData.esearchresult.count}+ artikel &mdash; menampilkan ${articles.length} teratas. Klik judul untuk preview.</div><div class="article-list">`;

    articles.forEach(art => {
      const title    = art.querySelector('ArticleTitle')?.textContent || 'Tanpa judul';
      const abstract = art.querySelector('AbstractText')?.textContent || '';
      const jName    = art.querySelector('Title')?.textContent || '';
      const year     = art.querySelector('PubDate Year')?.textContent
                    || art.querySelector('PubDate MedlineDate')?.textContent?.slice(0,4) || '';
      const pmid     = art.querySelector('PMID')?.textContent || '';
      const doi      = art.querySelector('ArticleId[IdType="doi"]')?.textContent || '';
      const affil    = art.querySelector('Affiliation')?.textContent || '';
      const kwNodes  = art.querySelectorAll('Keyword');
      const keywords = Array.from(kwNodes).map(k => k.textContent).slice(0,8).join('; ');

      const authNodes = art.querySelectorAll('Author');
      const authList  = Array.from(authNodes).slice(0,6).map(au => {
        const ln  = au.querySelector('LastName')?.textContent || '';
        const ini = au.querySelector('Initials')?.textContent || '';
        return `${ln} ${ini}`.trim();
      });
      const authors = authList.join(', ') + (authNodes.length > 6 ? ' et al.' : '');

      const jm = matchJournal(jName);
      const artObj = { title, abstract, jName, year, pmid, doi, affil, keywords, authors, jm };
      allArticles[pmid] = artObj;

      html += `<div class="acard" onclick="openModal('${pmid}')">
        <div class="acard-title">${title}</div>
        <div class="acard-meta">${authList[0] || ''}${authNodes.length > 1 ? ' et al.' : ''} ${year ? '&bull; ' + year : ''} ${jName ? '&bull; <em>' + jName + '</em>' : ''}</div>
        <div class="acard-badges">${journalBadges(jm)}</div>
      </div>`;
    });

    html += '</div>';
    ra.innerHTML = html;

  } catch (err) {
    ra.innerHTML = `<div class="empty">
      Gagal mengambil data dari PubMed.<br>
      <small style="display:block;margin-top:6px;color:#9eac9e">
        ${err.message}. Pastikan koneksi internet aktif lalu coba lagi.
      </small>
    </div>`;
  }

  btn.disabled = false; btn.textContent = 'Cari';
}

document.getElementById('search-btn').addEventListener('click', doSearch);
document.getElementById('q-input').addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

// ─── MODAL ─────────────────────────────────────────────────────────────────────
function openModal(pmid) {
  const art = allArticles[pmid];
  if (!art) return;
  currentPreviewArticle = art;
  renderPreview(art, 'paper-preview', 'modal-actions');
  document.getElementById('modal-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function openModalFromSaved(pmid) {
  const art = savedArticles.find(a => a.pmid === pmid);
  if (!art) return;
  if (!art.jm) art.jm = matchJournal(art.jName);
  // merge into allArticles so actions work
  allArticles[pmid] = art;
  currentPreviewArticle = art;
  renderPreview(art, 'paper-preview', 'modal-actions');
  document.getElementById('modal-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});

function renderPreview(art, previewId, actionsId) {
  const jm = art.jm || matchJournal(art.jName);
  art.jm = jm;

  document.getElementById(previewId).innerHTML = `
    <div class="p-journal-row">
      <div class="p-journal-name">${art.jName || 'Journal'}</div>
      <div class="p-badges">${journalBadges(jm)}</div>
    </div>
    <div class="p-title">${art.title}</div>
    <div class="p-authors">${art.authors || '&mdash;'}</div>
    ${art.affil ? `<div class="p-affil">${art.affil.slice(0,200)}${art.affil.length > 200 ? '...' : ''}</div>` : ''}
    <div class="p-meta">
      ${art.year  ? `<span>Published: ${art.year}</span>` : ''}
      ${art.pmid  ? `<span>PMID: ${art.pmid}</span>` : ''}
      ${art.doi   ? `<span>DOI: ${art.doi}</span>` : ''}
      ${jm        ? `<span>IF: ${jm.if.toFixed(1)}</span><span>SJR: ${jm.sjr}</span>` : ''}
    </div>
    <div class="p-abs-label">Abstract</div>
    <div class="p-abs">${art.abstract || 'Abstract tidak tersedia. Lihat halaman PubMed untuk detail lengkap.'}</div>
    ${art.keywords ? `<div class="p-kw"><strong>Keywords:</strong> ${art.keywords}</div>` : ''}
  `;

  const saved = isSaved(art.pmid);
  document.getElementById(actionsId).innerHTML = `
    ${art.pmid ? `<a class="btn-action" href="https://pubmed.ncbi.nlm.nih.gov/${art.pmid}/" target="_blank" rel="noopener">Buka PubMed</a>` : ''}
    ${art.doi  ? `<a class="btn-action" href="https://doi.org/${art.doi}" target="_blank" rel="noopener">Buka DOI</a>` : ''}
    <button class="btn-action" onclick="savePNG('${previewId}', '${art.pmid}')">Simpan gambar</button>
    <button id="save-btn-${art.pmid}" class="${saved ? 'btn-saved' : 'btn-save'}" onclick="toggleSave('${art.pmid}')">
      ${saved ? 'Tersimpan' : 'Simpan referensi'}
    </button>
  `;
}

// ─── SAVE ──────────────────────────────────────────────────────────────────────
function toggleSave(pmid) {
  const art = allArticles[pmid] || savedArticles.find(a => a.pmid === pmid);
  if (!art) return;
  if (isSaved(pmid)) {
    savedArticles = savedArticles.filter(a => a.pmid !== pmid);
  } else {
    savedArticles.push(art);
  }
  persistSaved();
  updateSavedBadge();
  const btn = document.getElementById('save-btn-' + pmid);
  if (btn) {
    const sv = isSaved(pmid);
    btn.textContent = sv ? 'Tersimpan' : 'Simpan referensi';
    btn.className = sv ? 'btn-saved' : 'btn-save';
  }
  renderSaved();
}

function renderSaved() {
  const el = document.getElementById('saved-list');
  if (!el) return;
  if (!savedArticles.length) {
    el.innerHTML = '<div class="empty">Belum ada artikel tersimpan.<br><small>Cari artikel lalu klik "Simpan referensi" di preview.</small></div>';
    return;
  }
  el.innerHTML = `<div class="result-count">${savedArticles.length} artikel tersimpan</div>` +
    savedArticles.map(art => {
      const jm = art.jm || matchJournal(art.jName);
      return `<div class="saved-card">
        <div class="saved-info">
          <div class="saved-title" onclick="openModalFromSaved('${art.pmid}')">${art.title}</div>
          <div class="saved-meta">${art.jName || ''} ${art.year ? '&bull; ' + art.year : ''} ${art.pmid ? '&bull; PMID ' + art.pmid : ''}</div>
          <div class="saved-badges">${journalBadges(jm)}</div>
        </div>
        <button class="saved-remove" onclick="toggleSave('${art.pmid}')" title="Hapus">&times;</button>
      </div>`;
    }).join('');
}

// ─── SAVE AS PNG ───────────────────────────────────────────────────────────────
async function savePNG(containerId, pmid) {
  if (!window.html2canvas) { alert('Library belum siap, coba lagi sebentar.'); return; }
  const el = document.getElementById(containerId);
  if (!el) return;
  try {
    const canvas = await html2canvas(el, { backgroundColor: '#ffffff', scale: 2, useCORS: true, logging: false });
    const link = document.createElement('a');
    link.download = `paper_preview_${pmid || 'article'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (e) { alert('Gagal menyimpan gambar: ' + e.message); }
}

// ─── SERVICE WORKER ────────────────────────────────────────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => { navigator.serviceWorker.register('./sw.js').catch(() => {}); });
}

// ─── INIT ──────────────────────────────────────────────────────────────────────
renderJournals();
updateSavedBadge();
