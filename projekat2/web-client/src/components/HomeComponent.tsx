import React, { Component, Dispatch } from 'react'
import { Row, Col, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Action } from 'redux';
import { getFullReport, getReport, makeTransaction } from '../store/actions/actions';
import { AppState } from '../store/store';
import { connect } from 'react-redux';
import { Report } from '../models/report';
import { TransactionType } from '../models/transaction';
import LogTable from './LogTableComponent';
import CashStateComponent from './CashStateComponent';
import ChangeTrackingProfileComponent from './ChangeTrackingProfileComponent';
import { TransactionInputsComponent } from './TransactionInputsComponent';


interface Props {
  report: Report,
  getFullReport: () => void,
  getReport: (dateFrom: Date, dateTo: Date) => void,
  removeFunds: (amount: number, type: TransactionType, report: Report) => void,
  addFunds: (amount: number, report: Report) => void
}

interface State {
  dateFrom: Date;
  dateTo: Date;
}

export class HomeComponent extends Component<Props, State> {

  componentWillMount() {
    this.props.getFullReport();
  }

  constructor(props) {
    super(props);
    this.state = { dateFrom: undefined, dateTo: undefined }
  }
  render() {
    return (

      <Row>
        <Col style={{ backgroundColor: "#fcfdff" }} className="pt-5 border" md={3}>
          <ChangeTrackingProfileComponent />
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

            <TransactionInputsComponent report={this.props.report} addFunds={this.props.addFunds} removeFunds={this.props.removeFunds} />

            <OverlayTrigger placement='bottom' overlay={<Tooltip id={`tooltip-bottom`}>Transactions and code will reset</Tooltip>}>
              <Button block variant="primary" size="sm" className="rounded-0 my-5" onClick={() => { localStorage.clear(); this.props.getFullReport() }}>Reset profile</Button>
            </OverlayTrigger>

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

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);