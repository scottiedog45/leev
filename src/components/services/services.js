import React from 'react';
import {connect} from 'react-redux';
import {CreateServiceForm} from '../createServiceForm/createServiceForm';
import {deleteService} from '../../actions';
import {Link} from 'react-router-dom';
import moment from 'moment';


class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
  }

  onDelete(id) {
    window.confirm('do you want to delete this service?');
    this.props.dispatch(deleteService(id));
  }

    render() {

      const services = this.props.services.map((service, index) => (
        <li key={index}>
          <h3>Date and time: {moment(service.dateTime).format("dddd, MMMM Do YYYY, h:mm a")}</h3>
          <h3>Type: {service.category}</h3>
          <Link to = {`/services/${service.id}`}>
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
