# HitchhikerDiary Blog (Ghost Self-Hosted)

This repository runs a Dockerized Ghost blog stack.

Target domain:
- hitchhikerdiary.pavalep.com

## Stack

- Ghost (frontend + admin)
- MySQL 8
- Docker Compose
- Optional reverse proxy (Nginx/Caddy) for domain and SSL

## Quick Start

1. Copy environment template.
2. Set strong passwords in `.env`.
3. Start the containers.

```bash
cp .env.example .env
docker compose up -d
```

After startup, open:
- `http://SERVER_IP:2368` (or your domain if proxy is configured)

Ghost admin panel is available at:
- `/ghost`

## Domain Setup (Cloudflare + Reverse Proxy)

You said you will handle Cloudflare yourself. Use this flow:

1. Add `A` record in Cloudflare:
	- Name: `hitchhikerdiary`
	- Value: your VPS public IP
2. On the server, run Nginx (or Caddy) and proxy to `127.0.0.1:2368`.
3. Enable SSL certificate for `hitchhikerdiary.pavalep.com`.
4. Update `.env`:
	- `GHOST_URL=https://hitchhikerdiary.pavalep.com`
5. Restart Ghost after URL changes:

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
