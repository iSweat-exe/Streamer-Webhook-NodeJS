# Streamer Webhook (Discord)

Ce projet permet d'envoyer des notifications sur un webhook Discord lorsqu'un streamer Twitch est en direct.

## Configuration

### 1. Création du fichier `.env`
Dans le répertoire racine du projet, créez un fichier nommé `.env` et ajoutez-y les informations suivantes :

```
# Twitch API Credentials
TWITCH_CLIENT_ID=CLIENT_ID
TWITCH_SECRET_CLIENT=SECRET_CLIENT
TWITCH_ACCESS_TOKEN=ACCESS_TOKEN
TWITCH_USER_ID=USER_ID

# Discord Webhook URL
DISCORD_WEBHOOK_URL=DISCORD_WEBHOOK_URL
```

#### Explication des variables d'environnement :
- `TWITCH_CLIENT_ID` : L'identifiant client de votre application Twitch.
- `TWITCH_SECRET_CLIENT` : Le secret client de votre application Twitch.
- `TWITCH_ACCESS_TOKEN` : Le token d'accès OAuth de Twitch.
- `TWITCH_USER_ID` : L'ID du streamer Twitch à surveiller.
- `DISCORD_WEBHOOK_URL` : L'URL du webhook Discord où seront envoyées les notifications.

### 2. Obtention des informations Twitch
1. Créez une application sur le [Twitch Developer Portal](https://dev.twitch.tv/console/apps).
2. Récupérez votre `Client ID` et `Client Secret`.
3. Obtenez un `Access Token` via l'API OAuth de Twitch ([documentation ici](https://dev.twitch.tv/docs/authentication/getting-tokens)).
4. Trouvez l'`User ID` du streamer en utilisant l'API Twitch.

### 3. Configuration du Webhook Discord
1. Allez dans un serveur Discord où vous avez les permissions nécessaires.
2. Créez un webhook dans un salon texte.
3. Copiez l'URL du webhook et ajoutez-la dans `.env` sous `DISCORD_WEBHOOK_URL`.

## Installation
Assurez-vous d'avoir **Node.js** installé sur votre machine.

1. Clonez le repository :
   ```sh
   git clone https://github.com/iSweat-exe/Streamer-Webhook-NodeJS-.git
   cd Streamer-Webhook-NodeJS
   ```

2. Installez les dépendances :
   ```sh
   npm install
   ```

3. Lancez le script :
   ```sh
   node index.js
   ```

## Fonctionnalités
- Vérifie régulièrement si un streamer est en direct sur Twitch.
- Envoie un message sur Discord via un webhook lorsque le live commence.
- Affiche les statistiques du streamer :
  - Nom d'utilisateur
  - Nombre de followers
  - Nombre de subscribers
  - Statut du live (en ligne ou hors ligne)
  - Jeu en cours de diffusion
  - Nombre de spectateurs
  - Titre du stream

## Améliorations futures
- Ajout d'une interface utilisateur pour la configuration.
- Support multi-streamers.
- Intégration avec d'autres plateformes de streaming.

## Contribuer
Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## Licence
Ce projet est sous licence MIT.
