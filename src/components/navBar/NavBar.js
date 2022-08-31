
import React from 'react'
import { Navbar, Alignment } from '@blueprintjs/core';


import './nav.scss';
function NavBar() {
    return (
        <>
            <Navbar>
                <Navbar.Group align={Alignment.CENTER}>
                    <Navbar.Heading id='nav'>  <h1>To Do List</h1></Navbar.Heading>
                </Navbar.Group>
            </Navbar>
        </>
    );
}

export default NavBar;