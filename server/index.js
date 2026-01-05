import express from "express";
import cors from "cors";
import { getDb } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.get("/list", async (req, res) => {
  const searchRaw = (req.query.search ?? "").toString().trim();
  const search = searchRaw.toLowerCase();

  const db = await getDb();
  try {
    let rows;
    if (!search) {
      rows = await db.all(`SELECT * FROM games ORDER BY title ASC, price_eur ASC`);
    } else {
      rows = await db.all(
        `SELECT * FROM games
         WHERE lower(title) LIKE '%' || ? || '%'
         ORDER BY
           CASE WHEN lower(title) = ? THEN 0 ELSE 1 END,
           price_eur ASC`,
        [search, search]
      );
    }
    res.json({ count: rows.length, items: rows });
  } finally {
    await db.close();
  }
});

app.get("/api/games/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "bad id" });

  const db = await getDb();
  try {
    const row = await db.get(`SELECT * FROM games WHERE id = ?`, [id]);
    if (!row) return res.status(404).json({ error: "not found" });
    res.json(row);
  } finally {
    await db.close();
  }
});

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
