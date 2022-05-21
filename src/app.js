const TelegramBot = require("node-telegram-bot-api");
const { TOKEN } = require("../config");
const mongo = require("./modules/mongo");
const Users = require("./models/UserModel");
const MessageController = require("./controllers/MessageController");

const bot = new TelegramBot(TOKEN, {
    polling: true
})

// mongo();

bot.on("message", async (msg) => {
    const user_id = msg.from.id;
    const text = msg.text;
    try {
       /*  if(!user) {
            MessageController(bot, msg);
        } else {
            user = await Users.create({
                user_id
            });
            MessageController(bot, msg);
        } */
        MessageController(bot, msg);
    } catch (err) {
        await bot.sendMessage(user_id, `${err.message}`);
    }
})