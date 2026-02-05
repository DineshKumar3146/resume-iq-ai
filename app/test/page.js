'use client';

import EnhancedAnalysis from '@/components/EnhancedAnalysis';

export default function TestPage() {
    // Sample data to demonstrate all features
    const sampleResults = {
        skillsBreakdown: {
            hardSkills: {
                detected: ["Python", "React", "Node.js", "Docker", "AWS", "PostgreSQL", "Git"],
                missing: ["Kubernetes", "TypeScript", "GraphQL"],
                proficiencyLevel: "Advanced"
            },
            softSkills: {
                detected: ["Leadership", "Communication", "Problem-solving", "Team Collaboration"],
                missing: ["Conflict Resolution", "Public Speaking"],
                evidence: [
                    "Led a team of 5 developers in migration project",
                    "Presented quarterly results to stakeholders",
                    "Mentored 3 junior developers"
                ]
            }
        },
        sectionAnalysis: {
            summary: {
                score: 75,
                feedback: "Strong opening but lacks specific metrics about years of experience and key achievements.",
                suggestions: [
                    "Add quantifiable achievements in the opening line",
                    "Mention years of experience upfront",
                    "Include your top 3 technical skills"
                ]
            },
            experience: {
                score: 85,
                feedback: "Excellent use of action verbs and metrics. Job descriptions are clear and impactful.",
                suggestions: [
                    "Add more context about company size and industry",
                    "Include specific technologies used in each role",
                    "Quantify team size for leadership roles"
                ]
            },
            education: {
                score: 70,
                feedback: "Education section is present but could be enhanced with more details.",
                suggestions: [
                    "Add relevant coursework or projects",
                    "Include GPA if above 3.5",
                    "Mention academic achievements or honors"
                ]
            },
            skills: {
                score: 80,
                feedback: "Good organization of technical skills, but could be better categorized.",
                suggestions: [
                    "Group skills by category (Languages, Frameworks, Tools)",
                    "Add proficiency levels for each skill",
                    "Remove outdated or irrelevant skills"
                ]
            }
        },
        linguisticAnalysis: {
            toneScore: 82,
            activeVoicePercentage: 75,
            weakPhrases: ["Responsible for managing", "Helped with development", "Worked on projects"],
            powerWords: ["Spearheaded", "Architected", "Optimized", "Orchestrated", "Delivered"],
            suggestedReplacements: [
                { weak: "Responsible for managing", strong: "Managed / Directed / Orchestrated" },
                { weak: "Helped with development", strong: "Collaborated on / Led / Facilitated" },
                { weak: "Worked on projects", strong: "Delivered / Executed / Engineered" }
            ],
            readabilityScore: 88,
            sentenceComplexity: "Moderate"
        },
        learningResources: [
            {
                skill: "Kubernetes",
                priority: "Critical",
                recommendedCourse: "Kubernetes for Developers - Complete Guide",
                estimatedTime: "2-3 months",
                platform: "Udemy"
            },
            {
                skill: "TypeScript",
                priority: "High",
                recommendedCourse: "TypeScript: The Complete Developer's Guide",
                estimatedTime: "1-2 months",
                platform: "Coursera"
            },
            {
                skill: "GraphQL",
                priority: "Medium",
                recommendedCourse: "GraphQL with React: The Complete Guide",
                estimatedTime: "3-4 weeks",
                platform: "LinkedIn Learning"
            }
        ],
        interviewPrep: {
            likelyQuestions: [
                "You mentioned leading a team of 5 developers. What was your leadership style and how did you handle conflicts?",
                "Walk me through the migration project you spearheaded. What were the biggest technical challenges?",
                "How do you stay updated with the latest technologies in your field?"
            ],
            technicalChallenges: [
                "Explain how you would design a scalable microservices architecture using the technologies you mentioned.",
                "What design patterns did you use in your React applications and why?",
                "How would you optimize database queries in PostgreSQL for a high-traffic application?"
            ],
            behavioralQuestions: [
                "Tell me about a time you had to resolve a conflict within your team. What was the situation and outcome?",
                "Describe a situation where you had to meet a tight deadline. How did you prioritize and manage your time?",
                "Give an example of when you had to learn a new technology quickly. How did you approach it?"
            ]
        }
    };

    return (
        <main style={{ padding: '2rem', background: '#f8f9fc', minHeight: '100vh' }}>
            <div className="container">
                <h1 style={{
                    textAlign: 'center',
                    marginBottom: '2rem',
                    fontSize: '2.5rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    🚀 Enhanced Analysis Features Demo
                </h1>
                <p style={{
                    textAlign: 'center',
                    marginBottom: '3rem',
                    color: '#64748b',
                    fontSize: '1.1rem'
                }}>
                    This page demonstrates all the new enhanced analysis features with sample data.
                </p>

                <EnhancedAnalysis results={sampleResults} />

                <div style={{
                    marginTop: '3rem',
                    padding: '2rem',
                    background: 'white',
                    borderRadius: '1rem',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                    <h2 style={{ marginBottom: '1rem' }}>📝 How to Use</h2>
                    <ol style={{ lineHeight: '1.8', color: '#64748b' }}>
                        <li>Click on each tab above to explore different analysis features</li>
                        <li>The <strong>Skills Breakdown</strong> tab shows hard vs soft skills</li>
                        <li>The <strong>Section Analysis</strong> tab provides detailed feedback on each resume section</li>
                        <li>The <strong>Writing Quality</strong> tab analyzes your language and tone</li>
                        <li>The <strong>Learning Path</strong> tab recommends courses for missing skills</li>
                        <li>The <strong>Interview Prep</strong> tab generates potential interview questions</li>
                    </ol>
                </div>
            </div>
        </main>
    );
}
