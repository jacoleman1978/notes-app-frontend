import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';

const NavBar = () => {
    return (
        <Navbar bg='light' expand='lg' >
        <div>
            <Navbar.Brand href='/'>Notes App</Navbar.Brand>
            <Nav fill variant="pills">
                <Nav.Link href='/notes'>Home</Nav.Link>
                <Nav.Link href='/notes/new/topic'>New Topic</Nav.Link>
                <Nav.Link href='/notes/new/note'>New Note</Nav.Link>
                <Nav.Link href='/auth/login'>Logout</Nav.Link>
            </Nav>
        </div>
    </Navbar>
    )
}

export default NavBar;