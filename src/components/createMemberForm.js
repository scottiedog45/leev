import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {postMember} from '../actions';

export class CreateMemberForm extends React.Component {
  onSubmit(values) {
    console.log(values);
    this.props.dispatch(postMember(values))
  }

  render() {

    return (
      <form onSubmit={this.props.handleSubmit(values =>
              this.onSubmit(values)
            )}>
      <label htmlFor='form'>Here is the add Member Form</label>
        <label htmlFor='name'>Name</label>
        <Field name='name' id='name' type = 'text' component='input'/>
        <label htmlFor='role'>Role</label>
        <Field name='role' id='role' type='text' component='input'/>
        <label htmlFor='phone'>Phone</label>
        <Field name='phone' id='phone' type='text' component='input'/>
        <label htmlFor='email'>Email</label>
        <Field name='email' id='email' type='text' component='input'/>
        <button type='submit'>Submit</button>
      </form>
    );
  }
}


export default CreateMemberForm = reduxForm({
  form:'member'
})(CreateMemberForm);
