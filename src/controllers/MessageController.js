const Jimp = require("jimp");
const path = require("path");

module.exports = async (bot, msg) => {
    const user_id = msg.from.id;
    let text = msg.text;
    try {
        if (text === "/start") {
            await bot.sendMessage(user_id, `Assalamu alaykum <b>${msg.from.first_name}</b>. Menga matn yuboring men uni rasmga yozib beraman.`, {
                parse_mode: "HTML"
            })
        } else {
            let image = await Jimp.read(path.join(__dirname, "..", "assets", "img", "frame.png"));
            let font = await Jimp.loadFont(path.join(__dirname, "..", "assets", "fonts", "nunito.fnt"));
            image.print(font, 150, 550, text, 700);
            await image.writeAsync(path.join(__dirname, "..", "assets", "img", "result.png"))
            
            await bot.sendPhoto(user_id, path.join(__dirname, "..", "assets", "img", "result.png"), {
                caption: "Rasm tayyor\n@quotemakeruzbot"
            })
        }
    } catch (err) {
        await bot.sendMessage(user_id, `${err.message}`);
    }
}