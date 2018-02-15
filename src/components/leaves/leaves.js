import React from 'react';
import {connect} from 'react-redux';
import {getSingleLeave} from '../../actions';
import {API_BASE_URL} from '../../config';
import moment from 'moment';


class Leaves extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singleMemberLeave: []
    }
  }

  componentWillMount() {
    console.log(this.props.member.id);
    this.props.dispatch(getSingleLeave(this.props.member.id));
  }


  calculateLeave = () => {
    let leaveArray = [];
    let l = this.props.singleMemberLeave.length;
    if (l===0) {
      return leaveArray
    } else {
    this.props.singleMemberLeave.forEach(leftService => {
      let leaveRecord = leftService.members.find(member => member._id === this.props.member.id);
      if (leaveRecord === undefined) {
        return
      } else {
      let formattedService = {
        service: leftService.dateTime,
        reason: leaveRecord.leave
      };
      leaveArray.push(formattedService);
    }});
    return leaveArray;
  }
  }

  render() {

  let someLeave = this.calculateLeave();

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

Leaves.defaultProps = {
  member: '',
  services: [],
  singleMemberLeave: []
}

const mapStateToProps = state => ({
  singleMemberLeave: state.leev.singleMemberLeave
});

export default connect(mapStateToProps)(Leaves);
