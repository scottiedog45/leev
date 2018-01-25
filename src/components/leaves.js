import React from 'react';
import {connect} from 'react-dom';

export default function Leaves (props) {

  const leaves = props.member.leave.map((leftService, index) => (
    <li key={index}>
      <h5>Left Service: {leftService.name}</h5>
      <h5>Left Service Reason:{leftService.reason}</h5>
    </li>
  ))

  console.log(props.services);

  return (
    <div className='leaveList'>
      <ul className='listOfLeave'>
      {leaves}
      </ul>
    </div>
  );
}
