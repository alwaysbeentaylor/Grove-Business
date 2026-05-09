# Grove Business — Luxury Car Rental Showcase

Premium showcase site + lightweight admin panel for Grove Business, built to deploy
on **Vercel** with serverless functions and Vercel Blob storage.

- **Public site** — `index.html` · dark + gold luxury styling, 3 languages (EN / PT / NL),
  scroll-triggered racing-car streak, hero mouse-parallax, dynamic fleet & contact info.
- **Admin** — `/admin` · password-protected. Edit fleet, prices, photos, hero copy,
  about copy, and all contact details (WhatsApp, phone, email, location, address).

---

## Deploying to Vercel

### 1. Push the code

The repo is already wired up — just push to GitHub and import it on Vercel.

### 2. Add Vercel Blob storage (free)

In the Vercel dashboard for this project:

1. **Storage → Create database → Blob**
2. Click *Connect to Project*
   Vercel automatically injects the `BLOB_READ_WRITE_TOKEN` env var.

This is what the admin uses to save fleet data, the contact config, and uploaded
photos. Free tier is 1 GB storage + 1 GB bandwidth — easily enough for this site.

### 3. Add a session secret

In *Settings → Environment Variables* add:

| Name             | Value                              |
|------------------|------------------------------------|
| `SESSION_SECRET` | any long random string (32+ chars) |

Generate one with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Without this set, admin sessions still work but use a hard-coded fallback secret.
**Always set it in production.**

### 4. Redeploy

Vercel rebuilds automatically on each push. After the first deploy with the env vars
in place, visit:

- **`/`** — the public showcase site
- **`/admin`** — admin panel (default password: `grove2026`)

Change the password from the *Account* tab on first login.

---

## Local development

```bash
npm install
npx vercel dev
```

You'll need a `.env.local` with the same env vars listed above, plus `vercel link`
the project so the local CLI can talk to your Blob storage.

If you only want to preview the **public** site without the backend, just open
`index.html` directly — the page degrades gracefully and shows the seed fleet
hard-coded in HTML.

---

## What the cousin can change from `/admin`

| Tab            | What he can edit                                                                       |
|----------------|----------------------------------------------------------------------------------------|
| **Fleet**      | Add / edit / re-order / delete cars. Upload photos (drag & drop) or paste image URLs.  |
| **Hero & About** | Eyebrow, headline, subtitle and background image of the hero. Title + paragraphs + image of the About section. Leave any field blank to keep the default copy. |
| **Contact**    | WhatsApp number, display phone, email, service area, full address, hours, currency.    |
| **Account**    | Change his admin password.                                                             |

All changes go live immediately — no rebuild required.

---

## Adding the logo

Drop the Grove Business logo as **`logo.png`** in the project root. It appears in
the navigation, the footer, and the admin header. Square or round both work
(it gets cropped to 32–42 px circles).

---

## File structure

```
.
├── index.html             # public showcase
├── styles.css             # premium dark+gold theme
├── script.js              # i18n + interactions + race-car
├── logo.png               # (you add this)
│
├── admin/
│   └── index.html         # admin SPA (login + dashboard)
│
├── api/
│   ├── _lib.js            # shared: Blob helpers, scrypt auth, signed cookies
│   ├── auth.js            # /api/auth — login/logout/me/change-password
│   ├── fleet.js           # /api/fleet — GET (public) / POST (admin)
│   ├── config.js          # /api/config — GET (public) / POST (admin)
│   └── upload.js          # /api/upload — issues signed tokens for client-direct
│                          #   uploads to Vercel Blob (bypasses 4.5 MB body limit)
│
├── package.json
├── vercel.json
└── .gitignore
```

---

## Tech notes

- Pure vanilla JS on the front-end — no build step, no framework.
- Serverless functions are Node 18+ ES modules, only dependency is `@vercel/blob`.
- Auth is HMAC-signed cookies (7-day session) + scrypt password hashing.
  No database — admin password hash is stored as a JSON blob.
- Image uploads use `@vercel/blob`'s client-direct flow so files go straight from
  the browser to Blob storage. Works around Vercel's 4.5 MB function body limit.
- All gold/copper accents use a single CSS gradient variable, so re-themeing is a
  one-line change in `:root` of `styles.css`.

Built with care · 2026
