import React from 'react';
import {connect} from 'react-redux';
import {fetchServices, patchLeave, deleteMemberFromService, patchToService,
putOneToService, fetchMembers} from '../../actions';
import {reduxForm} from 'redux-form';
import Autosuggest from 'react-autosuggest';
import {ServiceInfo} from '../serviceInfo/serviceInfo'
import styled from 'styled-components'
import {media} from '../style-utils'

const StyledTable = styled.table`
  width: 100%;
  margin-top: 15px;
  ${media.handheld`
    width: unset;
    display: block;
    text-align: center;
    `}
`;

const Tr = styled.tr`
${media.handheld`
  display: block;
  `}
`;

const Tbody = styled.tbody`
${media.handheld`
  display: block;
  `}
`;

const Td = styled.td`
${media.handheld`
  display: block;
  `}
`;

const AddAllWrapper = styled.span`
  background-color: none;
`;

// const Th = styled.th`
//   text-align: left;
//   ${media.handheld`
//     display: block;
//     `}
// `;

const AddAllButton = styled.button`
  margin-top: 7px;
  display: block;
  height: 40px;
  width: 128px;
  border-radius: 7px;
  background-color: #EB5E28;
  border: none;
  color: #FFFCF2;
  font-size: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
  ${media.handheld`
    margin-left: auto;
    margin-right: auto;
    `}
`;

const Name = styled.p`
  display: inline-block;
`;

const Service = styled.div`
  margin: 20px;
  margin-top: 40px;
  margin-left: 200px;

  ${media.handheld`
    margin:unset;
    margin-top: 10px;
    `}
`;

const AdderWrapper = styled.div`
  position: absolute;
  margin-left: -160px;
  ${media.handheld`
    margin-left: unset;
    position: unset;
    text-align: center;
    `}
`;

const AddMemberButton = styled.button`
  margin-bottom: 20px;
  margin-top: 40px;
  display: block;
  height: 40px;
  width: 128px;
  border-radius: 7px;
  background-color: #EB5E28;
  border: none;
  color: #FFFCF2;
  font-size: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
  ${media.handheld`
    margin-left: auto;
    margin-right: auto;
    `}
`;

const AddMemberWrapper = styled.div``;

const EditingArea = styled.div`
`;

const Suggestion = styled.span`
  position: absolute;
`;

const Explanation = styled.p`
  width: 150px;
  font-size: 10px;
  ${media.handheld`
    margin-right: auto;
    margin-left: auto;
    text-align: center;
    `}
`;

class Attendance extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
      members: [],
      leave:'',
      service: {}
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchServices());
    this.props.dispatch(fetchMembers());
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.members) {
    this.props.dispatch(fetchMembers());
    this.props.dispatch(fetchServices());
  }
}

//autosuggest things start below
  renderSuggestion(suggestion) {
    return (
      <Suggestion>{suggestion.name}</Suggestion>
    );
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  getSuggestions(value) {
    const escapedValue = this.escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
      return [];
    }
    const regex = new RegExp('^' + escapedValue, 'i');
    return this.props.members.filter(member => regex.test(member.name));
  }

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  addMember = () => {
    let memberCheck = this.state.value;
    let member = this.props.members.find(obj => obj.name === memberCheck);
    if (member === undefined) {
      alert('not a real member...');
      return
    } else if (this.props.service.members.some(function(obj) {
        return obj._id === member.id})) {
      alert('member already in service');
      return
    } else {
    let member = this.props.members.find(obj => obj.name === memberCheck);
    this.props.dispatch(putOneToService(member.id, this.props.service.id));
    };
  }

  markLeave = (event, member, service) => {
    console.log(event.target.value);
    this.props.dispatch(patchLeave(event.target.value, member, service));
  }

  deleteThisMember = (member, service) => {
    this.props.dispatch(deleteMemberFromService(member, service));
  }

  getNameFromId = (id) => {
      let member = this.props.members.find(obj=> obj.id === id);
      if (!member) {
        return
      } else {
      return member.name;
      }
    }

  getMembersFromProps() {
    if (this.props.service.members === undefined) {
      return this.state.members
    } else {
    let members = this.props.service.members.slice().map(obj => (
      Object.assign({}, obj, {
        name: this.getNameFromId(obj._id)
      })
    ));
    return members;
    }
  }

  render() {

    const { value, suggestions } = this.state;
        const inputProps = {
          placeholder: "Search members",
          value,
          onChange: this.onChange
        };

    const people = this.getMembersFromProps()
      .sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0
      );})
        .map((member, index) => (
        <Tr key={index}>
        <Td>
          <Name>{member.name}</Name>
        </Td>
        <Td>
          <select
            value={member.leave}
            onChange={(event) => this.markLeave(event, member._id, this.props.service.id)}>
            <option value=''>will work</option>
            <option value='sick'>sick</option>
            <option value='left'>left</option>
            <option value='vacation'>vacation</option>
            <option value='late'>late</option>
            <option value='relief'>relief</option>
            <option value='bereavement'>bereavement</option>
            <option value='pregnancy'>pregnancy</option>
            <option value='maternity'>maternity</option>
            <option value='military'>military</option>
            <option value='jury'>jury</option>
            <option value='religious'>religious</option>
            <option value='holiday'>holiday</option>
            <option value='voting'>medical</option>
            
          </select>
        </Td>
        <Td>
          <button onClick={() => this.deleteThisMember(member._id, this.props.service.id)}>Remove member from Service</button>
        </Td>
        </Tr>
      ))

    return (
      <Service>
      <ServiceInfo
        service={this.props.service}
        />
        <EditingArea>
        <AdderWrapper>
          <AddMemberButton onClick={() => this.addMember()}><AddMemberWrapper>Add Single User</AddMemberWrapper></AddMemberButton>
          <Explanation>*Type first letter of the member's name, and click their name below. Then use the button to add them</Explanation>
          <Autosuggest
            role='search'
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps} />
        </AdderWrapper>
        </EditingArea>
        <StyledTable>
        <Tbody>
          {people}
          </Tbody>
        </StyledTable>
      </Service>
    );
  }
}

Attendance.defaultProps = {
  service: {members: [
    {name: ''}
  ]},
}

const mapStateToProps = (state, ownProps) => ({
  service: state.leev.services.find(service =>
    service.id === (ownProps.match.params.serviceId)),
  members: state.leev.members,
  token: state.leev.token
});

Attendance = reduxForm({
  form:'Attendance'
})(Attendance);

export default connect (mapStateToProps)(Attendance);
