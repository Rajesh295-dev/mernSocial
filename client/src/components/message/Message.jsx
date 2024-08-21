import "./message.css";
import moment from "moment";

export default function Message({ message, own }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={PF + "person/profileAvatar.png"}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="postDate">{moment(message.createdAt).fromNow()}</div>
    </div>
  );
}
