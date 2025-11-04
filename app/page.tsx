'use client';

import { useState } from 'react';

interface Paper {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  year: number;
  journal: string;
  citations: number;
  keywords: string[];
  doi: string;
  phase: string;
}

const mockPapers: Paper[] = [
  {
    id: '1',
    title: 'Novel Small Molecule Inhibitors for Cancer Therapy: From Discovery to Clinical Trials',
    authors: ['Smith J.', 'Johnson M.', 'Williams K.'],
    abstract: 'This study presents the discovery and development of a new class of small molecule inhibitors targeting oncogenic pathways. Through high-throughput screening and structure-activity relationship studies, we identified lead compounds with potent anti-cancer activity. Preclinical studies demonstrated efficacy in multiple cancer cell lines and xenograft models.',
    year: 2024,
    journal: 'Journal of Medicinal Chemistry',
    citations: 45,
    keywords: ['cancer', 'small molecules', 'drug discovery', 'oncology', 'clinical trials'],
    doi: '10.1021/jmc.2024.001',
    phase: 'Phase II'
  },
  {
    id: '2',
    title: 'CRISPR-Based Gene Therapy Approaches for Rare Genetic Disorders',
    authors: ['Chen L.', 'Rodriguez A.', 'Kim S.'],
    abstract: 'We developed a CRISPR-Cas9 gene editing platform for treating rare genetic disorders. Our approach demonstrates high specificity and efficiency in correcting disease-causing mutations in patient-derived cells. Safety and efficacy studies in animal models show promising results for clinical translation.',
    year: 2024,
    journal: 'Nature Biotechnology',
    citations: 128,
    keywords: ['CRISPR', 'gene therapy', 'rare diseases', 'genetic disorders', 'precision medicine'],
    doi: '10.1038/nbt.2024.002',
    phase: 'Preclinical'
  },
  {
    id: '3',
    title: 'AI-Driven Drug Repurposing for Neurodegenerative Diseases',
    authors: ['Zhang Y.', 'Patel R.', 'Anderson T.'],
    abstract: 'Using machine learning algorithms and large-scale drug screening databases, we identified existing FDA-approved drugs with potential efficacy against Alzheimer\'s and Parkinson\'s diseases. Network pharmacology analysis revealed novel mechanisms of action for repurposed candidates.',
    year: 2023,
    journal: 'Cell Reports Medicine',
    citations: 92,
    keywords: ['drug repurposing', 'AI', 'machine learning', 'Alzheimer\'s', 'Parkinson\'s', 'neurodegenerative'],
    doi: '10.1016/j.xcrm.2023.003',
    phase: 'Phase I'
  },
  {
    id: '4',
    title: 'Targeted Protein Degradation Using PROTACs: A New Paradigm in Drug Development',
    authors: ['Brown E.', 'Davis M.', 'Wilson J.'],
    abstract: 'Proteolysis-targeting chimeras (PROTACs) represent a revolutionary approach to drug development. This review discusses the design principles, optimization strategies, and clinical progress of PROTAC-based therapeutics targeting previously undruggable proteins.',
    year: 2023,
    journal: 'Nature Reviews Drug Discovery',
    citations: 234,
    keywords: ['PROTACs', 'protein degradation', 'targeted therapy', 'drug design'],
    doi: '10.1038/nrd.2023.004',
    phase: 'Phase I'
  },
  {
    id: '5',
    title: 'mRNA Vaccine Technology: Applications Beyond Infectious Diseases',
    authors: ['Martinez C.', 'Thompson L.', 'Garcia M.'],
    abstract: 'Building on the success of COVID-19 vaccines, we explore mRNA vaccine platforms for cancer immunotherapy and personalized medicine. Our data demonstrate robust immune responses and tumor regression in preclinical models, paving the way for clinical trials.',
    year: 2024,
    journal: 'Science Translational Medicine',
    citations: 156,
    keywords: ['mRNA', 'vaccine', 'cancer', 'immunotherapy', 'personalized medicine'],
    doi: '10.1126/scitranslmed.2024.005',
    phase: 'Phase I/II'
  },
  {
    id: '6',
    title: 'Antibody-Drug Conjugates: Optimization of Linker Chemistry and Payload Selection',
    authors: ['Lee H.', 'Kumar V.', 'White S.'],
    abstract: 'This study systematically evaluates linker-payload combinations for antibody-drug conjugates (ADCs) in solid tumors. We identify optimal formulations that balance stability, target specificity, and cytotoxicity, leading to improved therapeutic windows.',
    year: 2023,
    journal: 'Journal of Controlled Release',
    citations: 78,
    keywords: ['ADC', 'antibody-drug conjugates', 'linker chemistry', 'cancer therapy', 'payload'],
    doi: '10.1016/j.jconrel.2023.006',
    phase: 'Phase II'
  },
  {
    id: '7',
    title: 'Metabolic Reprogramming as a Therapeutic Target in Type 2 Diabetes',
    authors: ['Taylor A.', 'Nelson R.', 'Clark D.'],
    abstract: 'We investigate the role of cellular metabolism in insulin resistance and identify novel small molecules that restore metabolic homeostasis. Mechanistic studies reveal targeting of mitochondrial function and glucose metabolism as key therapeutic strategies.',
    year: 2024,
    journal: 'Cell Metabolism',
    citations: 67,
    keywords: ['diabetes', 'metabolism', 'insulin resistance', 'mitochondria', 'glucose'],
    doi: '10.1016/j.cmet.2024.007',
    phase: 'Preclinical'
  },
  {
    id: '8',
    title: 'Nanomedicine Approaches for Crossing the Blood-Brain Barrier',
    authors: ['Wang X.', 'Nguyen T.', 'Peterson M.'],
    abstract: 'We developed nanoparticle-based delivery systems capable of crossing the blood-brain barrier to deliver therapeutics for neurological disorders. Surface modifications and targeting ligands enhance brain penetration and cell-specific delivery.',
    year: 2023,
    journal: 'Advanced Drug Delivery Reviews',
    citations: 189,
    keywords: ['nanomedicine', 'blood-brain barrier', 'drug delivery', 'nanoparticles', 'neurology'],
    doi: '10.1016/j.addr.2023.008',
    phase: 'Preclinical'
  },
  {
    id: '9',
    title: 'Microbiome Modulation for Inflammatory Bowel Disease Treatment',
    authors: ['Lopez J.', 'Singh A.', 'Murphy K.'],
    abstract: 'This clinical study evaluates the efficacy of next-generation probiotics and microbiome-targeted therapies in IBD patients. Results show significant improvements in disease activity scores and quality of life, with favorable safety profiles.',
    year: 2024,
    journal: 'Gastroenterology',
    citations: 103,
    keywords: ['microbiome', 'IBD', 'probiotics', 'inflammatory bowel disease', 'gut health'],
    doi: '10.1053/j.gastro.2024.009',
    phase: 'Phase III'
  },
  {
    id: '10',
    title: 'CAR-T Cell Therapy: Engineering Next-Generation Constructs for Solid Tumors',
    authors: ['Harris B.', 'Young C.', 'Adams P.'],
    abstract: 'We report the design of novel CAR-T cell constructs with enhanced tumor penetration, persistence, and anti-tumor efficacy in solid malignancies. Modifications to costimulatory domains and addition of cytokine armoring overcome the immunosuppressive tumor microenvironment.',
    year: 2023,
    journal: 'Cancer Cell',
    citations: 201,
    keywords: ['CAR-T', 'cell therapy', 'immunotherapy', 'solid tumors', 'cancer'],
    doi: '10.1016/j.ccell.2023.010',
    phase: 'Phase I'
  }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [sortBy, setSortBy] = useState('citations');

  const filteredPapers = mockPapers
    .filter(paper => {
      const matchesSearch = searchTerm === '' ||
        paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) ||
        paper.authors.some(a => a.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesPhase = selectedPhase === 'all' || paper.phase === selectedPhase;
      const matchesYear = selectedYear === 'all' || paper.year.toString() === selectedYear;

      return matchesSearch && matchesPhase && matchesYear;
    })
    .sort((a, b) => {
      if (sortBy === 'citations') return b.citations - a.citations;
      if (sortBy === 'year') return b.year - a.year;
      return a.title.localeCompare(b.title);
    });

  const phases = ['all', ...Array.from(new Set(mockPapers.map(p => p.phase)))];
  const years = ['all', ...Array.from(new Set(mockPapers.map(p => p.year.toString()))).sort().reverse()];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-indigo-900 dark:text-indigo-300 mb-4">
            Drug Development Research Database
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Search and explore cutting-edge pharmaceutical research papers
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Search by title, keywords, authors, or abstract..."
                className="w-full px-6 py-4 text-lg border-2 border-indigo-300 dark:border-indigo-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Development Phase
                </label>
                <select
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  value={selectedPhase}
                  onChange={(e) => setSelectedPhase(e.target.value)}
                >
                  {phases.map(phase => (
                    <option key={phase} value={phase}>
                      {phase === 'all' ? 'All Phases' : phase}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Publication Year
                </label>
                <select
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year === 'all' ? 'All Years' : year}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sort By
                </label>
                <select
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="citations">Citations (High to Low)</option>
                  <option value="year">Year (Newest First)</option>
                  <option value="title">Title (A-Z)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 text-gray-700 dark:text-gray-300">
          <p className="text-lg font-semibold">
            Found {filteredPapers.length} {filteredPapers.length === 1 ? 'paper' : 'papers'}
          </p>
        </div>

        <div className="space-y-6">
          {filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border-l-4 border-indigo-500"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-300 flex-1">
                  {paper.title}
                </h2>
                <span className="ml-4 px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-semibold whitespace-nowrap">
                  {paper.phase}
                </span>
              </div>

              <div className="text-gray-600 dark:text-gray-400 mb-3">
                <p className="font-medium">{paper.authors.join(', ')}</p>
                <p className="text-sm">
                  {paper.journal} • {paper.year} • {paper.citations} citations
                </p>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {paper.abstract}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {paper.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <a
                  href={`https://doi.org/${paper.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium flex items-center"
                >
                  <span className="mr-2">📄</span>
                  DOI: {paper.doi}
                </a>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Save Paper
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-2xl text-gray-500 dark:text-gray-400">
              No papers found matching your search criteria
            </p>
            <p className="text-gray-400 dark:text-gray-500 mt-2">
              Try adjusting your filters or search term
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
