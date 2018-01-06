import react from 'react';
import connect from 'ReactDOM';

export function Leaves(props) {
  const leaves = props.leaveList.map(leave => (
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
  ));

  return (
    <div classname='leaveList'>
      <ul classname='listOfLeave'>
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
