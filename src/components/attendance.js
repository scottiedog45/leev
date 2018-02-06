import React from 'react';
import {connect} from 'react-redux';
import {putLeave, deleteMemberFromService, addMemberToService,
  adjustRoster, handleAttendance, putManyToService, fetchSingleServiceInfo,
putOneToService} from '../actions';
import {Field, reduxForm, FormSection, formValueSelector} from 'redux-form';
import MarkLeave from './markLeave';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import Autosuggest from 'react-autosuggest';

class Attendance extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
      members: [],
      leave:""
    };
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.name}</span>
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
    console.log(this.state.value);
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

  addAll = () => {
    let id = this.props.service.id;
    let allMembers = this.props.members.slice();
    let submittedMembers = allMembers.map((member) => (
      {_id: member.id,
      leave: ""}
    ));
    if (window.confirm('Adding all members will erase current members from service, and add all stored members to this service. Are you sure you want to continue?')) {
      this.props.dispatch(putManyToService(submittedMembers, id))
    } else {
      return
    }
  }

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
    console.log(member);
    this.props.dispatch(putOneToService(member.id, this.props.service.id));
  }
}

  markLeave = (event, member, service) => {
    this.props.dispatch(putLeave(event.target.value, member, service));
  }

  deleteThisMember = (member, service) => {
    console.log('debug');
    this.props.dispatch(deleteMemberFromService(member, service));
  }

  getNameFromId = (id) => {
    console.log(id);
    let member = this.props.members.find(obj=> obj.id === id);
    console.log(member);
    return member.name;
  }

  render() {

    const { value, suggestions } = this.state;
        const inputProps = {
          placeholder: "Type 'c'",
          value,
          onChange: this.onChange
        };

    const people =
    this.props.service.members.slice().map((member, index) => (

      <div key={index}>
        <p>{this.getNameFromId(member._id)}</p>
        <select
          value={member.leave}
          onChange={(event) => this.markLeave(event, member._id, this.props.service.id)}>
          <option></option>
          <option value='sick'>sick</option>
          <option value='left'>left</option>
          <option value='medical'>medical</option>
        </select>
        <button onClick={() => this.deleteThisMember(member._id, this.props.service.id)}>Remove member from Service</button>
      </div>
    ))

    return (
      <div>
      <button onClick={() => this.addAll()}>Add all members</button>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps} />
      <button onClick={() => this.addMember()}>Add this member</button>
      <div>
        {people}
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  service: state.leev.services.find(service =>
    service.id === (ownProps.match.params.serviceId)),
  members: state.leev.members,
});

Attendance = reduxForm({
  form:'Attendance'
})(Attendance);

export default connect (mapStateToProps)(Attendance);
