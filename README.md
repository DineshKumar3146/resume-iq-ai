# 🎯 Resume IQ - AI-Powered Resume Analysis

**A modern, intelligent resume analysis tool powered by Google's Gemini AI**

![Version](https://img.shields.io/badge/version-3.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![React](https://img.shields.io/badge/React-19.2.3-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### Core Analysis
- 🤖 **AI-Powered Analysis** - Advanced resume evaluation using **Gemini 3.0 Flash**
- 📊 **Comprehensive Scoring** - Multi-dimensional scoring (ATS, Skills, Experience, Content, Structure)
- 🎯 **Job Fit Assessment** - Intelligent matching against job descriptions
- 🔍 **Keyword Analysis** - Detect present and missing keywords
- 💡 **Actionable Suggestions** - Specific, practical improvement recommendations
- 💰 **Career Insights** - Salary expectations, experience level, competitive advantages

### 🚀 Enhanced Analysis Features (NEW!)
- 💪 **Skills Breakdown** - Separate hard skills (technical) vs soft skills (interpersonal) analysis
  - Proficiency level assessment
  - Evidence-based soft skills detection
  - Specific missing skills identification
  
- 📋 **Section-by-Section Analysis** - Deep dive into each resume section
  - Summary/Objective scoring and feedback
  - Work Experience quality analysis
  - Education section optimization
  - Skills section organization tips
  
- ✍️ **Linguistic & Writing Quality** - Professional writing analysis
  - Active voice percentage tracking
  - Weak phrase detection ("responsible for", "helped with")
  - Power word identification ("spearheaded", "architected")
  - Suggested phrase replacements
  - Readability and tone scoring
  
- 📚 **Personalized Learning Path** - Skill gap closure recommendations
  - Priority-based skill recommendations (Critical/High/Medium/Low)
  - Specific course suggestions with platforms (Coursera, Udemy, LinkedIn Learning)
  - Estimated learning time for each skill
  
- 🎤 **Interview Preparation** - AI-generated interview questions
  - General questions based on resume content
  - Technical challenges for claimed skills
  - Behavioral questions (STAR method)

### Additional Features
- 📄 **Export to PDF** - Professional PDF reports generated via print
- 📚 **History Tracking** - Save and revisit past analyses
- 🎨 **Modern UI** - Beautiful, responsive design with smooth animations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Google Gemini API key ([Get one here](https://ai.google.dev/))

### Installation

1. **Clone the repository**
   ```bash
   cd resume-iq-next
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Troubleshooting

### ❌ API Quota Exceeded Error

**Error Message:** `"You exceeded your current quota, please check your plan and billing details"`

**Solutions:**

1. **Check Your API Key**
   - Ensure your API key is valid and active
   - Verify it's correctly set in `.env.local`

2. **Upgrade Your Plan**
   - Free tier has limited requests per minute/day
   - Visit [Google AI Studio](https://ai.google.dev/) to check your quota
   - Consider upgrading to a paid plan for higher limits

3. **Wait and Retry**
   - Free tier quotas reset daily
   - Wait 24 hours and try again

4. **Get a New API Key**
   - Create a new project in [Google AI Studio](https://ai.google.dev/)
   - Generate a fresh API key
   - Update your `.env.local` file

### 🔑 How to Get a Gemini API Key

1. Visit [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Click "Get API Key"
4. Create a new API key
5. Copy the key and paste it in `.env.local`

### 🐛 Other Common Issues

**Issue:** PDF not uploading
- **Solution:** Ensure file is a valid PDF and under 25MB

**Issue:** Analysis taking too long
- **Solution:** Check your internet connection and API quota

**Issue:** Results not displaying
- **Solution:** Check browser console for errors, refresh the page

## 📖 Usage Guide

### Step 1: Upload Resume
- Click the upload box or drag & drop your PDF resume
- Maximum file size: 25MB
- Only PDF format supported

### Step 2: Enter Job Details
- **Company Name:** Target company (e.g., "Google")
- **Job Title:** Position you're applying for (e.g., "Senior Software Engineer")
- **Job Description:** Paste the full job posting

### Step 3: Analyze
- Click "Analyze Resume"
- Wait for AI processing (15-30 seconds)
- View comprehensive results

### Step 4: Review & Export
- Review your scores and suggestions
- Click "Download Report" to save results
- Implement suggested improvements

## 🎨 Features in Detail

### Overall Score (0-100)
Weighted average of all scoring categories

### Score Breakdown
- **ATS Compatibility:** How well your resume passes Applicant Tracking Systems
- **Skills Match:** Alignment with job requirements
- **Experience Relevance:** Years and type of experience
- **Content Quality:** Impact statements and achievements
- **Structure:** Organization and readability

### Career Insights
- Experience level classification
- Industry alignment percentage
- Competitive advantages
- Salary expectations
- Next career steps

### ATS Optimization
- Keyword density analysis
- Format score
- Improvement priorities

## 🛠️ Technology Stack
- **Framework:** Next.js 16.1.6
- **UI Library:** React 19.2.3
- **AI Model:** Google Gemini 3.0 Flash
- **PDF Processing:** PDF.js 3.11.174
- **Styling:** Vanilla CSS with CSS Variables
- **State Management:** React Hooks
- **Storage:** LocalStorage for history

## 📁 Project Structure

```
resume-iq-next/
├── app/
│   ├── page.js          # Main application page
│   ├── globals.css      # Global styles
│   └── layout.js        # Root layout
├── components/
│   ├── Navbar.js        # Navigation component
│   ├── ResultsView.js   # Results display
│   └── HistoryView.js   # History management
├── utils/
│   ├── gemini.js        # Gemini AI integration
│   ├── pdf.js           # PDF text extraction
│   └── export.js        # Report export utility
├── public/              # Static assets
├── .env.local          # Environment variables (create this)
└── package.json        # Dependencies
```

## 🔒 Security & Privacy

- **API Key Security:** API key is stored in environment variables
- **No Data Storage:** Resume content is not stored on any server
- **Client-Side Processing:** All processing happens in your browser
- **Local History:** Analysis history stored only in browser localStorage

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variable: `NEXT_PUBLIC_GEMINI_API_KEY`
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Import project in [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variable in Netlify dashboard

## 📊 API Rate Limits

**Gemini API Free Tier:**
- 15 requests per minute
- 1,500 requests per day
- 1 million tokens per minute

**Recommendations:**
- Use responsibly to stay within limits
- Consider paid tier for production use
- Implement caching for repeated analyses

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Dinesh Kumar**
- 📧 Email: dk5222618@gmail.com
- 📱 Phone: +91 9100427655

## 🙏 Acknowledgments

- Google Gemini AI for powerful language models
- Next.js team for the amazing framework
- PDF.js for PDF processing capabilities

## 📈 Roadmap

### ✅ Recently Completed (v3.1.0)
- [x] Hard vs. Soft Skills Breakdown
- [x] Section-by-Section Analysis
- [x] Linguistic & Writing Quality Analysis
- [x] Personalized Learning Resources
- [x] AI-Generated Interview Questions

### 🔜 Coming Soon
- [ ] Multi-language support
- [ ] Resume templates
- [ ] Cover letter analysis
- [ ] LinkedIn profile optimization
- [ ] Before/After comparison view
- [ ] Resume version tracking with trend charts
- [ ] Competitor benchmarking ("Top 10% of applicants")

---

**Made with ❤️ using Next.js and Gemini AI**

For issues or questions, please open an issue on GitHub or contact the developer.
