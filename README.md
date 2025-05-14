# Lawnstart coding challenge

A full-stack application to search for Star Wars movies and characters using [SWAPI API](https://swapi.tech/), view result lists, and explore detailed pages for each item.

---

## Tech Stack

### Frontend

- [React](https://reactjs.org/) for the UI
- [Vite](https://vitejs.dev/) for building
- [CSS Modules](https://github.com/css-modules/css-modules) for styling
- [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/) for routing
- [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/) for testing

### Backend

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/) for routing
- [SQLite](https://www.sqlite.org/index.html) as the DB (file based)
- [node-cron](https://www.npmjs.com/package/node-cron) to run the job

### DevOps

- [Docker](https://www.docker.com/get-started/)

---

## 🐳 Docker Setup

This project uses Docker Compose to spin up both the frontend and backend services.

## 📁 Folder Structure

```
root/
│
├── backend/
│   ├── database/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── jobs/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── constants.ts/
│   │   ├── index.ts/
│   │   └── types.ts/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package.json
│   └── package-lock.json
│   └── tsconfig.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │    ├── Button/
│   │   │    ├── ResultList/
│   │   │    ├── SearchForm/
│   │   │    └── Section/
│   │   ├── Layout/
│   │   ├── pages/
│   │   │    ├── Details/
│   │   │    └── Home/
│   │   ├── types.ts
│   │   ├── App.tsx
│   │   ├── constants.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── README.md
│   ├── test-setup.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.js
│   └── package.json
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Start the project

> Make sure you have Docker and Docker Compose installed.

### 1. Clone the repository:

```bash
git clone https://github.com/damian5/lawnstarterChallenge.git
cd lawnstarterChallenge
```

### 2. Start services

```bash
docker-compose up --build
```

> ⚠️ **Warning:** If you experience issues during Docker build, run `npm install` manually in `frontend/` and `backend/`, I could not figure out why there are some problems with node_modules and docker, VSCode won't show the node_modules and will show errors in the dependencies if npm i is not ran, duplicating the node_modules installation will make IntelliSense to not trhow errors.

```bash
root > cd frontend && npm i
root > cd backend && npm i
```

### 3. Access the app

Go to the browser and open `http://localhost:3000`

## 🧪 Frontend Testing

There is an example test provided in: `frontend/src/components/ResultList/ResultList.test.tsx`, run the following command to run the test:

```bash
cd frontend
npm run test
```

---

## Note

- The frontend communicates with the backend via the `VITE_API_URL` environment variable set in the `docker-compose.yml`.
- The DB is created locally inside `/backend/database`, to test the DB rehydratation, the file should be deleted

## TODO

- Add E2E testing
- Add more unit tests
- Look for a solution to get IntelliSense without duplicating the node_modules installation outside the Docker container

Created with ❤️ by Damian Lingua.
