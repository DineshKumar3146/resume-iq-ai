// ===== Gemini 3.0 Flash Integration =====
const CONFIG = {
    API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    API_URL: 'https://generativelanguage.googleapis.com/v1beta/models',
    MODEL: 'gemini-3-flash-preview', // 🚀 Latest Gemini 3.0 Flash (December 2025 Release)
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1500,
    AI_CONFIG: {
        // 🎯 CRITICAL: Set to 0.0 for maximum consistency and deterministic results
        temperature: 0.0,
        topK: 40,
        topP: 0.8, // Reduced for more focused responses
        maxOutputTokens: 8192,
        responseMimeType: 'application/json',
    },
    SAFETY_SETTINGS: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
    ]
};

const generatePrompt = (resumeText, jobDescription, companyName, jobTitle) => {
    return `
    You are an expert ATS (Applicant Tracking System) and Senior Technical Recruiter with expertise in linguistic analysis and career coaching.
    Your task is to analyze a resume against a specific job description with 100% OBJECTIVITY and ACCURACY.
    
    🚨 STRICT RULES FOR CONSISTENCY:
    1. DO NOT hallucinate skills or experience. Only evaluate what is explicitly present in the text.
    2. Be consistent: The same input MUST yield the exact same output every time.
    3. Scoring must be mathematical based on keyword matches and semantic relevance.
    4. Be critical: Do not give a high score unless the resume genuinely matches the job requirements.

    ➡️ INPUT DATA:
    JOB DETAILS:
    - Company: ${companyName}
    - Title: ${jobTitle}
    - Description: ${jobDescription}

    RESUME TEXT:
    ${resumeText.substring(0, 30000)}

    ➡️ TASK:
    Perform a COMPREHENSIVE multi-dimensional analysis of the "RESUME TEXT" against the "JOB DETAILS".
    
    ➡️ SCORING CRITERIA (0-100):
    - ATS Compatibility: Structure, readability, and standard headers.
    - Skills Match: Percentage of required hard/soft skills found in resume.
    - Experience Relevance: How well past roles match the detailed job requirements.
    - Content Quality: Use of action verbs, metrics, and clear impact statements.
    - Structure: Section ordering, clarity, and length.

    ➡️ REQUIRED JSON OUTPUT FORMAT:
    You must return ONLY a JSON object. No markdown formatting.
    {
        "overallScore": number (0-100),
        "jobFit": "High" | "Medium" | "Low",
        "jobFitReason": "A concise, factual explanation of why it fits or doesn't fit, citing specific evidence.",
        "scores": {
            "atsCompatibility": number,
            "skillsMatch": number,
            "experienceRelevance": number,
            "contentQuality": number,
            "structure": number
        },
        "detectedKeywords": ["list", "of", "skills", "found", "in", "resume", "that", "match", "job"],
        "missingKeywords": ["critical", "skills", "from", "job", "description", "missing", "in", "resume"],
        "suggestions": [
            "Specific, actionable advice to specific sections",
            "Do not give generic advice. Be specific to the missing keywords."
        ],
        "careerInsights": {
            "experienceLevel": "Entry" | "Mid-Level" | "Senior" | "Executive",
            "industryAlignment": number (0-100),
            "competitiveAdvantage": "What makes this candidate stand out (or 'None' if generic)",
            "salaryExpectation": "Estimated range in both USD and INR (e.g. '$80k - $100k / ₹60L - ₹80L')",
            "nextSteps": ["Recommended certification", "Skill to learn"]
        },
        "atsOptimization": {
            "keywordDensity": "Low" | "Medium" | "High",
            "formatScore": number (0-100),
            "improvementPriority": ["Top 3 things to fix for ATS parsing"]
        },
        "skillsBreakdown": {
            "hardSkills": {
                "detected": ["Technical skills found: programming languages, tools, frameworks"],
                "missing": ["Technical skills required but not found"],
                "proficiencyLevel": "Beginner" | "Intermediate" | "Advanced" | "Expert"
            },
            "softSkills": {
                "detected": ["Interpersonal skills found: leadership, communication, teamwork"],
                "missing": ["Soft skills required but not found"],
                "evidence": ["Specific examples from resume demonstrating soft skills"]
            }
        },
        "sectionAnalysis": {
            "summary": {
                "score": number (0-100),
                "feedback": "Specific feedback on the summary/objective section",
                "suggestions": ["Actionable improvements"]
            },
            "experience": {
                "score": number (0-100),
                "feedback": "Analysis of work experience section quality",
                "suggestions": ["How to improve experience descriptions"]
            },
            "education": {
                "score": number (0-100),
                "feedback": "Education section analysis",
                "suggestions": ["Improvements for education section"]
            },
            "skills": {
                "score": number (0-100),
                "feedback": "Skills section organization and relevance",
                "suggestions": ["How to better present skills"]
            }
        },
        "linguisticAnalysis": {
            "toneScore": number (0-100),
            "activeVoicePercentage": number (0-100),
            "weakPhrases": ["Phrases to avoid: 'responsible for', 'helped with'"],
            "powerWords": ["Strong action verbs found: 'spearheaded', 'architected'"],
            "suggestedReplacements": [
                {"weak": "helped with", "strong": "collaborated on / led / facilitated"},
                {"weak": "responsible for", "strong": "managed / directed / orchestrated"}
            ],
            "readabilityScore": number (0-100),
            "sentenceComplexity": "Simple" | "Moderate" | "Complex"
        },
        "learningResources": [
            {
                "skill": "Missing skill name",
                "priority": "Critical" | "High" | "Medium" | "Low",
                "recommendedCourse": "Course/certification name",
                "estimatedTime": "Time to learn (e.g., '2-3 months')",
                "platform": "Coursera / Udemy / LinkedIn Learning / YouTube"
            }
        ],
        "interviewPrep": {
            "likelyQuestions": [
                "Based on resume content, what questions will be asked",
                "Example: 'You mentioned leading a team of 5. What was your leadership style?'"
            ],
            "technicalChallenges": [
                "Technical questions based on skills claimed",
                "Example: 'Explain how you implemented the authentication system you mentioned'"
            ],
            "behavioralQuestions": [
                "STAR method questions based on achievements",
                "Example: 'Tell me about a time you resolved a conflict in your team'"
            ]
        }
    }
    `;
};

