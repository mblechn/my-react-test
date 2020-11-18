import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const NavBar = ({ user }) => {
  return (
    <Navbar bg="light" expand="md">
      <Navbar.Brand style={{ cursor: "default" }} href="">MedEdSearch</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/logout">Logout</NavLink>
              <NavLink className="nav-item nav-link" to="/">{user.username}</NavLink>
            </React.Fragment>
          )}
          {(1===2) && (
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
        {(1===2) && (
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
