# GitHub Copilot Integration für Mindcraft

Diese Integration ermöglicht es, GitHub Copilot als LLM-Backend für Mindcraft zu verwenden.

## Setup

1. **GitHub Copilot Access Token besorgen:**
   - Du brauchst einen GitHub Copilot Plus Account
   - Hol dir dein Access Token von https://github.com/settings/tokens
   - Erstelle einen neuen Token mit `repo` Scope
   - Diesen Token speicherst du in `keys.json` bei `"GITHUB_COPILOT_ACCESS_TOKEN"`

2. **In `keys.json` eintragen:**
   ```json
   {
       "GITHUB_COPILOT_ACCESS_TOKEN": "ghu_YOUR_TOKEN_HERE"
   }
   ```

2. **Profil konfigurieren:**
   
   In deiner Bot-Profil-Datei (z.B. `andy.json`):
   ```json
   {
       "name": "andy",
       "model": {
           "api": "github-copilot",
           "model": "gpt-4o"
       }
   }
   ```

   Oder nutze das fertige Profil:
   ```bash
   node main.js --profiles ./profiles/github-copilot.json
   ```

## Verfügbare Modelle

- `gpt-4o` (Standard)
- `gpt-4`
- `gpt-4-turbo`
- `gpt-3.5-turbo`

## Beispiel-Verwendung

```javascript
"model": {
    "api": "github-copilot",
    "model": "gpt-4o",
    "params": {
        "temperature": 0.7,
        "max_tokens": 4096
    }
}
```

## Bot starten

```bash
cd mindcraft
node main.js
```

Oder mit dem GitHub Copilot Profil:
```bash
node main.js --profiles ./profiles/github-copilot.json
```

## Wichtige Hinweise

- Der Access Token wird automatisch zu einem temporären Copilot Token konvertiert
- Tokens werden automatisch erneuert wenn sie ablaufen
- Vision-Support ist verfügbar (abhängig vom Modell)
- Embeddings werden nicht unterstützt (fällt zurück auf einfache Wortüberlappung)

## Fehlerbehebung

**Fehler: "Failed to authenticate with GitHub Copilot"**
- Überprüfe ob dein Access Token noch gültig ist
- Stelle sicher, dass du eine aktive GitHub Copilot Lizenz hast

**Fehler: "API key not found"**
- Stelle sicher, dass `GITHUB_COPILOT_ACCESS_TOKEN` in `keys.json` gesetzt ist

## API-Endpunkte

Der Provider nutzt die offizielle GitHub Copilot API:
- Token-Endpunkt: `https://api.github.com/copilot_internal/v2/token`
- Chat-Endpunkt: `https://api.githubcopilot.com/v1/chat/completions`
