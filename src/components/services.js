import React from 'react';
import {connect} from 'react-redux';
import {CreateServiceForm} from './createServiceForm';
import {fetchServices, deleteService} from '../actions';

class Services extends React.Component {

  onDelete(id) {
    this.props.dispatch(deleteService(id));
  }

  displayMembers(array) {
    let newArray = [];
    for (let i=0; i<array.length; i++) {
      newArray.push(
        <p>{array[i]}</p>
      )
    }
    return newArray;
  }

    render() {

      const services = this.props.services.map((service, index) => (
        <li key={index}>
          <h3>Date and time: {service.dateTime}</h3>
          <h3>Type: {service.category}</h3>
          <section>Members: {this.displayMembers(service.people)}</section>
          <button>edit roster</button>
          <button id={service.id} onClick={
            (e)=> this.onDelete(e.target.id)}>Delete this service</button>
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
  dateTime: 'July 4th 1776'
}

const mapStateToProps = state => ({
  services: state.leev.services
});

export default connect(mapStateToProps)(Services);
