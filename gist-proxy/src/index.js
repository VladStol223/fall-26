const GIST_ID   = '551d7ee7f903132853aed1b4466d0c3b';
const GIST_FILE = 'progress.json';
const GIST_URL  = `https://api.github.com/gists/${GIST_ID}`;

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    const auth = { Authorization: `Bearer ${env.GIST_PAT}`, Accept: 'application/vnd.github+json' };

    // GET /progress — read the gist and return just the JSON content
    if (request.method === 'GET') {
      const res  = await fetch(GIST_URL, { headers: auth, cache: 'no-store' });
      const gist = await res.json();
      const file = gist.files?.[GIST_FILE];
      const data = file ? JSON.parse(file.content) : {};
      return new Response(JSON.stringify(data), { headers: { ...CORS, 'Content-Type': 'application/json' } });
    }

    // POST /progress — receive JSON body and write it to the gist
    if (request.method === 'POST') {
      const body    = await request.json();
      const payload = { files: { [GIST_FILE]: { content: JSON.stringify(body, null, 2) } } };
      const res     = await fetch(GIST_URL, {
        method:  'PATCH',
        headers: { ...auth, 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });
      return new Response(res.ok ? 'ok' : 'error', { status: res.status, headers: CORS });
    }

    return new Response('Not found', { status: 404, headers: CORS });
  },
};
