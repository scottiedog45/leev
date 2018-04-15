import React from 'react'
import {TextField} from 'redux-form-material-ui'
import {Field, reduxForm} from 'redux-form'
import styled from 'styled-components';
import {patchAllottedLeave} from '../../actions'

const InputContainer = styled.div`
  display: inline-block;
`;

const FlexContainer = styled.div`
display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Form = styled.form`
  
`;

const ButtonContainer = styled.div`

`;

class LeaveIncrementors extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      medical: this.props.member.allottedLeave.medical,
      left: this.props.member.allottedLeave.left,
      vacation: this.props.member.allottedLeave.vacation,
      late: this.props.member.allottedLeave.late,
      sick: this.props.member.allottedLeave.sick,
      relief: this.props.member.allottedLeave.relief,
      bereavement: this.props.member.allottedLeave.bereavement,
      pregnancy: this.props.member.allottedLeave.pregnancy,
      maternity: this.props.member.allottedLeave.maternity,
      military: this.props.member.allottedLeave.military,
      jury: this.props.member.allottedLeave.jury,
      religious: this.props.member.allottedLeave.religious,
      holiday: this.props.member.allottedLeave.holiday,
      voting: this.props.member.allottedLeave.voting
    }
  }

  incrementAllottedLeave = () => {

  }

  decrementAllottedLeave = () => {

  }

  onSubmit(values) {
    let id = this.props.member.id;
    this.props.dispatch(patchAllottedLeave(id, values));
  }

  handleChange(event) {
    this.setState({
      [event.target.name]:event.target.value
    });
    console.log(event.target.value);
    console.log(event.target.name);
    console.log(this.state);
  }

  render() {

    const leaveIncrementor = Object.keys(this.props.member.allottedLeave).map(
      (leaveType, index) => (
        <InputContainer>
        <legend>{leaveType}</legend>
        <Field
          name={leaveType}
          component={TextField}
          key={index}
          legend={leaveType}
          
          props={{
            value: this.state[leaveType],
            onChange: e => this.handleChange(e)
          }}
          />
          </InputContainer>
      )
    )

    return(
  
        <Form onSubmit={this.props.handleSubmit((values) =>
          this.onSubmit(values)
        )}>
        <FlexContainer>
        {leaveIncrementor}
        </FlexContainer>
      <button type="submit">submit</button>
      </Form>
     
    )
  } 
}

export default LeaveIncrementors = reduxForm({
  form: 'LeaveIncrementors'
})(LeaveIncrementors);