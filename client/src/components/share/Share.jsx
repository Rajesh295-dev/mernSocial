import "./share.css";
import {
  PermMedia,
  Room,
  EmojiEmotions,
  Cancel,
  LiveTv,
} from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRef } from "react";
import axios from "axios";

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      newPost.img = fileName;
      data.append("file", file);
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/profileAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"What's on your mind, " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>

        <hr className="shareHr" />

        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}

        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <div className="shareOption">
              <LiveTv htmlColor="red" className="shareIcon" />
              <span className="shareOptionText">Live Video</span>
            </div>
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo/Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
              ></input>
            </label>
            {/* <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div> */}
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feeling/Activity</span>
            </div>
          </div>

          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
