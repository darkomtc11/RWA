import React, { Component } from 'react'
import { Navbar, Container } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap';

export default class MenuComponent extends Component {

  render() {
    return (
      <Navbar bg="secondary" variant="dark">
        <Container className="d-flex align-items-center justify-content-center"> 
          <LinkContainer to="/"><Navbar.Brand className="m-0">Cash Smash™</Navbar.Brand></LinkContainer>
        </Container>
      </Navbar>
    )
  }
}
