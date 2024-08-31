import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

import CreateJob from "./CreateJobPage";
export const CreateJobPre = (props) => {
  const navigate = useNavigate();
  return (
    <div className="mainContentWrapper">
      <CreateJob navigation={navigate} edit={false} />
    </div>
  );
};
