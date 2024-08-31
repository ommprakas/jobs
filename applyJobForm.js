import React, { useState } from "react";
import axios, { post } from "axios";
import { FileUpload } from "../../globalComponents/fileUpload";

export const ApplyJobForm = () => {
  const [imageState, setImageState] = useState([]);
  const updateImageState = (imageList) => {
    setImageState(imageList);
  };

  return (
    <form>
      <FileUpload updateImageState={updateImageState} />
    </form>
  );
};
