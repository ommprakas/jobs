import axios from "axios";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { IMAGEUPLOADCONFIG } from "../../constant";
import { UpdateUploadBanner } from "../../redux";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import commonServices from "../../helper/commonServices";
import { UploadLogo } from "./logoComponent";
import { Loading } from "../globalComponents";
export const CompanyLogoAndBannerComponent = (props) => {
  const dispatch = useDispatch();
  const banner = useSelector((state) => state?.companySlice?.companyBanner);
  const [bannerLoad, setBannerLoad] = useState(false);
  const [validationMsg, setValidationMsg] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    // Do validation here with the files
    //console.log("files", acceptedFiles.length);
    if (acceptedFiles.length > 0) {
      // //console.log("FILE SEIZE", acceptedFiles[0]?.size);
      const sizeValidation = false;

      acceptedFiles?.map((item) => {
        if (item.size > IMAGEUPLOADCONFIG.MAXSIZE) {
          sizeValidation = true;
          setValidationMsg(
            `File size should be less than or equal to ${IMAGEUPLOADCONFIG.MAXSIZE / 1000000
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
        `File size should be less than or equal to  ${IMAGEUPLOADCONFIG.MAXSIZE / 1000000
        } MB`
      );
    }
  }, []);

  const sendRequest = async (fileObj) => {
    const { file } = fileObj;
    const formData = new FormData();
    formData.append("multimedia", fileObj[0]);
    setBannerLoad(true);
    await dispatch(UpdateUploadBanner(formData));
    setBannerLoad(false);
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
    accept: IMAGEUPLOADCONFIG.FILETYPE,
    maxSize: IMAGEUPLOADCONFIG.MAXSIZE,
    maxFiles: IMAGEUPLOADCONFIG.MAXFILES,
    multiple: IMAGEUPLOADCONFIG.MULTIPLE,
  });

  const files = acceptedFiles.map((file) => (
    <div key={file.path}>
      <p>
        {file.path} - {(file.size / 1024 ** 2).toFixed(2)} MB
      </p>
    </div>
  ));
  //console.log(banner, "banner is here in com");
  return (
    <section>
      {/* {bannerLoad.toString()} */}
      <div
        className="bannerImageWrapper"
        style={{
          backgroundImage: `url(${banner?.url ? banner?.url : commonServices.defaultBanner
            })`,
        }}
      >
        {bannerLoad && <Loading />}
        <div
          id="imgs"
          {...getRootProps({
            className: "dropzone  bannerUploadArea",
          })}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon className="" />
          <p className="FileDropZoneTitle">Click to upload banner</p>
        </div>
        <div className="logoUploadSection">
          <UploadLogo dispatch={dispatch} setBannerLoad={setBannerLoad} />
        </div>
      </div>
      <aside>
        {/* {files && <p className="resumeFileName">{files}</p>} */}
        {validationMsg && <p className="cusWarningMsg">{validationMsg}</p>}
      </aside>

      {/* <img  src={banner.url?banner.url:commonServices.defaultBanner} width="100%" height={300}></img>  */}
    </section>
  );
};
