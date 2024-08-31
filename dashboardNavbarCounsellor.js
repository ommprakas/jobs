import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Avatar from "@material-ui/core/Avatar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { URLS } from "../../constant";
import { logout } from "../../helper/logoutHelper";
import { N_LOGO } from "./logo";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import { Hidden } from "@material-ui/core";
export const DashboardNavbarCounsellor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const localStorageProfileData = JSON.parse(localStorage.getItem("userToken"));
  //console.log("LOCAL STATE", localStorageProfileData);
  return (
    <Navbar className="topHeaderBar mainLandngHeaderWrapper" sticky="top" collapseOnSelect expand="md" variant="light">
      <Container fluid>
        <Navbar.Brand
          onClick={() => {
            navigate(`/counsellor/${URLS.LANDINGCOUNSELLOR}`);
          }}
          className="mainLogoWrapper"
        >
          <img className="mainHeaderLogo" src={N_LOGO} />
        </Navbar.Brand>

        <Hidden smDown>
          <div className="menuWrapper">
            <Nav.Link
              className={location.pathname === `/counsellor/${URLS.LANDINGCOUNSELLOR}` ? "activeMenuTab" : ""}
              onClick={() => {
                navigate(`/counsellor/${URLS.LANDINGCOUNSELLOR}`);
              }}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              className={location.pathname === `/counsellor/${URLS.RECRUITERMANGE}` ? "activeMenuTab " : " "}
              onClick={() => {
                navigate(`/counsellor/${URLS.RECRUITERMANGE}`);
              }}
            >
              Manage Recruiters
            </Nav.Link>
            <Nav.Link
              className={location.pathname === `/counsellor/${URLS.COMPANYMANAGE}` ? "activeMenuTab " : " "}
              onClick={() => {
                navigate(`/counsellor/${URLS.COMPANYMANAGE}`);
              }}
            >
              Manage Companies
            </Nav.Link>
            <Nav.Link>
              <Button
                onClick={() => navigate(`/counsellor/${URLS.CREATEJOB}`)}
                className="actionButton btn-primary cusLoginBtn"
                variant="contained"
                color="primary"
                size="small"
              >
                Create Posting
              </Button>
            </Nav.Link>

            <Nav.Link>
              <Dropdown className="toggleWrapper" drop="down" align="end">
                <Dropdown.Toggle className="toggleIcon" id="dropdown-basic">
                  <Avatar
                    className="avatarImage"
                    alt={
                      localStorageProfileData?.user?.userDetails?.name?.firstName ??
                      localStorageProfileData?.user?.userDetails?.name?.middleName ??
                      localStorageProfileData?.user?.userDetails?.name?.lastName ??
                      "D"
                    }
                    src="/broken-image.jpg"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu className="cusCard cusToggleDropdown">
                  <p className="toggleUsername">
                    {localStorageProfileData?.user?.userDetails?.name?.firstName &&
                      localStorageProfileData?.user?.userDetails?.name?.firstName + " "}
                    {localStorageProfileData?.user?.userDetails?.name?.middleName &&
                      localStorageProfileData?.user?.userDetails?.name?.middleName + " "}
                    {localStorageProfileData?.user?.userDetails?.name?.lastName &&
                      localStorageProfileData?.user?.userDetails?.name?.lastName}
                  </p>
                  <Dropdown.Item className="toggleMenuItem" onClick={() => logout()}>
                    Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Link>
          </div>
        </Hidden>

        <Hidden mdUp>
          <Dropdown className="toggleWrapper" drop="down" align="end">
            <Dropdown.Toggle className="toggleIcon" id="dropdown-basic">
              <Avatar
                className="avatarImage"
                alt={
                  localStorageProfileData?.user?.userDetails?.name?.firstName ??
                  localStorageProfileData?.user?.userDetails?.name?.middleName ??
                  localStorageProfileData?.user?.userDetails?.name?.lastName ??
                  "D"
                }
                src="/broken-image.jpg"
              />
            </Dropdown.Toggle>

            <Dropdown.Menu className="cusCard cusToggleDropdown">
              <p className="toggleUsername">
                {localStorageProfileData?.user?.userDetails?.name?.firstName &&
                  localStorageProfileData?.user?.userDetails?.name?.firstName + " "}
                {localStorageProfileData?.user?.userDetails?.name?.middleName &&
                  localStorageProfileData?.user?.userDetails?.name?.middleName + " "}
                {localStorageProfileData?.user?.userDetails?.name?.lastName &&
                  localStorageProfileData?.user?.userDetails?.name?.lastName}
              </p>

              <Dropdown.Item
                className="toggleMenuItem"
                onClick={() => {
                  navigate(`/counsellor/${URLS.LANDINGCOUNSELLOR}`);
                }}
              >
                Dashboard
              </Dropdown.Item>
              <Dropdown.Item
                className="toggleMenuItem"
                onClick={() => {
                  navigate(`/counsellor/${URLS.RECRUITERMANGE}`);
                }}
              >
                Manage Recruiters
              </Dropdown.Item>
              <Dropdown.Item
                className="toggleMenuItem"
                onClick={() => {
                  navigate(`/counsellor/${URLS.COMPANYMANAGE}`);
                }}
              >
                Manage Companies
              </Dropdown.Item>

              <Dropdown.Item className="toggleMenuItem" onClick={() => navigate(`/counsellor/${URLS.CREATEJOB}`)}>
                Create Posting
              </Dropdown.Item>

              <Dropdown.Item className="toggleMenuItem" onClick={() => logout()}>
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Hidden>
      </Container>
    </Navbar>
  );
};
