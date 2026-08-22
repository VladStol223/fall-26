# Livi's Wish List — Full Setup Documentation

How this project was built, end to end. Every file, command, and decision.

---

## Architecture

```
Browser (GitHub Pages — livi.list repo)
  │
  ├─ GET  https://gist-proxy.vlad-stol223.workers.dev/progress   → reads Gist → returns JSON
  ├─ POST https://gist-proxy.vlad-stol223.workers.dev/progress   → writes JSON → updates Gist
  └─ GET  https://gist-proxy.vlad-stol223.workers.dev/og?url=... → fetches og:image from product URL
                │
        Cloudflare Worker  (gist-proxy)
        holds GIST_PAT as a secret — never in source code
                │
        GitHub Gist API
        api.github.com/gists/7b44b22bea74e5b33238c0d3734beaf5
                │
        livi-list.json  (the live state file)
```

---

## Step 1 — GitHub Gist

1. Go to **https://gist.github.com**
2. Create a **secret** gist
3. Name the file exactly: `livi-list.json`
4. Set the content to: `{}`
5. Save — copy the **Gist ID** from the URL

```
https://gist.github.com/VladStol223/7b44b22bea74e5b33238c0d3734beaf5
                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                    this is the Gist ID
```

**Gist ID used:** `7b44b22bea74e5b33238c0d3734beaf5`

The Gist stores all live state as a single JSON object:

```json
{
  "bought":  { "gift-id": true },
  "starred": { "gift-id": true },
  "flagged": { "gift-id": "out-of-stock" },
  "gifts":   [ { ...gifts added via the owner panel } ]
}
```

---

## Step 2 — GitHub Personal Access Token (PAT)

1. Go to **https://github.com/settings/tokens**
2. Click **Generate new token (classic)**
3. Name it anything (e.g. `livi-list`)
4. Check **only** the `gist` scope
5. Generate and copy — you won't see it again

> The `gist` scope covers both creating and editing gists via the API.
> The PAT only shows as "used" once the Worker actually makes a live call to GitHub.

**PAT used:** `ghp_REDACTED` *(stored as Cloudflare secret — never put real value here)*
> ⚠️ Never commit this to a public repo — GitHub auto-revokes it instantly.

---

## Step 3 — Cloudflare API Token

1. Go to **https://dash.cloudflare.com** → profile icon → **My Profile** → **API Tokens**
2. Click **Create Token**
3. Use the **"Edit Cloudflare Workers"** template
4. Click **Continue to summary** → **Create Token**
5. Copy the token (starts with `cfut_...`)

Also note your **workers.dev subdomain** — found in Dash → Workers & Pages → Account Details.

**Subdomain used:** `vlad-stol223.workers.dev`
**Cloudflare token used:** `cfut_YOUR_CLOUDFLARE_TOKEN`

---

## Step 4 — Cloudflare Worker

### 4a — Create the project

```sh
mkdir gist-proxy
cd gist-proxy
npm init -y
npm install --save-dev wrangler
mkdir src
```

### 4b — wrangler.toml

```toml
name = "gist-proxy"
main = "src/index.js"
compatibility_date = "2024-01-01"
workers_dev = true
```

### 4c — src/index.js

The worker handles three routes:

| Route | Method | What it does |
|---|---|---|
| `/progress` | GET | Reads `livi-list.json` from the Gist, returns parsed JSON |
| `/progress` | POST | Writes the POSTed JSON body back to the Gist |
| `/og?url=...` | GET | Fetches the target URL server-side, extracts `og:image` or `twitter:image`, returns `{ image: "..." }` or 204 |

The OG image route is needed because browsers can't fetch third-party pages directly due to CORS. The worker fetches the HTML, regex-matches the meta tag, and returns just the image URL.

```js
const GIST_ID   = '7b44b22bea74e5b33238c0d3734beaf5';
const GIST_FILE = 'livi-list.json';
const GIST_URL  = 'https://api.github.com/gists/' + GIST_ID;
// ... full source in gist-proxy/src/index.js
```

### 4d — Deploy

```powershell
# From inside the gist-proxy/ directory:
$env:CLOUDFLARE_API_TOKEN='cfut_YOUR_CLOUDFLARE_TOKEN'
npx wrangler deploy
```

Output:
```
Uploaded gist-proxy
Deployed gist-proxy triggers
  https://gist-proxy.vlad-stol223.workers.dev
```

### 4e — Add the GitHub PAT as a secret

