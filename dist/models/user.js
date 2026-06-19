"use strict";
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: "String",
        required: true,
    },
    lastName: {
        type: "String",
        required: true,
    },
    userName: {
        type: "String",
        required: true,
    },
    phone: {
        type: "String",
        required: true,
    },
    password: {
        type: "String",
        required: true,
    },
    avatar: {
        type: "String",
        required: false,
        default: "https://tse3.mm.bing.net/th/id/OIP.dCpgPQ0i-xX2gZ-yonm54gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
});
const userModel = mongoose.models.user || mongoose.model("user", userSchema);
module.exports = userModel;
//# sourceMappingURL=user.js.map