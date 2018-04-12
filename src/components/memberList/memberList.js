import React from 'react';
import {connect} from 'react-redux';
import {deleteMember, loadMembersIfNeeded} from '../../actions';
import {CreateMemberForm} from '../createMemberForm/createMemberForm';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {media} from '../style-utils';


const Name = styled.h3`
  margin-bottom: 0px;
  &:first-child {
    margin-top: 0px;
  }
  ${media.handheld`
    margin-left: auto;
    margin-right: auto;
    display: block;
    `}
`;

const Role = styled.h4`
margin-top: 9px;
margin-bottom: 9px;
font-size: 13px;
${media.handheld`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: block;
  `}
`;

const ListContainer = styled.div`

`;

const PeopleSection = styled.section`
  margin-left: auto;
  margin-right: auto;
  ${media.handheld`
    margin-left: 0px;
    `}
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
  text-align: center;
  margin-bottom: 0px;
  ${media.handheld`
    font-size: 70px;
    margin-top:10px;
    margin-bottom: 10px;
    text-align: center;
    margin-left: unset;
    `}
`;

const TdName = styled.td`
  width: 200px;
  ${media.handheld`
    display: block;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    `}
`;

const TdRole = styled.td`
  width: 150px;
  ${media.handheld`
    width: unset;
    display: block;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    `}
`;

const Tr = styled.tr`
  height: 75px;
  ${media.handheld`
    display: block;
    height: unset;
    text-align: center;
    margin-top: 30px;
    `}
`;

const Tbody = styled.tbody`
${media.handheld`
  display: block
  `}
`
const Table = styled.table`
margin-left: auto;
margin-right: auto;
${media.handheld`
  display: block
  `}
`;

const Td = styled.td`
${media.handheld`
  display: block
  `}
`;

const Form = styled.div`
text-align: center;
  ${media.handheld`
    position: unset;
    width: unset;
    `}
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
      <Td>
        <Link to = {`/members/${member.id}`}>
          <Button id={member.id}>Details</Button>
        </Link>
        <DeleteButton id={member.id} onClick={
          (e)=> this.onDelete(e.target.id)}>Delete</DeleteButton>
      </Td>
      </Tr>
    ))

    return (

      <ListContainer>
        <Title role='banner'>Members</Title>
        <Form>
          <CreateMemberForm />
        </Form>
        <PeopleSection>
          <Table>
          <Tbody>
            {members}
          </Tbody>
          </Table>
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