export const analyzeResume = async ({ resumeText, jobDescription, companyName, jobTitle }) => {
    if (!CONFIG.API_KEY) {
        throw new Error('⚠️ API Key Missing: Please add your Gemini API key to the .env.local file.');
    }

    const prompt = generatePrompt(resumeText, jobDescription, companyName, jobTitle);
    const apiUrl = `${CONFIG.API_URL}/${CONFIG.MODEL}:generateContent?key=${CONFIG.API_KEY}`;

    // Retry logic with exponential backoff
    for (let attempt = 1; attempt <= CONFIG.RETRY_ATTEMPTS; attempt++) {
        try {
            console.log(`🤖 Gemini Analysis - Attempt ${attempt}/${CONFIG.RETRY_ATTEMPTS}`);

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: CONFIG.AI_CONFIG,
                    safetySettings: CONFIG.SAFETY_SETTINGS
                })
            });

            if (!response.ok) {
                const error = await response.json();
                const errorMessage = error.error?.message || '';

                // Detect specific error types
                if (errorMessage.includes('quota') || errorMessage.includes('RESOURCE_EXHAUSTED')) {
                    throw new Error('🚫 API Quota Exceeded: Your Gemini API free tier limit has been reached. Please check your billing at https://ai.google.dev/');
                } else if (errorMessage.includes('API_KEY_INVALID') || errorMessage.includes('invalid')) {
                    throw new Error('🔑 Invalid API Key: Please check your Gemini API key in .env.local file.');
                } else if (response.status === 429) {
                    throw new Error('⏱️ Rate Limited: Too many requests. Please wait a moment and try again.');
                } else if (response.status === 503 || response.status === 500) {
                    // Server errors - retry
                    if (attempt < CONFIG.RETRY_ATTEMPTS) {
                        console.log(`⚠️ Server error, retrying...`);
                        throw new Error('RETRY'); // Special marker for retry
                    }
                    throw new Error('🔧 AI Service Temporarily Unavailable: Please try again in a few moments.');
                } else {
                    throw new Error(`❌ API Error: ${errorMessage || 'Unknown error occurred'}`);
                }
            }

            const data = await response.json();

            // Check if response has expected structure
            if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
                throw new Error('⚠️ Invalid Response: The AI returned an unexpected response format.');
            }

            const text = data.candidates[0].content.parts[0].text;

            // Robust JSON Parsing
            try {
                // Method 1: Direct Parse
                const parsed = JSON.parse(text);
                console.log('✅ Analysis Complete');
                return parsed;
            } catch (e) {
                // Method 2: Extract JSON block
                const jsonMatch = text.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const parsed = JSON.parse(jsonMatch[0]);
                    console.log('✅ Analysis Complete (extracted)');
                    return parsed;
                }

                // Method 3: Clean markdown code blocks
                const codeBlockMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
                if (codeBlockMatch) {
                    const parsed = JSON.parse(codeBlockMatch[1]);
                    console.log('✅ Analysis Complete (from code block)');
                    return parsed;
                }

                throw new Error("📊 Parse Error: AI response couldn't be processed. Please try again.");
            }

        } catch (error) {
            console.error(`❌ Attempt ${attempt} failed:`, error.message);

            // If it's the last attempt, throw the error
            if (attempt === CONFIG.RETRY_ATTEMPTS) {
                // Don't retry on quota or auth errors
                if (error.message.includes('Quota') || error.message.includes('Invalid API Key')) {
                    throw error;
                }
                throw new Error(error.message || '❌ Analysis Failed: Please try again later.');
            }

            // Only retry on server errors or network issues
            if (error.message === 'RETRY' || error.message.includes('fetch')) {
                const delay = CONFIG.RETRY_DELAY * Math.pow(2, attempt - 1); // Exponential backoff
                console.log(`⏳ Waiting ${delay}ms before retry...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                // Don't retry on other errors
                throw error;
            }
        }
    }
};
