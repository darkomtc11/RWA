import React, { Component, Dispatch } from 'react'
import { Row, Col, Button, InputGroup, FormControl, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Action } from 'redux';
import { getFullReport, getReport, makeTransaction } from '../store/actions/actions';
import { AppState } from '../store/store';
import { connect } from 'react-redux';
import { Report } from '../models/report';
import { TransactionType } from '../models/transaction';
import LogTable from './LogTableComponent';
import CashStateComponent from './CashStateComponent';


interface Props {
  report: Report,
  getFullReport: () => Report,
  getReport: (dateFrom: Date, dateTo: Date) => Report,
  removeFunds: (amount: number, type: TransactionType, report: Report) => void,
  addFunds: (amount: number, report: Report) => void
}

interface State {
  addAmount: number;
  removeAmount: number;
  necessaryTransaction: boolean;
  dateFrom: Date;
  dateTo: Date;
}

export class HomeComponent extends Component<Props, State> {

  componentWillMount() {
    this.props.getFullReport();
  }

  constructor(props) {
    super(props);
    this.state = { necessaryTransaction: false, addAmount: 0, removeAmount: 0, dateFrom: new Date(), dateTo: new Date() }
  }
  render() {
    return (

      <Row>
        <Col style={{ backgroundColor: "#fcfdff" }} className="pt-5 border" md={3}>

          <div className="small text-center font-weight-bold">
            <label>Cash state</label>
          </div>

          <CashStateComponent
            totalSpendings={this.props.report.totalSpendings}
            selectedSpendings={this.props.report.selectedSpendings}
            availableFunds={this.props.report.availableFunds} />

        </Col>
        <Col style={{ backgroundColor: "#fcfdff" }} md={6} className="p-0 pt-2 border-bottom">
          <div className="d-flex flex-column px-3">
            <div className="text-center">
              <label>Transaction log</label>
            </div>

            <Row className="justify-content-between">
              <Col xs={5}>
                <Form.Control type="date" className="rounded-0" size="sm" onChange={(e) => { this.setState({ dateFrom: e.target.value }) }} />
              </Col>
              <Col xs={2} className="text-center mt-1">-</Col>
              <Col xs={5}>
                <Form.Control type="date" className="rounded-0" size="sm" onChange={(e) => { this.setState({ dateTo: e.target.value }) }} />
              </Col>

            </Row>
            <Button variant={"info"} size="sm" block className="my-3 rounded-0" onClick={() => { this.props.getReport(this.state.dateFrom, this.state.dateTo) }}>Show log</Button>

            <LogTable transactions={this.props.report.selectedTransactions} />

          </div>
        </Col>
        <Col className="pt-5 border" style={{ backgroundColor: "#fcfdff" }} md={3}>
          <div className="small text-center font-weight-bold">
            <label>Make transaction</label>
          </div>
          <div className="text-center">
            <InputGroup className="mb-3 ">
              <FormControl type="number" min="0" onChange={(e) => { this.setState({ addAmount: parseInt(e.target.value) }) }}
                placeholder="Amount to add"
                className="rounded-0"
              />
              <InputGroup.Append>
                <Button variant="success" className="rounded-0 text-white" onClick={() => { this.props.addFunds(this.state.addAmount, this.props.report) }}>
                  <i className="fas fa-plus-square"></i>
                </Button>
              </InputGroup.Append>
            </InputGroup>

            <InputGroup className="mb-3 rounded-0">
              <InputGroup.Prepend className="rounded-0">


                <OverlayTrigger key='bottom' placement='bottom'
                  overlay={
                    <Tooltip id={`tooltip-bottom`}>
                      Necessary transaction
                      </Tooltip>
                  }>
                  <InputGroup.Checkbox onChange={(e) => { this.setState({ necessaryTransaction: e.target.checked }) }} defaultChecked={this.state.necessaryTransaction} className="rounded-0" />

                </OverlayTrigger>


              </InputGroup.Prepend>
              <FormControl type="number" min="0" onChange={(e) => { this.setState({ removeAmount: parseInt(e.target.value) }) }}
                placeholder="Amount to remove"
                className="rounded-0"
              />
              <InputGroup.Append>
                <Button variant="secondary" className="rounded-0" onClick={() => { this.props.removeFunds(this.state.removeAmount, this.state.necessaryTransaction ? TransactionType.necessary : TransactionType.unnecessary, this.props.report); console.log(this.state.necessaryTransaction) }}>
                  <i className="fas fa-minus-square"></i>
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </Col>
      </Row>

    )
  }
}


function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    getFullReport: () => dispatch(getFullReport()),
    getReport: (dateFrom: Date, dateTo: Date) => dispatch(getReport(dateFrom, dateTo)),
    addFunds: (amount: number, report: Report) => dispatch(makeTransaction(amount, TransactionType.none, report)),
    removeFunds: (amount: number, type: TransactionType, report: Report) => dispatch(makeTransaction(-amount, type, report)),
  }
}
function mapStateToProps(state: AppState) {
  return {
    report: state.report
  }
}

const connectedHome = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

export default connectedHome;