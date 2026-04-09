# Auro Impex Catalogue

This is a standalone Next.js app for catalogue viewers with:

- username/password login
- protected catalogue list page
- backend API proxy routes for auth and items

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

```bash
cp .env.example .env.local
```

3. Set backend URL in `.env.local`:

```env
CATALOG_API_BASE_URL=http://localhost:3000
```

4. Start app:

```bash
npm run dev
```

## Routes

- `/login`: login page
- `/catalogue`: protected catalogue viewer

## Backend endpoints used

- `POST /catalogue-view/login`
- `GET /catalogue-view/items`
