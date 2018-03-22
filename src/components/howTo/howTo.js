import React from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {media} from '../style-utils'

const Title = styled.h3`
  font-size: 73px;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 0px;
  ${media.handheld`
    font-size: 60px;
    text-align: center;
    `}
`;

const List = styled.ul`
  margin: 15px;
  list-style: none;
  padding: 28px 90px 0px 90px;
`;

const Li = styled.li`
  margin-top: 10px;
`;

const Header = styled.h4`
  margin-top: 30px;
  text-align: center;
`;

const Button = styled.button`
  display: block;
  margin-left: auto;
  margin-right: auto;
  font-size: 15px;
  width: 300px;
  height: 50px;
  border: none;
  border-radius: 5px;
  background-color: #eb5e28;
  color: white;
  margin-top: 40px;
`;

const StyledLink = styled(Link)`
  margin-top: 10px;
  text-decoration: none;
`;

const Welcome = styled.div`
  margin: 20px
`;

export default class HowTo extends React.Component {

render() {

  return(
    <Welcome>
      <Title>Welcome!</Title>
      <Header role='banner'>Getting Started with Leev:</Header>
      <p>Administrator accounts can do most of the cool stuff. Member accounts can login and have a read-only view of their leave data in their profile. Administrator accounts can:
        <ul>
          <Li>Create members</Li>
          <li>Modify member information</li>
          <li>Add, delete, and modify services</li>
          <li>Adjust allotted leave amounts for each member</li>
          <li>Mark leave for a member for a given service</li>
        </ul>
      </p>
      <List>
        <Li>
        Now for the fun part:
        </Li>
        <ul>
        <Li>
          To mark leave for a member, navigate to the details for the service on the Services page, and mark their leave in the dropdown menu. Their leave will
          automatically be added to their profile.
        </Li>
        <Li>
          Leev has the potential to be used for attendance tracking (for instance, if a member was added to a
          service but doesn't have a leave reason, that means they attended).
        </Li>
        <Li>
          To see aggregated leave for a member, view their details on the Members page.
        </Li>
        </ul>
      </List>
      <StyledLink to={'/signup'}>
      <Button>Create an account now!</Button>
      </StyledLink>
    </Welcome>);
  }
}
