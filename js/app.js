const PUBMED_BASE = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';
const TOOL     = 'clinpathid-article-finder';
const EMAIL    = 'clinpathid.dev@gmail.com';

const PER_PAGE  = 15;
const MAX_PAGES = 10;
const MAX_FETCH = PER_PAGE * MAX_PAGES; // 150

const EXCLUDE_PUBTYPE = 'NOT ("systematic review"[pt] OR "meta-analysis"[pt] OR "Review"[pt])';

let savedArticles = [];
let expandedJournalIndex = null;
let allArticles   = {};

let currentPage  = 1;
let totalResults = 0;
let allPmids     = [];
let lastQuery    = '';

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

// ─── EXTENDED JOURNAL DATABASE ─────────────────────────────────────────────────
// Jurnal umum yang sering muncul di PubMed untuk topik PK
// tetapi tidak ada di database utama JOURNALS
const EXT_JOURNALS = [
  // Multidisciplinary / General yang relevan PK
  { name: "PloS one", q: "Q1", topic: "Umum", oa: true, free: false, sjr: 0.99, if: 3.7 },
  { name: "Scientific Reports", q: "Q1", topic: "Umum", oa: true, free: false, sjr: 0.79, if: 4.0 },
  { name: "Medicine", q: "Q2", topic: "Umum", oa: true, free: false, sjr: 0.59, if: 1.6 },
  { name: "Journal of Clinical Medicine", q: "Q1", topic: "Umum", oa: true, free: false, sjr: 0.82, if: 3.9 },
  { name: "International Journal of Molecular Sciences", q: "Q1", topic: "Umum", oa: true, free: false, sjr: 0.90, if: 5.6 },
  { name: "Biomedicines", q: "Q1", topic: "Umum", oa: true, free: false, sjr: 0.72, if: 4.8 },
  { name: "Cells", q: "Q1", topic: "Umum", oa: true, free: false, sjr: 0.88, if: 6.0 },
  { name: "Nutrients", q: "Q1", topic: "Umum", oa: true, free: false, sjr: 0.76, if: 5.9 },
  { name: "Cancers", q: "Q1", topic: "Umum", oa: true, free: false, sjr: 0.91, if: 5.2 },
  { name: "Biology", q: "Q2", topic: "Umum", oa: true, free: false, sjr: 0.60, if: 4.2 },
  { name: "Life", q: "Q2", topic: "Umum", oa: true, free: false, sjr: 0.55, if: 3.2 },
  { name: "International Journal of Environmental Research and Public Health", q: "Q2", topic: "Umum", oa: true, free: false, sjr: 0.65, if: 4.6 },

  // Hematologi tambahan
  { name: "Thrombosis and Haemostasis", q: "Q1", topic: "Hematologi", oa: false, free: false, sjr: 1.43, if: 5.5 },
  { name: "Journal of Thrombosis and Haemostasis", q: "Q1", topic: "Hematologi", oa: false, free: false, sjr: 1.85, if: 7.1 },
  { name: "Blood Cancer Journal", q: "Q1", topic: "Hematologi", oa: true, free: false, sjr: 2.10, if: 12.1 },
  { name: "Thrombosis Research", q: "Q2", topic: "Hematologi", oa: false, free: false, sjr: 0.71, if: 3.6 },
  { name: "Thrombosis Journal", q: "Q3", topic: "Hematologi", oa: true, free: false, sjr: 0.43, if: 2.8 },
  { name: "Journal of Clinical Oncology", q: "Q1", topic: "Hematologi", oa: false, free: false, sjr: 8.20, if: 45.3 },
  { name: "Leukemia & Lymphoma", q: "Q2", topic: "Hematologi", oa: false, free: false, sjr: 0.76, if: 2.6 },
  { name: "Blood Coagulation & Fibrinolysis", q: "Q3", topic: "Hematologi", oa: false, free: false, sjr: 0.40, if: 1.8 },
  { name: "Platelets", q: "Q2", topic: "Hematologi", oa: false, free: false, sjr: 0.67, if: 3.2 },

  // Kimia Klinik tambahan
  { name: "Clinics and Research in Hepatology and Gastroenterology", q: "Q2", topic: "Kimia Klinik", oa: false, free: false, sjr: 0.60, if: 3.2 },
  { name: "Biochimie", q: "Q2", topic: "Kimia Klinik", oa: false, free: false, sjr: 0.62, if: 3.8 },
  { name: "Analytical Chemistry", q: "Q1", topic: "Kimia Klinik", oa: false, free: false, sjr: 1.50, if: 7.4 },
  { name: "Talanta", q: "Q1", topic: "Kimia Klinik", oa: false, free: false, sjr: 1.10, if: 6.1 },
  { name: "Biosensors and Bioelectronics", q: "Q1", topic: "Kimia Klinik", oa: false, free: false, sjr: 2.30, if: 12.6 },
  { name: "Journal of Pharmaceutical and Biomedical Analysis", q: "Q2", topic: "Kimia Klinik", oa: false, free: false, sjr: 0.75, if: 3.2 },
  { name: "Clinical Endocrinology", q: "Q2", topic: "Kimia Klinik", oa: false, free: false, sjr: 0.72, if: 3.5 },
  { name: "Diabetes Research and Clinical Practice", q: "Q1", topic: "Kimia Klinik", oa: false, free: false, sjr: 0.95, if: 6.1 },
  { name: "Annals of Laboratory Medicine", q: "Q2", topic: "Kimia Klinik", oa: true, free: false, sjr: 0.80, if: 3.8 },

  // Imunologi tambahan
  { name: "Journal of Autoimmunity", q: "Q1", topic: "Imunologi", oa: false, free: false, sjr: 2.20, if: 12.0 },
  { name: "Autoimmunity Reviews", q: "Q1", topic: "Imunologi", oa: false, free: false, sjr: 2.10, if: 9.4 },
  { name: "Clinical and Experimental Allergy", q: "Q1", topic: "Imunologi", oa: false, free: false, sjr: 1.20, if: 6.3 },
  { name: "Immunology", q: "Q1", topic: "Imunologi", oa: false, free: false, sjr: 1.05, if: 5.0 },
  { name: "Journal of Inflammation Research", q: "Q2", topic: "Imunologi", oa: true, free: false, sjr: 0.78, if: 4.2 },
  { name: "Cytokine", q: "Q2", topic: "Imunologi", oa: false, free: false, sjr: 0.73, if: 3.8 },
  { name: "Cytokine & Growth Factor Reviews", q: "Q1", topic: "Imunologi", oa: false, free: false, sjr: 1.80, if: 9.8 },

  // Penyakit Infeksi tambahan
  { name: "The Lancet. Infectious Diseases", q: "Q1", topic: "Penyakit Infeksi", oa: false, free: false, sjr: 5.45, if: 38.1 },
  { name: "Journal of Hospital Infection", q: "Q1", topic: "Penyakit Infeksi", oa: false, free: false, sjr: 1.10, if: 5.9 },
  { name: "Infection Control & Hospital Epidemiology", q: "Q1", topic: "Penyakit Infeksi", oa: false, free: false, sjr: 1.05, if: 5.0 },
  { name: "Travel Medicine and Infectious Disease", q: "Q2", topic: "Penyakit Infeksi", oa: false, free: false, sjr: 0.88, if: 4.3 },
  { name: "Epidemiology and Infection", q: "Q2", topic: "Penyakit Infeksi", oa: true, free: false, sjr: 0.70, if: 3.0 },
  { name: "Journal of Medical Virology", q: "Q2", topic: "Penyakit Infeksi", oa: false, free: false, sjr: 0.92, if: 6.1 },
  { name: "Antiviral Research", q: "Q1", topic: "Penyakit Infeksi", oa: false, free: false, sjr: 1.20, if: 6.3 },
  { name: "Microbiology and Immunology", q: "Q3", topic: "Penyakit Infeksi", oa: false, free: false, sjr: 0.43, if: 2.5 },
  { name: "Mycoses", q: "Q2", topic: "Penyakit Infeksi", oa: false, free: false, sjr: 0.78, if: 4.3 },
  { name: "Medical Mycology", q: "Q2", topic: "Penyakit Infeksi", oa: false, free: false, sjr: 0.72, if: 3.3 },
  { name: "Parasitology International", q: "Q2", topic: "Penyakit Infeksi", oa: false, free: false, sjr: 0.65, if: 2.9 },
  { name: "PLOS Pathogens", q: "Q1", topic: "Penyakit Infeksi", oa: true, free: false, sjr: 1.95, if: 6.7 },
  { name: "mBio", q: "Q1", topic: "Penyakit Infeksi", oa: true, free: false, sjr: 2.20, if: 6.4 },
  { name: "Clinical Microbiology Reviews", q: "Q1", topic: "Penyakit Infeksi", oa: false, free: false, sjr: 5.50, if: 19.9 },
];

