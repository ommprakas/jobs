import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Avatar from "@material-ui/core/Avatar";
import { useNavigate, useLocation } from "react-router-dom";
import { URLS } from "../../constant";
import { logout } from "../../helper/logoutHelper";
import { N_LOGO } from "../../component/globalComponents/logo";
import { Hidden } from "@material-ui/core";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
export const DashboardNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const localStorageProfileData = JSON.parse(localStorage.getItem("userToken"));
  //console.log("LOCAL STORAGE DATA", localStorageProfileData);

  return (
    <Navbar className="topHeaderBar mainLandngHeaderWrapper" sticky="top" collapseOnSelect expand="md" variant="light">
      <Container fluid>
        <Navbar.Brand
          onClick={() => {
            navigate(`/app/${URLS.DASHBOARD}`);
          }}
          className="mainLogoWrapper"
        >
          <img className="mainHeaderLogo" src={N_LOGO} />

          {/* <span className="headerTitle">DOJOKO</span> */}
        </Navbar.Brand>

        <Hidden smDown>
          <div className="menuWrapper">
            <Nav.Link
              className={location.pathname === `/app/${URLS.DASHBOARD}` ? "activeMenuTab" : ""}
              onClick={() => {
                navigate(`/app/${URLS.DASHBOARD}`);
              }}
            >
              Dashboard
            </Nav.Link>

            <Nav.Link
              className={location.pathname === `/app/${URLS.APPLIEDJOBLIST}` ? "activeMenuTab" : ""}
              onClick={() => {
                navigate(`/app/${URLS.APPLIEDJOBLIST}`);
              }}
            >
              Applied Jobs
            </Nav.Link>
            <Nav.Link
              className={location.pathname === `/app/${URLS.INVITEDJOBS}` ? "activeMenuTab" : ""}
              onClick={() => {
                navigate(`/app/${URLS.INVITEDJOBS}`);
              }}
            >
              Invited
            </Nav.Link>
            <Nav.Link
              className={location.pathname === `/app/${URLS.SUGGESTION}` ? "activeMenuTab" : ""}
              onClick={() => {
                navigate(`/app/${URLS.SUGGESTION}`);
              }}
            >
              Jobs Suggestion
            </Nav.Link>
            <Nav.Link
              className={location.pathname === `/app/${URLS.USERPROFILE}` ? "activeMenuTab" : ""}
              onClick={() => {
                navigate(`/app/${URLS.USERPROFILE}`);
              }}
            >
              Edit / View Profile
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
                    src="/broken-imaaage.jpg"
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
                  navigate(`/app/${URLS.DASHBOARD}`);
                }}
              >
                Dashboard
              </Dropdown.Item>
              <Dropdown.Item
                className="toggleMenuItem"
                onClick={() => {
                  navigate(`/app/${URLS.APPLIEDJOBLIST}`);
                }}
              >
                Applied Job
              </Dropdown.Item>
              <Dropdown.Item
                className="toggleMenuItem"
                onClick={() => {
                  navigate(`/app/${URLS.USERPROFILE}`);
                }}
              >
                My Profile
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
