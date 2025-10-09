# Requirements to Market for Terminal3

This document outlines all the necessary services, accounts, API keys, and configurations required to deploy and run the Terminal3 application in a production environment.

## 1. Core Infrastructure

### Hosting & Deployment
- **Provider**: The application is configured to be deployed on Firebase App Hosting.
- **Build Command**: `npm run build`
- **Deployment**: Deployment can be managed through the Firebase CLI or automated via GitHub Actions connected to the Firebase project.

## 2. Firebase Project

A Firebase project is essential for the backend functionality of Terminal3.

### Required Services:
- **Firebase Authentication**: Must be enabled to manage user sign-up and login.
  - **Sign-in Provider**: `Google` must be enabled as a sign-in provider in the Firebase console.
- **Firestore Database**: Must be enabled to store user-specific data, such as saved notes.
  - **Security Rules**: The rules defined in `firestore.rules` are automatically deployed and must be active to secure user data. No manual action is required if the file is present.

### Configuration & Environment Variables:

The following environment variables must be set in a `.env.local` file (for local development) or in the hosting environment's secret manager for production.

These values can be found in your Firebase project settings under **Project settings > General > Your apps > SDK setup and configuration**.

```
NEXT_PUBLIC_FIREBASE_API_KEY="your_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_project_id.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_project_id.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
NEXT_PUBLIC_FIREBASE_APP_ID="your_app_id"
```

## 3. Generative AI Services (Google AI)

The application's AI features are powered by Google's Gemini models via Genkit.

### Required Services:
- **Google AI Studio API Key**: An API key for Google's Generative AI services is required.

### Configuration & Environment Variables:

The following environment variable must be set. You can obtain a key from [Google AI Studio](httpss://aistudio.google.com/app/apikey).

```
GEMINI_API_KEY="your_google_ai_api_key"
```
**Note**: This key is used by the server-side Genkit flows and should be kept secure.

## 4. Third-Party Accounts & Services

### Analytics
- **Vercel Analytics & Speed Insights**: The application includes components from Vercel for performance monitoring (`@vercel/analytics` and `@vercel/speed-insights`). While they will work without configuration, connecting your deployment to a Vercel account will provide a dashboard to view this data. This is optional.

## Summary of External Dependencies

- **Firebase Project**: For auth and database.
- **Google Account**: To enable Google Sign-in for Firebase Authentication.
- **Google AI Studio Account**: To obtain the `GEMINI_API_KEY` for AI features.
- **(Optional) Vercel Account**: For in-depth analytics.
