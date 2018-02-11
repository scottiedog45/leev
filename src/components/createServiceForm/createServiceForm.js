import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {postService} from '../../actions';
import './createServiceForm.css';

export class CreateServiceForm extends React.Component {
  onSubmit(values) {
    this.props.dispatch(postService(values))
  }

  render() {

    return (
      <form className ='serviceForm' onSubmit={this.props.handleSubmit(values =>
              this.onSubmit(values)
            )}>
      <label htmlFor='form'>Create New Service:</label>
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
