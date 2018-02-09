import React from 'react';
import {connect} from 'react-redux';
import {deleteMember} from '../actions';
import {CreateMemberForm} from './createMemberForm';
import {Link} from 'react-router-dom';
import ChangeServices from './changeServices';

class MemberList extends React.Component{

  onDelete(id) {
    let r =window.confirm('Do you want to delete this member?');
    if (r === false) {
      return;
    } else {
      this.props.dispatch(deleteMember(id));
    }
  }

  render () {
    const members = this.props.members.map((member, index) => (
      <li>
        <h2>{member.name}</h2>
        <h3>{member.role}</h3>
        <h4>{member.email}</h4>
        <h4>{member.phone}</h4>
        <button id={member.id} onClick={
          (e)=> this.onDelete(e.target.id)}>Delete</button>
        <Link to = {`/members/${member.id}`} component = {ChangeServices}>
          <button id={member.id}>Details</button>
        </Link>
      </li>
    ))

    return (

      <div className='personnelList'>
      <CreateMemberForm />
        <button
          name='createNewMember'
          id='createNewMember'
          className='button'
        >Create New Member</button>
        <ul className='allPeople'>
          {members}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  members: state.leev.members
});

export default connect(mapStateToProps)(MemberList);
