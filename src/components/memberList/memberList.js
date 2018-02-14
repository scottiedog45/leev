import React from 'react';
import {connect} from 'react-redux';
import {deleteMember, loadMembersIfNeeded} from '../../actions';
import {CreateMemberForm} from '../createMemberForm/createMemberForm';
import {Link} from 'react-router-dom';

class MemberList extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      showForm: false}
  }

  componentDidMount() {
    if (!this.props.members) {
      this.props.dispatch(loadMembersIfNeeded());
    }
  }

  toggle() {
    this.setState({showForm: !this.state.showForm});
    console.log(this.state.showForm);
  }

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
      <li key={index}>
        <h2>{member.name}</h2>
        <Link to = {`/members/${member.id}`}>
          <button id={member.id}>Details</button>
        </Link>
        <button id={member.id} onClick={
          (e)=> this.onDelete(e.target.id)}>Delete</button>
      </li>
    ))

    return (

      <div className='personnelList'>
      {!this.state.showForm ? <button
        name='createNewMember'
        id='createNewMember'
        className='button'
        onClick={(e)=> this.toggle()}
      >Create New Member</button> :
      <div>
      <CreateMemberForm />
      <button onClick={(e)=>this.toggle()}>Cancel</button>
      </div>}
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
