import { fetch } from 'undici';
import dotenv from 'dotenv';
dotenv.config();

const { TWITCH_CLIENT_ID, TWITCH_ACCESS_TOKEN, TWITCH_USER_ID, DISCORD_WEBHOOK_URL } = process.env;

const headers = {
    'Client-ID': TWITCH_CLIENT_ID,
    'Authorization': `Bearer ${TWITCH_ACCESS_TOKEN}`
};

async function getTwitchStats() {
    const start = performance.now();

    // Exécute toutes les requêtes en parallèle
    const [streamRes, userRes, subsRes] = await Promise.all([
        fetch(`https://api.twitch.tv/helix/streams?user_id=${TWITCH_USER_ID}`, { headers }).then(res => res.json()),
        fetch(`https://api.twitch.tv/helix/users?id=${TWITCH_USER_ID}`, { headers }).then(res => res.json()),
        fetch(`https://api.twitch.tv/helix/subscriptions?broadcaster_id=${TWITCH_USER_ID}`, { headers }).then(res => res.json())
    ]);

    const execTime = (performance.now() - start).toFixed(2);
    console.log(`Execution Time: ${execTime} ms`);

    const isLive = streamRes.data.length > 0;
    const user = userRes.data[0];

    return {
        username: user.display_name,
        followers: user.view_count,
        live: isLive,
        game: isLive ? streamRes.data[0].game_name : "Offline",
        viewers: isLive ? streamRes.data[0].viewer_count : 0,
        title: isLive ? streamRes.data[0].title : "N/A",
        totalSubs: subsRes.total || subsRes.data?.length || 0
    };
}

async function sendDiscordWebhook() {
    const stats = await getTwitchStats();

    // Construction optimisée de l'embed
    const embed = {
        username: "Twitch Stats",
        embeds: [{
            title: `📊 Stats de ${stats.username}`,
            color: stats.live ? 0x6441A5 : 0xff0000,
            fields: [
                { name: "📺 En live ?", value: stats.live ? "✅ Oui" : "❌ Non", inline: true },
                { name: "⭐ Followers", value: stats.followers.toString(), inline: true },
                { name: "💎 Subs", value: stats.totalSubs.toString(), inline: true },
                ...(stats.live ? [
                    { name: "🎮 Jeu", value: stats.game, inline: true },
                    { name: "👥 Viewers", value: stats.viewers.toString(), inline: true },
                    { name: "📜 Titre", value: stats.title, inline: false }
                ] : [])
            ],
            timestamp: new Date()
        }]
    };

    await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(embed)
    });
}

// Exécution toutes les 5 minutes
setInterval(sendDiscordWebhook, 300000);
sendDiscordWebhook();
