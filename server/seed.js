import { getDb } from "./db.js";

const games = [
  { title: "FIFA 23", platform: "PC", region: "GLOBAL", price_eur: 18.99, image_url: "https://upload.wikimedia.org/wikipedia/en/a/a6/FIFA_23_Cover.jpg", cashback_eur: 0.45, discount_percent: 52 },
  { title: "Red Dead Redemption 2", platform: "PC", region: "GLOBAL", price_eur: 16.49, image_url: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg", cashback_eur: 0.35, discount_percent: 67 },
  { title: "Split Fiction", platform: "PC", region: "EUROPE", price_eur: 34.14, image_url: "https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Split_Fiction_cover_art.jpg/250px-Split_Fiction_cover_art.jpg", cashback_eur: 0.78, discount_percent: 32 },

  { title: "Split Fiction", platform: "Xbox", region: "GLOBAL", price_eur: 35.15, image_url: "https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Split_Fiction_cover_art.jpg/250px-Split_Fiction_cover_art.jpg", cashback_eur: 0.87, discount_percent: 30 },
  { title: "Split Fiction", platform: "Nintendo Switch", region: "EUROPE", price_eur: 36.25, image_url: "https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Split_Fiction_cover_art.jpg/250px-Split_Fiction_cover_art.jpg", cashback_eur: 1.27, discount_percent: 28 },
  { title: "Split Fiction", platform: "PS5", region: "EUROPE", price_eur: 33.99, image_url: "https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Split_Fiction_cover_art.jpg/250px-Split_Fiction_cover_art.jpg", cashback_eur: 0.64, discount_percent: 34 },

  { title: "FIFA 23", platform: "PS4", region: "EUROPE", price_eur: 19.49, image_url: "https://upload.wikimedia.org/wikipedia/en/a/a6/FIFA_23_Cover.jpg", cashback_eur: 0.40, discount_percent: 50 },
  { title: "FIFA 23", platform: "Xbox", region: "GLOBAL", price_eur: 17.99, image_url: "https://upload.wikimedia.org/wikipedia/en/a/a6/FIFA_23_Cover.jpg", cashback_eur: 0.38, discount_percent: 55 },

  { title: "Red Dead Redemption 2", platform: "PS4", region: "EUROPE", price_eur: 15.99, image_url: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg", cashback_eur: 0.31, discount_percent: 70 },
  { title: "Red Dead Redemption 2", platform: "Xbox", region: "EUROPE", price_eur: 14.49, image_url: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg", cashback_eur: 0.28, discount_percent: 73 },

  { title: "Split Fiction", platform: "PC", region: "GLOBAL", price_eur: 40.93, image_url: "https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Split_Fiction_cover_art.jpg/250px-Split_Fiction_cover_art.jpg", cashback_eur: 4.50, discount_percent: 18 },
  { title: "Split Fiction", platform: "PC", region: "GLOBAL", price_eur: 39.90, image_url: "https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Split_Fiction_cover_art.jpg/250px-Split_Fiction_cover_art.jpg", cashback_eur: 1.10, discount_percent: 20 }
];

async function main() {
  const db = await getDb();

  await db.exec(`
    DROP TABLE IF EXISTS games;

    CREATE TABLE games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      platform TEXT NOT NULL,
      region TEXT NOT NULL,
      price_eur REAL NOT NULL,
      image_url TEXT NOT NULL,
      cashback_eur REAL DEFAULT 0,
      discount_percent INTEGER DEFAULT 0
    );

    CREATE INDEX idx_games_title ON games(title);
  `);

  const stmt = await db.prepare(`
    INSERT INTO games (title, platform, region, price_eur, image_url, cashback_eur, discount_percent)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  for (const g of games) {
    await stmt.run(g.title, g.platform, g.region, g.price_eur, g.image_url, g.cashback_eur ?? 0, g.discount_percent ?? 0);
  }

  await stmt.finalize();
  await db.close();

  console.log("Seed complete. Inserted:", games.length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
