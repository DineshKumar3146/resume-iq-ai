import React, { useState } from 'react';

export default function EnhancedAnalysis({ results }) {
    const [activeTab, setActiveTab] = useState('skills');

    if (!results) return null;

    const tabs = [
        { id: 'skills', label: '🎯 Skills Breakdown', icon: '💪' },
        { id: 'sections', label: '📋 Section Analysis', icon: '📊' },
        { id: 'linguistic', label: '✍️ Writing Quality', icon: '📝' },
        { id: 'learning', label: '📚 Learning Path', icon: '🎓' },
        { id: 'interview', label: '🎤 Interview Prep', icon: '💼' }
    ];

    return (
        <div className="enhanced-analysis-container">
            <h2 className="section-title" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                🚀 Advanced Analysis
            </h2>

            {/* Tab Navigation */}
            <div className="analysis-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <span className="tab-icon">{tab.icon}</span>
                        <span className="tab-label">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === 'skills' && <SkillsBreakdown data={results.skillsBreakdown} />}
                {activeTab === 'sections' && <SectionAnalysis data={results.sectionAnalysis} />}
                {activeTab === 'linguistic' && <LinguisticAnalysis data={results.linguisticAnalysis} />}
                {activeTab === 'learning' && <LearningResources data={results.learningResources} />}
                {activeTab === 'interview' && <InterviewPrep data={results.interviewPrep} />}
            </div>
        </div>
    );
}

