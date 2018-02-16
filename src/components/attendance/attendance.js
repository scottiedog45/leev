import React from 'react';
import {connect} from 'react-redux';
import {fetchServices, patchLeave, deleteMemberFromService, patchToService,
putOneToService, fetchMembers} from '../../actions';
import {reduxForm} from 'redux-form';
import Autosuggest from 'react-autosuggest';
import {ServiceInfo} from '../serviceInfo/serviceInfo'
import moment from 'moment';

class Attendance extends React.Component {
  constructor() {
    super();
    this.state = {
      editDateTime:false,
      editCategory: false,
      value: '',
      suggestions: [],
      members: [],
      leave:'',
      service: {}
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchServices());
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
    let arrayOfMembers = allMembers.map((member) => (
      {_id: member.id,
      leave: ""}
    ));
    let submittedMembers = {
      members: arrayOfMembers
    };
    if (window.confirm('Adding all members will erase current members from service, and add all stored members to this service. Are you sure you want to continue?')) {
      this.props.dispatch(patchToService(submittedMembers, id))
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
    this.props.dispatch(putOneToService(member.id, this.props.service.id));
    };
  }

  markLeave = (event, member, service) => {
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
          placeholder: "Type 'c'",
          value,
          onChange: this.onChange
        };

    const people = this.getMembersFromProps()
      .sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0
      );})
        .map((member, index) => (
        <div key={index}>
          <p>{member.name}</p>
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
        <ServiceInfo
          service={this.props.service}
          initialValues={{
            category: {this.props.service.category},
            dateTime: {this.props.service.dateTime}
          }}/>
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

Attendance.defaultProps = {
  service: {members: [
    {name: ''}
  ]},
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
