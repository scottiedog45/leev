import React from 'react';
import {connect} from 'react-redux'
import {Field, reduxForm, reset} from 'redux-form';
import {postService} from '../../actions';
import {media} from '../style-utils'
import styled from 'styled-components'
import {TimePicker, DatePicker, TextField} from 'redux-form-material-ui'



const CreateButton = styled.button`
  height: 35px;
  width: 300px;
  border-radius: 7px;
  background-color: #EB5E28;
  border: none;
  color: #FFFCF2;
  font-size: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
  margin: 10px 0px 20px 0px;
  ${media.handheld`
    width: 100px;
    margin-left: unset;
    margin-top: unset;
    position: unset;
    margin-bottom: unset;
    `}
`;

const FormTitle = styled.p`
  font-size: 20px;
  text-align: center;
`;

const FormWrapper = styled.div`
  text-align: center;
  border-radius: 10px;
  ${media.handheld`
    text-align: center;
    `}
`;

const Form = styled.form`
  text-align: left;
  margin-left: auto;
  margin-right: auto;
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  width: 400px;
  background-color: #ccc6b9;
  ${media.handheld`
    width: unset;
    `}
`;

const CategoryWrapper = styled.div`
  margin: 10px;
  margin-top: 20px;
`;

const DateTimeWrapper = styled.div`
  margin: 10px;
  margin-top: 20px;
`;

const TimeWrapper = styled.div`
  margin: 10px;
`;

const ButtonWrapper = styled.div`
  margin: 10px;
  text-align: center;
  justify-content: space-around;
  display: flex;
  margin-top:20px;
`;

const Button = styled.button`
  width: 70px;
  background-color: #EB5E28;
  color: white;
  border: none;
  height: 25px;
  border-radius: 5px;
`;

const Legend = styled.legend`
  margin-bottom: 4px;
  font-size: 17px;
`;

//validation
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
const minLength2 = minLength(2)
const required = value => (value ? undefined : 'Required')

export class CreateServiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
  }

  //closes the form when you press submit
  toggleOff(){
    this.setState({
      editing: false
    })
  }

  //opens the form 
  toggleOn(e){
    e.preventDefault();
    this.setState({
      editing: true
    })
  }

  //closes the form when you press cancel
  cancelForm(e) {
    console.log(e);
    e.preventDefault();
    this.setState({
      editing: false
    })
  }

  //creates a new service
  //add members here, grab member list from props
  onSubmit(values) {
    values.members = this.props.members.map(member=> (
       {
        _id: member.id,
        leave: ''
      }
    ));
    this.toggleOff();
    this.props.dispatch(postService(values));
    this.props.dispatch(reset('service'))
  }

  render() {

    console.log(this.props);

    return (
      <FormWrapper>
        {
          !this.state.editing ? <CreateButton className='button' onClick={(e)=>{this.toggleOn(e)}}>+</CreateButton>
          : <Form onSubmit={this.props.handleSubmit((values) =>
              this.onSubmit(values)
            )}>
      <FormTitle>Create Service</FormTitle>
      <CategoryWrapper>
        <Legend>Type</Legend>
        <Field
          name='category'
          id='category'
          component={TextField}
          validate={[minLength2, required]}
          warn={required}/>
      </CategoryWrapper>
      <TimeWrapper>
        <Legend>Time</Legend>
        <Field
          component={TimePicker}
          format={null}
          id='time'
          name='time'
          props={{
              format:'ampm',
              id: 'thinggggg',
              name: 'tryinggggg'
              }}
        />
      </TimeWrapper>
      <DateTimeWrapper>
        <Legend>Date</Legend>
        <Field
          name='date'
          id='date'
          component={DatePicker}
          format= {null}
          props={
            {
              autoOk: true
            }
          }
        />
      </DateTimeWrapper>
      <ButtonWrapper>
        <Button type="submit">Submit</Button>
        <Button type='button' onClick={(e)=>this.toggleOff(e)}>Cancel</Button>
      </ButtonWrapper>
      </Form>
    }
  </FormWrapper>);
  }
}

const mapStateToProps = (state) => ({
  members: state.leev.members
});

CreateServiceForm = reduxForm({
  form: 'service'
})(CreateServiceForm);

CreateServiceForm = connect(
  mapStateToProps
)(CreateServiceForm);

export default CreateServiceForm;






