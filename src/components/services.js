import React from 'react';
import {connect} from 'react-redux';
import {AddServiceForm} from './addServiceForm';



export class Services extends React.Component {

  //   const services = this.props.services.map(service =>
  //   <li className='service' key={this.props.services.id}>
  //     <div className='serviceDateAndTime'>{this.props.services.dateTime}</div>
  //     <div className='serviceButtonWrapper'>
  //       <button className='markLeave'>Mark Leave</button>
  //       <button className='removeService'>Remove Service</button>
  //     </div>
  //   </li>
  // );
    render() {

    return (
      <section className='serviceList'>
        <ul className='listOfServices'>

        <AddServiceForm />
        </ul>
      </section>
    );
  }
}

Services.defaultProps = {
  dateTime: 'July 4th 1776'
}

export const mapStateToProps = state => (
  console.log(state.services)
);

console.log(state.services);

export default connect(mapStateToProps)(Services);
