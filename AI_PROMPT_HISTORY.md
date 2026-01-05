# AI Prompt History

Here is what I asked AI(ChatGPT and Claude) during this project and what I used from it.
I didn’t log every small prompt, only the important ones that changed the implementation.
Project: Eneba-like game listing (React + Vite) + Node/Express + SQLite.

I used AI like a helper: to get examples, fix bugs, and understand what I’m doing.
Then I edited and adjusted everything myself to match my project.

---

## 1) Make the UI look like Eneba (basic layout)

**Prompt**
- "Help me recreate an Eneba-like UI layout with a purple background, topbar, search input, and a responsive grid of game cards."

**What I used**
- CSS variables for colors, border, muted text.
- Layout: topbar + search + grid with cards.

---

## 2) Make cards look nice (image, badges, price block)

**Prompt**
- "How should I structure a game card component (cover image, platform/region badges, discount, cashback, price)?"

**What I used**
- `GameCard` component structure
- badges overlay on image
- price / cashback / discount display

---

## 3) Click on a card (whole card is a link)

**Prompt**
- "How to make the whole card clickable, not just text?"

**What I used**
- Wrap card in `<a class="cardLink" href="/game.html?id=...">`
- Keep styling so link doesn’t look like default blue underline

---

## 4) Hover effect (like real store cards)

**Prompt**
- "Add CSS smooth hover effects: card goes up a bit, shadow, and image zoom."

**What I used**
- CSS transitions for transform + shadow
- image scale on hover

---

## 5) Search without lag (debounce)

**Prompt**
- "Show a simple React hook for debounced search and fetch data only after user stops typing."

**What I used**
- `useDebouncedValue()`
- fetch inside `useEffect` using the debounced value

---

## 6) Loading skeleton (so page doesn’t feel empty)

**Prompt**
- "Give me a simple skeleton card with shimmer animation while loading."

**What I used**
- `SkeletonCard`
- shimmer CSS animation

---

## 7) “No results” state

**Prompt**
- "How to show a nice message when nothing is found?"

**What I used**
- `NoResults` component
- show it only when not loading + not error + items length is 0

---

## 8) Fix broken images (fallback)

**Prompt**
- "If an image URL fails, how do I show a placeholder instead?"

**What I used**
- `onError` handler on `<img>`
- fallback to `/game-placeholder.png`

---

## 9) Sorting by price (asc/desc) using one select

**Prompt**
- "Implement sorting in React using a single <select> (default / price asc / price desc) without changing backend."

**Applied**
- `sort` state
- `sortedItems = useMemo(...)` to sort a copy of items
- Default = show items as backend returned them

---

## 10) Mistake fix: code placed inside JSX breaks everything

**Prompt**
- "I added const sortedItems inside JSX by accident, why is it not working and where should it go?"

**Applied**
- Moved `const sortedItems = useMemo(...)` ABOVE the return
- JSX must contain only JSX, not random JS declarations

---

## 11) Game details page (game.html) from id param

**Prompt**
- "How do I create a simple game details page (static HTML) that reads id from query params and fetches data from backend?"

**Applied**
- `const id = new URLSearchParams(location.search).get("id")`
- render title/price/platform/region/cashback/discount
- fallback when id is missing

---

## 12) Backend endpoint for single game by id

**Prompt**
- "Add Express endpoint GET /api/games/:id that returns one game from SQLite."

**Applied**
- `db.get("SELECT * FROM games WHERE id = ?", [id])`
- 400 for bad id, 404 when not found

---

## 13) Debug: details page always says “Not found”

**Prompt**
- "List page works, but game.html always shows Not found. Why?"

**Applied**
- Real issue: frontend runs on `localhost:5173`, backend on `localhost:5174`
- Fix: in game.html use `API_BASE = "http://localhost:5174"`
- fetch like: `fetch(`${API_BASE}/api/games/${id}`)`

---

## 14) Small backend mistakes that break route

**Prompt**
- "My /api/games/:id route doesn’t work. What should I check?"

**Applied**
- Don’t duplicate the same route twice
- Make sure `const db = await getDb()` exists inside the handler
- Close DB when needed (depending on db wrapper)

---

## 15) General cleanup / “make it look real enough”

**Prompt**
- "Help me polish the UI a bit (spacing, buttons, small visual details) so it looks closer to Eneba."

**Applied**
- small button/icon styling
- spacing tweaks, max-width, nicer paddings

---

## Summary (how AI helped)

AI helped me with things I would probably get stuck on as a beginner:
- React patterns: debounce, loading states, useMemo sorting
- CSS polish: hover effects, skeleton shimmer
- Backend + SQLite: simple search queries + single item endpoint
- Debugging ports (5173 vs 5174) and why fetch returns Not found

Final integration and testing was done by me.
