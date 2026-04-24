
# 🚀 HomeSolve - AI-Powered Foreclosure Solutions

HomeSolve is an AI-powered platform designed to bridge the gap between motivated homeowners facing foreclosure and professional real estate investors nationwide.

## 🏁 Post-Download Checklist

Once you download the ZIP file from Firebase Studio, follow these steps to make your application live.

### 1. Extract and Initialize
- Unzip the downloaded file on your computer.
- Open your terminal in the project folder.
- Run `npm install` to ensure all dependencies are perfectly synced.

### 2. Create a GitHub Repository
- Go to [GitHub.com/new](https://github.com/new).
- Name your repository `HomeSolve`.
- **DO NOT** initialize with a README or .gitignore.
- Follow the instructions on GitHub to push your local code:
  ```bash
  git init
  git add .
  git commit -m "Initial launch"
  git branch -M main
  git remote add origin https://github.com/YOUR_USERNAME/HomeSolve.git
  git push -u origin main
  ```

### 3. Deploy to Firebase App Hosting
- Open the [Firebase Console](https://console.firebase.google.com/).
- **CRITICAL**: Upgrade your project to the **Blaze Plan** (pay-as-you-go).
- Navigate to **Build > App Hosting**.
- Click **"Get Started"** and connect your GitHub account.
- Select the repository you just created.
- In the configuration step, ensure you add an **Environment Variable/Secret** named `GOOGLE_GENAI_API_KEY` with your Gemini API key value.

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router)
- **AI Engine**: Genkit + Google Gemini
- **Backend**: Firebase Firestore & Auth
- **UI**: Shadcn UI + Tailwind CSS

## 📈 Post-Launch Growth
Use the templates located in `docs/marketing-templates.md` to start driving traffic from LinkedIn and Facebook groups.
