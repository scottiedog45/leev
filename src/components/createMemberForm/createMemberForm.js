import React from 'react';
// import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {postMember} from '../../actions';
import './createMemberForm.css';

const required = value => (value ? undefined : 'Required')
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)
// const number = value =>
//   value && isNaN(Number(value)) ? 'Must be a number' : undefined
// const minValue = min => value =>
//   value && value < min ? `Must be at least ${min}` : undefined
// const minValue18 = minValue(18)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
// const tooOld = value =>
//   value && value > 65 ? 'You might be too old for this' : undefined
// const aol = value =>
//   value && /.+@aol\.com/.test(value)
//     ? 'Really? You still use AOL for your email?'
//     : undefined
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined
const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined

export class CreateMemberForm extends React.Component {

  onSubmit(values) {
    this.props.dispatch(postMember(values));
    this.props.reset();
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
      <form onSubmit={this.props.handleSubmit((values) =>
              this.onSubmit(values)
            )}>
            <Field
              name="name"
              type="text"
              component={this.renderField}
              label="Full Name"
              validate={[required, maxLength15, minLength2]}
              warn={alphaNumeric}
            />
            <Field
              name="role"
              type="text"
              component={this.renderField}
              label="Role"
              validate={[required, maxLength15, minLength2]}
              warn={alphaNumeric}
            />
            <Field
              name="email"
              type="email"
              component={this.renderField}
              label="Email"
              validate={[email, required]}
            />
            <Field
              name="phone"
              type="number"
              component={this.renderField}
              label="Phone number"
              validate={[required, phoneNumber]}
            />
        <button type='submit'>Submit</button>
      </form>
    );
  }
}


export default CreateMemberForm = reduxForm({
  form:'member'
})(CreateMemberForm);
