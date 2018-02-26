import React from 'react';
import {connect} from 'react-redux';
import {deleteMember, loadMembersIfNeeded} from '../../actions';
import {CreateMemberForm} from '../createMemberForm/createMemberForm';
import {Link} from 'react-router-dom';
import styled from 'styled-components';


const Name = styled.h3`
  margin-bottom: 0px;
  &:first-child {
    margin-top: 0px;
  }
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

const Title = styled.p`
  font-size: 90px;
  margin-top: 0px;
  margin-left: 20px;
  margin-bottom: 0px;
`;

const TdName = styled.td`
  width: 200px;
`;

const TdRole = styled.td`
  width: 150px
`;

const Tr = styled.tr`
  height: 75px;
`;

const Form = styled.div`
  position: absolute;
  width: 400px;
`;

class MemberList extends React.Component{

  componentDidMount() {
    if (this.props.members !== []) {
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
      <Tr key={index}>
      <TdName>
        <Name>{member.name}</Name>
      </TdName>
      <TdRole>
        <Role>{member.role}</Role>
      </TdRole>
      <td>
        <Link to = {`/members/${member.id}`}>
          <Button id={member.id}>Details</Button>
        </Link>
        <DeleteButton id={member.id} onClick={
          (e)=> this.onDelete(e.target.id)}>Delete</DeleteButton>
      </td>
      </Tr>
    ))

    return (

      <ListContainer>
        <Title>Members</Title>
        <Form>
          <CreateMemberForm />
        </Form>
        <PeopleSection>
          <table>
          <tbody>
            {members}
          </tbody>
          </table>
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
