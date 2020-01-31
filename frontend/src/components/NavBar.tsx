import * as React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../state/rootReducer";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../state/user/actions";
import { Redirect } from "react-router-dom";

function NavTab(props: {to: string; display: string;}){
    const { to, display } = props;
    return(
        <LinkContainer className="nav-link" to={to} style={{cursor: "pointer"}}><h5>{display}</h5></LinkContainer>
    );
}

function NavBar(){
    const user = useSelector((state: State) => state.user);
    const dispatch = useDispatch();

    const logoutAndRedirect = () => {
        dispatch(logout());
        return <Redirect push to="/login" />
    }
    
    return(
        <Navbar bg="dark" variant="dark" className="justify-content-md-around justify-content-between py-1">
            <Nav>
            <LinkContainer to="/"><Navbar.Brand className="d-none d-md-block" href="/home"><h4>UndefinedRP</h4></Navbar.Brand></LinkContainer>
                <NavTab to="/test" display="Forum" />
                <NavTab to="/test2" display="Test" />
            </Nav>
            {user.userId != null
            ?
                <Nav>
                    <NavDropdown className="mr-5" title={<h5 style={{display: "inline-block"}}>{user.userName}</h5>} id="collasible-nav-dropdown">
                        <LinkContainer onClick={() => console.log()} to="/profile"><NavDropdown.Item>Profile</NavDropdown.Item></LinkContainer>
                        <LinkContainer to="/account_settings"><NavDropdown.Item>Account Settings</NavDropdown.Item></LinkContainer>
                        <NavDropdown.Divider />
                        <LinkContainer to="/login" onClick={logoutAndRedirect}><NavDropdown.Item>Logout</NavDropdown.Item></LinkContainer>
                    </NavDropdown>
                </Nav>
            :
                <Nav>
                    <NavTab to="/login" display="Login" />
                    <NavTab to="/register" display="Register" />
                </Nav>}
        </Navbar>
    );
}

export default NavBar;