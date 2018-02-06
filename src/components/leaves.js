import React from 'react';
import {connect} from 'react-dom';

export default function Leaves (props) {

  console.log(props.services);

  //compare current leave stats with alotted leave stats in graph
  //add relief option
  

  return (
    <div className='leaveList'>
      <ul className='listOfLeave'>
      </ul>
    </div>
  );
}
