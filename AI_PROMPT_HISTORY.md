## AI Prompt History (Publishing the project for free)

This part covers the AI prompts I used when I wanted to publish the project **for free** so it can be opened by a link, and what changes were needed to make it work on **GitHub Pages**.

---

### 1) “How can I publish it for free and open by a link?”

**Prompt**

* “How can I publish my project for free so anyone can open it by a link?”

**What I used / Decision**

* Chose **GitHub Pages** as the simplest free option for a frontend demo.
* Important limitation: Pages is a **static hosting** platform → backend (Node/Express/SQLite) won’t run there.
* Solution for demo: switch to **static data** (JSON) instead of a database/API.

---

### 2) “How do I deploy to GitHub Pages and what do I need to change?”

**Prompt**

* “How do I deploy this to GitHub Pages? What will I have to change in my code?”

**What I changed**

* Added correct **Vite base path** for Pages:

  * `vite.config.js → base: "/<repo-name>/"`.
* Updated links and assets so they work under `/repo-name/`:

  * use `import.meta.env.BASE_URL` in React for URLs.
* Replaced backend usage with static JSON:

  * data source: `client/public/games.json`
  * fetch that file from frontend.

---

### 3) Deploy setup: GitHub Actions workflow for Pages

**Prompt**

* “Give me a working GitHub Actions workflow to build Vite and deploy to GitHub Pages.”

**What I used**

* Created `.github/workflows/pages.yml`:

  * install deps in `client/`
  * `npm run build`
  * upload `client/dist`
  * deploy via `actions/deploy-pages@v4`

---

### 4) Debug: deploy fails because of branch/environment rules

**Prompt**

* “My workflow runs but deploy fails / says branch is not allowed.”

**What I used**

* Fixed deployment rules by deploying from the correct branch (usually `main`).
* If a branch is blocked by Pages environment protection → move work into a new repo or merge to allowed branch.

---

### 5) Fix routing: card links must work on Pages

**Prompt**

* “My cards should open a separate game page by id (`game.html?id=...`) and it must work on Pages.”

**What I used**

* Build link using base URL:

  * `const base = import.meta.env.BASE_URL;`
  * `const href = \`${base}game.html?id=${g.id}`;`
* Wrap the whole card with `<a className="cardLink" href={href}>`.

---

### 6) Fix images: placeholders and assets must work under `eneba-clonetest`

**Prompt**

* “Images work locally but break on Pages. How do I make fallback and static assets work?”

**What I used**

* Use base URL for placeholder:

  * `const placeholder = \`${base}game-placeholder.png`;`
* In `onError`, replace image source with `placeholder`.

---

### 7) Convert `game.html` to static mode (no API)

**Prompt**

* “Make the details page work without backend: read id from URL and load info from `games.json`.”

**What I used**

* Read id:

  * `new URLSearchParams(location.search).get("id")`
* Load data:

  * `fetch("./games.json")` (relative path works on Pages)
* Find item in JSON and render it.
* Add fallback states:

  * “No id provided” / “Game not found”.

---

### Notes (difference vs backend version)

* Original version: **Express + SQLite + endpoints**
* Pages version: **Static demo**

  * data from JSON
  * deploy on GitHub Pages
  * no server/database
