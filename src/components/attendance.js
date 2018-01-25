import React from 'react';
import {connect} from 'react-redux';
import {removeMemberFromService, addMemberToService, adjustRoster} from '../actions';
import {Field, reduxForm} from 'redux-form';
import MarkLeave from './markLeave';

class Attendance extends React.Component {

  onSubmit(event) {
    event.preventDefault();
    console.log(event);
    let tempArray = this.props.service.people.slice().filter(String);
    this.props.dispatch(adjustRoster(tempArray, this.props.service.id));
  }

  onChangeAction(id, event) {
    if (!event.checked) {
      this.props.dispatch(removeMemberFromService(event.name, this.props.service.id))
    } else {
    this.props.dispatch(addMemberToService(event.name, this.props.service.id))
    }
  }

  render() {

    const all = this.props.members.map((member, index) => (
      <li key={index}>
        <input
          id={member.id}
          component='input'
          defaultChecked={this.props.service.people.includes(member.id)}
          onChange={event => this.onChangeAction(member.id, event.target)}
          type='checkbox'
          name={member.id}/>
          <label>{member.name}</label>
          {(this.props.service.people.includes(member.id)) && <MarkLeave serviceId={this.props.service.id} memberId={member.id}/>}
      </li>
    ))

    return (
      <div>
      <button>Select All</button>
      <form onSubmit={(event) => this.onSubmit(event)}>
        <ul>
          {all}
        </ul>
        <button type='submit'
          >Save Changes</button>
      </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  service: state.leev.services.find(service =>
    service.id === (ownProps.match.params.serviceId)),
  members: state.leev.members
});

export default connect (mapStateToProps)(Attendance);
