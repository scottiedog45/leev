import React from 'react';
import {connect} from 'react-redux';
import Leaves from '../leaves/leaves';
import {fetchMembers, fetchServices} from '../../actions';
import {MemberInfo} from '../memberInfo/memberInfo';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  margin: 20px;
`;

class Profile extends React.Component {

  componentWillMount() {
      this.props.dispatch(fetchMembers());
      this.props.dispatch(fetchServices());
      // this.props.dispatch(getSingleLeave(this.props.member.id));
  }

  componentWillReceiveProps(nextProps){
    if (!this.props.member) {
      this.props.dispatch(fetchMembers());
      this.props.dispatch(fetchServices());
    }
  }

  //make fetchMember()

  // fetchMember(id) {
  //   return (this.props.members.find(member =>
  //     id === (ownProps.match.params.memberId)))
  // }

  render() {

    return (
      <ProfileContainer>
        {this.props.member && <MemberInfo member={this.props.member} />}
        <div className='leaves'>
          <h2>Left services:</h2>
          <Leaves member={this.props.member} services={this.props.services} />
        </div>
      </ProfileContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  member: state.leev.members.find(member =>
    member.id === (ownProps.match.params.memberId)),
  services: state.leev.services
})

export default connect(mapStateToProps)(Profile);
