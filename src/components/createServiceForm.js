import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {postService} from '../actions';

export class CreateServiceForm extends React.Component {
  onSubmit(values) {
    this.props.dispatch(postService(values))
  }

  render() {

    return (
      <form onSubmit={this.props.handleSubmit(values =>
              this.onSubmit(values)
            )}>
      <label htmlFor='form'>Here is the add Service Form</label>
        <label htmlFor='category'>Type</label>
        <Field name='category' id='category' type = 'text' component='input'/>
        <label htmlFor='date'>Date Time</label>
        <Field name='dateTime' id='dateTime' type='datetime-local' component='input'/>
        <button type='submit'>Create Service</button>
      </form>
    );
  }
}


export default CreateServiceForm = reduxForm({
  form:'service'
})(CreateServiceForm);
