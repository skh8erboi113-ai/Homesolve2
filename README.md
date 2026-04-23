# 🚀 HomeSolve - Real Estate Foreclosure Solutions

HomeSolve is an AI-powered platform designed to bridge the gap between motivated homeowners facing foreclosure and professional real estate investors.

## 🌟 Features

- **AI Quick-Sale Valuation**: Instant, realistic market estimates tailored for distressed properties.
- **Vetted Investor Network**: Secure marketplace connecting sellers with verified cash buyers.
- **Anonymous Messaging**: Secure communication channel for negotiations.
- **AI Outreach Kit**: Automated marketing content generation for social media.
- **Nationwide Coverage**: Operating across all 50 U.S. states.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Backend/Auth**: Firebase (Firestore & Authentication)
- **AI Engine**: Genkit with Google Gemini

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Firebase CLI
- Google Gemini API Key

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd homesolve
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root and add your keys:
   ```env
   GOOGLE_GENAI_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## 📦 Deployment to Firebase App Hosting

1. **GitHub Bridge**: Upload your code to a GitHub repository.
2. **Firebase Console**:
   - Go to [Firebase Console](https://console.firebase.google.com/).
   - Select **Build > App Hosting**.
   - Connect your GitHub repository.
3. **Secrets**: 
   - Under the App Hosting settings, add a secret named `GOOGLE_GENAI_API_KEY`.
   - Use your Gemini API key as the value.
4. **Rollout**: Trigger a new rollout to deploy.

## 📄 License

This project is licensed under the MIT License.
