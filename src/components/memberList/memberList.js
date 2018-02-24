import React from 'react';
import {connect} from 'react-redux';
import {deleteMember, loadMembersIfNeeded} from '../../actions';
import {CreateMemberForm} from '../createMemberForm/createMemberForm';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

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

  componentDidMount() {
    console.log('something');
    if (this.props.members !== []) {
      console.log('haaaalp');
      this.props.dispatch(loadMembersIfNeeded(this.props.token));
    }
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
      <p>Members</p>
      <CreateMemberForm />
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
  members: state.leev.members,
  token: state.leev.token
});

export default connect(mapStateToProps)(MemberList);
