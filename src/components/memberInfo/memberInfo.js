import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {patchInfoToMember} from '../../actions'
import styled from 'styled-components';

const Role = styled.p`

`;

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined

const maxLength15 = maxLength(15)

export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

export const minLength2 = minLength(2)

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined

export class MemberInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      name: this.props.member.name,
      role: this.props.member.role,
      email: this.props.member.email,
      phone: this.props.member.phone,
      id: this.props.member.id
    }
  }

  //put in warn functions for validations
  handleInitialize() {
    const initData = {
      'name': this.props.member.name,
      'role': this.props.member.role,
      'email': this.props.member.email,
      'phone': this.props.member.phone
    };
    this.props.initialize(initData);
  }

  componentWillMount(){
    this.handleInitialize();
}

  toggleEditing = () => {
    console.log(this.props.member.id);
    this.setState({
      editing: !this.state.editing
    });
  }

  onSubmit = (id, values) => {
    console.log(id);
    this.props.dispatch(patchInfoToMember(id, values));
    this.toggleEditing();
  }

  onEmailChange = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  onPhoneChange = (e) => {
    this.setState({
      phone: e.target.value
    });
  }

  onRoleChange = (e) => {
    this.setState({
      role: e.target.value
    });
  }

  onNameChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  render() {

    return(
      <div className='memberInfo'>
      <div>
        {!this.state.editing ?
          <div>
            <div className='name'>
              <h3>{this.props.member.name}</h3>
            </div>
            <Role>Role: {this.props.member.role}</Role>
            <p className='phone'> Phone: {this.props.member.phone}</p>
            <p className='email'> Email: {this.props.member.email}</p>
            <button onClick={()=>this.toggleEditing()}>Edit</button>
          </div> :
          <form onSubmit={this.props.handleSubmit((values)=>this.onSubmit(this.props.member.id, values))}>
          <label>Name</label>
          <Field
            label='name'
            component='input'
            type='text'
            name='name'
            value={this.state.name}
            valideate={[maxLength15, minLength2]}
            onChange={(e)=>this.onNameChange(e)}
            />
          <label>Role</label>
            <Field
              label ='role'
              component='input'
              type='text'
              name='role'
              value={this.state.role}
              validate={[maxLength15, minLength2]}
              onChange={(e)=>this.onRoleChange(e)}
            />
            <label>Phone</label>
            <Field
              component='input'
              type='text'
              name='phone'
              value={this.state.phone}
              validate={[phoneNumber]}
              onChange={(e)=>this.onPhoneChange(e)}
            />
            <label>Email</label>
            <Field
              component='input'
              type='text'
              name='email'
              value={this.state.email}
              validate={[email]}
              onChange={(e)=>this.onEmailChange(e)}
            />
            <button type='submit'>Submit</button>
          </form>
        }
      </div>
    </div>
    )
  }
}

MemberInfo.defaultProps = {
  member : {
    role: '',
    email: '',
    phone: '',
    name: ''
  }
}

export default MemberInfo = reduxForm({
  form:'memberInfo'
})(MemberInfo);
