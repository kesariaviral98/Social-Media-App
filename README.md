# Social Media App

Full-stack social media project with a React + Vite frontend and an Express + Sequelize backend.

## Project Structure

- `frontend/social_media`: React client
- `backend`: Express API, Sequelize models, and migrations

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router
- Backend: Express, Sequelize, MySQL, JWT

## Local Setup

### 1. Install dependencies

From the repo root:

```bash
npm install
cd backend && npm install
cd ../frontend/social_media && npm install
```

### 2. Configure environment variables

Create a `.env` file for the backend with values like:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret
DB_HOST=localhost
DB_PORT=3306
DB_NAME=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
DB_DIALECT=mysql
```

Create a `.env` file in `frontend/social_media` with:

```env
VITE_API_BASE_URL=http://localhost:5000
```

### 3. Run the app

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend/social_media
npm run dev
```

## Available Scripts

Backend:

- `npm run dev`: start backend with nodemon
- `npm start`: start backend with node

Frontend:

- `npm run dev`: start Vite dev server
- `npm run build`: build production assets
- `npm run lint`: run ESLint
- `npm run preview`: preview production build

## API Notes

- Health check: `GET /health`
- Auth routes are mounted under `/api`
- Post routes are mounted under `/api/posts`

## GitHub Without Affecting GitLab

This repo already uses GitLab as `origin`. To keep that unchanged, add GitHub as a second remote.

Check current remotes:

```bash
git remote -v
```

Add GitHub as a new remote:

```bash
git remote add github git@github.com:YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
```

Push to GitHub without changing GitLab:

```bash
git push -u github main
```

If your default branch is `master` instead of `main`, use:

```bash
git push -u github master
```

After that:

- `git push origin <branch>` continues pushing to GitLab
- `git push github <branch>` pushes to GitHub

If you want both remotes available, do not run `git remote remove origin` or `git remote set-url origin ...`
