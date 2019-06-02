import React, { Component, Dispatch } from 'react'
import { Button, FormControl, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { checkCode } from '../store/actions/actions';
import { AppState } from '../store/store';
import { Report } from '../models/report';

interface Props {
  report: Report,
  checkCode: (code: string) => boolean
}

interface State {
  code: string
}

export class ChangeTrackingProfileComponent extends Component<Props, State> {

  componentWillMount() {
    this.setState({ code: null })
  }

  render() {
    return (
      <div>
        <span className="small text-danger">Your profile code: {this.props.report.id}</span>
        <OverlayTrigger placement='right' overlay={<Tooltip id={`tooltip-right`}>Save your current code before changing profile!</Tooltip>}>
          <InputGroup className="my-3 ">
            <FormControl onChange={(e) => { this.setState({ code: e.target.value }); }}
              placeholder="Profile code"
              className="rounded-0"
            />
            <InputGroup.Append>
              <Button variant="primary" className="rounded-0 text-white" onClick={() => { this.props.checkCode(this.state.code); }}>
                <i className="fas fa-sync-alt"></i>
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </OverlayTrigger>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    checkCode: (code: string) => dispatch(checkCode(code))
  }
}

function mapStateToProps(state: AppState) {
  return {
    report: state.report
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeTrackingProfileComponent);
