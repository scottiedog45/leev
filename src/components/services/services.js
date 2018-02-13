import React from 'react';
import {connect} from 'react-redux';
import {CreateServiceForm} from '../createServiceForm/createServiceForm';
import {deleteService} from '../../actions';
import attendance from '../attendance/attendance';
import {Link} from 'react-router-dom';

class Services extends React.Component {

  onDelete(id) {
    window.confirm('do you want to delete this service?');
    this.props.dispatch(deleteService(id));
  }

    render() {

      const services = this.props.services.map((service, index) => (
        <li key={index}>
          <h3>Date and time: {service.dateTime}</h3>
          <h3>Type: {service.category}</h3>
          <Link to = {`/services/${service.id}`} component = {attendance}>
            <button id={service.id}>Details</button>
          </Link>
          <button id={service.id} onClick={
            (e)=> this.onDelete(e.target.id)}>Delete</button>
        </li>

      ))

    return (
      <div>
        <CreateServiceForm />
        <section className='serviceList'>
          <ul className='listOfServices'>
            {services}
          </ul>
        </section>
      </div>
    );
  }
}

Services.defaultProps = {
  dateTime: 'July 100th 1776'
}

const mapStateToProps = state => ({
  services: state.leev.services,
  members: state.leev.members
});

export default connect(mapStateToProps)(Services);