const TelegramBot = require("node-telegram-bot-api");
const { TOKEN } = require("../config");
const mongo = require("./modules/mongo");
const Users = require("./models/UserModel");
const MessageController = require("./controllers/MessageController");

const bot = new TelegramBot(TOKEN, {
    polling: true
})

mongo();

bot.on("message", async (msg) => {
    const user_id = msg.from.id;
    let user = await Users.findOne({
        user_id
    });
    try {
        if(user) {
            MessageController(bot, msg);
        } else {
            user = await Users.create({
                user_id
            });
            MessageController(bot, msg);
        }
    } catch (err) {
        await bot.sendMessage(user_id, `Botda xatolik yuz berdi. /start buyurg'ini bosib botni qayta ishga tushirishingiz mumkin.`);
    }
})