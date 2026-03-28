# HitchhikerDiary Blog (Next.js + Ghost Headless CMS)

A cinematic blog for a filmmaker documenting cinema, travel across India, and political observations. 

**Architecture**: Next.js frontend (public site) consuming Ghost as a headless CMS via Content API.

Target domain:
- hitchhikerdiary.pavalep.com

## Stack

- **Frontend**: Next.js 15 with TypeScript, Tailwind CSS, cinematic design
- **Backend**: Ghost (headless CMS for content management)
- **Database**: MySQL 8
- **Container**: Docker Compose
- **Deployment**: Standalone build ready for production

## Quick Start

1. Copy environment template and set configuration:
```bash
cp .env.example .env
# Edit .env with your Ghost Content API key and domain settings
```

2. Start the full stack:
```bash
docker compose up -d
```

3. Access the applications:
- **Blog Frontend** (Next.js): `http://localhost:3000`
- **Ghost Admin** (Content Management): `http://localhost:8088/ghost` (localhost only)
- **Ghost API** (Headless): `http://localhost:8088` (localhost only)

## Architecture Overview

### Frontend (Next.js)
- Located in `/frontend` directory
- Fetches content via Ghost Content API
- Cinematic design with premium typography (Playfair Display + Inter)
- Responsive hero carousel, post cards with metadata
- Built-in search, tags, author pages

### Backend (Ghost Headless)
- Provides Content API for posts, pages, authors, tags
- Admin interface for content creation and management
- Image uploads and media management
- No themes needed (headless mode)

## Development

### Frontend Development
```bash
cd frontend
npm install
npm run dev  # Starts on localhost:3000
```

### Content Management
- Access Ghost admin at `http://localhost:8088/ghost`
- Create posts, manage authors, configure site settings
- Ghost Content API key needed in `.env` for frontend

## Domain Setup (Cloudflare + Reverse Proxy)

You said you will handle Cloudflare yourself. Use this flow:

1. Add `A` record in Cloudflare:
	- Name: `hitchhikerdiary`
	- Value: your VPS public IP
2. On the server, run Nginx (or Caddy) and proxy public traffic to Next.js at `127.0.0.1:3000`.
3. Keep Ghost headless-only: expose Ghost only on localhost (`127.0.0.1:8088`) and optionally proxy `/ghost/` for admin.
4. Enable SSL certificate for `hitchhikerdiary.pavalep.com`.
5. Update `.env`:
	- `GHOST_URL=https://hitchhikerdiary.pavalep.com`
6. Restart services after URL changes:

```bash
docker compose down
docker compose up -d
```

## Files

- `docker-compose.yml`: Ghost + MySQL services.
- `.env.example`: required environment variables.
- `nginx.conf.example`: sample reverse proxy config.

## Operations

Start:

```bash
docker compose up -d
```

Stop:

```bash
docker compose down
```

Logs:

```bash
docker compose logs -f ghost
```

Update images:

```bash
docker compose pull
docker compose up -d
```
