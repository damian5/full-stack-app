```
root/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── jobs/
│   │   ├── models/
│   │   └── index.ts
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.tsx
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

docker-compose up --build

src/
├── components/
│ ├── SearchForm/
│ │ ├── SearchForm.tsx
│ │ └── SearchForm.module.css
│ ├── ResultsList/
│ │ ├── ResultsList.tsx
│ │ └── ResultsList.module.css
│ └── ResultItem/
│ ├── ResultItem.tsx
│ └── ResultItem.module.css
├── pages/
│ └── Home.tsx
│ └── Home.module.css 👈 este archivo es el que preguntás
├── App.tsx
└── index.css
