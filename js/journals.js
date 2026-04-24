// Database Jurnal ClinPathID — Scimago 2025 / JCR 2025
// Diperbarui: April 2026
// Sumber: Scimago Journal Rank (SJR), JCR Clarivate, journalsearches.com, resurchify.com

const JOURNALS = [

  // ═══════════════════════════════════════════════════════════════
  // HEMATOLOGI
  // ═══════════════════════════════════════════════════════════════

  // — Q1 —
  { name: "Ca: A Cancer Journal for Clinicians", topic: "Hematologi", q: "Q1", if: 254.7, sjr: 145.0, oa: false, free: false, apc: "USD 5,000", publisher: "Wiley / ACS", submit: "https://acsjournals.onlinelibrary.wiley.com/journal/15424863" },
  { name: "Blood", topic: "Hematologi", q: "Q1", if: 20.0, sjr: 7.823, oa: false, free: false, apc: "USD 5,000", publisher: "American Society of Hematology", submit: "https://submit.bloodjournal.org" },
  { name: "Journal of Hematology & Oncology", topic: "Hematologi", q: "Q1", if: 28.5, sjr: 5.10, oa: true, free: false, apc: "USD 3,190", publisher: "BioMed Central", submit: "https://jhoonline.biomedcentral.com/submission-guidelines" },
  { name: "Leukemia", topic: "Hematologi", q: "Q1", if: 13.4, sjr: 3.458, oa: true, free: false, apc: "USD 3,990", publisher: "Springer Nature", submit: "https://www.nature.com/leukemia/submit" },
  { name: "American Journal of Hematology", topic: "Hematologi", q: "Q1", if: 9.9, sjr: 3.076, oa: false, free: false, apc: "USD 4,660", publisher: "Wiley", submit: "https://onlinelibrary.wiley.com/journal/10968652" },
  { name: "Haematologica", topic: "Hematologi", q: "Q1", if: 7.9, sjr: 2.449, oa: true, free: false, apc: "EUR 3,000", publisher: "Ferrata Storti Foundation", submit: "https://haematologica.org/submission" },
  { name: "Blood Advances", topic: "Hematologi", q: "Q1", if: 7.1, sjr: 2.901, oa: true, free: false, apc: "USD 2,500", publisher: "American Society of Hematology", submit: "https://submit.bloodadvances.org" },
  { name: "Critical Reviews in Oncology/Hematology", topic: "Hematologi", q: "Q1", if: 5.5, sjr: 1.82, oa: false, free: false, apc: "USD 2,940", publisher: "Elsevier Ireland", submit: "https://www.sciencedirect.com/journal/critical-reviews-in-oncology-hematology" },
  { name: "British Journal of Haematology", topic: "Hematologi", q: "Q1", if: 5.1, sjr: 1.647, oa: false, free: false, apc: "USD 4,660", publisher: "Wiley", submit: "https://onlinelibrary.wiley.com/journal/13652141" },
  { name: "Bone Marrow Transplantation", topic: "Hematologi", q: "Q1", if: 2.9, sjr: 1.709, oa: false, free: false, apc: "USD 3,790", publisher: "Springer Nature", submit: "https://www.nature.com/bmt/submit" },
  { name: "Current Opinion in Hematology", topic: "Hematologi", q: "Q1", if: 2.9, sjr: 1.078, oa: false, free: false, apc: "USD 2,950", publisher: "Lippincott Williams & Wilkins", submit: "https://journals.lww.com/co-hematology/pages/default.aspx" },

  // — Q2 —
  { name: "Transfusion", topic: "Hematologi", q: "Q2", if: 2.5, sjr: 0.75, oa: false, free: false, apc: "USD 3,800", publisher: "Wiley / AABB", submit: "https://onlinelibrary.wiley.com/journal/15372995" },
  { name: "Vox Sanguinis", topic: "Hematologi", q: "Q2", if: 2.2, sjr: 0.68, oa: false, free: false, apc: "USD 4,350", publisher: "Wiley / ISBT", submit: "https://onlinelibrary.wiley.com/journal/14230410" },
  { name: "Annals of Hematology", topic: "Hematologi", q: "Q2", if: 2.4, sjr: 0.862, oa: false, free: false, apc: "USD 3,190", publisher: "Springer", submit: "https://www.springer.com/journal/277" },
  { name: "European Journal of Haematology", topic: "Hematologi", q: "Q2", if: 2.4, sjr: 0.82, oa: false, free: false, apc: "USD 4,660", publisher: "Wiley", submit: "https://onlinelibrary.wiley.com/journal/16000609" },
  { name: "International Journal of Laboratory Hematology", topic: "Hematologi", q: "Q2", if: 2.3, sjr: 0.71, oa: false, free: false, apc: "USD 4,100", publisher: "Wiley", submit: "https://onlinelibrary.wiley.com/journal/17515033" },
  { name: "Acta Haematologica", topic: "Hematologi", q: "Q2", if: 2.0, sjr: 0.55, oa: true, free: false, apc: "USD 2,450", publisher: "Karger", submit: "https://www.karger.com/Journal/Home/224226" },
  { name: "Hematology", topic: "Hematologi", q: "Q2", if: 2.1, sjr: 0.65, oa: false, free: false, apc: "USD 2,950", publisher: "Taylor & Francis", submit: "https://www.tandfonline.com/journals/ihem20" },
  { name: "International Journal of Hematology", topic: "Hematologi", q: "Q2", if: 2.1, sjr: 0.651, oa: false, free: false, apc: "USD 3,190", publisher: "Springer", submit: "https://www.springer.com/journal/12185" },
  { name: "Therapeutic Advances in Hematology", topic: "Hematologi", q: "Q2", if: 3.2, sjr: 0.81, oa: true, free: false, apc: "USD 3,600", publisher: "SAGE", submit: "https://journals.sagepub.com/home/tah" },

  // — Q3 —
  { name: "Hematology, Transfusion and Cell Therapy", topic: "Hematologi", q: "Q3", if: 1.8, sjr: 0.40, oa: true, free: true, apc: "Free", publisher: "Elsevier / ABHH", submit: "https://www.htctjournal.com/submission" },
  { name: "Mediterranean Journal of Hematology and Infectious Diseases", topic: "Hematologi", q: "Q3", if: 1.6, sjr: 0.461, oa: true, free: false, apc: "EUR 800", publisher: "Università Cattolica", submit: "https://www.mjhid.org/mjhid/submission" },
  { name: "Hematology Reports", topic: "Hematologi", q: "Q3", if: 1.2, sjr: 0.374, oa: true, free: false, apc: "CHF 1,600", publisher: "MDPI", submit: "https://www.mdpi.com/journal/hematolrep" },
  { name: "Journal of Blood Medicine", topic: "Hematologi", q: "Q3", if: 2.1, sjr: 0.45, oa: true, free: false, apc: "USD 2,190", publisher: "Dove Medical Press", submit: "https://www.dovepress.com/journal-of-blood-medicine-journal" },
  { name: "Transfusion and Apheresis Science", topic: "Hematologi", q: "Q3", if: 1.5, sjr: 0.384, oa: false, free: false, apc: "USD 2,940", publisher: "Elsevier", submit: "https://www.sciencedirect.com/journal/transfusion-and-apheresis-science" },
  { name: "Annals of Blood", topic: "Hematologi", q: "Q3", if: 1.3, sjr: 0.392, oa: true, free: false, apc: "USD 1,200", publisher: "AME Publishing", submit: "https://aob.amegroups.org/submission" },
  { name: "Clinical and Laboratory Haematology", topic: "Hematologi", q: "Q3", if: 1.4, sjr: 0.33, oa: false, free: false, apc: "USD 3,800", publisher: "Wiley", submit: "https://onlinelibrary.wiley.com/journal/13652257" },
  { name: "Hemato", topic: "Hematologi", q: "Q3", if: 1.5, sjr: 0.35, oa: true, free: false, apc: "CHF 1,800", publisher: "MDPI", submit: "https://www.mdpi.com/journal/hemato" },
  { name: "Clinical Lymphoma Myeloma and Leukemia", topic: "Hematologi", q: "Q3", if: 2.7, sjr: 0.515, oa: false, free: false, apc: "USD 2,940", publisher: "Elsevier", submit: "https://www.sciencedirect.com/journal/clinical-lymphoma-myeloma-and-leukemia" },

  // — Q4 —
  { name: "Case Reports in Hematology", topic: "Hematologi", q: "Q4", if: 0.9, sjr: 0.22, oa: true, free: false, apc: "USD 1,500", publisher: "Hindawi / Wiley", submit: "https://www.hindawi.com/journals/crihem/" },
  { name: "Advances in Hematology", topic: "Hematologi", q: "Q4", if: 1.6, sjr: 0.22, oa: true, free: false, apc: "USD 1,500", publisher: "Hindawi / Wiley", submit: "https://www.hindawi.com/journals/ah/" },
  { name: "Anemia", topic: "Hematologi", q: "Q4", if: 2.2, sjr: 0.377, oa: true, free: false, apc: "USD 1,950", publisher: "Hindawi / Wiley", submit: "https://www.hindawi.com/journals/anemia/" },
  { name: "Pediatric Hematology Oncology Journal", topic: "Hematologi", q: "Q4", if: 0.7, sjr: 0.18, oa: false, free: false, apc: "USD 900", publisher: "Wolters Kluwer", submit: "https://journals.lww.com/phoj/pages/default.aspx" },
  { name: "Clinical Advances in Hematology & Oncology", topic: "Hematologi", q: "Q4", if: 1.2, sjr: 0.20, oa: false, free: true, apc: "Free", publisher: "Intellisphere LLC", submit: "https://www.hematologyandoncology.net/submission" },
  { name: "Current Hematologic Malignancy Reports", topic: "Hematologi", q: "Q4", if: 2.5, sjr: 0.29, oa: false, free: false, apc: "USD 3,190", publisher: "Springer", submit: "https://www.springer.com/journal/11899" },
  { name: "Journal of Hematology", topic: "Hematologi", q: "Q4", if: 1.1, sjr: 0.19, oa: true, free: true, apc: "Free", publisher: "Elmer Press", submit: "https://www.jofh.org/index.php/jofh" },
  { name: "Global Journal of Transfusion Medicine", topic: "Hematologi", q: "Q4", if: 0.5, sjr: 0.14, oa: false, free: false, apc: "USD 600", publisher: "Wolters Kluwer", submit: "https://journals.lww.com/gjtm/pages/default.aspx" },

  // ═══════════════════════════════════════════════════════════════
  // KIMIA KLINIK
  // ═══════════════════════════════════════════════════════════════

  // — Q1 —
  { name: "Clinical Chemistry", topic: "Kimia Klinik", q: "Q1", if: 6.3, sjr: 1.345, oa: false, free: false, apc: "USD 4,980", publisher: "Oxford University Press / AACC", submit: "https://academic.oup.com/clinchem/pages/general-instructions" },
  { name: "Critical Reviews in Clinical Laboratory Sciences", topic: "Kimia Klinik", q: "Q1", if: 7.4, sjr: 1.52, oa: false, free: false, apc: "USD 4,200", publisher: "Taylor & Francis", submit: "https://www.tandfonline.com/journals/ilab20" },
  { name: "Clinical Chemistry and Laboratory Medicine", topic: "Kimia Klinik", q: "Q1", if: 3.7, sjr: 0.952, oa: false, free: false, apc: "EUR 2,990", publisher: "Walter de Gruyter", submit: "https://www.degruyter.com/journal/key/CCLM/html" },

  // — Q2 —
  { name: "Diagnostics", topic: "Kimia Klinik", q: "Q2", if: 3.0, sjr: 0.68, oa: true, free: false, apc: "CHF 2,700", publisher: "MDPI", submit: "https://www.mdpi.com/journal/diagnostics" },
  { name: "Clinica Chimica Acta", topic: "Kimia Klinik", q: "Q2", if: 3.2, sjr: 0.85, oa: false, free: false, apc: "USD 2,940", publisher: "Elsevier", submit: "https://www.sciencedirect.com/journal/clinica-chimica-acta" },
  { name: "Diagnosis", topic: "Kimia Klinik", q: "Q2", if: 2.9, sjr: 0.78, oa: false, free: false, apc: "USD 2,990", publisher: "De Gruyter", submit: "https://www.degruyter.com/journal/key/dx/html" },
  { name: "Biochemia Medica", topic: "Kimia Klinik", q: "Q2", if: 2.7, sjr: 0.74, oa: true, free: true, apc: "Free", publisher: "Croatian Society of Medical Biochemistry", submit: "https://www.biochemia-medica.com/submission" },
  { name: "Annals of Clinical Biochemistry", topic: "Kimia Klinik", q: "Q2", if: 2.6, sjr: 0.71, oa: false, free: false, apc: "USD 3,200", publisher: "SAGE", submit: "https://journals.sagepub.com/home/acb" },
  { name: "Clinical Biochemistry", topic: "Kimia Klinik", q: "Q2", if: 2.5, sjr: 0.70, oa: false, free: false, apc: "USD 2,940", publisher: "Elsevier", submit: "https://www.sciencedirect.com/journal/clinical-biochemistry" },
  { name: "Biomarkers", topic: "Kimia Klinik", q: "Q2", if: 2.4, sjr: 0.67, oa: false, free: false, apc: "USD 3,450", publisher: "Taylor & Francis", submit: "https://www.tandfonline.com/journals/ibmk20" },
  { name: "Scandinavian Journal of Clinical and Laboratory Investigation", topic: "Kimia Klinik", q: "Q2", if: 2.0, sjr: 0.58, oa: false, free: false, apc: "USD 3,450", publisher: "Taylor & Francis", submit: "https://www.tandfonline.com/journals/iclb20" },
  { name: "Journal of Applied Laboratory Medicine", topic: "Kimia Klinik", q: "Q2", if: 2.2, sjr: 0.63, oa: false, free: false, apc: "USD 4,500", publisher: "Oxford University Press", submit: "https://academic.oup.com/jalm" },
  { name: "Journal of Clinical Laboratory Analysis", topic: "Kimia Klinik", q: "Q2", if: 2.3, sjr: 0.60, oa: true, free: false, apc: "USD 4,510", publisher: "Wiley", submit: "https://onlinelibrary.wiley.com/journal/10982825" },
  { name: "eJIFCC", topic: "Kimia Klinik", q: "Q2", if: 2.1, sjr: 0.55, oa: true, free: true, apc: "Free", publisher: "IFCC", submit: "https://www.ifcc.org/ejifcc" },

  // — Q3 —
  { name: "Practical Laboratory Medicine", topic: "Kimia Klinik", q: "Q3", if: 1.8, sjr: 0.42, oa: true, free: true, apc: "Free", publisher: "Elsevier", submit: "https://www.sciencedirect.com/journal/practical-laboratory-medicine" },
  { name: "Labmedicine", topic: "Kimia Klinik", q: "Q3", if: 1.9, sjr: 0.44, oa: false, free: false, apc: "USD 2,500", publisher: "Oxford University Press", submit: "https://academic.oup.com/labmed" },
  { name: "Journal of Laboratory and Precision Medicine", topic: "Kimia Klinik", q: "Q3", if: 1.5, sjr: 0.36, oa: true, free: false, apc: "USD 1,200", publisher: "AME Publishing", submit: "https://jlpm.amegroups.org/submission" },
  { name: "Biomarker Research", topic: "Kimia Klinik", q: "Q3", if: 2.3, sjr: 0.48, oa: true, free: false, apc: "USD 3,190", publisher: "BioMed Central", submit: "https://biomarkerres.biomedcentral.com/submission-guidelines" },
  { name: "Clinical Mass Spectrometry", topic: "Kimia Klinik", q: "Q3", if: 1.6, sjr: 0.38, oa: true, free: false, apc: "USD 2,000", publisher: "Elsevier", submit: "https://www.sciencedirect.com/journal/clinical-mass-spectrometry" },
  { name: "Acta Clinica Belgica", topic: "Kimia Klinik", q: "Q3", if: 1.7, sjr: 0.40, oa: false, free: false, apc: "USD 2,950", publisher: "Taylor & Francis", submit: "https://www.tandfonline.com/journals/yacb20" },

  // — Q4 —
  { name: "Archives of Clinical and Biomedical Research", topic: "Kimia Klinik", q: "Q4", if: 0.8, sjr: 0.17, oa: true, free: true, apc: "Free", publisher: "Fortune Journals", submit: "https://www.fortunejournals.com/journals/archives-of-clinical-and-biomedical-research.html" },
  { name: "Journal of Biomedical Research", topic: "Kimia Klinik", q: "Q4", if: 1.2, sjr: 0.24, oa: true, free: false, apc: "USD 800", publisher: "Nanjing Medical University", submit: "https://www.jbr-pub.org/submission" },
  { name: "Medical Laboratory Journal", topic: "Kimia Klinik", q: "Q4", if: 0.7, sjr: 0.15, oa: true, free: true, apc: "Free", publisher: "Golestan University of Medical Sciences", submit: "https://mlj.goums.ac.ir/submission" },
  { name: "Clinical Laboratory", topic: "Kimia Klinik", q: "Q4", if: 1.0, sjr: 0.22, oa: false, free: false, apc: "USD 1,000", publisher: "Clin Lab Publications", submit: "https://www.clin-lab-publications.com/journal/clinical-laboratory" },
  { name: "International Journal of Medical Laboratory", topic: "Kimia Klinik", q: "Q4", if: 0.6, sjr: 0.13, oa: true, free: true, apc: "Free", publisher: "Iran University of Medical Sciences", submit: "https://ijml.sums.ac.ir/submission" },
  { name: "Turkish Journal of Biochemistry", topic: "Kimia Klinik", q: "Q4", if: 0.9, sjr: 0.19, oa: false, free: false, apc: "USD 500", publisher: "De Gruyter / TBD", submit: "https://www.degruyter.com/journal/key/tjb/html" },
  { name: "Biomedical Research", topic: "Kimia Klinik", q: "Q4", if: 0.8, sjr: 0.16, oa: true, free: false, apc: "USD 600", publisher: "Allied Academies", submit: "https://www.biomedres.info/submission" },

  // ═══════════════════════════════════════════════════════════════
  // IMUNOLOGI
  // ═══════════════════════════════════════════════════════════════

  // — Q1 —
  { name: "Journal of Allergy and Clinical Immunology", topic: "Imunologi", q: "Q1", if: 14.3, sjr: 3.935, oa: false, free: false, apc: "USD 4,390", publisher: "Elsevier", submit: "https://www.jacionline.org/content/authorinfo" },
  { name: "Allergy", topic: "Imunologi", q: "Q1", if: 12.4, sjr: 2.734, oa: false, free: false, apc: "USD 5,300", publisher: "Wiley / EAACI", submit: "https://onlinelibrary.wiley.com/journal/13989995" },
  { name: "Frontiers in Immunology", topic: "Imunologi", q: "Q1", if: 5.7, sjr: 1.75, oa: true, free: false, apc: "USD 3,150", publisher: "Frontiers Media", submit: "https://www.frontiersin.org/journals/immunology" },
  { name: "European Journal of Immunology", topic: "Imunologi", q: "Q1", if: 4.5, sjr: 1.38, oa: false, free: false, apc: "USD 4,660", publisher: "Wiley", submit: "https://onlinelibrary.wiley.com/journal/15214141" },
  { name: "Clinical and Experimental Immunology", topic: "Imunologi", q: "Q1", if: 3.8, sjr: 1.05, oa: false, free: false, apc: "USD 4,980", publisher: "Oxford / British Society for Immunology", submit: "https://academic.oup.com/cei" },
  { name: "Journal of Immunology", topic: "Imunologi", q: "Q1", if: 3.6, sjr: 1.12, oa: false, free: false, apc: "USD 3,750", publisher: "AAI / Oxford", submit: "https://journals.aai.org/jimmunol/pages/author-instructions" },

  // — Q2 —
  { name: "Clinical Immunology", topic: "Imunologi", q: "Q2", if: 4.1, sjr: 0.98, oa: false, free: false, apc: "USD 2,940", publisher: "Elsevier", submit: "https://www.sciencedirect.com/journal/clinical-immunology" },
  { name: "Journal of Clinical Immunology", topic: "Imunologi", q: "Q2", if: 3.9, sjr: 0.93, oa: false, free: false, apc: "USD 3,190", publisher: "Springer", submit: "https://www.springer.com/journal/10875" },
  { name: "Mediators of Inflammation", topic: "Imunologi", q: "Q2", if: 3.4, sjr: 0.82, oa: true, free: false, apc: "USD 2,000", publisher: "Hindawi / Wiley", submit: "https://www.hindawi.com/journals/mi" },
  { name: "Autoimmunity", topic: "Imunologi", q: "Q2", if: 3.2, sjr: 0.79, oa: false, free: false, apc: "USD 3,450", publisher: "Taylor & Francis", submit: "https://www.tandfonline.com/journals/iaut20" },
  { name: "Cellular Immunology", topic: "Imunologi", q: "Q2", if: 3.0, sjr: 0.76, oa: false, free: false, apc: "USD 2,940", publisher: "Elsevier", submit: "https://www.sciencedirect.com/journal/cellular-immunology" },
  { name: "Immunology Letters", topic: "Imunologi", q: "Q2", if: 2.8, sjr: 0.72, oa: false, free: false, apc: "USD 2,940", publisher: "Elsevier", submit: "https://www.sciencedirect.com/journal/immunology-letters" },
  { name: "Scandinavian Journal of Immunology", topic: "Imunologi", q: "Q2", if: 2.7, sjr: 0.68, oa: false, free: false, apc: "USD 4,100", publisher: "Wiley", submit: "https://onlinelibrary.wiley.com/journal/13653083" },
  { name: "Clinical Reviews in Allergy & Immunology", topic: "Imunologi", q: "Q2", if: 6.1, sjr: 0.95, oa: false, free: false, apc: "USD 3,190", publisher: "Springer", submit: "https://www.springer.com/journal/12016" },
  { name: "Inflammation", topic: "Imunologi", q: "Q2", if: 4.6, sjr: 0.92, oa: false, free: false, apc: "USD 3,190", publisher: "Springer", submit: "https://www.springer.com/journal/10753" },

  // — Q3 —
  { name: "Human Immunology", topic: "Imunologi", q: "Q3", if: 2.5, sjr: 0.55, oa: false, free: false, apc: "USD 2,940", publisher: "Elsevier", submit: "https://www.sciencedirect.com/journal/human-immunology" },
  { name: "Immunity Inflammation and Disease", topic: "Imunologi", q: "Q3", if: 2.1, sjr: 0.48, oa: true, free: false, apc: "USD 3,900", publisher: "Wiley", submit: "https://onlinelibrary.wiley.com/journal/20500505" },
  { name: "Immunological Investigations", topic: "Imunologi", q: "Q3", if: 2.4, sjr: 0.52, oa: false, free: false, apc: "USD 3,450", publisher: "Taylor & Francis", submit: "https://www.tandfonline.com/journals/iimm20" },
  { name: "Immunologic Research", topic: "Imunologi", q: "Q3", if: 2.2, sjr: 0.50, oa: false, free: false, apc: "USD 3,190", publisher: "Springer", submit: "https://www.springer.com/journal/12026" },
  { name: "International Archives of Allergy and Immunology", topic: "Imunologi", q: "Q3", if: 2.1, sjr: 0.46, oa: false, free: false, apc: "CHF 3,200", publisher: "Karger", submit: "https://www.karger.com/Journal/Home/224145" },
  { name: "Transplant Immunology", topic: "Imunologi", q: "Q3", if: 1.9, sjr: 0.43, oa: false, free: false, apc: "USD 2,940", publisher: "Elsevier", submit: "https://www.sciencedirect.com/journal/transplant-immunology" },
  { name: "Innate Immunity", topic: "Imunologi", q: "Q3", if: 2.0, sjr: 0.44, oa: false, free: false, apc: "USD 3,200", publisher: "SAGE", submit: "https://journals.sagepub.com/home/ini" },

  // — Q4 —
  { name: "Clinical Immunology Communications", topic: "Imunologi", q: "Q4", if: 1.1, sjr: 0.21, oa: true, free: false, apc: "USD 1,500", publisher: "Elsevier", submit: "https://www.sciencedirect.com/journal/clinical-immunology-communications" },
  { name: "Immunological Medicine", topic: "Imunologi", q: "Q4", if: 1.8, sjr: 0.28, oa: false, free: false, apc: "USD 2,950", publisher: "Taylor & Francis", submit: "https://www.tandfonline.com/journals/yimm20" },
  { name: "Immunopathologia Persa", topic: "Imunologi", q: "Q4", if: 0.6, sjr: 0.13, oa: true, free: true, apc: "Free", publisher: "Negin Publishing Group", submit: "https://immunopatholpersa.com/submission" },
  { name: "Iranian Journal of Immunology", topic: "Imunologi", q: "Q4", if: 1.0, sjr: 0.20, oa: false, free: true, apc: "Free", publisher: "Shiraz University of Medical Sciences", submit: "https://iji.sums.ac.ir/submission" },
  { name: "The Open Immunology Journal", topic: "Imunologi", q: "Q4", if: 0.5, sjr: 0.12, oa: true, free: false, apc: "USD 700", publisher: "Bentham Open", submit: "https://benthamopen.com/TOIMMUJ/home" },
  { name: "Immunology and Immunogenetics Insights", topic: "Imunologi", q: "Q4", if: 0.8, sjr: 0.16, oa: true, free: false, apc: "USD 850", publisher: "SAGE", submit: "https://journals.sagepub.com/home/iii" },
  { name: "Journal of Immunoassay and Immunochemistry", topic: "Imunologi", q: "Q4", if: 1.3, sjr: 0.24, oa: false, free: false, apc: "USD 2,950", publisher: "Taylor & Francis", submit: "https://www.tandfonline.com/journals/ljii20" },

  // ═══════════════════════════════════════════════════════════════
  // PENYAKIT INFEKSI
  // ═══════════════════════════════════════════════════════════════

  // — Q1 —
  { name: "The Lancet Infectious Diseases", topic: "Penyakit Infeksi", q: "Q1", if: 38.1, sjr: 5.446, oa: false, free: false, apc: "USD 5,000", publisher: "Elsevier / Lancet", submit: "https://www.thelancet.com/journals/laninf/authorinfo" },
  { name: "Clinical Infectious Diseases", topic: "Penyakit Infeksi", q: "Q1", if: 11.8, sjr: 3.21, oa: false, free: false, apc: "USD 4,500", publisher: "Oxford / IDSA", submit: "https://academic.oup.com/cid/pages/general_instructions" },
  { name: "Clinical Microbiology and Infection", topic: "Penyakit Infeksi", q: "Q1", if: 9.9, sjr: 2.44, oa: false, free: false, apc: "USD 3,900", publisher: "Elsevier / ESCMID", submit: "https://www.clinicalmicrobiologyandinfection.com/authorinfo" },
  { name: "Emerging Infectious Diseases", topic: "Penyakit Infeksi", q: "Q1", if: 7.4, sjr: 2.38, oa: true, free: true, apc: "Free (CDC)", publisher: "CDC", submit: "https://wwwnc.cdc.gov/eid/page/author-guidelines" },
  { name: "Journal of Antimicrobial Chemotherapy", topic: "Penyakit Infeksi", q: "Q1", if: 5.1, sjr: 1.48, oa: false, free: false, apc: "USD 4,980", publisher: "Oxford", submit: "https://academic.oup.com/jac/pages/general_instructions" },
  { name: "Antimicrobial Resistance & Infection Control", topic: "Penyakit Infeksi", q: "Q1", if: 4.8, sjr: 1.15, oa: true, free: false, apc: "USD 3,090", publisher: "BioMed Central", submit: "https://aricjournal.biomedcentral.com/submission-guidelines" },
  { name: "Frontiers in Cellular and Infection Microbiology", topic: "Penyakit Infeksi", q: "Q1", if: 4.6, sjr: 1.20, oa: true, free: false, apc: "USD 2,950", publisher: "Frontiers Media", submit: "https://www.frontiersin.org/journals/cellular-and-infection-microbiology" },
  { name: "Journal of Infectious Diseases", topic: "Penyakit Infeksi", q: "Q1", if: 5.0, sjr: 1.94, oa: false, free: false, apc: "USD 4,500", publisher: "Oxford / IDSA", submit: "https://academic.oup.com/jid/pages/general_instructions" },
  { name: "Infection", topic: "Penyakit Infeksi", q: "Q1", if: 5.4, sjr: 1.22, oa: false, free: false, apc: "USD 3,790", publisher: "Springer", submit: "https://www.springer.com/journal/15010" },
  { name: "Open Forum Infectious Diseases", topic: "Penyakit Infeksi", q: "Q1", if: 3.8, sjr: 1.05, oa: true, free: false, apc: "USD 2,500", publisher: "Oxford / IDSA", submit: "https://academic.oup.com/ofid/pages/general_instructions" },
  { name: "Microbiology Spectrum", topic: "Penyakit Infeksi", q: "Q1", if: 3.7, sjr: 1.08, oa: true, free: false, apc: "USD 3,000", publisher: "ASM", submit: "https://journals.asm.org/journal/spectrum" },

  // — Q2 —
  { name: "BMC Infectious Diseases", topic: "Penyakit Infeksi", q: "Q2", if: 3.4, sjr: 0.91, oa: true, free: false, apc: "USD 2,890", publisher: "BioMed Central", submit: "https://bmcinfectdis.biomedcentral.com/submission-guidelines" },
  { name: "Antibiotics", topic: "Penyakit Infeksi", q: "Q2", if: 4.3, sjr: 0.96, oa: true, free: false, apc: "CHF 2,900", publisher: "MDPI", submit: "https://www.mdpi.com/journal/antibiotics" },
  { name: "Pathogens", topic: "Penyakit Infeksi", q: "Q2", if: 3.3, sjr: 0.78, oa: true, free: false, apc: "CHF 2,700", publisher: "MDPI", submit: "https://www.mdpi.com/journal/pathogens" },
  { name: "Viruses", topic: "Penyakit Infeksi", q: "Q2", if: 3.8, sjr: 0.90, oa: true, free: false, apc: "CHF 2,700", publisher: "MDPI", submit: "https://www.mdpi.com/journal/viruses" },
  { name: "International Journal of Infectious Diseases", topic: "Penyakit Infeksi", q: "Q2", if: 3.1, sjr: 0.88, oa: true, free: false, apc: "USD 2,490", publisher: "Elsevier / ISID", submit: "https://www.sciencedirect.com/journal/international-journal-of-infectious-diseases" },
  { name: "Infection and Drug Resistance", topic: "Penyakit Infeksi", q: "Q2", if: 2.9, sjr: 0.73, oa: true, free: false, apc: "USD 2,850", publisher: "Dove Medical Press", submit: "https://www.dovepress.com/infection-and-drug-resistance-journal" },
  { name: "Diagnostic Microbiology and Infectious Disease", topic: "Penyakit Infeksi", q: "Q2", if: 2.8, sjr: 0.76, oa: false, free: false, apc: "USD 2,940", publisher: "Elsevier", submit: "https://www.sciencedirect.com/journal/diagnostic-microbiology-and-infectious-disease" },
  { name: "Infectious Disease Reports", topic: "Penyakit Infeksi", q: "Q2", if: 2.6, sjr: 0.70, oa: true, free: false, apc: "CHF 2,200", publisher: "MDPI", submit: "https://www.mdpi.com/journal/idr" },
  { name: "Infection Disease and Health", topic: "Penyakit Infeksi", q: "Q2", if: 2.5, sjr: 0.70, oa: false, free: false, apc: "USD 2,940", publisher: "Elsevier", submit: "https://www.sciencedirect.com/journal/infection-disease-and-health" },

  // — Q3 —
  { name: "Acute and Critical Care", topic: "Penyakit Infeksi", q: "Q3", if: 1.8, sjr: 0.41, oa: true, free: true, apc: "Free", publisher: "Korean Society of Critical Care Medicine", submit: "https://www.accjournal.org/submission" },
  { name: "New Microbes and New Infections", topic: "Penyakit Infeksi", q: "Q3", if: 2.0, sjr: 0.44, oa: true, free: false, apc: "USD 1,950", publisher: "Elsevier / ESCMID", submit: "https://www.sciencedirect.com/journal/new-microbes-and-new-infections" },
  { name: "Infectious Diseases Now", topic: "Penyakit Infeksi", q: "Q3", if: 2.3, sjr: 0.46, oa: false, free: false, apc: "USD 2,940", publisher: "Elsevier", submit: "https://www.sciencedirect.com/journal/infectious-diseases-now" },
  { name: "Journal of Global Antimicrobial Resistance", topic: "Penyakit Infeksi", q: "Q3", if: 3.5, sjr: 0.48, oa: false, free: false, apc: "USD 2,940", publisher: "Elsevier / ISAC", submit: "https://www.sciencedirect.com/journal/journal-of-global-antimicrobial-resistance" },
  { name: "IDCases", topic: "Penyakit Infeksi", q: "Q3", if: 1.4, sjr: 0.37, oa: true, free: false, apc: "USD 1,050", publisher: "Elsevier", submit: "https://www.sciencedirect.com/journal/idcases" },
  { name: "Journal of Infection in Developing Countries", topic: "Penyakit Infeksi", q: "Q3", if: 1.3, sjr: 0.35, oa: true, free: true, apc: "Free", publisher: "JIDC", submit: "https://www.jidc.org/index.php/journal/submission" },

  // — Q4 —
  { name: "Archives of Clinical Infectious Diseases", topic: "Penyakit Infeksi", q: "Q4", if: 0.6, sjr: 0.14, oa: true, free: true, apc: "Free", publisher: "Brieflands / Kowsar", submit: "https://archcid.com/submission" },
  { name: "Infectious Diseases & Immunity", topic: "Penyakit Infeksi", q: "Q4", if: 1.0, sjr: 0.19, oa: true, free: false, apc: "USD 1,200", publisher: "Wolters Kluwer", submit: "https://journals.lww.com/infectdisimmun/pages/default.aspx" },
  { name: "Infection, Genetics and Evolution", topic: "Penyakit Infeksi", q: "Q4", if: 2.2, sjr: 0.28, oa: false, free: false, apc: "USD 2,940", publisher: "Elsevier", submit: "https://www.sciencedirect.com/journal/infection-genetics-and-evolution" },
  { name: "Journal of Infection and Public Health", topic: "Penyakit Infeksi", q: "Q4", if: 4.7, sjr: 0.30, oa: true, free: false, apc: "USD 2,940", publisher: "Elsevier / JIPH", submit: "https://www.sciencedirect.com/journal/journal-of-infection-and-public-health" },
  { name: "Germs", topic: "Penyakit Infeksi", q: "Q4", if: 1.1, sjr: 0.20, oa: true, free: true, apc: "Free", publisher: "European Academy of HIV/AIDS", submit: "https://germs.ro/submission" },
  { name: "Annals of Clinical Microbiology and Antimicrobials", topic: "Penyakit Infeksi", q: "Q4", if: 3.1, sjr: 0.29, oa: true, free: false, apc: "USD 2,190", publisher: "BioMed Central", submit: "https://ann-clinmicrob.biomedcentral.com/submission-guidelines" },
  { name: "Journal of Pathogens", topic: "Penyakit Infeksi", q: "Q4", if: 1.0, sjr: 0.17, oa: true, free: false, apc: "USD 1,500", publisher: "Hindawi / Wiley", submit: "https://www.hindawi.com/journals/jpath/" },
  { name: "Iranian Journal of Microbiology", topic: "Penyakit Infeksi", q: "Q4", if: 1.2, sjr: 0.22, oa: true, free: true, apc: "Free", publisher: "Tehran University of Medical Sciences", submit: "https://ijm.tums.ac.ir/submission" },
];

function matchJournal(jName) {
  if (!jName) return null;
  const jl = jName.toLowerCase();
  return JOURNALS.find(j => {
    const nl = j.name.toLowerCase();
    return jl.includes(nl) || nl.includes(jl.substring(0, Math.min(jl.length, 22)));
  });
}
