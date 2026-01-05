import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function getDb() {
  const db = await open({
    filename: "./games.db",
    driver: sqlite3.Database
  });

  await db.exec("PRAGMA foreign_keys = ON;");
  return db;
}
