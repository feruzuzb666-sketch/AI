// Bot token
const MY_BOT_TOKEN = '2SN7jaTueV3ft.dlYOndgWeyGanJmGlSa';

// Navbatda turgan foydalanuvchi
let waitingUser = null;

// Aktiv chatlar: userId -> partnerUserId
const activeChats = {};

// Botni ro'yxatdan o'tkazish
registerBot(MY_BOT_TOKEN, async (command, bot, user) => {
    const text = command.trim().toLowerCase();
    const userId = user.id;

    // /start
    if (text === '/start') {
        return {
            text: `Salom, ${user.name}! 👋\n\nBu anonim chat bot 🤫\n"Find" ni bosib, tasodifiy suhbatdosh toping.`,
            reply: true,
            actions: [
                { label: "🔍 Find", action: "/find" },
                { label: "ℹ️ Help", action: "/help" }
            ]
        };
    }

    // /help
    if (text === '/help') {
        return {
            text: "ℹ️ Yordam:\n\n🔍 Find - Anonim suhbat topish\n❌ Stop - Suhbatni tugatish",
            reply: true,
            actions: [
                { label: "🔍 Find", action: "/find" },
                { label: "⬅️ Orqaga", action: "/start" }
            ]
        };
    }

    // /find — suhbat qidirish
    if (text === '/find') {
        // Agar foydalanuvchi allaqachon chatda bo‘lsa
        if (activeChats[userId]) {
            return {
                text: "⚠️ Siz allaqachon suhbatdasiz.",
                reply: true,
                actions: [
                    { label: "❌ Stop", action: "/stop" }
                ]
            };
        }

        // Agar navbatda hech kim yo‘q bo‘lsa
        if (!waitingUser) {
            waitingUser = userId;
            return {
                text: "⏳ Suhbatdosh qidirilmoqda...",
                reply: true,
                actions: [
                    { label: "❌ Stop", action: "/stop" }
                ]
            };
        }

        // O‘zi bilan o‘zi tushib qolmasligi uchun
        if (waitingUser === userId) {
            return {
                text: "⏳ Hali suhbatdosh topilmadi, kuting...",
                reply: true,
                actions: [
                    { label: "❌ Stop", action: "/stop" }
                ]
            };
        }

        // 🔗 Ikkalasini bog‘lash
        const partnerId = waitingUser;
        waitingUser = null;

        activeChats[userId] = partnerId;
        activeChats[partnerId] = userId;

        // Partnerga xabar yuborish
        bot.sendMessage(partnerId, {
            text: "✅ Suhbatdosh topildi! 🤫\nEndi yozishingiz mumkin.",
            actions: [{ label: "❌ Stop", action: "/stop" }]
        });

        return {
            text: "✅ Suhbatdosh topildi! 🤫\nEndi yozishingiz mumkin.",
            reply: true,
            actions: [
                { label: "❌ Stop", action: "/stop" }
            ]
        };
    }

    // /stop — chatni tugatish
    if (text === '/stop') {
        const partnerId = activeChats[userId];

        if (partnerId) {
            delete activeChats[userId];
            delete activeChats[partnerId];

            bot.sendMessage(partnerId, {
                text: "❌ Suhbat tugatildi.",
                actions: [{ label: "🔍 Find", action: "/find" }]
            });
        }

        if (waitingUser === userId) {
            waitingUser = null;
        }

        return {
            text: "❌ Suhbat tugatildi.",
            reply: true,
            actions: [
                { label: "🔍 Find", action: "/find" }
            ]
        };
    }

    // ✉️ Chat davomida oddiy xabarlar
    if (activeChats[userId]) {
        const partnerId = activeChats[userId];

        bot.sendMessage(partnerId, {
            text: command
        });

        return null; // o'ziga qaytarmaymiz
    }

    // Default
    return {
        text: "🤔 Buyruqni tushunmadim. Tugmalardan foydalaning.",
        reply: true,
        actions: [
            { label: "🔍 Find", action: "/find" },
            { label: "ℹ️ Help", action: "/help" }
        ]
    };
});
