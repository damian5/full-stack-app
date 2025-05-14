import sqlite3 from "sqlite3";
import { open } from "sqlite";

sqlite3.verbose();

// TODO: Throw an error if the env is undefined
export const db = await open({
  filename: `${process.env.SQLITE_DB_PATH}/query.db`,
  driver: sqlite3.Database
});

await db.exec(`
  CREATE TABLE IF NOT EXISTS films (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    opening_crawl TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS people (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    gender TEXT,
    eye_color TEXT,
    hair_color TEXT,
    height INTEGER,
    mass INTEGER,
    birth_year TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS film_people (
    film_id TEXT NOT NULL,
    person_id TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (film_id, person_id),
    FOREIGN KEY (film_id) REFERENCES films(id),
    FOREIGN KEY (person_id) REFERENCES people(id)
  );

  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    query TEXT,
    request_time INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS statistics (
    id TEXT PRIMARY KEY,
    top_queries TEXT,
    avg_request_duration INTEGER,
    popular_hour INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);