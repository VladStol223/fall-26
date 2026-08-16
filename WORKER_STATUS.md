# Cloudflare Worker — Debug Notes

## Status: Fixed (2026-08-16)

## What was actually happening

The Worker code was structurally correct all along:
- `User-Agent: gist-proxy/1.0` was already present on the outbound fetch
- `Authorization: Bearer <pat>` format was correct
- `res.ok` was already checked before calling `.json()` on the GitHub response

**The real crash site was line 36 — not the fetch:**

```js
const data = file ? JSON.parse(file.content) : {};
```

`file.content` is the raw string content of the Gist file. If that string was ever
written with invalid JSON, was empty, or was truncated, `JSON.parse()` throws an
uncaught `SyntaxError`. That exception bubbled up through the Worker → Cloudflare
showed the generic 1101 page.

The `"Unexpected token 'R'"` in the error log was the first character of the
*Gist file contents* (e.g. a previous bad write that stored a plain-text error
message starting with "Request..."), not a GitHub 403 body reaching the parser.

## What the WAF hypothesis got wrong

Cloudflare error 1101 = **Worker threw a JavaScript exception**. It is not an
edge-level block before Worker code runs. The Worker was executing fully;
it just crashed on the unguarded `JSON.parse()` call.

"Request forbidden by administrative rules" is GitHub's own 403 body (missing
User-Agent) — but that path was already guarded by `res.ok`. The crash was
happening inside the success path, on a previously-corrupted Gist file.

## Fix applied

Wrapped `JSON.parse(file.content)` in a try/catch in `gist-proxy/src/index.js`.
If the Gist file contains invalid JSON, the worker now returns a clean 502 with
a descriptive message instead of throwing an uncaught exception.

## Previous attempted fixes (and why they didn't help)

1. Deployed worker with `GIST_PAT` secret → 1101 (crash was in parse, not auth)
2. Confirmed new PAT works from Node.js → correct, PAT was never the issue
3. Removed `cache: 'no-store'` → unrelated
4. Added `User-Agent` header → already present; also unrelated to the real crash
5. Deleted and re-added secret + redeployed → unrelated
6. Added `res.ok` guard → was already there; crash was downstream of that guard

## Deploy

```sh
cd gist-proxy && npx wrangler deploy
```
