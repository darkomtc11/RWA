import React, { Component } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Spendings } from '../models/spendings';

interface Props {
  spendings: Spendings
}

export default class SpendingsComponent extends Component<Props, any> {
  render() {
    return (
      <span className="font-weight-bold">
        <OverlayTrigger placement='bottom' overlay={<Tooltip id={`tooltip-bottom`}> Necessary spendings</Tooltip>}>
          <span className="mr-2 text-info">{this.props.spendings.necessarySpendings}</span>
        </OverlayTrigger>
        |
        <OverlayTrigger placement='bottom' overlay={<Tooltip id={`tooltip-bottom`}> Unnecessary spendings </Tooltip>}>
          <span className="ml-2 text-secondary">{this.props.spendings.unnecessarySpendings}</span>
        </OverlayTrigger>
      </span>
    )
  }
}
