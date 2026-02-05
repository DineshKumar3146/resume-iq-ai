// Export utility for Resume IQ results - PDF Generation

export const exportToPDF = async (results, jobDetails, fileName) => {
    try {
        // Create a hidden iframe for PDF generation
        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = 'none';
        document.body.appendChild(iframe);

        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        // Create HTML content for PDF
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Resume Analysis Report</title>
    <style>
        @media print {
            @page {
                margin: 20mm;
                size: A4;
            }
            body {
                margin: 0;
                padding: 0;
            }
        }
        * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 30px;
            background: white;
            color: #1a202c;
            line-height: 1.6;
            font-size: 11pt;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #667eea;
            padding-bottom: 15px;
        }
        .header h1 {
            color: #667eea;
            font-size: 28pt;
            margin-bottom: 8px;
        }
        .header p {
            color: #718096;
            font-size: 10pt;
        }
        .job-info {
            background: #f7fafc;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            border-left: 4px solid #667eea;
        }
        .job-info h2 {
            color: #2d3748;
            font-size: 14pt;
            margin-bottom: 10px;
        }
        .job-info p {
            margin: 4px 0;
            color: #4a5568;
            font-size: 10pt;
        }
        .score-section {
            text-align: center;
            margin: 20px 0;
            padding: 25px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 12px;
        }
        .score-section h2 {
            font-size: 16pt;
            margin-bottom: 10px;
        }
        .score-value {
            font-size: 48pt;
            font-weight: bold;
            margin: 15px 0;
        }
        .section {
            margin: 20px 0;
            page-break-inside: avoid;
        }
        .section h3 {
            color: #2d3748;
            font-size: 14pt;
            margin-bottom: 12px;
            border-left: 4px solid #667eea;
            padding-left: 12px;
        }
        .score-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            margin: 15px 0;
        }
        .score-item {
            background: #f7fafc;
            padding: 12px;
            border-radius: 8px;
            border-left: 3px solid #667eea;
        }
        .score-item-label {
            font-weight: 600;
            color: #4a5568;
            margin-bottom: 6px;
            font-size: 10pt;
        }
        .score-item-value {
            font-size: 20pt;
            font-weight: bold;
            color: #667eea;
        }
        .keyword-list {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin: 12px 0;
        }
        .keyword {
            background: #e6fffa;
            color: #047857;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 9pt;
            border: 1px solid #10b981;
        }
        .keyword.missing {
            background: #fee;
            color: #991b1b;
            border: 1px solid #ef4444;
        }
        .list-item {
            margin: 8px 0;
            padding: 10px;
            background: #f7fafc;
            border-radius: 6px;
            border-left: 3px solid #667eea;
            font-size: 10pt;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            color: #718096;
            font-size: 9pt;
            border-top: 1px solid #e2e8f0;
            padding-top: 15px;
        }
        .two-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        .insight-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin: 12px 0;
        }
        .insight-box {
            background: #f7fafc;
            padding: 10px;
            border-radius: 6px;
            border-left: 3px solid #667eea;
        }
        .insight-label {
            font-size: 9pt;
            color: #718096;
            font-weight: 600;
            text-transform: uppercase;
        }
        .insight-value {
            font-size: 11pt;
            color: #2d3748;
            font-weight: 700;
            margin-top: 4px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📊 Resume Analysis Report</h1>
        <p>Generated by Resume IQ - Powered by Gemini 3.0 Flash</p>
        <p>${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
    </div>

    <div class="job-info">
        <h2>📋 Job Application Details</h2>
        <p><strong>Company:</strong> ${jobDetails.company || 'N/A'}</p>
        <p><strong>Position:</strong> ${jobDetails.title || 'N/A'}</p>
        <p><strong>Resume File:</strong> ${fileName || 'resume.pdf'}</p>
    </div>

    <div class="score-section">
        <h2>Overall Resume Score</h2>
        <div class="score-value">${Math.round(results.overallScore)}/100</div>
        <p style="font-size: 12pt; font-weight: 600;">${results.jobFit.toUpperCase()} FIT</p>
    </div>

    <div class="section">
        <h3>📈 Score Breakdown</h3>
        <div class="score-grid">
            ${Object.entries(results.scores).map(([key, value]) => `
                <div class="score-item">
                    <div class="score-item-label">${formatLabel(key)}</div>
                    <div class="score-item-value">${Math.round(value)}/100</div>
                </div>
            `).join('')}
        </div>
    </div>

    <div class="section">
        <h3>💼 Job Fit Analysis</h3>
        <div class="list-item">
            ${results.jobFitReason || 'No job fit analysis available.'}
        </div>
    </div>

    <div class="section">
        <h3>🔍 Keywords Analysis</h3>
        <div class="two-column">
            <div>
                <h4 style="margin: 0 0 8px; font-size: 11pt; color: #166534;">✅ Detected Keywords</h4>
                <div class="keyword-list">
                    ${results.detectedKeywords.slice(0, 20).map(kw => `<span class="keyword">${kw}</span>`).join('')}
                </div>
            </div>
            <div>
                <h4 style="margin: 0 0 8px; font-size: 11pt; color: #991b1b;">❌ Missing Keywords</h4>
                <div class="keyword-list">
                    ${results.missingKeywords && results.missingKeywords.length > 0
                ? results.missingKeywords.slice(0, 20).map(kw => `<span class="keyword missing">${kw}</span>`).join('')
                : '<p style="color: #718096; font-size: 10pt;">No critical keywords missing!</p>'}
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <h3>💡 Improvement Suggestions</h3>
        ${results.suggestions.map((suggestion, i) => `
            <div class="list-item">
                <strong>${i + 1}.</strong> ${suggestion}
            </div>
        `).join('')}
    </div>

    ${results.careerInsights ? `
    <div class="section">
        <h3>🎯 Career Insights</h3>
        <div class="insight-grid">
            <div class="insight-box">
                <div class="insight-label">Experience Level</div>
                <div class="insight-value">${results.careerInsights.experienceLevel || 'N/A'}</div>
            </div>
            <div class="insight-box">
                <div class="insight-label">Industry Alignment</div>
                <div class="insight-value">${results.careerInsights.industryAlignment || '0'}%</div>
            </div>
            <div class="insight-box">
                <div class="insight-label">Competitive Advantage</div>
                <div class="insight-value">${results.careerInsights.competitiveAdvantage || 'N/A'}</div>
            </div>
            <div class="insight-box">
                <div class="insight-label">💰 Salary Expectation</div>
                <div class="insight-value">${results.careerInsights.salaryExpectation || 'N/A'}</div>
            </div>
        </div>
        ${results.careerInsights.nextSteps && results.careerInsights.nextSteps.length > 0 ? `
        <div style="margin-top: 12px;">
            <h4 style="font-size: 11pt; margin-bottom: 8px;">📈 Next Steps:</h4>
            ${results.careerInsights.nextSteps.map((step, i) => `
                <div class="list-item">${i + 1}. ${step}</div>
            `).join('')}
        </div>
        ` : ''}
    </div>
    ` : ''}

    ${results.atsOptimization ? `
    <div class="section">
        <h3>🎯 ATS Optimization</h3>
        <div class="insight-grid">
            <div class="insight-box">
                <div class="insight-label">Keyword Density</div>
                <div class="insight-value">${(results.atsOptimization.keywordDensity || 'medium').toUpperCase()}</div>
            </div>
            <div class="insight-box">
                <div class="insight-label">Format Score</div>
                <div class="insight-value">${results.atsOptimization.formatScore || 0}/100</div>
            </div>
        </div>
        ${results.atsOptimization.improvementPriority && results.atsOptimization.improvementPriority.length > 0 ? `
        <div style="margin-top: 12px;">
            <h4 style="font-size: 11pt; margin-bottom: 8px;">Priority Improvements:</h4>
            ${results.atsOptimization.improvementPriority.map((priority, i) => `
                <div class="list-item">${i + 1}. ${priority}</div>
            `).join('')}
        </div>
        ` : ''}
    </div>
    ` : ''}

    <div class="footer">
        <p><strong>© 2026 Resume IQ - AI-Powered Resume Analysis</strong></p>
        <p>Powered by Gemini 3.0 Flash | This report is generated using advanced AI technology</p>
        <p>Contact: dk5222618@gmail.com | +91 9100427655</p>
    </div>
</body>
</html>
        `;

        // Write content to iframe
        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();

        // Wait for content to load
        await new Promise(resolve => setTimeout(resolve, 500));

        // Trigger print dialog (which allows saving as PDF)
        iframe.contentWindow.focus();
        iframe.contentWindow.print();

        // Clean up after a delay
        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 1000);

        return { success: true };
    } catch (error) {
        console.error('Export error:', error);
        return { success: false, error: error.message };
    }
};

// Helper function
function formatLabel(key) {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
}
