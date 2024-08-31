import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Avatar from "@material-ui/core/Avatar";
import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { URLS } from "../../constant";
import { logout } from "../../helper/logoutHelper";
import { N_LOGO } from "./logo";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import { Hidden } from "@material-ui/core";
export const DashboardNavbarRecruiter = () => {
  const useInfo = useSelector((state) => state);
  const location = useLocation();
  const navigate = useNavigate();
  const localStorageProfileData = JSON.parse(localStorage.getItem("userToken"));

  return (
    <Navbar className="topHeaderBar mainLandngHeaderWrapper" sticky="top" collapseOnSelect expand="md" variant="light">
      <Container fluid>
        <Navbar.Brand
          onClick={() => {
            navigate(`/recruiter/${URLS.LANDINGRECRUITER}`);
          }}
          className="mainLogoWrapper"
        >
          <img className="mainHeaderLogo" src={N_LOGO} />
        </Navbar.Brand>

        <Hidden smDown>
          <div className="menuWrapper">
            {/* <Nav.Link
              className={location.pathname === `/` ? "activeMenuTab" : ""}
              onClick={() => {
                navigate(`/`);
              }}
            >
              Home
            </Nav.Link> */}
            <Nav.Link
              className={location.pathname === `/recruiter/${URLS.LANDINGRECRUITER}` ? "activeMenuTab" : ""}
              onClick={() => {
                navigate(`/recruiter/${URLS.LANDINGRECRUITER}`);
              }}
            >
              Dashboard
            </Nav.Link>

            <Nav.Link>
              <Button
                onClick={() => navigate(`/recruiter/${URLS.CREATEJOB}`)}
                className="actionButton btn-primary  cusLoginBtn"
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
                  <Dropdown.Item className="toggleMenuItem" onClick={() => navigate(`/recruiter/${URLS.UPDATEPASSWORD}`)}>
                    Update password
                  </Dropdown.Item>
                  <Dropdown.Item className="toggleMenuItem">
                    <Link
                      className="toggleMenuItemCompany"
                      to={`/recruiter/${URLS.VIEWCOMPANY}/${localStorageProfileData?.user?.company && localStorageProfileData?.user?.company
                        }`}
                    >
                      View Company
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item className="toggleMenuItem">
                    <Link
                      className="toggleMenuItemCompany"
                      to={`/recruiter/${URLS.EDITCOMPANY}/${localStorageProfileData?.user?.company && localStorageProfileData?.user?.company
                        }`}
                    >
                      Edit Company
                    </Link>
                  </Dropdown.Item>

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

              {/* <Dropdown.Item
                className="toggleMenuItem"
                onClick={() => {
                  navigate(`/`);
                }}
              >
                Home
              </Dropdown.Item> */}
              <Dropdown.Item
                className="toggleMenuItem"
                onClick={() => {
                  navigate(`/recruiter/${URLS.LANDINGRECRUITER}`);
                }}
              >
                Dashboard
              </Dropdown.Item>
              <Dropdown.Item className="toggleMenuItem" onClick={() => navigate(`/recruiter/${URLS.CREATEJOB}`)}>
                Create Posting
              </Dropdown.Item>
              <Dropdown.Item className="toggleMenuItem">
                <Link
                  className="toggleMenuItemCompany"
                  to={`/recruiter/${URLS.VIEWCOMPANY}/${localStorageProfileData?.user?.company && localStorageProfileData?.user?.company
                    }`}
                >
                  View Company
                </Link>
              </Dropdown.Item>
              <Dropdown.Item className="toggleMenuItem">
                <Link
                  className="toggleMenuItemCompany"
                  to={`/recruiter/${URLS.EDITCOMPANY}/${localStorageProfileData?.user?.company && localStorageProfileData?.user?.company
                    }`}
                >
                  Edit Company
                </Link>
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