// Skills Breakdown Component
function SkillsBreakdown({ data }) {
    if (!data) return <div className="no-data">No skills data available</div>;

    return (
        <div className="skills-breakdown">
            <div className="skills-grid">
                {/* Hard Skills */}
                <div className="skill-category hard-skills">
                    <h3>💻 Technical Skills (Hard Skills)</h3>
                    <div className="proficiency-badge">
                        Proficiency: <strong>{data.hardSkills?.proficiencyLevel || 'N/A'}</strong>
                    </div>

                    <div className="skill-section">
                        <h4 className="skill-section-title success">✅ Detected</h4>
                        <div className="skill-tags">
                            {data.hardSkills?.detected?.map((skill, i) => (
                                <span key={i} className="skill-tag detected">{skill}</span>
                            ))}
                        </div>
                    </div>

                    <div className="skill-section">
                        <h4 className="skill-section-title warning">❌ Missing</h4>
                        <div className="skill-tags">
                            {data.hardSkills?.missing?.length > 0 ? (
                                data.hardSkills.missing.map((skill, i) => (
                                    <span key={i} className="skill-tag missing">{skill}</span>
                                ))
                            ) : (
                                <p className="no-missing">All required technical skills present! 🎉</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Soft Skills */}
                <div className="skill-category soft-skills">
                    <h3>🤝 Interpersonal Skills (Soft Skills)</h3>

                    <div className="skill-section">
                        <h4 className="skill-section-title success">✅ Detected</h4>
                        <div className="skill-tags">
                            {data.softSkills?.detected?.map((skill, i) => (
                                <span key={i} className="skill-tag detected">{skill}</span>
                            ))}
                        </div>
                    </div>

                    <div className="skill-section">
                        <h4 className="skill-section-title warning">❌ Missing</h4>
                        <div className="skill-tags">
                            {data.softSkills?.missing?.length > 0 ? (
                                data.softSkills.missing.map((skill, i) => (
                                    <span key={i} className="skill-tag missing">{skill}</span>
                                ))
                            ) : (
                                <p className="no-missing">All required soft skills demonstrated! 🎉</p>
                            )}
                        </div>
                    </div>

                    {data.softSkills?.evidence && data.softSkills.evidence.length > 0 && (
                        <div className="skill-section">
                            <h4 className="skill-section-title info">📌 Evidence Found</h4>
                            <ul className="evidence-list">
                                {data.softSkills.evidence.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Section Analysis Component
function SectionAnalysis({ data }) {
    if (!data) return <div className="no-data">No section analysis available</div>;

    const sections = [
        { key: 'summary', title: '📝 Summary/Objective', icon: '🎯' },
        { key: 'experience', title: '💼 Work Experience', icon: '🏢' },
        { key: 'education', title: '🎓 Education', icon: '📚' },
        { key: 'skills', title: '⚡ Skills Section', icon: '🛠️' }
    ];

    const getScoreColor = (score) => {
        if (score >= 80) return '#10b981';
        if (score >= 60) return '#3b82f6';
        if (score >= 40) return '#f59e0b';
        return '#ef4444';
    };

    return (
        <div className="section-analysis">
            {sections.map(section => {
                const sectionData = data[section.key];
                if (!sectionData) return null;

                return (
                    <div key={section.key} className="section-card">
                        <div className="section-header">
                            <h3>
                                <span className="section-icon">{section.icon}</span>
                                {section.title}
                            </h3>
                            <div
                                className="section-score"
                                style={{
                                    backgroundColor: getScoreColor(sectionData.score),
                                    color: 'white'
                                }}
                            >
                                {Math.round(sectionData.score)}/100
                            </div>
                        </div>

                        <div className="section-feedback">
                            <p className="feedback-text">{sectionData.feedback}</p>
                        </div>

                        {sectionData.suggestions && sectionData.suggestions.length > 0 && (
                            <div className="section-suggestions">
                                <h4>💡 Improvements:</h4>
                                <ul>
                                    {sectionData.suggestions.map((suggestion, i) => (
                                        <li key={i}>{suggestion}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

// Linguistic Analysis Component
function LinguisticAnalysis({ data }) {
    if (!data) return <div className="no-data">No linguistic analysis available</div>;

    return (
        <div className="linguistic-analysis">
            {/* Scores Overview */}
            <div className="linguistic-scores">
                <div className="score-box">
                    <div className="score-label">Tone Quality</div>
                    <div className="score-value">{data.toneScore || 0}%</div>
                </div>
                <div className="score-box">
                    <div className="score-label">Active Voice</div>
                    <div className="score-value">{data.activeVoicePercentage || 0}%</div>
                </div>
                <div className="score-box">
                    <div className="score-label">Readability</div>
                    <div className="score-value">{data.readabilityScore || 0}%</div>
                </div>
                <div className="score-box">
                    <div className="score-label">Complexity</div>
                    <div className="score-value-text">{data.sentenceComplexity || 'N/A'}</div>
                </div>
            </div>

            {/* Power Words */}
            {data.powerWords && data.powerWords.length > 0 && (
                <div className="linguistic-section success-section">
                    <h3>💪 Strong Action Verbs Found</h3>
                    <div className="word-tags">
                        {data.powerWords.map((word, i) => (
                            <span key={i} className="word-tag power">{word}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* Weak Phrases */}
            {data.weakPhrases && data.weakPhrases.length > 0 && (
                <div className="linguistic-section warning-section">
                    <h3>⚠️ Weak Phrases to Replace</h3>
                    <div className="word-tags">
                        {data.weakPhrases.map((phrase, i) => (
                            <span key={i} className="word-tag weak">{phrase}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* Suggested Replacements */}
            {data.suggestedReplacements && data.suggestedReplacements.length > 0 && (
                <div className="linguistic-section">
                    <h3>🔄 Suggested Replacements</h3>
                    <div className="replacements-list">
                        {data.suggestedReplacements.map((item, i) => (
                            <div key={i} className="replacement-item">
                                <span className="weak-text">❌ "{item.weak}"</span>
                                <span className="arrow">→</span>
                                <span className="strong-text">✅ "{item.strong}"</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// Learning Resources Component
function LearningResources({ data }) {
    if (!data || data.length === 0) {
        return <div className="no-data">🎉 No skill gaps detected! You're well-prepared.</div>;
    }

    const getPriorityColor = (priority) => {
        const colors = {
            'Critical': '#ef4444',
            'High': '#f59e0b',
            'Medium': '#3b82f6',
            'Low': '#10b981'
        };
        return colors[priority] || '#6b7280';
    };

    return (
        <div className="learning-resources">
            <div className="learning-intro">
                <p>📚 Based on the job requirements, here are recommended learning resources to strengthen your profile:</p>
            </div>

            <div className="resources-grid">
                {data.map((resource, i) => (
                    <div key={i} className="resource-card">
                        <div className="resource-header">
                            <h3>{resource.skill}</h3>
                            <span
                                className="priority-badge"
                                style={{ backgroundColor: getPriorityColor(resource.priority) }}
                            >
                                {resource.priority}
                            </span>
                        </div>

                        <div className="resource-details">
                            <div className="resource-item">
                                <span className="resource-icon">📖</span>
                                <div>
                                    <div className="resource-label">Recommended Course</div>
                                    <div className="resource-value">{resource.recommendedCourse}</div>
                                </div>
                            </div>

                            <div className="resource-item">
                                <span className="resource-icon">⏱️</span>
                                <div>
                                    <div className="resource-label">Estimated Time</div>
                                    <div className="resource-value">{resource.estimatedTime}</div>
                                </div>
                            </div>

                            <div className="resource-item">
                                <span className="resource-icon">🌐</span>
                                <div>
                                    <div className="resource-label">Platform</div>
                                    <div className="resource-value">{resource.platform}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Interview Prep Component
function InterviewPrep({ data }) {
    if (!data) return <div className="no-data">No interview preparation data available</div>;

    return (
        <div className="interview-prep">
            <div className="prep-intro">
                <p>🎯 Prepare for your interview with these AI-generated questions based on your resume:</p>
            </div>

            {/* Likely Questions */}
            {data.likelyQuestions && data.likelyQuestions.length > 0 && (
                <div className="prep-section">
                    <h3>💬 General Questions</h3>
                    <div className="questions-list">
                        {data.likelyQuestions.map((question, i) => (
                            <div key={i} className="question-item">
                                <span className="question-number">{i + 1}</span>
                                <span className="question-text">{question}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Technical Challenges */}
            {data.technicalChallenges && data.technicalChallenges.length > 0 && (
                <div className="prep-section technical">
                    <h3>💻 Technical Questions</h3>
                    <div className="questions-list">
                        {data.technicalChallenges.map((question, i) => (
                            <div key={i} className="question-item">
                                <span className="question-number">{i + 1}</span>
                                <span className="question-text">{question}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Behavioral Questions */}
            {data.behavioralQuestions && data.behavioralQuestions.length > 0 && (
                <div className="prep-section behavioral">
                    <h3>🎭 Behavioral Questions (STAR Method)</h3>
                    <div className="star-info">
                        <strong>STAR Method:</strong> Situation → Task → Action → Result
                    </div>
                    <div className="questions-list">
                        {data.behavioralQuestions.map((question, i) => (
                            <div key={i} className="question-item">
                                <span className="question-number">{i + 1}</span>
                                <span className="question-text">{question}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
