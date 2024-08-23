import "./post.css";
import { MoreVert } from "@mui/icons-material";

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
// import { moment } from "moment";
import moment from "moment";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  //api connection
  const [user, setUser] = useState({});

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${post.userId}`);
        setUser(res.data);
      } catch (err) {
        console.log("Error fetching user data:", err);
      }
      // const res = await axios.get(`/users?userId=${post.userId}`);
      // // console.log("fetched user res", res);
      // // console.log("this shoud be usernamee", user);
      // setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}

    setLike(isLiked ? like - 1 : like + 1);
    console.log(like);
    setIsLiked(!isLiked);
    console.log(isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/1.jpeg"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{moment(post.createdAt).fromNow()}</span>
            {/* <span className="postDate">{format(post.createdAt)} </span> */}
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img
            className="postImg"
            src={post.img ? PF + post.img : PF + "person/writeimg.jpeg"}
            alt=""
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}/post/like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`  ${PF}/post/love.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter"> {like} People like it.</span>
          </div>

          <div className="postBottomRight">
            <span className="postCommentText">{post.comment}comments.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
