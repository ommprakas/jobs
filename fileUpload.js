import axios from "axios";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { FILEUPLOADCONFIG } from "../../constant";
import { UpdateMyResumeThunk } from "../../redux";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

export const FileUpload = (props) => {
  const dispatch = useDispatch();
  const [validationMsg, setValidationMsg] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    // Do validation here with the files
    //console.log("files", acceptedFiles.length);
    if (acceptedFiles.length > 0) {
      // //console.log("FILE SEIZE", acceptedFiles[0]?.size);
      const sizeValidation = false;

      acceptedFiles?.map((item) => {
        if (item.size > FILEUPLOADCONFIG.MAXSIZE) {
          sizeValidation = true;
          setValidationMsg(
            `File size should be less than or equal to ${FILEUPLOADCONFIG.MAXSIZE / 1000000
            } MB`
          );
        }
        return item;
      });
      if (sizeValidation === true) {
      } else {
        const response = sendRequest(acceptedFiles);
        //console.log("RESPONSE UPLOAD FILE", response);
      }
    } else {
      setValidationMsg(
        `File size should be less than or equal to  ${FILEUPLOADCONFIG.MAXSIZE / 1000000
        } MB`
      );
    }
  }, []);

  const sendRequest = (fileObj) => {
    const { file } = fileObj;
    const formData = new FormData();
    formData.append("multimedia", fileObj[0]);

    dispatch(UpdateMyResumeThunk(formData));

    // return new Promise(async (resolve, reject) => {

    //   const res = await axios.post(
    //     "http://localhost:3000/careers/v1/multimedia/resume",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         Authorization:
    //           "Bearer .fQImyyY9-Su52bRr8WzN-rAVLl0Z-SoOiYujsl8tZcQ",
    //       },
    //     }
    //   );
    //   if (res) {
    //     resolve(res);
    //   }
    //   reject();
    // });
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: FILEUPLOADCONFIG.FILETYPE,
    maxSize: FILEUPLOADCONFIG.MAXSIZE,
    maxFiles: FILEUPLOADCONFIG.MAXFILES,
    multiple: FILEUPLOADCONFIG.MULTIPLE,
  });

  const files = acceptedFiles.map((file) => (
    <div key={file.path}>
      <p>
        {file.path} - {(file.size / 1024 ** 2).toFixed(2)} MB
      </p>
    </div>
  ));

  return (
    <section>
      <div {...getRootProps({ className: "dropzone resumeUpload" })}>
        <input {...getInputProps()} />
        <CloudUploadIcon className="fileUploadIcon" />
        <p className="FileDropZoneTitle">Click or drag to upload resume</p>
      </div>
      <aside>
        {files && <p className="resumeFileName">{files}</p>}
        {validationMsg && <p className="cusWarningMsg">{validationMsg}</p>}
      </aside>
    </section>
  );
};
