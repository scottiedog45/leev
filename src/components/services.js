import React from 'react';
import {connect} from 'react-redux';
import {AddServiceForm} from './addServiceForm';



class Services extends React.Component {

    render() {

    return (
      <div>
      <AddServiceForm />
      <section className='serviceList'>
        <ul className='listOfServices'>
        <li>{this.props.services[0].dateTime}</li>
        </ul>
      </section>
      </div>
    );
  }
}

Services.defaultProps = {
  dateTime: 'July 4th 1776'
}

const mapStateToProps = state => ({
  services: state.leev.services
});


export default connect(mapStateToProps)(Services);
