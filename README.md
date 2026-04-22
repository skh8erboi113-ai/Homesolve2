# 🚀 HomeSolve - Mobile Go-Live Manual

Follow these steps to confirm your launch and start your outreach.

## 🏁 Step 1: Verification
If you have already connected GitHub to Firebase App Hosting, your app is currently building.
1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Go to your project and select **Build > App Hosting**.
3. Check the **Status**. If it says "Success", click the **URL** provided to see your live site.
4. If it failed, check the logs—usually, it's a missing API key.

## 🔑 Step 2: Production Secrets (CRITICAL)
Your AI Valuation tool requires an API key to work in the cloud.
1. In the **App Hosting** dashboard, go to the **Settings** or **Secrets** tab.
2. Add a new secret named `GOOGLE_GENAI_API_KEY`.
3. Use the value: `AIzaSyApG0RXgao7nyU_YHyAWWGMWGg1TNwW-eo`.
4. Trigger a new rollout to apply this change.

## 🐙 Step 3: Refreshing Code
If you have made changes in the editor:
1. Tap the **Cloud Icon** (top right) to download the updated `.zip`.
2. Upload these new files to your GitHub repo. This will automatically trigger a fresh build in Firebase.

## 📣 Outreach Guide
Once the app is live, use the templates in `docs/marketing-templates.md` to drive free traffic from LinkedIn and Facebook groups.

---

## 📍 Your Production Link
*   **Main Site:** `https://studio-4450623487-72853.web.app`
