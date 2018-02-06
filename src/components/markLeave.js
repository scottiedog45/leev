import React from 'react';
import {putLeave} from '../actions'
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form'

class MarkLeave extends React.Component {

  handleChange(event, member, service) {
    let reason = event.target.value;
    this.props.dispatch(putLeave(reason, member, service));
  }

  render() {

    const leaveMenu = (
      <Field name='hi' component='input' type='select'>
        <option value='No Leave'>No Leave </option>
        <option value='sick'>Sick</option>
        <option value='personal'>Personal</option>
        <option value='medical'>Medical</option>
        <option value='vacation'>Vacation</option>
        <option value='left'>Left</option>
      </Field>
    );

    return (
      <div>
        {leaveMenu}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

MarkLeave = reduxForm({
  form:'Markleave'
})(MarkLeave);

export default connect(mapDispatchToProps)(MarkLeave);
