import React from 'react';
import {connect} from 'react-redux';
import {getSingleLeave} from '../../actions';
import styled from 'styled-components';


const Table = styled.table`
  text-align: left;
`;

const Header = styled.th`
  width: 300px;
`;

class Leaves extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singleMemberLeave: '',
      loading: false
    }
  }

  componentDidMount() {
    this.props.dispatch(getSingleLeave(this.props.member.id));
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.member) {
    this.props.dispatch(getSingleLeave(nextProps.member.id));
  }
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
    <tr key={index}>
      <td>{service.service}</td>
      <td>{service.reason}</td>
    </tr>
  ));

    return (

      <div className='leaveList'>
      {(leave.length > 0) ? (
        <Table>
          <tbody>
            <tr>
              <Header>Service</Header>
              <th>Reason</th>
            </tr>
              {leave}
            </tbody>
          </Table>
      ) : <p>Hmmm.... no leave yet...</p>}
      
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
