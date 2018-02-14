import React from 'react';
import {Field, reduxForm, reset, change} from 'redux-form';
import {patchInfoToMember} from '../../actions'

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)
// const number = value =>
//   value && isNaN(Number(value)) ? 'Must be a number' : undefined
// const minValue = min => value =>
//   value && value < min ? `Must be at least ${min}` : undefined
// const minValue18 = minValue(18)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
// const tooOld = value =>
//   value && value > 65 ? 'You might be too old for this' : undefined
// const aol = value =>
//   value && /.+@aol\.com/.test(value)
//     ? 'Really? You still use AOL for your email?'
//     : undefined
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
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
      phone: this.props.member.phone
    }
  };

  toggleEditing = () => {
    this.setState({
      editing: !this.state.editing
    });
  }

  onSubmit = (id, values) => {
    console.log(values);
    this.props.dispatch(patchInfoToMember(id, values));
    this.toggleEditing();
  }

  onEmailChange = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  onPhoneChange = (e) => {
    this.setState({
      phone: e.target.value
    })
  }

  onRoleChange = (e) => {
    this.setState({
      role: e.target.value
    })
  }

  onNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
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
            <p className='role'>{this.props.member.role}</p>
            <p className='phone'>{this.props.member.phone}</p>
            <p className='email'>{this.props.member.email}</p>
            <button onClick={()=>this.toggleEditing()}>Edit</button>
          </div> :
          <form onSubmit={this.props.handleSubmit((values)=>(this.onSubmit(this.props.member.id, values)))}>
          <label>Name</label>
          <input
            label='name'
            component='input'
            type='text'
            name='name'
            value={this.state.name}
            valideate={[maxLength15, minLength2]}
            onChange={(e)=>this.onNameChange(e)}
            />
          <label>Role</label>
            <input
              label ='role'
              component='input'
              type='text'
              name='role'
              value={this.state.role}
              validate={[maxLength15, minLength2]}
              onChange={(e)=>this.onRoleChange(e)}
            />
            <label>Phone</label>
            <input
              component='input'
              type='text'
              name='phone'
              value={this.state.phone}
              validate={[phoneNumber]}
              onChange={(e)=>this.onPhoneChange(e)}
            />
            <label>Email</label>
            <input
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

export default MemberInfo = reduxForm({
  form:'memberInfo'
})(MemberInfo);
