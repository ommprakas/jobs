import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export const Loading = () => {
  return (
    <div className="loadingIcon">
      <CircularProgress color="primary" />
      Loading...
    </div>
  );
};
