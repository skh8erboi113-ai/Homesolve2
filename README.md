
# 🚀 HomeSolve - AI-Powered Foreclosure Solutions

HomeSolve is an AI-powered platform designed to bridge the gap between motivated homeowners facing foreclosure and professional real estate investors nationwide.

## 💰 How You Make Money
This platform uses a high-margin business model combining SaaS subscriptions and performance-based commissions:
- **1.5% Performance Fee**: Collected automatically on the final sale price of every property closed through the platform. (e.g., A $400k sale = $6,000 revenue).
- **Investor Subscriptions**: Pro investors pay **$199/month** for priority lead access and AI analytics.
- **Institutional API**: Custom licensing for high-volume hedge funds.

## 🏁 Post-Download Checklist

Follow these steps to make your application live on the web.

### 1. Extract and Initialize
- Unzip the downloaded file.
- Open your terminal in the project folder.
- Run `npm install` to sync all dependencies.

### 2. Gemini API Key
- Your API key is already configured in the `.env` file for local development.
- Key: `AIzaSyCCezm3Led09tcGvZo_R987kQwS-v2D_VE`

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
- **SECRET**: Under the "Environment Variables" section of the setup, add a secret named `GOOGLE_GENAI_API_KEY` with the value `AIzaSyCCezm3Led09tcGvZo_R987kQwS-v2D_VE`.

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router)
- **AI Engine**: Genkit + Google Gemini
- **Backend**: Firebase Firestore & Auth
- **UI**: Shadcn UI + Tailwind CSS
