import React from 'react';
import styled from 'styled-components'

const Title = styled.h3`
  font-size: 90px;
  margin: 0px 0px 0px 0px;
`;

const List = styled.ul`
  List-style: none
`;

const Li = styled.li`
  margin-top: 10px;
`;

export default class HowTo extends React.Component {

render() {

  return(
    <div>
      <Title>Welcome!</Title>
      <h4>How to use Leev</h4>
      <List>
        <Li>
          1) Click the Login button to login or signup.
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
          To see aggregated leave for a member, view their details on the Members page
        </Li>
        </ul>
      </List>
    </div>);
  }
}
