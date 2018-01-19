import React from 'react';

class Attendance extends React.Component {



  render() {

    const members = this.props.service.members.map((member, index) => (
      <li id={member.id}>
        <h4>member.name</h4>
        <button>Here</button>
        <button>Mark Leave</button>
      </li>
    ))

    return (
      <button>Undo</button>
    )
  }
}

const mapStateToProps = state => ({
  services: state.leev.services
});

export default connect (mapStateToProps)(Attendance);
