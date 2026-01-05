# Eneba Clone (Static Demo)

A mini-clone of the Eneba interface: game list, search/filters, cards, and a separate game page.
The project is built as a **static site** and is deployed on **GitHub Pages**.

## Live Demo
👉 https://donetshlib.github.io/eneba-clonetest/

---

## Features
- Game catalog (cards)
- Search by name
- Sorting/filtering (if enabled in the UI)
- Game page: `game.html?id=<id>`
- Ready for GitHub Pages (`BASE_URL` is taken into account)

---

## Tech Stack
- React + Vite
- HTML/CSS/JS
- Data: static JSON (`client/public/games.json`)
- Deploy: GitHub Actions → GitHub Pages

---

## Data source
Data is taken from the file:

`client/public/games.json`

The front end reads it via `fetch()` (no server or database).

---

## Project structure (important)
- `client/` — frontend (Vite + React)
- `client/public/` — static files, accessible via URL on Pages
- `games.json`
- `game.html`
- `eneba-logo.png`
- `game-placeholder.png`
- `.github/workflows/pages.yml` — deploy to GitHub Pages

---

## Run locally

### Frontend
```bash
cd client
npm install
npm run dev
