import React from "react";
import Login from "./Login";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
import "./Header.css";
import "./reset.css";
class Header extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;
    console.log(isAuthenticated);
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <div className="navbar">
            <Link to="/">
              <img
                className="logo"
                src="https://i.pinimg.com/280x280_RS/04/49/5e/04495e7f52f4ab36c635906a2533753b.jpg"
                alt="logoname"
              />
              <Navbar.Brand style={{ position: "relative", bottom: "20px" }}>
                MOVIEnest
              </Navbar.Brand>
            </Link>
          </div>
          <div>
            <button className='loginbtn'>
              <Link to="/">HOME</Link>
            </button>
            {isAuthenticated && (
              <button className='loginbtn'>
                <Link to="/userprofile">PROFILE</Link>
              </button>
            )}
            <button className='loginbtn'>
              <Link to="/aboutus">ABOUT US</Link>
            </button>
            {!isAuthenticated ? <Login /> : <Logout />}
          </div>
        </Navbar>
      </>
    );
  }
}
export default withAuth0(Header);
