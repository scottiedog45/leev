import React from 'react';
import {connect} from 'react-redux';
import {getSingleLeave} from '../../actions';

class Leaves extends React.Component {

  componentDidMount() {
    this.props.dispatch(getSingleLeave(this.props.member.id));
  }

  calculateLeave = () => {
    let leaveArray = [];
    this.props.singleMemberLeave.forEach(leftService => {
      let leaveRecord = leftService.members.find(member => member._id === this.props.member.id);
      let formattedService = {
        service: leftService.dateTime,
        reason: leaveRecord.leave
      };
      leaveArray.push(formattedService);
    })
    return leaveArray;
  }

  render() {

  let someLeave = (this.calculateLeave());

  let leave = someLeave.map((service, index) => (
    <div key={index}>
      <p>{service.service}</p>
      <p>{service.reason}</p>
    </div>
  ));

    return (
      <div className='leaveList'>
        <div>
          {leave}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  singleMemberLeave: state.leev.singleMemberLeave
});

export default connect(mapStateToProps)(Leaves);
