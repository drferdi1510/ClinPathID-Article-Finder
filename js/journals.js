const JOURNALS = [
  // HEMATOLOGI
  { name: "Blood", topic: "Hematologi", q: "Q1", if: 20.0, sjr: 7.823, oa: false, free: false, apc: "USD 5,000", publisher: "American Society of Hematology", submit: "https://submit.bloodjournal.org" },
  { name: "Journal of Hematology & Oncology", topic: "Hematologi", q: "Q1", if: 28.5, sjr: 5.10, oa: true, free: false, apc: "USD 3,190", publisher: "BioMed Central", submit: "https://jhoonline.biomedcentral.com/submission-guidelines" },
  { name: "Leukemia", topic: "Hematologi", q: "Q1", if: 13.4, sjr: 3.458, oa: true, free: false, apc: "USD 3,990", publisher: "Springer Nature", submit: "https://www.nature.com/leukemia/submit" },
  { name: "Haematologica", topic: "Hematologi", q: "Q1", if: 7.9, sjr: 2.449, oa: true, free: false, apc: "EUR 3,000", publisher: "Ferrata Storti Foundation", submit: "https://haematologica.org/submission" },
  { name: "Blood Advances", topic: "Hematologi", q: "Q1", if: 5.3, sjr: 2.901, oa: true, free: false, apc: "USD 2,500", publisher: "American Society of Hematology", submit: "https://submit.bloodadvances.org" },
  { name: "British Journal of Haematology", topic: "Hematologi", q: "Q1", if: 5.1, sjr: 1.647, oa: false, free: false, apc: "USD 4,660", publisher: "Wiley", submit: "https://onlinelibrary.wiley.com/journal/13652141" },
  { name: "Bone Marrow Transplantation", topic: "Hematologi", q: "Q1", if: 2.9, sjr: 1.709, oa: false, free: false, apc: "USD 3,790", publisher: "Springer Nature", submit: "https://www.nature.com/bmt/submit" },
  { name: "Transfusion", topic: "Hematologi", q: "Q2", if: 2.5, sjr: 0.75, oa: false, free: false, apc: "USD 3,800", publisher: "Wiley / AABB", submit: "https://onlinelibrary.wiley.com/journal/15372995" },
  { name: "Vox Sanguinis", topic: "Hematologi", q: "Q2", if: 2.2, sjr: 0.68, oa: false, free: false, apc: "USD 4,350", publisher: "Wiley / ISBT", submit: "https://onlinelibrary.wiley.com/journal/14230410" },
  { name: "Annals of Hematology", topic: "Hematologi", q: "Q2", if: 3.3, sjr: 0.891, oa: false, free: false, apc: "USD 3,190", publisher: "Springer", submit: "https://www.springer.com/journal/277" },
  { name: "European Journal of Haematology", topic: "Hematologi", q: "Q2", if: 2.4, sjr: 0.82, oa: false, free: false, apc: "USD 4,660", publisher: "Wiley", submit: "https://onlinelibrary.wiley.com/journal/16000609" },
  { name: "International Journal of Laboratory Hematology", topic: "Hematologi", q: "Q2", if: 2.3, sjr: 0.71, oa: false, free: false, apc: "USD 4,100", publisher: "Wiley", submit: "https://onlinelibrary.wiley.com/journal/17515033" },
  { name: "Acta Haematologica", topic: "Hematologi", q: "Q2", if: 2.0, sjr: 0.55, oa: true, free: false, apc: "USD 2,450", publisher: "Karger", submit: "https://www.karger.com/Journal/Home/224226" },
  { name: "Hematology", topic: "Hematologi", q: "Q2", if: 2.1, sjr: 0.65, oa: false, free: false, apc: "USD 2,950", publisher: "Taylor & Francis", submit: "https://www.tandfonline.com/journals/ihem20" },
  { name: "International Journal of Hematology", topic: "Hematologi", q: "Q2", if: 2.1, sjr: 0.60, oa: false, free: false, apc: "USD 3,190", publisher: "Springer", submit: "https://www.springer.com/journal/12185" },
  { name: "Hematology, Transfusion and Cell Therapy", topic: "Hematologi", q: "Q3", if: 1.8, sjr: 0.40, oa: true, free: true, apc: "Free", publisher: "Elsevier / ABHH", submit: "https://www.htctjournal.com/submission" },
  { name: "Mediterranean Journal of Hematology and Infectious Diseases", topic: "Hematologi", q: "Q3", if: 1.6, sjr: 0.532, oa: true, free: true, apc: "Free", publisher: "Università Cattolica", submit: "https://www.mjhid.org/mjhid/submission" },
  { name: "Hematology Reports", topic: "Hematologi", q: "Q3", if: 1.5, sjr: 0.38, oa: true, free: false, apc: "EUR 1,400", publisher: "MDPI", submit: "https://www.mdpi.com/journal/hematolrep" },
  { name: "Journal of Blood Medicine", topic: "Hematologi", q: "Q3", if: 2.1, sjr: 0.45, oa: true, free: false, apc: "USD 2,190", publisher: "Dove Medical Press", submit: "https://www.dovepress.com/journal-of-blood-medicine-journal" },
  { name: "Clinical and Laboratory Haematology", topic: "Hematologi", q: "Q3", if: 1.4, sjr: 0.33, oa: false, free: false, apc: "USD 3,800", publisher: "Wiley", submit: "https://onlinelibrary.wiley.com/journal/13652257" },

  // KIMIA KLINIK
  { name: "Clinical Chemistry", topic: "Kimia Klinik", q: "Q1", if: 6.3, sjr: 1.345, oa: false, free: false, apc: "USD 4,980", publisher: "Oxford University Press / AACC", submit: "https://academic.oup.com/clinchem/pages/general-instructions" },
  { name: "Critical Reviews in Clinical Laboratory Sciences", topic: "Kimia Klinik", q: "Q1", if: 7.4, sjr: 1.52, oa: false, free: false, apc: "USD 4,200", publisher: "Taylor & Francis", submit: "https://www.tandfonline.com/journals/ilab20" },
  { name: "Clinical Chemistry and Laboratory Medicine", topic: "Kimia Klinik", q: "Q1", if: 3.7, sjr: 0.952, oa: false, free: false, apc: "EUR 2,990", publisher: "Walter de Gruyter", submit: "https://www.degruyter.com/journal/key/CCLM/html" },
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
  { name: "Practical Laboratory Medicine", topic: "Kimia Klinik", q: "Q3", if: 1.8, sjr: 0.42, oa: true, free: true, apc: "Free", publisher: "Elsevier", submit: "https://www.sciencedirect.com/journal/practical-laboratory-medicine" },
  { name: "Labmedicine", topic: "Kimia Klinik", q: "Q3", if: 1.9, sjr: 0.44, oa: false, free: false, apc: "USD 2,500", publisher: "Oxford University Press", submit: "https://academic.oup.com/labmed" },
  { name: "Journal of Laboratory and Precision Medicine", topic: "Kimia Klinik", q: "Q3", if: 1.5, sjr: 0.36, oa: true, free: false, apc: "USD 1,200", publisher: "AME Publishing", submit: "https://jlpm.amegroups.org/submission" },
  { name: "EJIFCC", topic: "Kimia Klinik", q: "Q3", if: 1.2, sjr: 0.32, oa: true, free: true, apc: "Free", publisher: "IFCC", submit: "https://www.ifcc.org/ejifcc" },

  // IMUNOLOGI
  { name: "Journal of Allergy and Clinical Immunology", topic: "Imunologi", q: "Q1", if: 14.3, sjr: 3.935, oa: false, free: false, apc: "USD 4,390", publisher: "Elsevier", submit: "https://www.jacionline.org/content/authorinfo" },
  { name: "Allergy", topic: "Imunologi", q: "Q1", if: 12.4, sjr: 2.734, oa: false, free: false, apc: "USD 5,300", publisher: "Wiley / EAACI", submit: "https://onlinelibrary.wiley.com/journal/13989995" },
  { name: "Frontiers in Immunology", topic: "Imunologi", q: "Q1", if: 5.7, sjr: 1.75, oa: true, free: false, apc: "USD 3,150", publisher: "Frontiers Media", submit: "https://www.frontiersin.org/journals/immunology" },
  { name: "European Journal of Immunology", topic: "Imunologi", q: "Q1", if: 4.5, sjr: 1.38, oa: false, free: false, apc: "USD 4,660", publisher: "Wiley", submit: "https://onlinelibrary.wiley.com/journal/15214141" },
  { name: "Clinical and Experimental Immunology", topic: "Imunologi", q: "Q1", if: 3.8, sjr: 1.05, oa: false, free: false, apc: "USD 4,980", publisher: "Oxford / British Society for Immunology", submit: "https://academic.oup.com/cei" },
  { name: "Journal of Immunology", topic: "Imunologi", q: "Q1", if: 3.6, sjr: 1.12, oa: false, free: false, apc: "USD 3,750", publisher: "AAI / Oxford", submit: "https://journals.aai.org/jimmunol/pages/author-instructions" },
  { name: "Clinical Immunology", topic: "Imunologi", q: "Q2", if: 4.1, sjr: 0.98, oa: false, free: false, apc: "USD 2,940", publisher: "Elsevier", submit: "https://www.sciencedirect.com/journal/clinical-immunology" },
  { name: "Journal of Clinical Immunology", topic: "Imunologi", q: "Q2", if: 3.9, sjr: 0.93, oa: false, free: false, apc: "USD 3,190", publisher: "Springer", submit: "https://www.springer.com/journal/10875" },
  { name: "Mediators of Inflammation", topic: "Imunologi", q: "Q2", if: 3.4, sjr: 0.82, oa: true, free: false, apc: "USD 2,000", publisher: "Hindawi / Wiley", submit: "https://www.hindawi.com/journals/mi" },
  { name: "Autoimmunity", topic: "Imunologi", q: "Q2", if: 3.2, sjr: 0.79, oa: false, free: false, apc: "USD 3,450", publisher: "Taylor & Francis", submit: "https://www.tandfonline.com/journals/iaut20" },
  { name: "Cellular Immunology", topic: "Imunologi", q: "Q2", if: 3.0, sjr: 0.76, oa: false, free: false, apc: "USD 2,940", publisher: "Elsevier", submit: "https://www.sciencedirect.com/journal/cellular-immunology" },
  { name: "Immunology Letters", topic: "Imunologi", q: "Q2", if: 2.8, sjr: 0.72, oa: false, free: false, apc: "USD 2,940", publisher: "Elsevier", submit: "https://www.sciencedirect.com/journal/immunology-letters" },
  { name: "Scandinavian Journal of Immunology", topic: "Imunologi", q: "Q2", if: 2.7, sjr: 0.68, oa: false, free: false, apc: "USD 4,100", publisher: "Wiley", submit: "https://onlinelibrary.wiley.com/journal/13653083" },
  { name: "Human Immunology", topic: "Imunologi", q: "Q3", if: 2.5, sjr: 0.55, oa: false, free: false, apc: "USD 2,940", publisher: "Elsevier", submit: "https://www.sciencedirect.com/journal/human-immunology" },
  { name: "Immunity Inflammation and Disease", topic: "Imunologi", q: "Q3", if: 2.1, sjr: 0.48, oa: true, free: false, apc: "USD 3,900", publisher: "Wiley", submit: "https://onlinelibrary.wiley.com/journal/20500505" },
  { name: "Immunological Investigations", topic: "Imunologi", q: "Q3", if: 2.4, sjr: 0.52, oa: false, free: false, apc: "USD 3,450", publisher: "Taylor & Francis", submit: "https://www.tandfonline.com/journals/iimm20" },
  { name: "Immunologic Research", topic: "Imunologi", q: "Q3", if: 2.2, sjr: 0.50, oa: false, free: false, apc: "USD 3,190", publisher: "Springer", submit: "https://www.springer.com/journal/12026" },
  { name: "International Archives of Allergy and Immunology", topic: "Imunologi", q: "Q3", if: 2.1, sjr: 0.46, oa: false, free: false, apc: "CHF 3,200", publisher: "Karger", submit: "https://www.karger.com/Journal/Home/224145" },
  { name: "Transplant Immunology", topic: "Imunologi", q: "Q3", if: 1.9, sjr: 0.43, oa: false, free: false, apc: "USD 2,940", publisher: "Elsevier", submit: "https://www.sciencedirect.com/journal/transplant-immunology" },

  // PENYAKIT INFEKSI
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
  { name: "BMC Infectious Diseases", topic: "Penyakit Infeksi", q: "Q2", if: 3.4, sjr: 0.91, oa: true, free: false, apc: "USD 2,890", publisher: "BioMed Central", submit: "https://bmcinfectdis.biomedcentral.com/submission-guidelines" },
  { name: "Antibiotics", topic: "Penyakit Infeksi", q: "Q2", if: 4.3, sjr: 0.96, oa: true, free: false, apc: "CHF 2,900", publisher: "MDPI", submit: "https://www.mdpi.com/journal/antibiotics" },
  { name: "Pathogens", topic: "Penyakit Infeksi", q: "Q2", if: 3.3, sjr: 0.78, oa: true, free: false, apc: "CHF 2,700", publisher: "MDPI", submit: "https://www.mdpi.com/journal/pathogens" },
  { name: "Viruses", topic: "Penyakit Infeksi", q: "Q2", if: 3.8, sjr: 0.90, oa: true, free: false, apc: "CHF 2,700", publisher: "MDPI", submit: "https://www.mdpi.com/journal/viruses" },
  { name: "International Journal of Infectious Diseases", topic: "Penyakit Infeksi", q: "Q2", if: 3.1, sjr: 0.88, oa: true, free: false, apc: "USD 2,490", publisher: "Elsevier / ISID", submit: "https://www.sciencedirect.com/journal/international-journal-of-infectious-diseases" },
  { name: "Infection and Drug Resistance", topic: "Penyakit Infeksi", q: "Q2", if: 2.9, sjr: 0.73, oa: true, free: false, apc: "USD 2,850", publisher: "Dove Medical Press", submit: "https://www.dovepress.com/infection-and-drug-resistance-journal" },
  { name: "Diagnostic Microbiology and Infectious Disease", topic: "Penyakit Infeksi", q: "Q2", if: 2.8, sjr: 0.76, oa: false, free: false, apc: "USD 2,940", publisher: "Elsevier", submit: "https://www.sciencedirect.com/journal/diagnostic-microbiology-and-infectious-disease" },
  { name: "Acute and Critical Care", topic: "Penyakit Infeksi", q: "Q3", if: 1.8, sjr: 0.41, oa: true, free: true, apc: "Free", publisher: "Korean Society of Critical Care Medicine", submit: "https://www.accjournal.org/submission" },
  { name: "Infection Disease and Health", topic: "Penyakit Infeksi", q: "Q2", if: 2.5, sjr: 0.70, oa: false, free: false, apc: "USD 2,940", publisher: "Elsevier", submit: "https://www.sciencedirect.com/journal/infection-disease-and-health" },
];

function matchJournal(jName) {
  if (!jName) return null;
  const jl = jName.toLowerCase();
  return JOURNALS.find(j => {
    const nl = j.name.toLowerCase();
    return jl.includes(nl) || nl.includes(jl.substring(0, Math.min(jl.length, 20)));
  });
}
