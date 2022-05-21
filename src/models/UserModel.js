const { Schema, model } = require("mongoose");

const UserScheme = new Schema({
    user_id: {
        type: String,
        required: true
    }
})

const Users = model("users", UserScheme);

module.exports = Users;