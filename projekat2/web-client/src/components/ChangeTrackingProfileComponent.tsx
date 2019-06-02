import React, { Component, Dispatch } from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { getFullReport, checkCode } from '../store/actions/actions';
import { Report } from '../models/report';

interface Props{
  getFullReport: () => void,
  checkCode: (code: string)=>boolean
}

interface State {
  code: string
}

export class ChangeTrackingProfileComponent extends Component<Props, State> {

  componentWillMount(){
    this.setState({code:null})
  }

  render() {
    return (
      <InputGroup className="mb-3 ">
        <FormControl onChange={(e) => { this.setState({ code: e.target.value }); }}
          placeholder="Change code"
          className="rounded-0"
        />
        <InputGroup.Append>
          <Button variant="success" className="rounded-0 text-white" onClick={() => { this.props.checkCode(this.state.code); }}>
            <i className="fas fa-check"></i>
          </Button>
        </InputGroup.Append>
      </InputGroup>
    )
  }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    getFullReport: () => dispatch(getFullReport()),
    checkCode: (code: string) => dispatch(checkCode(code))
  }
}

const connectedHome = connect(null, mapDispatchToProps)(ChangeTrackingProfileComponent);

export default connectedHome;
