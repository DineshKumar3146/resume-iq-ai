import { Inter } from "next/font/google";
import "./globals.css";

// Configure the Inter font to match your original design
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Resume IQ - AI-Powered Resume Analyzer",
  description: "Track your job applications and get AI-powered resume feedback instantly with Gemini 3.0.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