// Gabungkan semua jurnal untuk matching
const ALL_JOURNALS_FOR_MATCH = [...JOURNALS, ...EXT_JOURNALS];

// ─── JOURNAL MATCHING — diperbaiki ────────────────────────────────────────────
function normalizeJournal(name) {
  return name
    .toLowerCase()
    // Hapus suffix lokasi seperti "(Basel, Switzerland)", "(United States)"
    .replace(/\s*\([^)]*\)/g, '')
    // Hapus titik di akhir
    .replace(/\.\s*$/, '')
    // Normalisasi spasi
    .trim();
}

function matchJournal(jName) {
  if (!jName) return null;
  const jNorm = normalizeJournal(jName);

  // Pass 1: exact match setelah normalisasi
  let found = ALL_JOURNALS_FOR_MATCH.find(j =>
    normalizeJournal(j.name) === jNorm
  );
  if (found) return found;

  // Pass 2: salah satu contains the other (minimal 8 karakter)
  if (jNorm.length >= 8) {
    found = ALL_JOURNALS_FOR_MATCH.find(j => {
      const nl = normalizeJournal(j.name);
      if (nl.length < 8) return false;
      return jNorm.includes(nl) || nl.includes(jNorm);
    });
    if (found) return found;
  }

  // Pass 3: word-set overlap — semua kata signifikan dari db ada di journal name
  // (minimal 3 kata signifikan agar tidak false positive)
  const STOP = new Set(['the','a','an','of','in','and','for','on','with','to','journal','international','european','american','british','clinical']);
  const jWords = new Set(jNorm.split(/\s+/).filter(w => w.length > 2 && !STOP.has(w)));

  found = ALL_JOURNALS_FOR_MATCH.find(j => {
    const nl   = normalizeJournal(j.name);
    const nWords = new Set(nl.split(/\s+/).filter(w => w.length > 2 && !STOP.has(w)));
    if (nWords.size < 2 || jWords.size < 2) return false;
    // Hitung kata yang overlap
    let overlap = 0;
    for (const w of nWords) { if (jWords.has(w)) overlap++; }
    // Minimal overlap = seluruh kata db ada di journal (bukan sebaliknya — mencegah false positive)
    return overlap === nWords.size && nWords.size >= 2;
  });
  if (found) return found;

  return null;
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
  filtered.forEach(j => rows.push([j.name, j.topic, j.q, j.if, j.sjr,
    j.oa?'Ya':'Tidak', j.free?'Ya':'Tidak', j.apc, j.publisher, j.submit]));
  const csv  = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
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

  let parts = [];
  if (kw)    parts.push(kw);
  if (topic) parts.push(topic);
  if (yr) {
    const now = new Date().getFullYear();
    parts.push(`${now - parseInt(yr)}:${now}[pdat]`);
  }
  lastQuery   = `(${parts.join(' AND ')}) ${EXCLUDE_PUBTYPE}`;
  currentPage = 1;
  allPmids    = [];
  allArticles = {};

  await fetchAndRender(true);
}

