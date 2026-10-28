# Vertical Systems landing page

The marketing site for Vertical Systems, a Vancouver, BC company that builds AI employees. It is a Next.js app with a dark, orange-accented home page, a contact form that saves to SQLite, and a booking calendar that opens as a pop-up.

## Requirements

- Node.js 22 or later (the app uses the built-in `node:sqlite` module).
- npm.

## Getting started

1. Install dependencies with `npm ci`.
2. Start the dev server with `npm run dev`, then open http://localhost:3000.
3. Build for production with `npm run build`, then run it with `npm start`.

## What the page does

- **Home page (`/`)** walks a visitor through the problem, the cost of leaving it unsolved, and how Vertical Systems solves it.
- **Case studies** are anonymized. They describe Fortune 500 workflows without naming the clients.
- **Contact form** asks for name, email, company and message. All four fields are required.
- **Booking calendar** opens in a pop-up on the page. It does not open a new tab. Close it with the × button, the Escape key, or a click outside the pop-up.

## Contact form and database

The form sends a `POST` to `/api/contact` as JSON. The server checks each field and saves valid submissions to a SQLite table named `contacts`.

| Field     | Required | Limit       | Notes                          |
| --------- | -------- | ----------- | ------------------------------ |
| `name`    | yes      | 200 chars   |                                |
| `email`   | yes      | 254 chars   | Must look like an email address |
| `company` | yes      | 200 chars   |                                |
| `message` | yes      | 5000 chars  |                                |

Responses:

- `201` with `{ "ok": true, "id": <number> }` when the message is saved. The page then shows a thank-you message.
- `400` with `{ "error": ..., "errors": ... }` when the JSON is invalid or a field is missing, too long, or not an email address.
- `500` when the message cannot be saved.

The database file defaults to `data/contacts.db`. Set `SQLITE_PATH` to use a different file. The folder is created if it does not exist. The `data/` folder is git-ignored, so submissions are never committed.

## Tests

- `npm test` runs the test suite once.
- `npm run test:ci` runs the same tests and checks that at least one test ran. The CI gate uses this command.

Put helper tests beside source files as `lib/*.test.ts`, and rendering tests as `app/*.test.tsx`. Add or update a test for every code change.

## Agent workflow

1. Install dependencies with `npm ci`.
2. Run the tests once with `npm test`; run the CI gate with `npm run test:ci`.
3. Put helper tests beside source files as `lib/*.test.ts` and rendering tests as `app/*.test.tsx`.
4. Add or update a test for every code change.
5. The required `test` check fails when it finds zero tests.
6. A person reviews and merges every pull request.
