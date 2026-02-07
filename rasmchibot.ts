// Botingizning tokenini bu yerga kiriting
const MY_BOT_TOKEN = 'EtyzID9iJBvtG.fny6M7lsH41V3EcZ3lq';

// Botni ro'yxatdan o'tkazish
registerBot(MY_BOT_TOKEN, async (command, bot, user) => {
    const text = command.trim();
    const lower = text.toLowerCase();

    // /start
    if (lower === '/start') {
        return {
            text: `Salom, ${user.name}! 👋\n\nMen echo botman 🤖\nNima yozsang — shuni qaytaraman 🔁`,
            reply: true,
            actions: [
                { label: "🗣 Echo test", action: "Salom bot" },
                { label: "ℹ️ Yordam", action: "/help" }
            ]
        };
    }

    // /help
    if (lower === '/help') {
        return {
            text: "ℹ️ Yordam:\n\n/start - Botni boshlash\n/help - Yordam\n\nOddiy matn yozing, men uni qaytaraman.",
            reply: true,
            actions: [
                { label: "⬅️ Orqaga", action: "/start" }
            ]
        };
    }

    // /stats
    if (lower === '/stats') {
        return {
            text: `📊 Sizning ma'lumotlaringiz:\n\nIsm: ${user.name}\nUsername: @${user.username}\nVerified: ${user.verified ? '✅' : '❌'}`,
            reply: true,
            actions: [
                { label: "⬅️ Orqaga", action: "/start" }
            ]
        };
    }

    // 🔁 ECHO (noma'lum buyruq yoki oddiy matn)
    return {
        text: `🗣 Siz yozdingiz:\n\n${text}`,
        reply: true,
        actions: [
            { label: "📊 Statistika", action: "/stats" },
            { label: "ℹ️ Yordam", action: "/help" }
        ]
    };
});
