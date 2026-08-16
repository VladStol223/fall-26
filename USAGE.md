# Fall '26 — Study Hub

Interactive study guides with Anki-style flashcards, per-card progress tracking, and cross-device sync via GitHub Gist.

---

## Project structure

```
school/
  index.html                        # Homepage — course cards + progress overview
  module.html                       # Single dynamic renderer — loaded for every module
  GLRs/
    GA History/
      Module 7/
        Module 7.md                 # Raw source notes
        module-7.json               # Module data (overview, learn sections, anki cards)
      Module 8/
        Module 8.md
        module-8.json
    US History/                     # Empty — ready for future modules
  gist-proxy/
    src/index.js                    # Cloudflare Worker — proxies reads/writes to GitHub Gist
```

---

## Adding a new module

1. Create a directory: `GLRs/<Course Name>/Module N/`
2. Drop in `module-N.json` following the schema below
3. Add one line to the `MODULES` array in `module.html`:
   ```js
   { id: 'ga-history-mN', course: 'GA History', num: N, label: 'Module Title',
     file: 'GLRs/GA History/Module N/module-N.json', gistFile: 'ga-history.json' }
   ```
4. That's it — the sidebar, renderer, and Anki mode all pick it up automatically.

### module-N.json schema

```json
{
  "id": "ga-history-mN",
  "course": "GA History",
  "courseColor": "blue",
  "moduleNumber": 9,
  "title": "Short Title",
  "subtitle": "Subtitle shown in the header",
  "storagePrefix": "mN",
  "totalCards": 30,

  "overview": {
    "stats": [
      { "value": "1865", "label": "Year something happened" }
    ],
    "people": [
      { "name": "Person Name", "desc": "Why they matter." }
    ],
    "dates": [
      { "year": "1865", "event": "Something happened" }
    ],
    "terms": [
      { "term": "Term", "def": "Definition" }
    ]
  },

  "learn": [
    {
      "title": "1 — Section Title",
      "body": "<p>HTML content. Use <mark>highlighted text</mark> for key terms.</p>"
    }
  ],

  "anki": [
    { "q": "Question?", "a": "Answer." },
    { "key": true, "q": "Important question?", "a": "Answer." }
  ]
}
```

`"key": true` marks a card as high-priority. Key cards appear **twice** in every shuffled session and are tracked separately in the stats row.

---

## Adding a new class

1. Create `GLRs/<New Class>/` and add modules following the steps above
2. Add a new file name to `ALLOWED_FILES` in `gist-proxy/src/index.js`:
   ```js
   const ALLOWED_FILES = new Set([
     'ga-history.json',
     'us-history.json',
     'new-class.json',   // ← add this
   ]);
   ```
3. Set `gistFile: 'new-class.json'` on the new modules in `module.html`
4. Deploy the worker (see below)

Each class gets its own isolated file in the Gist — no cross-contamination between courses.

---

## Deploying the Cloudflare Worker

The worker proxies Gist reads/writes so the GitHub PAT stays server-side.

```sh
cd gist-proxy
$env:CLOUDFLARE_API_TOKEN='<your token>'; npx wrangler deploy
```

Run this any time `gist-proxy/src/index.js` changes (e.g. adding a new class file).

### Worker endpoints

| Method | URL | Description |
|--------|-----|-------------|
| `GET`  | `/progress?file=ga-history.json` | Read the class progress file from Gist |
| `POST` | `/progress?file=ga-history.json` | Write updated progress back to Gist |

---

## Progress sync (Gist)

Progress is saved in two places:

- **localStorage** — immediate, per-browser. Used on every card flip.
- **GitHub Gist** — synced every 30 seconds and on page unload. Enables cross-device resume.

### Gist data shape

Each class file (`ga-history.json`) holds per-card history keyed by module id:

```json
{
  "ga-history-m7": {
    "Who founded Hartsfield-Jackson Airport and in what year?": {
      "good": 3,
      "again": 1,
      "times": [4, 2, 6]
    }
  },
  "ga-history-m8": {
    "When did CNN launch?": {
      "good": 5,
      "again": 0,
      "times": [3, 2, 2, 1, 2]
    }
  }
}
```

On load, local and remote histories are **merged** — whichever version of a card has more total reviews wins.
