import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import { Link as RRNavLink } from 'react-router-dom';
import faceIcon from './../assets/faceIcon.png';

export default class Example extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar className="navbar-dark bg-primary" expand="md">
          <NavbarBrand href="/">
            <img alt='Logo' className='logo' height='30' width='30' src={faceIcon}></img>
            Face recognition
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink to="/" active tag={RRNavLink}>Home</NavLink> 
              </NavItem>
              <NavItem>
                <NavLink to="/galleries" active tag={RRNavLink}>Galleries</NavLink> 
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}