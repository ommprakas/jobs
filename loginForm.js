import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Container, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import TextField from "@material-ui/core/TextField";
import { URLS } from "../../constant";

const useStyles = makeStyles((theme) => ({
  viewMoreBtnWrapper: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  viewMoreBtn: {
    textTransform: "capitalize",
    borderRadius: "100px",
    padding: "6px 30px",
  },
  userLoginHeaderTitle: {
    fontSize: "25px",
  },
}));
export const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} className="actionButton" color="primary" size="sm" variant="primary">
        {t("login.login")}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Container maxWidth="md">
            <Grid container justifyContent="center" spacing={3}>
              <Grid item md={12} lg={12} sm={12}>
                <Typography variant="p" component="p" className={classes.userLoginHeaderTitle}>
                  {t("login.login")}
                </Typography>
              </Grid>
              <Grid item md={12} lg={12} sm={12}>
                <TextField label="Username" id="outlined-size-small" variant="outlined" size="small" fullWidth={true} />
              </Grid>
              <Grid item md={12} lg={12} sm={12}>
                <TextField label="Password" id="outlined-size-small" variant="outlined" size="small" fullWidth={true} />
              </Grid>

              <Grid item md={12} lg={12} sm={12}>
                <div className={classes.viewMoreBtnWrapper}>
                  <Button
                    className={classes.viewMoreBtn}
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      navigate(`/app/${URLS.DASHBOARD}`, { replace: true });
                    }}
                  >
                    {t("login.login")}
                  </Button>
                  <Button className={classes.viewMoreBtn} variant="outlined" color="primary">
                    {t("login.register")}
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t("cancel")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
