
# 🚀 HomeSolve - Real Estate Foreclosure Solutions

HomeSolve is an AI-powered platform designed to bridge the gap between motivated homeowners facing foreclosure and professional real estate investors nationwide.

## 🏁 Post-Download Checklist

Once you download the ZIP file from Firebase Studio, follow these steps to make your application live.

### 1. Extract and Initialize
- Unzip the downloaded file on your computer.
- Open your terminal in the project folder.
- Run `npm install` to ensure all dependencies are perfectly synced.

### 2. Create a GitHub Repository
- Go to [GitHub.com/new](https://github.com/new).
- Name your repository `HomeSolve` (or your preferred name).
- **DO NOT** initialize with a README or .gitignore (the ZIP already provides these).
- Follow the instructions on GitHub to "push an existing repository from the command line":
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
- Navigate to **Build > App Hosting**.
- Click **"Get Started"** and connect your GitHub account.
- Select the `HomeSolve` repository you just created.
- Follow the prompts to set up the backend.

### 4. Secure Your AI Secret
- In the Firebase Console, go to your App Hosting backend settings.
- Under **Environment Variables / Secrets**, add a secret named `GOOGLE_GENAI_API_KEY`.
- Paste your Gemini API key there. This ensures your AI valuations and outreach tools work in production.

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router)
- **AI Engine**: Genkit + Google Gemini
- **Backend**: Firebase Firestore & Auth
- **UI**: Shadcn UI + Tailwind CSS

## 📈 Post-Launch Growth
Use the templates located in `docs/marketing-templates.md` to start driving traffic from LinkedIn and Facebook groups.

## 📄 License
This project is licensed under the MIT License.
