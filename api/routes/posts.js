const router = require("express").Router();
const req = require("express/lib/request");
const { Post, User } = require('../models')

//CREATE a POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);

    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }

});

//UPDATE POST
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await Post.updateOne({
                $set: req.body
            });
            res.status(200).json("post has been updated");

        } else {
            res.status(403).json("you can update only your post!");
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await Post.deleteOne();
            res.status(200).json("post has been deleted successfully!");
        } else {
            res.status(403).json("you can delete only your post!");
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

//LIKE, Dislike POST

router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The post has been liked!");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The post has been disliked");
        }

    } catch (err) {
        res.status(500).json(err);

    }
});

//GET A POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);

    } catch (err) {
        return res.status(500).json(err);
    }

});

//get a timeline post
router.get("/timeline/:userId", async (req, res) => {
    console.log("timeline");

    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        console.log("userPosts", userPosts);

        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        console.log(friendPosts);
        //res.status(200).json({ userPosts: { ...userPosts, ...friendPosts } })
        res.status(200).json(userPosts.concat(...friendPosts))
        // res.json({ success: true, message: 'hello raj', friendPosts, userPosts: userPosts, currentUser: currentUser })

    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }


});


//GET  USER'S all POSTS
router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        const posts = await Post.find({ userId: user._id })
        res.status(200).json(posts);


    } catch (err) {
        return res.status(500).json(err);
    }

});

module.exports = router;  