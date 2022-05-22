const Jimp = require("jimp");
const path = require("path");
const Users = require("../models/UserModel");

module.exports = async (bot, msg) => {
    const user_id = msg.from.id;
    let text = msg.text;
    let first_name = msg.from.first_name ? msg.from.first_name + " " : "";
    let last_name = msg.from.last_name ? msg.from.last_name : "";
    let full_name = `${first_name}${last_name}`
    try {
        if (text === "/start") {
            await bot.sendMessage(user_id, `Assalamu alaykum <b>${full_name}</b>. Menga matn yuboring men uni rasmga yozib beraman.`, {
                parse_mode: "HTML"
            })
        } else if(text == "/stat") {
            let stats = await Users.find();
            await bot.sendMessage(user_id, `Bot foydalanuvchilari soni - <code>${stats.length}</code>`, {
                parse_mode: "HTML"
            });
        } else {
            let image = await Jimp.read(path.join(__dirname, "..", "assets", "img", "frame.png"));
            let nunito = await Jimp.loadFont(path.join(__dirname, "..", "assets", "fonts", "nunito.fnt"));
            let nunitoBold = await Jimp.loadFont(path.join(__dirname, "..", "assets", "fonts", "nunito-bold.fnt"));
            image.print(nunito, 150, 550, text, 700);
            image.print(nunitoBold, 310, 370, full_name, 700)
            await image.writeAsync(path.join(__dirname, "..", "assets", "img", "result.png"))
            
            await bot.sendPhoto(user_id, path.join(__dirname, "..", "assets", "img", "result.png"), {
                caption: "Rasm tayyor\n@quotemakeruzbot"
            })
        }
    } catch (err) {
        await bot.sendMessage(user_id, `Botda xatolik yuz berdi. /start buyurg'ini bosib botni qayta ishga tushirishingiz mumkin.`);
    }
}