import React from 'react';
import {connect} from 'react-redux';
import Leaves from './leaves';

class Profile extends React.Component {

  //allotted leave amounts?

  render() {

    console.log(this.props.member);

    return (
      <div className='individualProfile'>
        <div className='name'>
          <h3>{this.props.member.name}</h3>
        </div>
        <p className='role'>{this.props.member.role}</p>
        <div className='leaves'>
          <h2>Leave:</h2>
          <Leaves member={this.props.member} services={this.props.services} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  member : state.leev.members.find(member =>
    member.id === (ownProps.match.params.memberId)),
  services: state.leev.services
})

export default connect(mapStateToProps)(Profile);
