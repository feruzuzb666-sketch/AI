// Botingizning tokenini bu yerga kiriting (createBot dan olgan tokeningiz)
const MY_BOT_TOKEN = 'EtyzID9iJBvtG.fny6M7lsH41V3EcZ3lq';

// registerBot funksiyasi avtomatik ravishda serverdan yuklanadi
registerBot(MY_BOT_TOKEN, async (command, bot, user) => {
    const lower = command.toLowerCase().trim();

    if (lower === '/start') {
        return {
            text: `Salom, ${user.name}! 👋\n\nMen test botman. Quyidagi buyruqlarni sinab ko'ring:`,
            reply: true,
            actions: [
                { label: "📊 Statistika", action: "/stats" }, // Bu yer button bo'ladi
                { label: "ℹ️ Yordam", action: "/help" } // Bu yer button bo'ladi
            ]
        };
    }

    if (lower === '/stats') { // Bu yerda foydalanuvchi haqida ma'lumotlarni ko'rsatamiz
        return {
            text: `📊 Sizning ma'lumotlaringiz:\n\nIsm: ${user.name}\nUsername: @${user.username}\nEmail: ${user.email}\nVerified: ${user.verified ? '✅' : '❌'}`,
            reply: true
        };
    }

    if (lower === '/help') {
        return {
            text: "ℹ️ Yordam:\n\n/start - Botni boshlash\n/stats - Statistikani ko'rish\n/help - Bu yordam xabari",
            reply: true
        };
    }

    // more commands can be added here...

    // Agar buyruq tanilmasa, foydalanuvchiga xabar yuboramiz
    return "Kechirasiz, bu buyruqni tushunmadim. /help ni bosing.";
});