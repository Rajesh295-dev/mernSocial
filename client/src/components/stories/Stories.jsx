import "./stories.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Stories({ currentUserId }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["stories"],
    queryFn: () =>
      axios.get("/stories").then((res) => {
        console.log("Response data:", res.data); // Debugging
        return res.data;
      }),
    if(error) {
      console.error("Error fetching stories:", error);
    },
  });

  const [file, setFile] = useState(null);

  const submitHandler = async () => {
    const newStory = {
      userId: user._id,
      name: user.username,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      newStory.img = fileName;
      data.append("file", file);
      console.log(newStory);
      try {
        // Upload the file
        await axios.post("/upload", data);
        // Save the story
        await axios.post("/stories", newStory);
        window.location.reload(); // Reload the page to show the new story
      } catch (err) {}
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    submitHandler(); // Trigger the upload as soon as the file is selected
  };

  return (
    <div className="stories">
      <div className="storiesWrapper">
        <div className="story">
          <img
            className="storyProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/profileAvatar.png"
            }
            alt=""
          />
          <span className="createStory"> Create Story</span>
          <button
            className="addStoryButton"
            onClick={() => document.getElementById("fileInput").click()}
          >
            +
          </button>
          <input
            style={{ display: "none" }}
            type="file"
            id="fileInput"
            accept=".png, .jpeg, .jpg"
            onChange={handleFileChange}
          />
        </div>

        {error ? (
          <span className="storiesError">Something went wrong</span>
        ) : isLoading ? (
          <span className="storiesLoading">Loading...</span>
        ) : (
          data.map((story) => (
            <div className="story" key={story._id}>
              <img
                className="storyImg"
                src={
                  user.profilePicture
                    ? PF + story.img
                    : PF + "person/profileAvatar.png"
                }
                alt=""
              />
              <span className="storyUsername">{story.name}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
