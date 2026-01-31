# 🚀 Mindcraft mit GitHub Copilot starten

## Schritt 1: Minecraft Version prüfen

**Benötigt:** Minecraft Java Edition v1.21.6 (oder älter)

1. Öffne den **Minecraft Launcher**
2. Klicke auf **Installationen**
3. Erstelle eine neue Installation mit Version **1.21.6**
4. Starte das Spiel mit dieser Version

## Schritt 2: Minecraft Welt vorbereiten

### Neue Welt erstellen (empfohlen):
1. Klicke auf **Einzelspieler** → **Neue Welt erstellen**
2. **Wichtige Einstellungen:**
   - **Spielmodus:** Kreativ oder Überleben (nach Wunsch)
   - **Schwierigkeit:** Friedlich (empfohlen zum Testen)
   - **Cheats:** **AKTIVIEREN** ✅ (wichtig!)
   - **LAN-Spieler:** Kann aktiviert bleiben
3. Erstelle die Welt

### Welt auf LAN öffnen:
1. Drücke **ESC** in der Welt
2. Klicke auf **Für LAN öffnen**
3. **Wichtig:** Port muss **55916** sein
   - Falls anderer Port angezeigt wird, gehe zu Schritt 3a
4. Klicke auf **LAN-Welt starten**
5. Du siehst: `"Lokales Spiel auf Port 55916 gestartet"`

### Schritt 3a: Port ändern (falls nötig)
Falls nicht Port 55916 angezeigt wird:
1. Gehe in die `settings.js` Datei
2. Ändere den Port auf den angezeigten Port:
   ```javascript
   "port": 12345, // Trage hier deinen Port ein
   ```

## Schritt 3: Bot starten

### Im Terminal/PowerShell:
```powershell
cd "C:\Users\KevinFritsch\Documents\Privat\Gemini-Browser Extention\mindcraft"
node main.js
```

### Was du sehen solltest:
```
Starting bot: andy
Connecting to localhost:55916
Bot andy joined the game
```

## Schritt 4: Mit dem Bot interagieren

Im Minecraft Chat kannst du jetzt mit dem Bot schreiben:

```
andy, hello!
andy, follow me
andy, gather some wood
andy, build a house
```

## 🔧 Fehlerbehebung

### "Failed to authenticate with GitHub Copilot"
- **Lösung:** Token in keys.json prüfen
- Oder starte den Bot neu

### "Connection refused" oder "ECONNREFUSED"
- **Lösung:** Stelle sicher dass:
  1. Minecraft läuft
  2. Du in der Welt bist
  3. Die Welt auf LAN geöffnet ist (Port 55916)
  4. Der Port in settings.js korrekt ist

### "Cannot find module"
- **Lösung:** Führe nochmal aus:
  ```powershell
  npm install
  ```

### Bot verbindet sich, tut aber nichts
- Schreibe im Chat: `andy, hello`
- Der Bot muss angesprochen werden mit seinem Namen

## 📝 Wichtige Befehle

```powershell
# Bot starten
node main.js

# Bot mit spezifischem Profil starten
node main.js --profiles ./profiles/github-copilot.json

# Task ausführen (z.B. Holz sammeln)
node main.js --task_path tasks/basic/single_agent.json --task_id gather_oak_logs
```

## 🎮 Minecraft Chat-Befehle

- `andy, [Anweisung]` - Bot gibt eine Anweisung
- `andy, stop` - Bot stoppt aktuelle Aktion
- `andy, come here` - Bot kommt zu dir
- `andy, follow me` - Bot folgt dir
- `andy, stay` - Bot bleibt stehen

## ⚙️ Erweiterte Einstellungen

### Bot-Name ändern:
In `andy.json`:
```json
{
    "name": "MeinBot"
}
```

### Andere Modelle testen:
```json
{
    "model": {
        "api": "github-copilot",
        "model": "gpt-4"  // oder "gpt-3.5-turbo"
    }
}
```

## 🆘 Support

- **Discord:** https://discord.gg/mp73p35dzC
- **FAQ:** Siehe `FAQ.md`
- **GitHub Issues:** https://github.com/kolbytn/mindcraft/issues