```powershell
echo 'ghp_YOUR_PAT_HERE' | npx wrangler secret put GIST_PAT
npx wrangler deploy
```

The secret is stored encrypted in Cloudflare — it never appears in source code.

### 4f — Test the worker

```sh
# Should return {}
node -e "fetch('https://gist-proxy.vlad-stol223.workers.dev/progress').then(r=>r.json()).then(console.log)"

# Test a write
node -e "fetch('https://gist-proxy.vlad-stol223.workers.dev/progress',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({test:1})}).then(r=>r.text()).then(console.log)"
```

---

## Step 5 — GitHub Pages (the frontend)

### 5a — Repo

**Repo:** `https://github.com/VladStol223/livi.list`

### 5b — Init and push

```sh
# From the Gist-List folder:
git init
git add index.html
git commit -m "Initial gift list — all features"
git branch -M main
git remote add origin https://github.com/VladStol223/livi.list.git
git push -u origin main
```

### 5c — Enable GitHub Pages

1. Go to the repo on GitHub
2. **Settings** → **Pages**
3. Source: **Deploy from a branch**
4. Branch: `main` / folder: `/ (root)` → **Save**
5. Wait ~60 seconds — the site goes live at:

```
https://vladstol223.github.io/livi.list/
```

---

## Step 6 — index.html key config

Two constants at the top of the `<script>` block control everything:

```js
const WORKER_URL = 'https://gist-proxy.vlad-stol223.workers.dev/progress';
const OWNER_PASS = 'livilove';  // plain-text in HTML — intentionally simple
```

- `WORKER_URL` — points to the Cloudflare Worker. The `/og` route is derived from this automatically (`WORKER_URL.replace('/progress', '/og')`).
- `OWNER_PASS` — password for the owner panel (🔑 button). Session-persisted via `sessionStorage` so you don't have to re-enter on every refresh.

---

## Future redeployment

If you ever need to update the Worker code:

```powershell
cd gist-proxy
$env:CLOUDFLARE_API_TOKEN='cfut_YOUR_CLOUDFLARE_TOKEN'
npx wrangler deploy
```

To rotate the GitHub PAT:
```powershell
echo 'ghp_NEW_TOKEN_HERE' | npx wrangler secret put GIST_PAT
npx wrangler deploy
```

To push frontend changes:
```sh
git add index.html
git commit -m "your message"
git push
```
GitHub Pages redeploys automatically within ~60 seconds of every push to `main`.

---

## Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| Worker returns `GIST_PAT secret missing` | Secret wasn't added or didn't propagate | Re-run `wrangler secret put GIST_PAT`, then redeploy |
| GitHub returns 403 `Request forbidden` | PAT was revoked (pushed to public repo) | Generate a new PAT, re-run secret put, redeploy |
| Gist returns invalid JSON | File got corrupted | Open the Gist, reset `livi-list.json` to `{}` |
| OG images never load | Retailer blocks server-side fetches | Expected — the emoji placeholder shows instead. Amazon, Target, Sephora, etc. all block bots. |
| Gifts added via owner panel disappear on refresh | `_remote: true` flag missing | Gifts added through the UI panel have this flag automatically — only hardcoded `GIFTS` array items lack it |
| Worker 1101 error | JS exception in Worker | Check Cloudflare Dashboard → Workers → gist-proxy → Observability logs |
| Pages site shows old version | CDN cache | Hard refresh (`Ctrl+Shift+R`) or wait ~2 min |

---

## ⚠️ Important: This Worker is Shared — Other Projects Need Their Own

The `gist-proxy` worker deployed at `gist-proxy.vlad-stol223.workers.dev` is **hardcoded** to
livi-list's Gist ID and `livi-list.json`. Any other GitHub Pages project (e.g. **fall-26**) that
previously used this same worker URL **broke the moment this worker was deployed**, because the
new code replaced the old code entirely — pointing all `/progress` reads/writes at livi's Gist
instead of the other project's `progress.json`.

> **Rule:** one Cloudflare Worker per project. Each gets its own name, its own Gist ID, and its own
> `/progress` URL. They can all share the same Cloudflare account and the same PAT secret.

---

## Fixing a Broken Sibling Project (e.g. fall-26)

### Step 1 — Confirm the broken project's Gist ID

