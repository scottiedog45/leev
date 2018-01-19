import React from 'react';
import connect from 'react-dom';

export default function Leaves(props) {
  const leaves = 'Dec 13th';

  {/*props.leaveList.map(leave => (
    <li className='leftService' key={laveList.leftService.id}>
      <div className='leftServiceDateAndTime'>
        {leaveList.leftService.dateAndTime}
      </div>
      <div className='leftServiceReason'>
        {leaveList.leftService.reason}
      </div>
      <div className='buttonWrapper'>
        <button className='editThisLeave'>Edit</button>
        <button className='deleteThisLeave'>Delete</button>
      </div>
    </li>
  ));*/}

  return (
    <div className='leaveList'>
      <ul className='listOfLeave'>
        {leaves}
      </ul>
    </div>
  );
}

// const mapStateToProps = (state, props) => {
//   const
// }
//
// export default connect(mapStateToProps)(Leaves);
