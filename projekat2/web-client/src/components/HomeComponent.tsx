import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import { Row, Col, Button } from 'react-bootstrap';

export default class Home extends Component {
    render() {
        return (

            <Row>
                <Col className="pt-5 border" xs={3}>
                    <div className="small text-center font-weight-bold d-flex flex-column">
                        <span className="">Available: </span>
                        <span className="mb-4 text-success">10.000,00</span>
                    </div>
                    <div className="small text-center font-weight-bold d-flex flex-column">
                        <span className="">Spent: </span>
                        <span><span className="mr-2 text-danger">1.000,00</span>/<span className="ml-2 text-info">4.000,00</span></span>

                    </div>

                </Col>
                <Col style={{ backgroundColor: "#f2f2f2" }} xs={6} className="p-0 pt-2">
                    <div className="d-flex flex-column">
                        <div className="text-center">
                            <label>Survive trough</label>
                        </div>
                        
                        <div className="text-center text-warning border border-right-0 border-left-0">
                            <span className="mr-3">05.05.2019.</span>
                            -
                            <span className="ml-3">05.06.2019.</span>
                        </div>

                    </div>
                </Col>
                <Col className="pt-5 border" style={{ height: 300 }} xs={3}>
                    <div className="small text-center font-weight-bold">
                        <label>Fund actions</label>
                    </div>
                    <div className="text-center">
                        <Button variant="success" className="mr-2 mb-2 rounded-0">
                            <i className="fas fa-plus-square"></i>
                        </Button>
                        <Button variant="danger" className="mr-2 mb-2 rounded-0">
                            <i className="fas fa-minus-square"></i>
                        </Button>
                    </div>
                </Col>
            </Row>

        )
    }
}
