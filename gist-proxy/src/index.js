const GIST_ID  = '551d7ee7f903132853aed1b4466d0c3b';
const GIST_URL = 'https://api.github.com/gists/' + GIST_ID;

// Allowed file names — one per course, extend as new courses are added
const ALLOWED_FILES = new Set([
  'ga-history.json',
  'us-history.json',
  'eng-history.json',
  'refrigeration-ac.json',
]);

const DEFAULT_FILE = 'ga-history.json';

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
    if (!pat) {
      return new Response('GIST_PAT secret missing', { status: 500, headers: CORS });
    }

    // Resolve which gist file to target from ?file= query param
    const url      = new URL(request.url);
    const fileName = url.searchParams.get('file') || DEFAULT_FILE;
    if (!ALLOWED_FILES.has(fileName)) {
      return new Response('Unknown file: ' + fileName, { status: 400, headers: CORS });
    }

    const auth = {
      'Authorization': 'Bearer ' + pat,
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'gist-proxy/1.0'
    };

    if (request.method === 'GET') {
      const res = await fetch(GIST_URL, { headers: auth });
      if (!res.ok) {
        const text = await res.text();
        return new Response('GitHub error ' + res.status + ': ' + text, { status: 502, headers: CORS });
      }
      const gist = await res.json();
      const file = gist.files && gist.files[fileName];
      let data = {};
      if (file && file.content) {
        try {
          data = JSON.parse(file.content);
        } catch {
          return new Response('Gist file contains invalid JSON', { status: 502, headers: CORS });
        }
      }
      return new Response(JSON.stringify(data), { headers: { ...CORS, 'Content-Type': 'application/json' } });
    }

    if (request.method === 'POST') {
      const body    = await request.json();
      const payload = { files: { [fileName]: { content: JSON.stringify(body, null, 2) } } };
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
