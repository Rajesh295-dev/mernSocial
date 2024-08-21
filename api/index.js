const express = require("express");

const path = require("path");

const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");

const cors = require("cors");


const bodyParser = require('body-parser');
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
//new routes
// const userRoute = require("./routes/user.route");
// const authRoute = require("./routes/auth.route");
// const postRoute = require("./routes/post.route");
// const conversationRoute = require("./routes/conversations.route");
// const messageRoute = require("./routes/messages.route");

const { clog } = require("./util/clog");

dotenv.config();
mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log("Connected to MongoDB");
    }
);


app.use("/images", express.static(path.join(__dirname, "public/images")));

// middleware
app.use(express.json());
app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(cors());
app.use(clog);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded successfully!");
    } catch (err) {
        console.log(err);
    }
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.listen(3307, () => {
    console.log("Backend server is Running!!");
});

