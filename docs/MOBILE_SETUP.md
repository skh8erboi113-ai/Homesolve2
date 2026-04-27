# HomeSolve Mobile Deployment Guide

To deploy HomeSolve to the Google Play Store and Apple App Store, follow these steps.

## 1. Firebase Native Configuration
You must add native Android and iOS apps to your Firebase project to enable Auth and Firestore.

### Android
1. Go to **Firebase Console > Project Settings > General**.
2. Click **Add App** and select **Android**.
3. Use Package Name: `com.homesolve.app`.
4. Download `google-services.json` and place it in:
   `/android/app/google-services.json`

### iOS
1. Go to **Firebase Console > Project Settings > General**.
2. Click **Add App** and select **iOS**.
3. Use Bundle ID: `com.homesolve.app`.
4. Download `GoogleService-Info.plist` and place it in:
   `/ios/App/App/GoogleService-Info.plist` (Use Xcode to drag and drop it into the project).

## 2. Environment Variables
Ensure your `.env` file or CI/CD secrets include:
- `NEXT_PUBLIC_PROJECT_ID`: studio-4450623487-72853
- `GOOGLE_GENAI_API_KEY`: (Your Gemini Key)

## 3. Building for Mobile
Run these commands to sync your web changes to the native projects:

\`\`\`bash
# 1. Build the static site
npm run build

# 2. Sync to Capacitor
npx cap sync
\`\`\`

## 4. Opening Native Projects
- **Android**: \`npx cap open android\` (Requires Android Studio)
- **iOS**: \`npx cap open ios\` (Requires macOS and Xcode)

## 5. App Store Requirements
- **Account Deletion**: Already implemented in the Dashboard "Danger Zone".
- **Privacy Policy**: Available at \`/privacy\`.
- **Terms of Service**: Available at \`/terms\`.