Open **[gist.github.com/VladStol223](https://gist.github.com/VladStol223)** and find the gist that
belongs to the other project (e.g. the one containing `progress.json`). Copy the Gist ID from the URL.

---

### Step 2 — Scaffold a new worker folder

Run these from anywhere on your machine (outside this repo):

```powershell
mkdir gist-proxy-fall26
cd gist-proxy-fall26
npm init -y
npm install --save-dev wrangler
mkdir src
```

---

### Step 3 — Create `wrangler.toml`

```toml
name = "gist-proxy-fall26"
main = "src/index.js"
compatibility_date = "2024-01-01"
workers_dev = true
```

The `name` field is what becomes the subdomain — `gist-proxy-fall26.vlad-stol223.workers.dev`.
Pick any name you like, just keep it unique within your Cloudflare account.

---

### Step 4 — Create `src/index.js`

Replace `YOUR_GIST_ID_HERE` with the Gist ID from Step 1:

```js
const GIST_ID   = 'YOUR_GIST_ID_HERE';   // ← fall-26's gist ID
const GIST_FILE = 'progress.json';        // ← whatever the file is named in that gist
const GIST_URL  = 'https://api.github.com/gists/' + GIST_ID;

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    const pat = env.GIST_PAT;
    if (!pat) return new Response('GIST_PAT secret missing', { status: 500, headers: CORS });

    const auth = {
      'Authorization': 'Bearer ' + pat,
      'Accept':        'application/vnd.github+json',
      'User-Agent':    'gist-proxy/1.0',
    };

    if (request.method === 'GET') {
      const res = await fetch(GIST_URL, { headers: auth });
      if (!res.ok) {
        const text = await res.text();
        return new Response('GitHub error ' + res.status + ': ' + text, { status: 502, headers: CORS });
      }
      const gist = await res.json();
      const file = gist.files && gist.files[GIST_FILE];
      let data = {};
      if (file && file.content) {
        try { data = JSON.parse(file.content); }
        catch { return new Response('Gist contains invalid JSON', { status: 502, headers: CORS }); }
      }
      return new Response(JSON.stringify(data), {
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    if (request.method === 'POST') {
      const body    = await request.json();
      const payload = { files: { [GIST_FILE]: { content: JSON.stringify(body, null, 2) } } };
      const res = await fetch(GIST_URL, {
        method:  'PATCH',
        headers: { ...auth, 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        return new Response('GitHub error ' + res.status + ': ' + text, { status: 502, headers: CORS });
      }
      return new Response('ok', { status: 200, headers: CORS });
    }

    return new Response('Not found', { status: 404, headers: CORS });
  },
};
```

---

### Step 5 — Deploy the new worker

```powershell
# From inside the gist-proxy-fall26/ folder:
$env:CLOUDFLARE_API_TOKEN='cfut_YOUR_CLOUDFLARE_TOKEN'
npx wrangler deploy
```

You'll see:
```
Uploaded gist-proxy-fall26
Deployed gist-proxy-fall26 triggers
  https://gist-proxy-fall26.vlad-stol223.workers.dev
```

---

### Step 6 — Add the GitHub PAT as a secret

You can reuse the same PAT that livi-list uses — the `gist` scope covers all your gists.

```powershell
$env:CLOUDFLARE_API_TOKEN='cfut_YOUR_CLOUDFLARE_TOKEN'
echo 'ghp_YOUR_PAT_HERE' | npx wrangler secret put GIST_PAT
npx wrangler deploy
```

> If the original PAT was revoked (GitHub auto-revokes tokens that get pushed to public repos),
> generate a new one at [github.com/settings/tokens](https://github.com/settings/tokens) with only
> the `gist` scope checked. Then store it as the secret and redeploy.

---

### Step 7 — Test

```powershell
# Should return {} (or the saved progress data if the gist already has content)
node -e "fetch('https://gist-proxy-fall26.vlad-stol223.workers.dev/progress').then(r=>r.json()).then(console.log)"
```

---

### Step 8 — Update the fall-26 site

In fall-26's `index.html`, find the `WORKER_URL` constant and update it to the new worker URL:

```js
// Before (broken — was pointing at the shared livi-list worker):
const WORKER_URL = 'https://gist-proxy.vlad-stol223.workers.dev/progress';

// After (fixed — its own dedicated worker):
const WORKER_URL = 'https://gist-proxy-fall26.vlad-stol223.workers.dev/progress';
```

Commit and push — GitHub Pages redeploys within ~60 seconds.

---

### Step 9 — Verify on another machine

Open `https://vladstol223.github.io/fall-26/` in a private/incognito window or a different device.
The progress data should load correctly from the new worker.
