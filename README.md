# Image Search Application

This is a full-stack web application that allows users to search for images, view their search history, and select multiple images.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)

## Features

- Image search functionality
- Multi-select images with a counter
- User search history
- Google, Facebook, and GitHub OAuth for authentication

## Technologies Used

**Frontend:**
- React
- Vite
- CSS

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- Passport.js (Google, Facebook, GitHub strategies)
- Unsplash API

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   cd image-search-app
   ```

2. **Install frontend dependencies:**

   ```bash
   cd client
   npm install
   cd ..
   ```

3. **Install backend dependencies:**

   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Set up environment variables:**

   Create a `.env` file in the `server` directory and populate it with the necessary variables (see [Environment Variables](#environment-variables) section).

5. **Run the frontend:**

   ```bash
   cd client
   npm run dev
   ```

   The frontend will typically run on `http://localhost:5174`.

6. **Run the backend:**

   ```bash
   cd server
   npm start
   ```

   The backend will typically run on `http://localhost:5000`.

## Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```
MONGO_URI=mongodb://localhost:27017/mern_oauth_project
UNSPLASH_ACCESS_KEY=YOUR_UNSPLASH_ACCESS_KEY
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
FACEBOOK_APP_ID=YOUR_FACEBOOK_APP_ID
FACEBOOK_APP_SECRET=YOUR_FACEBOOK_APP_SECRET
GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET
SESSION_SECRET=YOUR_SESSION_SECRET
```

- **`MONGO_URI`**: Your MongoDB connection string.
- **`UNSPLASH_ACCESS_KEY`**: Your access key for the Unsplash API. Obtain it from [Unsplash Developers](https://unsplash.com/developers).
- **`GOOGLE_CLIENT_ID`**, **`GOOGLE_CLIENT_SECRET`**: Credentials for Google OAuth. Obtain them from [Google Cloud Console](https://console.developers.google.com/).
  - Authorized JavaScript origins: `http://localhost:5174`
  - Authorized redirect URIs: `http://localhost:5000/auth/google/callback`
- **`FACEBOOK_APP_ID`**, **`FACEBOOK_APP_SECRET`**: Credentials for Facebook OAuth. Obtain them from [Facebook for Developers](https://developers.facebook.com/).
  - Valid OAuth Redirect URIs: `http://localhost:5000/auth/facebook/callback`
- **`GITHUB_CLIENT_ID`**, **`GITHUB_CLIENT_SECRET`**: Credentials for GitHub OAuth. Obtain them from [GitHub Developer Settings](https://github.com/settings/developers).
  - Authorization callback URL: `http://localhost:5000/auth/github/callback`
- **`SESSION_SECRET`**: A long, random string used to sign the session ID cookie. You can generate one using a tool or simply type a long random string.

## Folder Structure

```
.editorconfig
.gitignore
client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ImageSearch.jsx
│   │   ├── MultiSelectCounter.jsx
│   │   └── SearchHistory.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── ... (other client files)
server/
├── config/
│   ├── db.js
│   └── passport.js
├── models/
│   ├── SearchTerm.js
│   └── User.js
├── routes/
│   ├── auth.js
│   └── search.js
├── .env
├── index.js
├── package.json
└── ... (other server files)
```

## API Endpoints

**Authentication:**
- `GET /auth/google` - Initiate Google OAuth
- `GET /auth/google/callback` - Google OAuth callback
- `GET /auth/facebook` - Initiate Facebook OAuth
- `GET /auth/facebook/callback` - Facebook OAuth callback
- `GET /auth/github` - Initiate GitHub OAuth
- `GET /auth/github/callback` - GitHub OAuth callback
- `GET /auth/logout` - Logout user
- `GET /auth/current_user` - Get current logged-in user

**Image Search & History:**
- `GET /api/search?query=<search_term>` - Search for images using Unsplash API and save search term to history.
- `GET /api/history` - Get user's search history.
