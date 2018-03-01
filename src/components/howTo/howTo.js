import React from 'react';
import styled from 'styled-components'
import {media} from '../style-utils'

const Title = styled.h3`
  font-size: 90px;
  margin: 0px 0px 0px 0px;
  ${media.handheld`
    font-size: 60px;
    text-align: center;
    `}
`;

const List = styled.ul`
  margin: 15px;
  list-style: none;
  padding-left: 0px;
`;

const Li = styled.li`
  margin-top: 10px;
`;

const Header = styled.h4`
  margin-left: 15px;
  margin-top: 10px;
`;

export default class HowTo extends React.Component {

render() {

  return(
    <div>
      <Title>Welcome!</Title>
      <Header role='banner'>How to use Leev</Header>
      <List>
        <Li>
          1) Login or signup.
        </Li>
        <Li>
          2) Create the services and members you wish to track on the Services and Members pages.
        </Li>
        <Li>
        Now for the fun part:
        </Li>
        <ul>
        <Li>
          To mark leave for a member, navigate to the details for the service on the Services page, and mark their leave in the dropdown menu. Their leave will
          automatcially be added to their profile.
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
    </div>);
  }
}
