import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { COLORS } from "../../constant";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    border: "1px solid #eaf1f5",
    boxShadow: " 0 4px 25px rgb(0 73 203 / 12%)",
    borderRadius: "15px",
    paddingBottom: "0px",
    marginBottom: "10px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  companyName: {
    marginBottom: 5,
    fontSize: "12px",
  },
  jobDetailsItem: {
    fontSize: "11px",
  },
  jobTitle: {
    fontSize: "14px",
  },
  cardContent: {
    paddingBottom: "10px !important",
  },
  cardActionBtn: {
    boxShadow: "0 1px 20px rgb(0 73 203 / 12%)",
    borderRadius: "20px",
    fontSize: "11px",
    textTransform: "capitalize",
    padding: "5px 15px",
  },
  cardFooterActionWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    marginTop: "10px",
  },
  jobPostedTime: {
    fontSize: "11px",
  },
  footerActionBtn: {
    display: "flex",
    gap: "5px",
  },
  jobDesc: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
  },
  icons: {
    fontSize: "16px",
    color: COLORS.TEXTGREY,
    marginRight: "5px",
  },
});

export const JobCardDetails = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.jobTitle} variant="h5" component="h5">
          Immediate Openings For Java Developers
        </Typography>
        <Typography className={classes.companyName} color="textSecondary">
          Dojoko Technologies India Pvt. Ltd.
        </Typography>
        <div className={classes.jobDesc}>
          <BusinessCenterIcon className={classes.icons} />
          <Typography className={classes.jobDetailsItem} variant="p" component="p">
            2 - 5 Years of experience
          </Typography>
        </div>
        <div className={classes.jobDesc}>
          <AccountBalanceWalletIcon className={classes.icons} />
          <Typography className={classes.jobDetailsItem} variant="p" component="p">
            12L - 18L PA
          </Typography>
        </div>
        <div className={classes.jobDesc}>
          <LocationOnIcon className={classes.icons} />
          <Typography className={classes.jobDetailsItem} variant="p" component="p">
            HSR Layout, Bangalore Karnataka
          </Typography>
        </div>

        <div className={classes.jobDesc}>
          <AssignmentIcon className={classes.icons} />
          <Typography className={classes.jobDetailsItem} variant="p" component="p">
            Job description: React Js, HTML, CSS, Javascript, Aws
          </Typography>
        </div>
        <div className={classes.cardFooterActionWrapper}>
          <Typography className={classes.jobPostedTime} color="textSecondary">
            {t("jobcard.postedOn")} 2 days ago
          </Typography>
          <div className={classes.footerActionBtn}>
            <Button className={classes.cardActionBtn} variant="outlined" color="primary" size="small">
              {t("jobcard.viewmore")}
            </Button>
            <Button className={classes.cardActionBtn} variant="contained" color="primary" size="small">
              {props.login ? "Apply" : "Login to apply"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
