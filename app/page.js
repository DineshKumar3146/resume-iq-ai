'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ResultsView from '@/components/ResultsView';
import EnhancedAnalysis from '@/components/EnhancedAnalysis';
import HistoryView from '@/components/HistoryView';
import { extractTextFromPDF } from '@/utils/pdf';
import { analyzeResume } from '@/utils/gemini';

export default function Home() {
  const [file, setFile] = useState(null);
  const [jobDetails, setJobDetails] = useState({ company: '', title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('');
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);

  // UI Refs
  const fileInputRef = useRef(null);
  const resultsRef = useRef(null);
  const uploadRef = useRef(null);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem('resumeiq_applications');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  const handleFileUpload = (uploadedFile) => {
    if (!uploadedFile) return;

    // Validation
    if (uploadedFile.type !== 'application/pdf') {
      setStatus('Please upload a PDF file.');
      setStatusType('error');
      return;
    }

    if (uploadedFile.size > 25 * 1024 * 1024) {
      setStatus('File size exceeds 25 MB limit.');
      setStatusType('error');
      return;
    }

    setFile(uploadedFile);
    setStatus('Resume uploaded successfully!');
    setStatusType('success');

    // Auto-scroll to clear status after 3s
    setTimeout(() => setStatus(''), 3000);
  };

  const handleAnalyze = async () => {
    if (!file || !jobDetails.company || !jobDetails.title || !jobDetails.description) {
      setStatus('Please upload a resume and fill all job details.');
      setStatusType('error');
      return;
    }

    setLoading(true);
    setResults(null); // Clear previous results

    try {
      // Step 1: Extract Text
      setStatus('📄 Step 1/2: Extracting text from PDF...');
      setStatusType('info');

      const { success, text, error } = await extractTextFromPDF(file);
      if (!success) throw new Error(error);

      console.log(`✅ Extracted ${text.length} characters from PDF`);

      // Step 2: AI Analysis
      setStatus('🤖 Step 2/2: Analyzing with Gemini 3.0 Flash...');
      setStatusType('info');

      const analysis = await analyzeResume({
        resumeText: text,
        jobDescription: jobDetails.description,
        companyName: jobDetails.company,
        jobTitle: jobDetails.title
      });

      setResults(analysis);

      // Step 3: Save to History
      const newEntry = {
        id: Date.now(),
        ...jobDetails,
        fileName: file.name,
        timestamp: new Date().toISOString(),
        analysis // Store full analysis
      };

      const updatedHistory = [newEntry, ...history].slice(0, 50);
      setHistory(updatedHistory);
      localStorage.setItem('resumeiq_applications', JSON.stringify(updatedHistory));

      setStatus('✅ Analysis complete! Scroll down to view results.');
      setStatusType('success');

      // Scroll to results
      setTimeout(() => {
        const element = document.getElementById('results');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 500);

    } catch (err) {
      console.error('Analysis error:', err);
      setStatus(err.message || '❌ Analysis failed. Please try again.');
      setStatusType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleViewHistoryItem = (item) => {
    setJobDetails({
      company: item.company || item.companyName || '',
      title: item.title || item.jobTitle || '',
      description: item.description || item.jobDescription || ''
    });
    setResults(item.analysis);
    // Simulate file presence for UI consistency (optional)
    setFile({ name: item.fileName });

    setTimeout(() => {
      const element = document.getElementById('results');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDeleteHistoryItem = (id) => {
    if (confirm('Are you sure you want to delete this analysis?')) {
      const updated = history.filter(item => item.id !== id);
      setHistory(updated);
      localStorage.setItem('resumeiq_applications', JSON.stringify(updated));
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all history?')) {
      setHistory([]);
      localStorage.removeItem('resumeiq_applications');
    }
  };

  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Track Your Applications & Resume Ratings</h1>
            <p className="hero-subtitle">Optimize your job applications with AI-powered insights. Get instant scoring, ATS feedback, and tailored suggestions.</p>
            <button className="btn-hero" onClick={() => document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })}>
              <span>Get Started Free</span>
            </button>
          </div>
        </div>
        <div className="hero-gradient"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <h2 className="section-title">Powerful Features</h2>
          <p className="section-subtitle">Everything you need to land your dream job</p>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🎯</span>
              <h3>ATS Compatibility</h3>
              <p>Check if your resume passes Applicant Tracking Systems.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">⚡</span>
              <h3>Instant Scoring</h3>
              <p>Get a detailed score breakdown (0-100) instantly.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">💡</span>
              <h3>Smart Suggestions</h3>
              <p>Receive actionable feedback to improve your content.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🔍</span>
              <h3>Keyword Analysis</h3>
              <p>Identify missing keywords from the job description.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">📄</div>
              <h3>Upload Resume</h3>
              <p>Upload your PDF resume to our secure platform.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">💼</div>
              <h3>Add Job Details</h3>
              <p>Paste the job description and role details.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">✨</div>
              <h3>Get Insights</h3>
              <p>Receive comprehensive AI analysis in seconds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload" className="upload-section" ref={uploadRef}>
        <div className="container">
          <h2 className="section-title">Analyze Your Resume</h2>
          <div className="upload-container">
            <div className="upload-left">
              <h2 className="upload-title">Job Details</h2>
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Google"
                  value={jobDetails.company}
                  onChange={(e) => setJobDetails({ ...jobDetails, company: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Job Title</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Software Engineer"
                  value={jobDetails.title}
                  onChange={(e) => setJobDetails({ ...jobDetails, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Job Description</label>
                <textarea
                  rows="6"
                  placeholder="Paste the full job description here..."
                  value={jobDetails.description}
                  onChange={(e) => setJobDetails({ ...jobDetails, description: e.target.value })}
                />
              </div>
            </div>

            <div className="upload-right">
              <div
                className={`upload-box ${file ? 'has-file' : ''}`}
                onClick={() => fileInputRef.current.click()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFileUpload(e.dataTransfer.files[0]);
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <div className="upload-icon">{file ? '✅' : '📄'}</div>
                <p className="upload-text">{file ? file.name : 'Click to upload PDF'}</p>
                <p className="upload-subtext">{file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Drag and drop supported'}</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  hidden
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                />
              </div>

              <button
                className={`btn-analyze ${loading ? 'loading' : ''}`}
                onClick={handleAnalyze}
                disabled={loading || !file}
              >
                {loading ? <div className="spinner"></div> : <span id="btnText">Analyze Resume</span>}
              </button>

              {status && <div className={`upload-status ${statusType}`}>{status}</div>}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <div id="results">
        <ResultsView results={results} jobDetails={jobDetails} fileName={file?.name} />
        {results && (
          <div className="container">
            <EnhancedAnalysis results={results} />
          </div>
        )}
      </div>

      {/* History Section */}
      <HistoryView
        history={history}
        onView={handleViewHistoryItem}
        onDelete={handleDeleteHistoryItem}
        onClear={handleClearHistory}
      />

      {/* Contact Section */}
      <section id="contact" className="contact-section" style={{ padding: '4rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Get in Touch</h2>
          <div className="contact-card" style={{
            maxWidth: '600px',
            margin: '2rem auto',
            padding: '2rem',
            background: 'white',
            borderRadius: '1rem',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Dinesh Kumar</h3>
            <div className="contact-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
              <span>📧</span>
              <a href="mailto:dk5222618@gmail.com" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>dk5222618@gmail.com</a>
            </div>
            <div className="contact-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
              <span>📱</span>
              <a href="tel:9100427655" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>+91 9100427655</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-secondary)', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <p>© 2026 Resume_IQ. Powered by Gemini 3.0 Flash.</p>
        </div>
      </footer>
    </main>
  );
}
