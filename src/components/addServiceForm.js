import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {addService} from '../actions';

export class AddServiceForm extends React.Component {
  onSubmit(values) {
    console.log(values);
    this.props.dispatch(addService(values))
  }


  render() {

    return (
      <form onSubmit={this.props.handleSubmit(values =>
              this.onSubmit(values)
            )}>
      <label htmlFor='form'>Here is the add Service Form</label>
        <label htmlFor='type'>Type</label>
        <Field name='type' id='type' type = 'text' component='input'/>
        <label htmlFor='date'>Date Time</label>
        <Field name='datetime' id='datetime' type='datetime-local' component='input'/>
        <button type='submit'>Create Service</button>
      </form>
    );
  }
}


export default AddServiceForm = reduxForm({
  form:'service'
})(AddServiceForm);
