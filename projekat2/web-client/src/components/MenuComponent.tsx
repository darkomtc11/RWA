import React, { Component } from 'react'
import { Navbar, Container } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap';

export default class Menu extends Component {

    render() {
        return (
            <Navbar bg="secondary" variant="dark">
                <Container className="d-flex align-items-center justify-content-center">
                    <LinkContainer to="/"><Navbar.Brand className="m-0">Ca$h Smash™</Navbar.Brand></LinkContainer>
                </Container>
            </Navbar>
        )
    }
}
