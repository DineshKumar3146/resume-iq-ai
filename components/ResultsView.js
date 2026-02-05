import React, { useState } from 'react';
import { exportToPDF } from '@/utils/export';

export default function ResultsView({ results, jobDetails, fileName }) {
    const [exporting, setExporting] = useState(false);

    if (!results) return null;

    // Helper: Format label
    const formatLabel = (key) => {
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    };

    // Helper: Get fit icon
    const getFitIcon = (fit) => {
        const icons = {
            excellent: '🌟',
            good: '✅',
            fair: '⚠️',
            poor: '❌'
        };
        return icons[fit] || '📊';
    };

    // Helper: Determine score label
    const getScoreLabel = (score) => {
        if (score >= 80) return { text: 'Excellent', color: '#166534' };
        if (score >= 60) return { text: 'Good', color: '#1e40af' };
        if (score >= 40) return { text: 'Fair', color: '#92400e' };
        return { text: 'Needs Improvement', color: '#991b1b' };
    };

    const scoreLabel = getScoreLabel(results.overallScore);
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (results.overallScore / 100) * circumference;

    const handleExport = async () => {
        setExporting(true);
        try {
            const result = await exportToPDF(results, jobDetails || {}, fileName || 'resume.pdf');
            if (result.success) {
                alert('✅ PDF print dialog opened! Save as PDF to download your report.');
            } else {
                alert('❌ Export failed. Please try again.');
            }
        } catch (error) {
            console.error('Export error:', error);
            alert('❌ Export failed. Please try again.');
        } finally {
            setExporting(false);
        }
    };

    return (
        <section id="results" className="results-section">
            <div className="container">
                <div className="results-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 className="section-title">Analysis Results</h2>
                    <button
                        onClick={handleExport}
                        disabled={exporting}
                        style={{
                            padding: '12px 24px',
                            background: exporting ? '#cbd5e0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: exporting ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                        onMouseEnter={(e) => !exporting && (e.target.style.transform = 'translateY(-2px)')}
                        onMouseLeave={(e) => !exporting && (e.target.style.transform = 'translateY(0)')}
                    >
                        <span>{exporting ? '⏳' : '📄'}</span>
                        <span>{exporting ? 'Generating PDF...' : 'Download PDF'}</span>
                    </button>
                </div>

                <div className="results-grid">
                    {/* Overall Score Card */}
                    <div className="result-card score-card">
                        <h3>Overall Score</h3>
                        <div className="score-circle">
                            <svg className="score-svg" width="200" height="200" viewBox="0 0 200 200">
                                <defs>
                                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#667eea', stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: '#764ba2', stopOpacity: 1 }} />
                                    </linearGradient>
                                </defs>
                                <circle className="score-bg" cx="100" cy="100" r="90" />
                                <circle
                                    className="score-fill"
                                    cx="100"
                                    cy="100"
                                    r="90"
                                    style={{ strokeDashoffset: offset }}
                                />
                            </svg>
                            <div className="score-value">{Math.round(results.overallScore)}</div>
                        </div>
                        <div className="score-label" style={{ color: scoreLabel.color }}>
                            {scoreLabel.text}
                        </div>
                    </div>

                    {/* Score Breakdown */}
                    <div className="result-card">
                        <h3>Score Breakdown</h3>
                        <div className="score-breakdown">
                            {Object.entries(results.scores).map(([key, value]) => (
                                <div key={key} className="score-item">
                                    <span className="score-item-label">{formatLabel(key)}</span>
                                    <div className="score-item-bar">
                                        <div className="score-item-fill" style={{ width: `${value}%` }}></div>
                                    </div>
                                    <span className="score-item-value">{Math.round(value)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Job Fit */}
                    <div className="result-card">
                        <h3>Job Fit</h3>
                        <div className="job-fit">
                            <div className={`fit-badge ${results.jobFit}`}>
                                {getFitIcon(results.jobFit)} {results.jobFit.toUpperCase()}
                            </div>
                            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', lineHeight: '1.7' }}>
                                {results.jobFitReason}
                            </p>
                        </div>
                    </div>

                    {/* ATS and Keywords */}
                    <div className="result-card wide-card" style={{ gridColumn: '1 / -1' }}>
                        <h3>Keywords Analysis</h3>
                        <div className="keywords-split-view" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                            <div style={{ flex: '1 1 300px' }}>
                                <h4 style={{ margin: '0 0 1rem', fontSize: '1.1rem', color: '#166534' }}>✅ Detected Keywords</h4>
                                <div className="keywords-container">
                                    {results.detectedKeywords.slice(0, 15).map((keyword, i) => (
                                        <span key={i} className="keyword-tag">{keyword}</span>
                                    ))}
                                </div>
                            </div>

                            <div style={{ flex: '1 1 300px' }}>
                                <h4 style={{ margin: '0 0 1rem', fontSize: '1.1rem', color: '#991b1b' }}>❌ Missing Keywords</h4>
                                <div className="keywords-container missing">
                                    {results.missingKeywords && results.missingKeywords.length > 0 ? (
                                        results.missingKeywords.slice(0, 15).map((keyword, i) => (
                                            <span key={i} className="keyword-tag">{keyword}</span>
                                        ))
                                    ) : (
                                        <p style={{ color: 'var(--text-muted)' }}>No critical keywords missing!</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Suggestions */}
                    <div className="result-card suggestions-card">
                        <h3>Actionable Improvements</h3>
                        <div className="suggestions-list">
                            {results.suggestions.map((suggestion, i) => (
                                <div key={i} className="suggestion-item">
                                    <span className="suggestion-icon">💡</span>
                                    <span className="suggestion-text">{suggestion}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Career Insights */}
                    <div className="result-card career-insights-card">
                        <h3>Career Insights</h3>
                        <div className="career-insights">
                            <div className="insight-item">
                                <div className="insight-label">Experience Level</div>
                                <div className="insight-value">{results.careerInsights?.experienceLevel || 'N/A'}</div>
                            </div>
                            <div className="insight-item">
                                <div className="insight-label">Industry Alignment</div>
                                <div className="insight-value">{results.careerInsights?.industryAlignment || '0'}%</div>
                            </div>
                            <div className="insight-item">
                                <div className="insight-label">Competitive Advantage</div>
                                <div className="insight-value">{results.careerInsights?.competitiveAdvantage || 'N/A'}</div>
                            </div>
                            <div className="insight-item">
                                <div className="insight-label">💰 Salary Expectation</div>
                                <div className="insight-value salary">{results.careerInsights?.salaryExpectation || 'N/A'}</div>
                            </div>
                            {results.careerInsights?.nextSteps && (
                                <div className="insight-item full-width">
                                    <div className="insight-label">📈 Next Steps</div>
                                    <ul className="next-steps-list">
                                        {results.careerInsights.nextSteps.map((step, i) => (
                                            <li key={i}>{step}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ATS Optimization */}
                    <div className="result-card ats-card">
                        <h3>ATS Optimization</h3>
                        <div className="ats-optimization">
                            <div className="ats-item">
                                <div className="ats-label">Keyword Density</div>
                                <div className={`ats-badge ${results.atsOptimization?.keywordDensity}`}>
                                    {(results.atsOptimization?.keywordDensity || 'medium').toUpperCase()}
                                </div>
                            </div>
                            <div className="ats-item">
                                <div className="ats-label">Format Score</div>
                                <div className="ats-score">{results.atsOptimization?.formatScore || 0}/100</div>
                            </div>
                            {results.atsOptimization?.improvementPriority && (
                                <div className="ats-item full-width">
                                    <div className="ats-label">🎯 Improvement Priorities</div>
                                    <ol className="priority-list">
                                        {results.atsOptimization.improvementPriority.map((priority, i) => (
                                            <li key={i}>{priority}</li>
                                        ))}
                                    </ol>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
