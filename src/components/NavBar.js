import React, {useContext, useEffect} from 'react';
import {Navbar, Button} from 'react-bootstrap';
import { CurrentUser } from '../contexts/currentUser';
import UserDataService from '../services/userDataService';

// Called from App.js
const NavBar = () => {  
    // Store current user session after successful login
    const {currentUser, setCurrentUser} = useContext(CurrentUser);

    useEffect(() => {
        UserDataService.CheckSessionUser().then(res => setCurrentUser(res.data));
    }, [setCurrentUser])
    
    
    // When logout button is clicked, clear the session
    const handleLogoutClick = () => {
        UserDataService.Logout();
    };

    // Component styling
    const navStyle = {
        display: "flex",
        padding: "0.5rem 1rem",
        backgroundColor: "#B5B29E",
        borderRadius: "1rem",
        margin: "0.5rem 0rem"
    };

    const logoutButtonStyle = {
        marginLeft: "auto",
        borderRadius: "0.5rem"
    };
    
    return (
        <Navbar expand='lg' style={navStyle}>
            <Navbar.Brand href='/'>Notes App</Navbar.Brand>
                {currentUser !== null ? <Button 
                    variant="primary" 
                    type="button" 
                    onClick={handleLogoutClick} 
                    href='/auth/login'
                    style={logoutButtonStyle}
                >
                    Logout
                </Button> : ""}
        </Navbar>
    )
}

export default NavBar;