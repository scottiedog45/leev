import React from 'react';
import {changeLeaveReason} from '../actions'
import {connect} from 'react-redux';

class MarkLeave extends React.Component {

  handleChange(event, member, service) {
    let reason = event.target.value;
    this.props.dispatch(changeLeaveReason(reason, member, service));
  }

  render() {

    const leaveMenu = (
      <select onChange={event => this.handleChange(event, this.props.memberId, this.props.serviceId)}>
        <option value='No Leave'>No Leave </option>
        <option value='sick'>Sick</option>
        <option value='personal'>Personal</option>
        <option value='medical'>Medical</option>
        <option value='vacation'>Vacation</option>
        <option value='left'>Left</option>
      </select>
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

export default connect(mapDispatchToProps)(MarkLeave);
