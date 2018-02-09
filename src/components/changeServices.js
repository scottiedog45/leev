import React from 'react';
// import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {fetchServices} from '../actions';

class ChangeServices extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchServices());
  }



  render() {

    const checkboxes = this.props.services.map((service, index) => (
      <li id={service.id}>
        <input
          type='checkbox'
          name={service.id}
          ></input>
        <label>{service.dateTime.toString()}</label>
      </li>
    ))

    return(
      <div>

        <form>
          <button>Select All</button>
          {checkboxes}
          <button type='submit'>Submit</button>
          </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  services: state.leev.services
});

export default connect(mapStateToProps)(ChangeServices);
