import React from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap';
import UserDataService from '../services/userDataService';

const NavBar = () => {  
    const handleLogoutClick = () => {
        UserDataService.Logout();
    }
    
    return (
        <Navbar bg='light' expand='lg' >
        <div>
            <Navbar.Brand href='/'>Notes App</Navbar.Brand>
            <Nav fill variant="pills">
                <Button variant="primary" type="button" onClick={handleLogoutClick} href='/auth/login'>
                    Logout
                </Button>
            </Nav>
        </div>
    </Navbar>
    )
}

export default NavBar;