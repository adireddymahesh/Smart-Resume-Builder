# Smart Resume Builder - Project Documentation

## 1. Project Overview
**Smart Resume Builder** is a modern, AI-powered web application designed to help users create professional, ATS-optimized resumes and cover letters. Built with **Next.js 16** and **Firebase**, it provides a seamless experience for building, enhancing, and managing job application documents.

---

## 2. Technology Stack

### Frontend
*   **Framework**: [Next.js 16](https://nextjs.org/) (React 19)
*   **Language**: TypeScript
*   **Styling**: 
    *   [Tailwind CSS v4](https://tailwindcss.com/)
    *   **Radix UI** (Headless accessible components)
    *   `lucide-react` (Icons)
    *   `framer-motion` (Animations)
*   **State Management**: React Context (`ResumeContext`, `AuthContext`)

### Backend & Database
*   **Platform**: [Firebase](https://firebase.google.com/)
    *   **Authentication**: Email/Password logic, Google Sign-in (configured in `src/lib/firebase.js`).
    *   **Firestore**: NoSQL database for storing user profiles and resume data (`users/{uid}/resumes/{resumeId}`).
    *   **Storage**: Firebase Storage (initialized for file handling).

### Artificial Intelligence
*   **Provider**: **Google Gemini**
*   **SDK**: `@google/generative-ai`
*   **Model**: `gemini-3-flash-preview`
*   **Key Functions** (located in `src/lib/gemini.ts`):
    *   Resume Enhancement (Rewriting content)
    *   ATS Analysis (Scoring and feedback)
    *   Skill Extraction
    *   Cover Letter Generation

### Utilities & Tools
*   **PDF Generation**: `react-to-print` (DOM-to-PDF), `@react-pdf/renderer`.
*   **Document Handling**: `docx` (Word generation), `pdfjs-dist`.
*   **Date Handling**: `date-fns`.

---

## 3. Key Features & How They Work

### A. Resume Builder (`/builder`)
**Functionality**: 
A dynamic, interactive editor where users input their details and see a real-time preview of their resume.

**How it works**:
1.  **State Management**: The app uses `ResumeContext` to hold the resume data structure (Personal Info, Experience, Education, Skills, etc.).
2.  **Forms**: Users fill out forms (e.g., `experienceForm`, `educationForm`) which immediately update the global state.
3.  **Persistence**: Changes are saved to **Firebase Firestore** automatically or via a manual "Save" button to `users/{uid}/resumes/{id}`.
4.  **Templates**: Users can switch between templates (Modern, Professional, Elegant, Creative). The `ResumePreview` component dynamically renders the selected template using the current data.
5.  **Export**: The "Export PDF" button uses `react-to-print` to capture the rendered resume preview and convert it into a downloadable PDF file.

### B. AI Resume Enhancer
**Functionality**:
A "Enhance with AI" button that automatically rewrites resume content to be more professional and impactful.

**How it works**:
1.  **Trigger**: User clicks the "Enhance with AI" button in the builder.
2.  **Process**: The app sends the current resume JSON to the **Gemini API** with a prompt to:
    *   Rewrite the professional summary to be "punchy".
    *   Convert experience descriptions into bullet points with strong action verbs.
    *   Quantify results where possible.
3.  **Result**: The AI returns a JSON object with the improved text, which merges into the application state.

### C. ATS Score Checker
**Functionality**:
Analyzes the resume for compatibility with Applicant Tracking Systems (ATS).

**How it works (Hybrid Approach)**:
1.  **Local Analysis** (`src/lib/ats-scorer.ts`):
    *   Runs fast Regex checks on the client side.
    *   **Checks**: Contact info (Email, Phone, LinkedIn), Section Headers, Action Verbs (e.g., "Led", "Developed"), Word Count, and Quantifiable metrics.
    *   **Score**: specific weightage (e.g., +10 for Email, +15 for 5+ Action Verbs).
2.  **AI Analysis** (`src/lib/gemini.ts`):
    *   Can perform a deeper semantic analysis using Gemini.
    *   Evaluates "Parsing", "Keywords", and "Impact" on a 0-100 scale.
    *   Returns actionable feedback (e.g., "Missing 'Skills' section header").

### D. Cover Letter Generator
**Functionality**:
Creates a tailored cover letter based on the user's resume and a specific job description.

**How it works**:
1.  **Input**: Takes the user's resume text and the target Job Description (JD).
2.  **Generation**: Sends both to Gemini with a prompt to "Write a compelling cover letter... matching skills from the resume that fit the job description."
3.  **Tone**: Users can likely specify a tone (e.g., Professional, Bold).

### E. Dashboard & User Management
**Functionality**:
Where users log in, view their saved resumes, and create new ones.

**How it works**:
*   **Auth**: Handled via Firebase Auth. Protected routes ensure only logged-in users can access the dashboard or builder.
*   **Data Fetching**: Queries Firestore for all documents under `users/{currentUser.uid}/resumes` to display a list of projects.

---

## 4. API & Data Structure
**Resume Data Model (TypeScript Interface)**:
```typescript
interface ResumeData {
  id: string;
  title: string;
  templateId: 'modern' | 'professional' | 'elegant' | 'creative';
  themeColor: string;
  profile: {
    fullName: string;
    email: string;
    phone: string;
    // ...
  };
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  // ...
}
```

---

## 5. Future Updates / Roadmap
Based on the current codebase structure, these are potential or in-progress features:

1.  **Job Keyword Scanner** (`src/app/keywords`): Feature to scan a specific Job Description and suggest keywords to add to the resume.
2.  **Advanced Templates**: Adding more design options to the template library.
3.  **Public Profile/Share Link**: Allowing users to generate a public link to their resume.
4.  **Download as DOCX**: Implementation of `docx` library is present in dependencies, enabling Word document downloads.

---

## 6. Project Reference
*   **Root Directory**: `g:\Nikhilesh\Resume_builder_2\`
*   **Source Code**: `src/`
*   **Configuration**: `package.json`, `firebase.json` (if present), `next.config.ts`.
