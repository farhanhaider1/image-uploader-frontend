import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import Cropper from "react-easy-crop";
import { Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import getCroppedImg from "../utils/cropImage";
import axios from "axios";
import styled from "styled-components";

const MainDivCropper = styled.div`
  position: relative;
`;

const CropperDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 60vh;
  background: #333;
`;
const BtnDiv = styled.div`
  /* position: absolute; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 65vh;
  Button {
    margin: 5px;
  }
`;

const ImageUpload = () => {
  const [image, setImage] = useState();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imgIsCropped, setImgIsCropped] = useState(false);

  // redux store
  const username = useSelector((state) => state.users.username);

  let history = useHistory();

  const location = useLocation();
  useEffect(() => {
    console.log(location.state);
    if (!location.state) {
      history.replace("/");
      return;
    }
    const previewLocalUrl = URL.createObjectURL(location.state);
    setImage(previewLocalUrl);
    console.log(previewLocalUrl);
    // clean up function
    return () => console.log("UNMOUNT");
  }, [location]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      console.log(croppedImage);
      // reset zoom if user had zoomed in to crop
      setZoom(1);
      // update Cropper image source
      setImage(croppedImage);
      //
      setImgIsCropped(true);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  const handelCancel = () => {
    history.push({
      pathname: "/",
    });
  };

  const handleUpload = () => {
    var file = new File([image], "filename");
    console.log(file);
    axios
      .post("http://localhost:9000/users/upload", {
        img: image,
        username: username,
      })
      .then((res) => {
        console.log(res.data);
        history.push({
          pathname: "/posts",
        });
      })
      .catch((err) => console.log(err));
    console.log("handle clicked");
  };

  return (
    <MainDivCropper>
      <div>
        <CropperDiv>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={3 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </CropperDiv>
      </div>

      <BtnDiv>
        <Button onClick={handleCrop} variant="contained" color="primary">
          Crop
        </Button>

        <Button
          variant="contained"
          color="primary"
          startIcon={<CloudUploadIcon />}
          disabled={!imgIsCropped}
          onClick={handleUpload}
        >
          Upload
        </Button>
        <Button variant="outlined" color="secondary" onClick={handelCancel}>
          Cancel
        </Button>
      </BtnDiv>
    </MainDivCropper>
  );
};

export default ImageUpload;