// ─── FETCH & RENDER ────────────────────────────────────────────────────────────
async function fetchAndRender(isNewSearch) {
  const btn = document.getElementById('search-btn');
  btn.disabled = true;
  btn.textContent = 'Mencari...';

  const ra = document.getElementById('article-results');

  if (isNewSearch) {
    ra.innerHTML = `
      <div class="results-header">
        <div class="result-count" id="result-count-text">
          <span class="spinner" style="display:inline-block;vertical-align:middle;margin-right:6px"></span>
          Mencari di PubMed...
        </div>
        <div id="pagination-top"></div>
      </div>
      <div id="results-list-area" class="article-list">
        <div class="loading"><div class="spinner"></div>Memuat artikel...</div>
      </div>
      <div id="pagination-bottom" class="pagination-wrap"></div>
    `;
    closeModal();
  } else {
    const listEl = document.getElementById('results-list-area');
    if (listEl) listEl.innerHTML = '<div class="loading"><div class="spinner"></div>Memuat halaman...</div>';
    ra.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  try {
    if (isNewSearch) {
      const sUrl = `${PUBMED_BASE}/esearch.fcgi`
        + `?db=pubmed`
        + `&term=${encodeURIComponent(lastQuery)}`
        + `&retmax=${MAX_FETCH}`
        + `&retmode=json`
        + `&sort=relevance`
        + `&tool=${TOOL}`
        + `&email=${EMAIL}`;

      const sRes = await fetch(sUrl);
      if (!sRes.ok) throw new Error(`esearch HTTP ${sRes.status}`);
      const sData = await sRes.json();

      allPmids     = sData.esearchresult.idlist;
      totalResults = parseInt(sData.esearchresult.count, 10);

      if (!allPmids.length) {
        ra.innerHTML = '<div class="empty">Tidak ditemukan artikel penelitian yang sesuai.<br><small>Systematic review dan meta-analysis dieksklusi secara otomatis.</small></div>';
        btn.disabled = false; btn.textContent = 'Cari';
        return;
      }
    }

    const startIdx = (currentPage - 1) * PER_PAGE;
    const pageIds  = allPmids.slice(startIdx, startIdx + PER_PAGE);

    if (!pageIds.length) {
      renderResultsPage([], isNewSearch);
      btn.disabled = false; btn.textContent = 'Cari';
      return;
    }

    const fUrl = `${PUBMED_BASE}/efetch.fcgi`
      + `?db=pubmed`
      + `&id=${pageIds.join(',')}`
      + `&retmode=xml`
      + `&tool=${TOOL}`
      + `&email=${EMAIL}`;

    const fRes = await fetch(fUrl);
    if (!fRes.ok) throw new Error(`efetch HTTP ${fRes.status}`);
    const xmlText = await fRes.text();

    const parser   = new DOMParser();
    const xmlDoc   = parser.parseFromString(xmlText, 'text/xml');
    const artNodes = xmlDoc.querySelectorAll('PubmedArticle');

    const pageArticles = [];
    artNodes.forEach(art => {
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
      const pubTypes = Array.from(art.querySelectorAll('PublicationType'))
                         .map(p => p.textContent).join(', ');

      const authNodes = art.querySelectorAll('Author');
      const authList  = Array.from(authNodes).slice(0,6).map(au => {
        const ln  = au.querySelector('LastName')?.textContent  || '';
        const ini = au.querySelector('Initials')?.textContent  || '';
        return `${ln} ${ini}`.trim();
      });
      const authors = authList.join(', ') + (authNodes.length > 6 ? ' et al.' : '');

      const jm = matchJournal(jName);
      const artObj = { title, abstract, jName, year, pmid, doi, affil, keywords, authors, pubTypes, jm };
      allArticles[pmid] = artObj;
      pageArticles.push({ artObj, authList, authCount: authNodes.length });
    });

    renderResultsPage(pageArticles, isNewSearch);

  } catch (err) {
    ra.innerHTML = `<div class="empty">
      Gagal mengambil data dari PubMed.<br>
      <small style="display:block;margin-top:6px;color:#9ab4bc">
        ${err.message}. Pastikan koneksi internet aktif lalu coba lagi.
      </small>
    </div>`;
  }

  btn.disabled = false;
  btn.textContent = 'Cari';
}

// ─── RENDER HALAMAN HASIL ──────────────────────────────────────────────────────
function renderResultsPage(pageArticles, isNewSearch) {
  const totalPages = Math.min(MAX_PAGES, Math.ceil(allPmids.length / PER_PAGE));
  const showing    = allPmids.length;

  const countEl  = document.getElementById('result-count-text');
  const listEl   = document.getElementById('results-list-area');
  const pagTopEl = document.getElementById('pagination-top');
  const pagBotEl = document.getElementById('pagination-bottom');
  if (!countEl || !listEl) return;

  const startNum = (currentPage - 1) * PER_PAGE + 1;
  const endNum   = Math.min(currentPage * PER_PAGE, showing);

  countEl.innerHTML =
    `Artikel penelitian ${startNum}–${endNum} dari ${showing} hasil`
    + ` &bull; Total PubMed: ${totalResults.toLocaleString()}`
    + ` &bull; Hal. ${currentPage}/${totalPages}`
    + `<span class="excl-note"> &mdash; SR &amp; meta-analisis dieksklusi</span>`;

  if (!pageArticles.length) {
    listEl.innerHTML = '<div class="empty">Tidak ada artikel di halaman ini.</div>';
  } else {
    listEl.innerHTML = pageArticles.map(({ artObj: a, authList, authCount }) => {
      const badges = journalBadges(a.jm);
      // Tampilkan badge OA berdasarkan data jurnal jika dikenali
      const oaBadge = a.jm?.oa && !badges.includes('OA') ? badge('oa', 'OA') : '';
      return `<div class="acard" onclick="openModal('${a.pmid}')">
        <div class="acard-title">${a.title}</div>
        <div class="acard-meta">
          ${authList[0] || ''}${authCount > 1 ? ' et al.' : ''}
          ${a.year  ? ' &bull; ' + a.year : ''}
          ${a.jName ? ' &bull; <em>' + a.jName + '</em>' : ''}
        </div>
        <div class="acard-badges">
          ${badges}${oaBadge}
          ${!badges ? `<span class="badge badge-unknown">Jurnal tidak terindeks DB</span>` : ''}
        </div>
      </div>`;
    }).join('');
  }

  const paginationHTML = buildPagination(currentPage, totalPages);
  if (pagTopEl) pagTopEl.innerHTML = paginationHTML;
  if (pagBotEl) pagBotEl.innerHTML = paginationHTML;
}

// ─── PAGINATION ────────────────────────────────────────────────────────────────
function buildPagination(current, total) {
  if (total <= 1) return '';

  let html = '<div class="pagination">';
  html += `<button class="page-btn${current === 1 ? ' disabled' : ''}"
    onclick="goToPage(${current - 1})"
    ${current === 1 ? 'disabled' : ''}>&lsaquo; Prev</button>`;

  const pages = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) pages.push('...');
    const lo = Math.max(2, current - 1);
    const hi = Math.min(total - 1, current + 1);
    for (let i = lo; i <= hi; i++) pages.push(i);
    if (current < total - 2) pages.push('...');
    pages.push(total);
  }

  pages.forEach(p => {
    if (p === '...') {
      html += `<span class="page-ellipsis">&hellip;</span>`;
    } else {
      html += `<button class="page-btn${p === current ? ' active' : ''}"
        onclick="goToPage(${p})">${p}</button>`;
    }
  });

  html += `<button class="page-btn${current === total ? ' disabled' : ''}"
    onclick="goToPage(${current + 1})"
    ${current === total ? 'disabled' : ''}>Next &rsaquo;</button>`;
  html += '</div>';
  return html;
}

