import React, { useRef } from "react";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import { useHistory } from "react-router-dom";
import heic2any from "heic2any";
import "../css/postButton.css";

const PostButton = () => {
  let history = useHistory();

  const HiddenFileInput = useRef(null);
  const handleClick = () => {
    HiddenFileInput.current.click();
  };

  const handleChange = async (e) => {
    //? allow user to upload one image
    let uploadedFile = await e.target.files[0];

    if (
      uploadedFile.name.endsWith(".heic") ||
      uploadedFile.name.endsWith(".HEIC")
    ) {
      await heic2any({
        // required: the HEIF blob file
        blob: uploadedFile,
        // (optional) MIME type of the target file
        // it can be "image/jpeg", "image/png" or "image/gif"
        // defaults to "image/png"
        toType: "image/jpeg",
        // conversion quality
        // a number ranging from 0 to 1
        quality: 0.5,
      })
        .then((file) => (uploadedFile = file))
        .catch((err) => console.log(err));
    }
    //? pass the uploaded file (img) to ImageUpload comp
    if (uploadedFile)
      history.push({
        pathname: "/upload",
        state: uploadedFile,
      });
  };
  return (
    <div className="postButton">
      <div className="postButton__inner" onClick={handleClick}>
        <ControlPointIcon className="btn" fontSize="default" />
        <input
          ref={HiddenFileInput}
          type="file"
          onChange={handleChange}
          style={{ display: "none" }}
          accept="image/*,image/heic,image/webp,image/heif"
        />
      </div>
    </div>
  );
};

export default PostButton;
