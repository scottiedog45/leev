import React from 'react';
// import {connect} from 'react-redux';
import {Field, reduxForm, reset} from 'redux-form';
import {postMember} from '../../actions';
import styled from 'styled-components';
import {media} from '../style-utils';

//validation for fields
const required = value => (value ? undefined : 'Required')
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined
const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined

const CreateMemberButton = styled.button`
  height: 35px;
  width: 300px;
  border-radius: 7px;
  background-color: #EB5E28;
  border: none;
  color: #FFFCF2;
  font-size: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 20px;
  ${media.handheld`
    margin-left: unset;
    margin-top: unset;
    position: unset;
    margin-bottom: unset;
    `}
`;

const FormContainer = styled.div`
border-radius: 10px;
${media.handheld`
  text-align: center;
  `}
`;

const Legend = styled.legend`
  margin-bottom: 4px;
  font-size: 17px;
`;

const Form = styled.form`
  width: 400px;
  margin-right: auto;
  margin-left: auto;
  padding: 10px;
  border-radius: 5px;
  background-color: #ccc6b9;
`;

const FormTitle = styled.p`
  font-size: 20px;
  text-align: center;
`;

const InputWrapper = styled.div`
margin: 10px;
margin-top: 20px;
text-align: left;
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

export class CreateMemberForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showForm: false
    }
  }

  toggleOn(e) {
    e.preventDefault();
    this.setState({
      showForm: true
    });
  }

  cancelForm(e) {
    e.preventDefault();
    this.setState({
      showForm: false
    })
  }

  toggleOff() {
    this.setState({
      showForm: false
    })
  }

  onSubmit(values) {
    this.toggleOff();
    this.props.dispatch(postMember(values));
    this.props.dispatch(reset('member'));
  }

  renderField ({
   input,
   label,
   type,
   meta: { touched, error, warning }
   }) {
     return  (
       <div>
         <label>{label}</label>
         <div>
           <input {...input} placeholder={label} type={type} />
           {touched &&
             ((error && <span>{error}</span>) ||
               (warning && <span>{warning}</span>))}
         </div>
       </div>
     )
   }

  render() {

    return (
      <FormContainer>
        {this.state.showForm ? (
          <Form onSubmit={this.props.handleSubmit((values) => this.onSubmit(values))}>
          <FormTitle>Create Member</FormTitle>
            <InputWrapper>
              <Legend>Full Name</Legend>
              <Field
                name="name"
                type="text"
                component={this.renderField}
                validate={[required, maxLength15, minLength2]}
                warn={alphaNumeric}
              />
            </InputWrapper>
            <InputWrapper>
            <Legend>Role</Legend>
            <Field
              name="role"
              type="text"
              component={this.renderField}
              validate={[required, maxLength15, minLength2]}
              warn={alphaNumeric}
            />
            </InputWrapper>
            <InputWrapper>
            <Legend>Email</Legend>
            <Field
              name="email"
              type="email"
              component={this.renderField}
              validate={[email, required]}
            />
            </InputWrapper>
            <InputWrapper>
            <Legend>Phone Number</Legend>
            <Field
              name="phone"
              type="number"
              component={this.renderField}
              validate={[required, phoneNumber]}
            />
            </InputWrapper>
          <ButtonWrapper>
            <Button type="submit">Submit</Button>
            <Button type="button" onClick={(e)=>this.cancelForm(e)}>Cancel</Button>
          </ButtonWrapper>
        </Form>
      ) : (
      <CreateMemberButton onClick={(e)=>this.toggleOn(e)}>+</CreateMemberButton>
      )}
      </FormContainer>
    );
  }
}


export default CreateMemberForm = reduxForm({
  form:'member'
})(CreateMemberForm);
