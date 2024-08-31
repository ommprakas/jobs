import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Colors } from "../../_constants";
import { v4 as uuid } from "uuid";
import axios from "axios";

function MyDropZone(props) {
  const { updateFileObj, callback } = props;

  const onDrop = useCallback((acceptedFiles) => {
    // Do validation here with the files
    uploadFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const sendRequest = (fileObj) => {
    const { file } = fileObj;

    return new Promise(async (resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file, file.name);

      const res = await axios.post(
        process.env.REACT_APP_FILE_UPLOAD,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res) {
        const resObj = {
          ...fileObj,
          state: "uploaded",
          uuid: fileObj.uuid,
          url: res.data.originalUrl,
          thumbnail: res.data.thumbnailUrl,
          file,
        };

        resolve(resObj);
      }
      reject();
    });
  };

  const uploadFiles = async (fileArray) => {
    try {
      for await (const file of fileArray) {
        let fileObj = {
          state: "starting",
          uuid: uuid(),
          url: "",
          thumbnail: URL.createObjectURL(file),
          file,
        };

        updateFileObj(fileObj);

        const response = await sendRequest(fileObj);

        if (response) {
          updateFileObj(response);
          callback();
        }
      }
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: Colors.CONTRAST_GREY,
          padding: 15,
          borderRadius: 5,
          border: `1px solid ${Colors.LIGHT_GREY}`,
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p style={{ fontFamily: "helvetica" }}>Drop the files here ...</p>
        ) : (
          <p style={{ fontFamily: "helvetica" }}>
            Drag 'n' drop some image files here, or click to select the images
          </p>
        )}
      </div>
    </>
  );
}
