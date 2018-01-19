import React from 'react';
import {connect} from 'react-redux';

class Profile extends React.Component {

  render() {
    console.log(this.props.member);
    return (
      <div className='individualProfile'>
        <div className='name'>
          <h3>{this.props.member.name}</h3>
        </div>
        <p className='role'>{this.props.member.role}</p>
        <div className='services'>
          <h2>Services:</h2>
          <div className='individualService'>
            {this.props.member.services}
          </div>
        </div>
        <div className='leaves'>
          <h2>Leave:</h2>
            {this.props.member.leave.service}
            {this.props.member.leave.reason}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  member : state.leev.members.find(member =>
    member.id == (ownProps.match.params.memberId))
})

export default connect(mapStateToProps)(Profile);
