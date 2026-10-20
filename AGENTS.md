# Working in this repo (Base44 sandbox)

## What this project is

A **static site** — hand-written HTML/CSS/JS plus assets. No package manager, no
build step, no backend, no database, no environment variables required to run.

- `index.html` is the main DJ app; the other `*.html` files at the root are
  separate pages/views (`superapp.html`, `kali.html`, `pro8-*`, `wedj.html`, …).
- `js/` holds the app logic, `css/` the styles, `libs/` bundles
  (butterchurn/MilkDrop), `data/`, `samples/`, `downloads/`, `icons/`, `img/` are
  static assets.
- `dxf/` is an older self-contained copy of the same site (its own `index.html`).
  It is reachable at `/dxf/`. Do not mirror root changes into it unless asked.

## Running it

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

- One service, `web` (nginx, `restart: on-failure`), serving the working tree
  read-only on host port **3000** → `http://localhost:3000/`.
- `docker/nginx.base44.conf` is the sandbox-only server config (the repo has none
  of its own). It mirrors the offline `/api/*` JSON payload that `js/d7-token.js`
  returns on static hosting, because **no `/api` backend exists in this repo** —
  the app is designed to degrade to local/offline behaviour. Do not treat the
  empty `/api` responses as a bug in the sandbox.
- `docker/nginx.base44-main.conf` replaces `/etc/nginx/nginx.conf` only to set
  `user root`. **Quirk:** the sandbox checkout lives on a root-owned `0700`
  directory, so the stock unprivileged `nginx` worker gets `403 Forbidden` on
  every file. Without this the site serves nothing but 403s — if you ever see
  403 on all paths, check this mount first.
- **No live-reload watcher.** Static files are served straight from disk, so an
  edit is live on the next page load; refresh the preview after a change.
- **No secrets or credentials are needed to boot or browse.** The AI chat/LLM
  features (`js/bot-chat.js`, `js/d7-super.js`, `js/dbot-brains.js`) take an API
  key typed into the in-app settings, stored in browser `localStorage` — never a
  server env var. The `*.workers.dev` / `trycloudflare.com` URLs referenced in
  copied logs/manifests are external leftovers and are not required.

## Verifying it works

```bash
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/            # 200
curl -s http://localhost:3000/api/account-status                          # offline JSON, not 404
docker compose -f docker-compose.base44.yml ps                            # web healthy
```

Then load `http://localhost:3000/` and confirm the DJ shell renders (header,
decks, visualisation canvas). Audio playback and WebGL visualisations depend on
browser capabilities and user interaction — verify by hand in the preview.
