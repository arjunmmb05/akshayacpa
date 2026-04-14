# Akshaya Website Setup & Deployment Guide

This guide describes how to configure, host, and manage the Akshaya Website, particularly for free deployment on Vercel.

## 1. Local Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
1. Open the source code directory in your terminal.
2. Run `npm install` to install all dependencies.
3. Run `npm run dev` to start the development server. The website will be available at `http://localhost:5173/`.

### Architecture Note
To ensure the website runs completely **free** and **securely** on Vercel's hobby tier, the application now uses a local-first browser storage mechanism (`localStorage`). 
- There is no need to host a separate Python backend or Database.
- All user reviews and site adaptations made by the Admin will securely persist for viewers using that browser instance.
- (If long-term persistence across all users is needed in the future, you can easily integrate a free tier of Firebase or Supabase by updating `src/lib/api.js`).

## 2. Deploying to Vercel (For Free)

Vercel is optimized for React/Vite applications and provides free hosting.

1. Create a free account at [Vercel.com](https://vercel.com/).
2. You can either:
   - **Use GitHub (Recommended)**: Push this code to a new GitHub repository, then in Vercel click "Add New... -> Project", select your GitHub repository, and click "Deploy". Vercel will auto-detect Vite and deploy it.
   - **Use Vercel CLI**: Install CLI (`npm i -g vercel`), open your terminal in this folder, and run `vercel`. Follow the prompts to deploy.
3. **Security**: We have configured a `vercel.json` file in the repository. It automatically secures your deployment using advanced HTTP security headers (XSS Protection, strict Frame-Options, etc.) and ensures React static routing works correctly.

## 3. How to Use the Admin Panel

The Admin Panel allows you to securely manage the website's content, approve details, and moderate User Reviews.

**Accessing the Panel:**
1. Navigate to your deployment URL and append `/admin/login` (e.g., `https://akshaya-website.vercel.app/admin/login`).
2. Log in using the secure credentials:
   - **Username**: `admin`
   - **Password**: `Akshaya@2024`

**Managing Content:**
- **Services Manager**: Add, edit, or delete the services you offer. 
- **User Reviews**: Newly submitted user reviews appear automatically. You can read them and click the red "Delete" (trash can) icon to remove fraudulent or inappropriate reviews.
- **Save Changes**: Always click the "Publish Updates" button at the top right to push your modifications live.

## 4. Manual Configuration Details
If you want to modify credentials or configurations:
- **Admin Password**: Found in `src/pages/AdminLogin.jsx`. Look for `ADMIN_USERNAME` and `ADMIN_PASSWORD` to change the default configurations.
- **Brand Identity**: Gradients and Typography are set in `src/index.css`.
- **API Connectivity**: If you decide to add a real backend database later, simply update the `src/lib/api.js` file to replace the `localStorage` mocking with fetch requests to your new Database URL.