async function goToPage(page) {
  const totalPages = Math.min(MAX_PAGES, Math.ceil(allPmids.length / PER_PAGE));
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  await fetchAndRender(false);
}

document.getElementById('search-btn').addEventListener('click', doSearch);
document.getElementById('q-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') doSearch();
});

// ─── MODAL / PREVIEW ───────────────────────────────────────────────────────────
function openModal(pmid) {
  const art = allArticles[pmid];
  if (!art) return;
  renderPreview(art, 'paper-preview', 'modal-actions');
  document.getElementById('modal-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function openModalFromSaved(pmid) {
  const art = savedArticles.find(a => a.pmid === pmid);
  if (!art) return;
  if (!art.jm) art.jm = matchJournal(art.jName);
  allArticles[pmid] = art;
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
    ${art.affil ? `<div class="p-affil">${art.affil.slice(0,220)}${art.affil.length > 220 ? '...' : ''}</div>` : ''}
    <div class="p-meta">
      ${art.year     ? `<span>Published: ${art.year}</span>` : ''}
      ${art.pmid     ? `<span>PMID: ${art.pmid}</span>` : ''}
      ${art.doi      ? `<span>DOI: ${art.doi}</span>` : ''}
      ${jm           ? `<span>IF: ${jm.if.toFixed(1)}</span><span>SJR: ${jm.sjr}</span>` : ''}
      ${art.pubTypes ? `<span>${art.pubTypes.split(',')[0]}</span>` : ''}
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
    <button id="save-btn-${art.pmid}" class="${saved ? 'btn-saved' : 'btn-save'}"
      onclick="toggleSave('${art.pmid}')">
      ${saved ? 'Tersimpan' : 'Simpan referensi'}
    </button>
  `;
}

// ─── SAVE / BOOKMARK ───────────────────────────────────────────────────────────
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
    btn.className   = sv ? 'btn-saved' : 'btn-save';
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
          <div class="saved-meta">
            ${art.jName || ''} ${art.year ? '&bull; ' + art.year : ''} ${art.pmid ? '&bull; PMID ' + art.pmid : ''}
          </div>
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
    const canvas = await html2canvas(el, {
      backgroundColor: '#ffffff', scale: 2, useCORS: true, logging: false
    });
    const link = document.createElement('a');
    link.download = `paper_preview_${pmid || 'article'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (e) { alert('Gagal menyimpan gambar: ' + e.message); }
}

// ─── SERVICE WORKER ────────────────────────────────────────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

// ─── INIT ──────────────────────────────────────────────────────────────────────
renderJournals();
updateSavedBadge();
