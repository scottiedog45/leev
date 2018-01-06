import React from 'react';
import connect from 'react-dom';



export default class Services extends React.Component {
  render() {
    {/*const services = props.serviceList.map(service =>
      <li className='service' key={serviceList.service.id}>
        <div className='serviceDateAndTime'></div>
        <div className='serviceButtonWrapper'>
          <button className='markLeave'>Mark Leave</button>
          <button className='removeService'>Remove Service</button>
        </div>
      </li>
    );*/}
    return (
      <div className='serviceList'>
        <ul className='listOfServices'>
        <p>services</p>
        </ul>
      </div>
    );
  }
}

// export default connect()(Services);
