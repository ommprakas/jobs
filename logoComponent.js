import React, { Component, useRef, useState } from "react";
import axios from "axios";
import { UpdateLogo } from "../../redux";
import commonServices from "../../helper/commonServices";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { Loading } from "../globalComponents";
export const UploadLogo = (props) => {
  const logoUpload = useRef();
  const dispatch = useDispatch();
  const [selectedField, setselectedField] = useState("");

  const [validationMsg, setValidationMsg] = useState("");
  const allowedImages = ["image/png", "image/jpeg", "image/jpg"];
  const logo = useSelector((state) => state?.companySlice?.companyLogo);
  const myHandler = async (e) => {
    /*console.log(
    e.target.files[0].size,
      e.target.files[0].type,
      "e.target.files[0].type"
    );*/
    //In bytes
    if (e.target.files[0].size > 2000000) {
      setValidationMsg("Logo should be less than or equal to 2 mb");
    }
    if (!allowedImages.includes(e.target.files[0].type)) {
      setValidationMsg("Logo can be in jpg, jpeg,png");
    }
    if (validationMsg == "") {
      setselectedField(e.target.files[0]);
      const formData = new FormData();
      formData.append("multimedia", selectedField);
      props.setBannerLoad(true);
      await dispatch(UpdateLogo(formData));
      props.setBannerLoad(false);
    }
  };

  return (
    <>
      <input
        style={{ display: "none" }}
        ref={logoUpload}
        id="logoImg"
        type="file"
        name="myFile"
        onChange={myHandler}
      />

      <div className="companyLogoWrapper">
        <img
          htmlFor="logoImg"
          src={logo.url ? logo.url : commonServices.defaultLogo}
          //   src="https://scontent.fblr2-1.fna.fbcdn.net/v/t1.6435-1/119948155_127188519122382_6250660251270502869_n.png?stp=dst-png_p148x148&_nc_cat=104&ccb=1-7&_nc_sid=1eb0c7&_nc_ohc=BW62Jr3x_5EAX8ZvW0e&_nc_ht=scontent.fblr2-1.fna&oh=00_AT9OFYWPQ4oD_bFpn-GInyKp-BialF44nlrMFIITSifKCw&oe=6347BF7D"
          className="companyLogo"
        />
        <IconButton
          className="companyLogoUploadIcon"
          onClick={() => {
            logoUpload.current.click();
          }}
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </div>
      <aside>
        {/* {files && <p className="resumeFileName">{files}</p>} */}
        {validationMsg && <p className="cusWarningMsg">{validationMsg}</p>}
      </aside>
    </>
  );
};
