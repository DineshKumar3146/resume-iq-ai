// Utility file for PDF extraction
// using CDN script injection to avoid bundler issues with pdfjs-dist

const STABLE_VERSION = '3.11.174';

export const extractTextFromPDF = async (file) => {
    try {
        console.log(`📄 Processing PDF: ${file.name}`);

        if (typeof window === 'undefined') {
            throw new Error('PDF extraction runs on client side only');
        }

        // Dynamically load PDF.js from CDN if not already loaded
        if (!window.pdfjsLib) {
            console.log('📦 Loading PDF.js from CDN...');
            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${STABLE_VERSION}/pdf.min.js`;
                script.onload = () => {
                    console.log('✅ PDF.js loaded');
                    resolve();
                };
                script.onerror = () => reject(new Error('Failed to load PDF.js script from CDN'));
                document.head.appendChild(script);
            });
        }

        const pdfjsLib = window.pdfjsLib;
        // Ensure worker is set
        if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${STABLE_VERSION}/pdf.worker.min.js`;
        }

        const arrayBuffer = await file.arrayBuffer();

        // Load the document
        const loadingTask = pdfjsLib.getDocument({
            data: arrayBuffer,
            cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${STABLE_VERSION}/cmaps/`,
            cMapPacked: true,
            standardFontDataUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${STABLE_VERSION}/standard_fonts/`
        });

        const pdf = await loadingTask.promise;
        console.log(`📖 PDF Loaded: ${pdf.numPages} pages`);

        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();

            const pageText = textContent.items
                .map((item) => item.str)
                .join(' ');

            fullText += pageText + ' ';
        }

        // Clean up the text (remove excessive whitespace)
        const cleanedText = fullText.replace(/\s+/g, ' ').trim();
        console.log(`✅ Extraction Complete: ${cleanedText.length} chars`);

        return {
            success: true,
            text: cleanedText,
            pages: pdf.numPages
        };
    } catch (error) {
        console.error('❌ PDF Extraction Error:', error);

        let userMessage = 'Failed to read PDF file.';

        // Handle specific known errors
        if (error.name === 'MissingPDFException') {
            userMessage = 'The file appears to be invalid or empty.';
        } else if (error.name === 'PasswordException') {
            userMessage = 'Password protected PDFs are not supported.';
        } else if (error.message && error.message.includes('worker')) {
            userMessage = 'PDF engine failed to initialize. Please refresh the page.';
        }

        return {
            success: false,
            error: userMessage,
            details: error.message
        };
    }
};
