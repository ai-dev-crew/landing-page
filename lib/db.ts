import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { DatabaseSync } from "node:sqlite";
import type { ContactInput } from "./contact-validation";

const DEFAULT_DB_PATH = "data/contacts.db";

let shared: DatabaseSync | undefined;

export function openDb(path: string): DatabaseSync {
  if (path !== ":memory:") mkdirSync(dirname(path), { recursive: true });
  const db = new DatabaseSync(path);
  db.exec(`CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);
  return db;
}

export function getDb(): DatabaseSync {
  shared ??= openDb(process.env.CONTACT_DB_PATH ?? DEFAULT_DB_PATH);
  return shared;
}

export function saveContact(db: DatabaseSync, contact: ContactInput): number {
  const result = db
    .prepare("INSERT INTO contacts (name, email, company, message) VALUES (?, ?, ?, ?)")
    .run(contact.name, contact.email, contact.company, contact.message);
  return Number(result.lastInsertRowid);
}
