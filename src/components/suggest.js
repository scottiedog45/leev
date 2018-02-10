import React from 'react';
import {connect} from 'react-redux';

class Suggest extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  };

  render() {

    return (

    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  service: state.leev.services.find(service =>
    service.id === (ownProps.match.params.serviceId)),
  members: state.leev.members
});

export default connect()(Suggest);
