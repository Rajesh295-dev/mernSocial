const router = require("express").Router();
const { Story } = require("../models/Story");
// const mongoose = require("mongoose");
// CREATE a Story


// router.post("/", async (req, res) => {
//     console.log("Received request body:", req.body);
//     console.log("Story model:", Story);

//     const newStory = new Story(req.body);
//     console.log("Instantiated newStory:", newStory);
//     try {
//         const savedStory = await newStory.save();
//         res.status(200).json(savedStory);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// Define the Story model schema
// const StorySchema = new mongoose.Schema(
//     {
//         userId: {
//             type: String,
//             required: true,
//         },
//         desc: {
//             type: String,
//             max: 500,
//         },
//         img: {
//             type: String,
//         },
//     },
//     { timestamps: true } // Automatically adds createdAt and updatedAt fields
// );

// // Create the Story model from the schema
// const Story = mongoose.model("Story", StorySchema);

// CREATE a Story
router.post("/", async (req, res) => {
    console.log("Received request body:", req.body);
    console.log("Story model:", Story);

    const newStory = new Story(req.body);
    console.log("Instantiated newStory:", newStory);

    try {
        const savedStory = await newStory.save();
        res.status(200).json(savedStory);
    } catch (err) {
        res.status(500).json(err);
    }
});



// // UPDATE Story
// router.put("/:id", async (req, res) => {
//     try {
//         const story = await Stories.findById(req.params.id);
//         if (story.userId === req.body.userId) {
//             await story.updateOne({ $set: req.body });
//             res.status(200).json("Story has been updated");
//         } else {
//             res.status(403).json("You can update only your story!");
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// // DELETE Story
// router.delete("/:id", async (req, res) => {
//     try {
//         const story = await Story.findById(req.params.id);
//         if (story.userId === req.body.userId) {
//             await story.deleteOne();
//             res.status(200).json("Story has been deleted successfully!");
//         } else {
//             res.status(403).json("You can delete only your story!");
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// // GET A Story
// router.get("/:id", async (req, res) => {
//     try {
//         const story = await Story.findById(req.params.id);
//         res.status(200).json(story);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// // GET User's Stories
// router.get("/profile/:username", async (req, res) => {
//     try {
//         const user = await User.findOne({ username: req.params.username });
//         const stories = await Story.find({ userId: user._id });
//         res.status(200).json(stories);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// // GET Timeline Stories
// router.get("/timeline/:userId", async (req, res) => {
//     try {
//         const currentUser = await User.findById(req.params.userId);
//         const userStories = await Story.find({ userId: currentUser._id });

//         const friendStories = await Promise.all(
//             currentUser.followings.map((friendId) => {
//                 return Story.find({ userId: friendId });
//             })
//         );

//         res.status(200).json(userStories.concat(...friendStories));
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

module.exports = router;
