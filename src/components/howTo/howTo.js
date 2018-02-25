import React from 'react';

export default class HowTo extends React.Component {

render() {
  return(
    <div>
      <h3>Welcome to leev!</h3>
      <h4>How to use Leev</h4>
      <ul>
      <li>
      First, Signup or login
      </li>
        <li>
          Create the Services and Members you wish to track
        </li>
        <li>
          To mark leave for a member, navigate to the approprate service on the Services page, and mark their leave in the dropdown menu
        </li>
        <li>
          To see aggregated leave for a member, view their details on the Members page
        </li>
      </ul>
    </div>);
}
}
