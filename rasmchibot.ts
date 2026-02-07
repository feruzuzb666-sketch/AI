// Botingiz tokeni
const MY_BOT_TOKEN = 'Your_Bot_Token_Here';

// Botni ro'yxatdan o'tkazish
registerBot(MY_BOT_TOKEN, async (command, bot, user) => {
    const text = command.trim();

    // /start buyrug‘i
    if (text.toLowerCase() === '/start') {
        return {
            text: `Salom, ${user.name}! 👋\n\nMen echo botman 🤖\nSiz nima yozsangiz, shuni qaytaraman.`,
            reply: true,
            actions: [
                { label: "ℹ️ Yordam", action: "/help" }
            ]
        };
    }

    // /help buyrug‘i
    if (text.toLowerCase() === '/help') {
        return {
            text: "ℹ️ Yordam:\n\n/start - Botni boshlash\n/help - Yordam\n\nShunchaki matn yozing — men uni qaytaraman 🔁",
            reply: true
        };
    }

    // ✨ ECHO QISMI (asosiy joy)
    return {
        text: `🗣 Siz yozdingiz:\n\n${text}`,
        reply: true
    };
});
