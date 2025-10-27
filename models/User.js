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
        enum: ["admin", "support", "associate"],
        default: "associate",
    },
    employmentStatus: {
        type: String,
        required: true,
        enum: ["active", "inactive"],
        default: "active",
    },
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.hashedPassword;
    }
});

module.exports = mongoose.model("User", userSchema);
