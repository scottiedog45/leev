import React from 'react';
import {connect} from 'react-redux';
import {deleteMember, loadMembersIfNeeded} from '../../actions';
import {CreateMemberForm} from '../createMemberForm/createMemberForm';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const CreateMemberButton = styled.button`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  position: fixed;
  margin-left: 20px;
  background-color: #EB5E28;
  border: none;
  color: #FFFCF2;
  font-size: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
`;

const Name = styled.h3`
  margin-bottom: 0px;
`;

const Role = styled.h4`
margin-top: 9px;
margin-bottom: 9px;
font-size: 13px;
`;

const ListContainer = styled.div`

`;

const PeopleSection = styled.section`
  margin-left: 200px;
`;

const PeopleList = styled.ul`
list-style: none;
padding-left: 0px;
`;

const Person = styled.li`
  margin-top: 35px;
`;

const Button = styled.button`
  width: 70px;
  background-color: #CCC5B9;
  color: #403d39;
  border: none;
  height: 25px;
`;

const DeleteButton = Button.extend`
  margin-left: 20px;
`;

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
      <Person key={index}>
        <Name>{member.name}</Name>
        <Role>{member.role}</Role>
        <Link to = {`/members/${member.id}`}>
          <Button id={member.id}>Details</Button>
        </Link>
        <DeleteButton id={member.id} onClick={
          (e)=> this.onDelete(e.target.id)}>Delete</DeleteButton>
      </Person>
    ))

    return (

      <ListContainer>
      {!this.state.showForm ? <CreateMemberButton
        onClick={(e)=> this.toggle()}
      >Create New Member</CreateMemberButton> :
      <div>
      <CreateMemberForm />
      <button onClick={(e)=>this.toggle()}>Cancel</button>
      </div>}
        <PeopleSection>
        <PeopleList>
          {members}
        </PeopleList>
        </PeopleSection>
      </ListContainer>
    )
  }
}

const mapStateToProps = state => ({
  members: state.leev.members
});

export default connect(mapStateToProps)(MemberList);
