import React, { Component } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { TransactionType } from '../models/transaction';

interface Props{
  type: TransactionType
}

export default class LogTypeComponent extends Component<Props,any> {
  render() {
    return (
      <OverlayTrigger placement='bottom'
        overlay={
          <Tooltip id={`tooltip-bottom`}>
            {
              this.props.type === TransactionType.necessary ? (<span>Necessary spendings</span>) : this.props.type === TransactionType.unnecessary ? (<span>Unnecessary spendings</span>) : (<span>Income</span>)
            }
          </Tooltip>
        }>
        {
          this.props.type === TransactionType.necessary ? (<i className="fas fa-long-arrow-alt-up text-info"></i>) : this.props.type === TransactionType.unnecessary ? (<i className="fas fa-long-arrow-alt-up text-secondary"></i>) : (<i className="fas fa-long-arrow-alt-down text-success"></i>)
        }
      </OverlayTrigger>
    )
  }
}
