import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, expect, test } from "vitest";
import { openDb, saveContact } from "./db";

const dirs: string[] = [];
afterEach(() => {
  for (const dir of dirs.splice(0)) rmSync(dir, { recursive: true, force: true });
});

test("writes a contact row to a SQLite file that persists", () => {
  const dir = mkdtempSync(join(tmpdir(), "contacts-"));
  dirs.push(dir);
  const path = join(dir, "nested", "test.db");
  const contact = { name: "Ada", email: "ada@example.com", company: "AE", message: "Hi" };

  const db = openDb(path);
  const id = saveContact(db, contact);
  db.close();

  const reopened = openDb(path);
  const rows = reopened.prepare("SELECT * FROM contacts").all();
  reopened.close();
  expect(rows).toHaveLength(1);
  expect(rows[0]).toMatchObject({ id, ...contact });
  expect(rows[0].created_at).toBeTruthy();
});

test("stores quotes and SQL text as plain data", () => {
  const db = openDb(":memory:");
  const message = "x'); DROP TABLE contacts;--";
  saveContact(db, { name: "A", email: "a@b.co", company: "C", message });
  saveContact(db, { name: "B", email: "b@b.co", company: "C", message });
  const rows = db.prepare("SELECT message FROM contacts ORDER BY id").all();
  expect(rows).toEqual([{ message }, { message }]);
});
