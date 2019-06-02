import React, { Component } from 'react'
import { Report } from '../models/report';
import { TransactionType } from '../models/transaction';
import { InputGroup, FormControl, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';

interface Props {
  report: Report;
  removeFunds: (amount: number, type: TransactionType, report: Report) => void;
  addFunds: (amount: number, report: Report) => void;
}

interface State {
  addAmount: number;
  removeAmount: number;
  necessaryTransaction: boolean;
}

export class TransactionInputsComponent extends Component<Props,State> {
  constructor(props) {
    super(props);
    this.state = { necessaryTransaction: false, addAmount: 0, removeAmount: 0 }
  }

  render() {
    return (
      <div>
        <InputGroup className="mb-3 ">
          <FormControl type="number" min="0" onChange={(e) => { this.setState({ addAmount: parseInt(e.target.value) }) }}
            placeholder="Income amount"
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
            placeholder="Spent amount"
            className="rounded-0"
          />
          <InputGroup.Append>
            <Button variant="secondary" className="rounded-0" onClick={() => { this.props.removeFunds(this.state.removeAmount, this.state.necessaryTransaction ? TransactionType.necessary : TransactionType.unnecessary, this.props.report); }}>
              <i className="fas fa-minus-square"></i>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    )
  }
}


export default TransactionInputsComponent;