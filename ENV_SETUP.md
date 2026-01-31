# Environment Variables Setup

## Sicherer Token Management mit .env

Dein `GITHUB_COPILOT_ACCESS_TOKEN` und andere API-Keys sollten **NIEMALS** in Git commitet werden!

### 🔒 Sichere Konfiguration

1. **Kopiere `.env.example` zu `.env`:**
   ```bash
   cp .env.example .env
   ```

2. **Trage deine Tokens in `.env` ein:**
   ```
   GITHUB_COPILOT_ACCESS_TOKEN=ghu_dein_echter_token_hier
   OPENAI_API_KEY=sk-...
   GEMINI_API_KEY=AIza...
   ```

3. **.env ist sicher verstaut:**
   - Die Datei steht in `.gitignore` ✅
   - Sie wird **NICHT** zu GitHub gepusht
   - Nur du hast Zugriff darauf

### 📋 Priorität beim Token Laden

Das System versucht Keys in dieser Reihenfolge zu laden:

1. **keys.json** (falls vorhanden)
2. **.env Datei** (empfohlen für lokale Entwicklung)
3. **System Environment Variables** (für Docker/Server)

### ⚙️ Für Deployment

Wenn du dein Projekt deployst (Docker, Server, etc.):

```bash
# Docker - Setze Environment Variables:
docker run -e GITHUB_COPILOT_ACCESS_TOKEN="ghu_..." mindcraft

# Server - Export in ~/.bashrc:
export GITHUB_COPILOT_ACCESS_TOKEN="ghu_..."
```

### ⚠️ Wichtig

- **NIEMALS** `.env` in Git hinzufügen!
- **NIEMALS** Tokens in Code committen!
- `.env.example` zeigt die **benötigten Variablen**, enthält aber KEINE echten Keys
- Andere Entwickler kopieren `.env.example` → `.env` und tragen ihre Keys ein

### 🆘 Falls du einen Token in Git gepusht hast

1. **Token sofort widerrufen:**
   - Gehe zu https://github.com/settings/tokens
   - Lösche den betroffenen Token

2. **Git History bereinigen:**
   ```bash
   git filter-branch --env-filter 'export GIT_AUTHOR_DATE="$GIT_AUTHOR_DATE"' HEAD
   ```

3. **Force Push:**
   ```bash
   git push --force-with-lease
   ```
