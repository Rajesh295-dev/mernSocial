
const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            max: 500,
        },
        img: {
            type: String,
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Story model from the schema
module.exports = mongoose.model("Story", StorySchema);


