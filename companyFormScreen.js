import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CompanyFormComponent from "../../component/counsellor/CompanyFormComponent";


export function CompanyFormScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
        <CompanyFormComponent navigate={navigate}/>
    </>
  );
}
