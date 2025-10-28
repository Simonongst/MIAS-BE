const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    eid: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "editor", "viewer"],
        default: "associate",
    },
    isEmployed: {
        type: Boolean,
        required: true,
        default: true,
    },
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.hashedPassword;
    }
});

module.exports = mongoose.model("User", userSchema);
