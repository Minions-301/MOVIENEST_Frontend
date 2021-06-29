import React from 'react';
import Login from './Login';
import Logout from './Logout'
import { Link } from "react-router-dom";
import { Navbar } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import  './Header.css'
import  './reset.css'
class Header extends React.Component {

    render() {
        const { isAuthenticated } = this.props.auth0;
        console.log(isAuthenticated);
        return (
            <>
            
                <Navbar  collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Link to = "/">
                <img className = "logo"src = "https://i.pinimg.com/280x280_RS/04/49/5e/04495e7f52f4ab36c635906a2533753b.jpg" alt = "logoname"/></Link>
                    <Navbar.Brand className= "navbar">MOVIEnest</Navbar.Brand>
                   
                    <Link to="/">HOME</Link>
                    {
                        isAuthenticated &&
                        <Link to="/userprofile">PROFILE</Link>
                    }
                    <Link to="/aboutus">ABOUT US</Link>
                    {
                        !isAuthenticated ? < Login /> : <Logout />
                    }
                </Navbar>
                {/* <Nav fill variant="tabs" defaultActiveKey="/">
                    <Nav.Item>
                        <Nav.Link to="/">Home</Nav.Link>
                    </Nav.Item>
                    {
                        isAuthenticated ?
                            <Nav.Item>
                                <Nav.Link to="./Proflie" eventKey="link-1"> Proflie</Nav.Link>
                            </Nav.Item>
                            :

                            <Nav.Item>
                                <Nav.Link eventKey="disabled" disabled>
                                    Proflie
                                </Nav.Link>
                            </Nav.Item>
                    }
                    <Nav.Item>
                        <Nav.Link to="./AboutUs" eventKey="link-2">AboutUs</Nav.Link>
                    </Nav.Item>
                    {
                        !isAuthenticated ?
                            <Nav.Item>
                                <button onClick={loginWithRedirect}>Login</button>
                            </Nav.Item>
                            :

                            <Nav.Item>
                                <button onClick={() => logout({ returnTo: window.location.origin })}>
                                    Log Out
                                </button>
                            </Nav.Item>
                    }


                </Nav>*/}
            </>

        );
    }
}
export default withAuth0(Header);


