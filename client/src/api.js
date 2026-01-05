// client/src/api.js  (test branch)

export async function fetchGames(search) {
  const base = import.meta.env.BASE_URL; // на Pages будет "/eneba-clone/"

  const res = await fetch(`${base}games.json`);
  if (!res.ok) throw new Error("Failed to load games.json");

  const data = await res.json(); // { count, items }
  let items = data.items ?? [];

  const q = (search ?? "").trim().toLowerCase();
  if (q) {
    items = items.filter(g =>
      (g.title ?? "").toLowerCase().includes(q)
    );
  }

  return { count: items.length, items };
}
