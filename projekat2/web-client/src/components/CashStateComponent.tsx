import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap';
import SpendingsComponent from './SpendingsComponent';
import { Spendings } from '../models/spendings';

interface Props {
  availableFunds: number,
  totalSpendings: Spendings,
  selectedSpendings: Spendings
}

export default class CashStateComponent extends Component<Props,any> {
  render() {
    return (
      <ListGroup className="text-center mb-3">
        <ListGroup.Item variant="dark" className="rounded-0 py-0">Current funds:</ListGroup.Item>
        <ListGroup.Item variant="success">
          <span className="mb-4 text-dark font-weight-bold">{this.props.availableFunds}</span>
        </ListGroup.Item>
        <ListGroup.Item variant="dark" className="py-0">Total spendings:</ListGroup.Item>
        <ListGroup.Item variant="secondary" className="rounded-0">

          <SpendingsComponent spendings={this.props.totalSpendings} />

        </ListGroup.Item>
        <ListGroup.Item variant="dark" className="py-0">Selected spendings:</ListGroup.Item>
        <ListGroup.Item variant="secondary" className="rounded-0">

          <SpendingsComponent spendings={this.props.selectedSpendings} />

        </ListGroup.Item>

      </ListGroup>
    )
  }
}
