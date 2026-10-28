# Vertical Systems landing page

A Next.js landing page for Vertical Systems, an AI agency that builds AI employees. The page explains the services, shows case studies, takes contact form messages and links to a booking calendar.

## Features

- **Home page** with a short introduction and a "Book a 30-minute call" button that opens the booking calendar in a new tab.
- **Case studies** of how AI employees and multi-agent systems changed the workflows of large companies. The client names are withheld, and the figures are illustrative examples, not audited results.
- **Contact form** with four required fields: name, email, company and message. Each field is checked in the browser and again on the server.
- **Local storage of messages.** Each valid form submission is saved as a row in a SQLite database file.

## Run it locally

1. Install dependencies with `npm ci`.
2. Start the development server with `npm run dev`, then open http://localhost:3000.
3. Submitted messages are saved to `data/contacts.db`. The `data/` folder is created on the first submission and is not committed to git.

To save messages somewhere else, set `CONTACT_DB_PATH` to a file path before you start the server:

```sh
CONTACT_DB_PATH=/path/to/contacts.db npm run dev
```

## API

### `POST /api/contact`

Saves one contact message.

Request body (JSON):

| Field     | Required | Limit                          |
| --------- | -------- | ------------------------------ |
| `name`    | yes      | 100 characters                 |
| `email`   | yes      | 254 characters, must be an email address |
| `company` | yes      | 100 characters                 |
| `message` | yes      | 5000 characters                |

Values are trimmed before they are checked and saved.

Responses:

- `201` with `{ "ok": true, "id": <number> }` when the message is saved.
- `400` with `{ "errors": { <field>: <message> } }` when a field is missing or invalid.
- `400` with `{ "error": "Body must be valid JSON" }` when the body is not JSON.
- `500` with `{ "error": "Could not save your message" }` when the database write fails.

## Agent workflow

1. Install dependencies with `npm ci`.
2. Run the tests once with `npm test`; run the CI gate with `npm run test:ci`.
3. Put helper tests beside source files as `lib/*.test.ts` and rendering tests as `app/*.test.tsx`.
4. Add or update a test for every code change.
5. The required `test` check fails when it finds zero tests.
6. A person reviews and merges every pull request.
