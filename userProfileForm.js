import Form from "react-bootstrap/Form";
import Grid from "@material-ui/core/Grid";
import { Container, Typography } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";

import Button from "react-bootstrap/Button";
import { SignupForm } from "../publicHomeComponents";
export const UserProfileForm = () => {
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };
  return <SignupForm />;
};
