

const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 2,
            max: 20,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6

        },
        profilePicture: {
            type: String,
            default: ""
        },
        coverPicture: {
            type: String,
            default: ""
        },
        followers: {
            type: Array,
            default: []
        },
        followings: {
            type: Array,
            default: []
        },

        isAdmin: {
            type: Boolean,
            default: false,
        },

        desc: {
            type: String,
            max: 50,
        },

        city: {
            type: String,
            max: 50,
        },

        from: {
            type: String,
            max: 50,
        },

        relationship: {
            type: Number,
            enum: [1, 2, 3],
        },
    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

UserSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};


module.exports = mongoose.model("User", UserSchema);