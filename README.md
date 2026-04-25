# 🚀 HomeSolve - AI-Powered Foreclosure Solutions

HomeSolve is an AI-powered platform designed to bridge the gap between motivated homeowners facing foreclosure and professional real estate investors nationwide.

## 🏁 Post-Download Checklist

Follow these steps to make your application live on the web.

### 1. Extract and Initialize
- Unzip the downloaded file.
- Open your terminal in the project folder.
- Run `npm install` to sync all dependencies.

### 2. Get Your Gemini API Key
- Go to [Google AI Studio](https://aistudio.google.com/).
- Click **"Get API key"** in the sidebar.
- Click **"Create API key in new project"** and copy the key.
- For local development, create a `.env` file in the root and add: `GOOGLE_GENAI_API_KEY=your_key_here`

### 3. Create a GitHub Repository
- Go to [GitHub.com/new](https://github.com/new) and create a repo named `HomeSolve`.
- Follow the instructions to push your code:
  ```bash
  git init
  git add .
  git commit -m "Initial launch"
  git branch -M main
  git remote add origin https://github.com/YOUR_USERNAME/HomeSolve.git
  git push -u origin main
  ```

### 4. Deploy to Firebase App Hosting
- Open the [Firebase Console](https://console.firebase.google.com/).
- Select project: `studio-4450623487-72853`.
- **CRITICAL**: Upgrade your project to the **Blaze Plan**.
- Navigate to **Build > App Hosting**.
- Click **"Get Started"** and connect your GitHub account.
- Select the `HomeSolve` repository.
- **SECRET**: Under the "Environment Variables" section of the setup, add a secret named `GOOGLE_GENAI_API_KEY` with your Gemini API key value.

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router)
- **AI Engine**: Genkit + Google Gemini
- **Backend**: Firebase Firestore & Auth
- **UI**: Shadcn UI + Tailwind CSS

## 📈 Post-Launch Growth
Use the templates in `docs/marketing-templates.md` to drive traffic from LinkedIn and Facebook groups.
