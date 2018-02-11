import React from 'react';


export default function Home(props) {
    return (
      <div className="home-page">
        <p>Welcome to leev. Leev makes it easy to:</p>
        <ul>
          <li>Track leave data for each member of your group</li>
          <li>Create services and edit service details</li>
          <li>Create the attendance roster for each service</li>
          <li>Create members and edit member details</li>
          <li>Mark the reason for a member's leave from a given service</li>
          <li>See all leave for a given member in their Member Details</li>
        </ul>
      </div>
    );
}
