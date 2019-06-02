import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import { Transaction } from '../models/transaction';
import LogTypeComponent from './LogTypeComponent';

interface Props {
  transactions: Transaction[];
}

interface State {
}

export default class LogTableComponent extends Component<Props, State> {
  render() {
    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Amount</th>
            <th></th>
            <th>Timestamp</th>
            <th>Current funds</th>
          </tr>
        </thead>
        <tbody>
          {this.props.transactions.map((x, i) =>
            <tr key={i+1}>
              <td>{i+1}</td>
              <td>{x.amount}</td>
              <td className="text-center">
                <LogTypeComponent type={x.type}/>
              </td>
              <td>{new Date(x.date).toLocaleString()}</td>
              <td>{x.currentFunds}</td>
            </tr>
          )}
        </tbody>
      </Table>
    )
  }
}
