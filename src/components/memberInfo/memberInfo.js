import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {patchInfoToMember} from '../../actions'
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import {TextField} from 'redux-form-material-ui';

const EditButton = styled.span`
  background-color: inherit;
  border: none;
  font-size: 30px;
  cursor: pointer;
`;

const EditButtonWrapper = styled.button`
  background-color: inherit;
  border: none;
  padding-left: 0px;

`;

const TitleName = styled.h3`
  font-size: 37px;
  margin-bottom: 0px;
`;

const Role = styled.p`
margin-bottom: 0px;
`;

const Phone = styled.p`
margin-top: 0px;
margin-bottom: 0px;
`;

const Email = styled.p`
margin-top: 0px;
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



const Form = styled.form`
 text-align: center;
`;


const SubmitButton = styled.button`
  color: black;
  border: none;
  background-color: #FFFCF2;
  font-size: 30px;
  cursor: pointer;
  transform: translateY(10%);
`;

const SubmitButtonWrapper = styled.span``;

const CancelButton = styled.button`
  color: black;
  border: none;
  background-color: #FFFCF2;
  font-size: 30px;
  cursor: pointer;
  transform: translateY(10%);
`;

const CancelButtonWrapper = styled.span``;

const ButtonWrapper = styled.div`
  display: block;
`;

const AllMemberInfo = styled.div`
  text-align: center;
`;


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
  
  toggleEditing = () => {
    this.setState({
      editing: !this.state.editing
    });
  }

  onSubmit = (id, values) => {
    this.props.dispatch(patchInfoToMember(id, values));
    this.toggleEditing();
  }

  render() {

    return(
      <AllMemberInfo>
      <div>
        {!this.state.editing ?
          <div>
            <div className='name'>
              <TitleName role='banner'>{this.props.member.name}'s Profile</TitleName>
            </div>
            <Role>Role: {this.props.member.role}</Role>
            <Phone> Phone: {this.props.member.phone}</Phone>
            <Email> Email: <a href={`mailto:${this.props.member.email}`}>{this.props.member.email}</a></Email>
            {!this.state.editing && <EditButtonWrapper onClick={()=>this.toggleEditing()}><EditButton><FontAwesome name='edit'/></EditButton></EditButtonWrapper>}
          </div> :
          <Form onSubmit={this.props.handleSubmit((values)=>this.onSubmit(this.props.member.id, values))}>
          <legend>Name</legend>
          <Field
            component={TextField}
            type='text'
            name='name'
            validate={[maxLength15, minLength2]}
            />
          <legend>Role</legend>
            <Field
              component={TextField}
              name='role'
              validate={[maxLength15, minLength2]}
            />
            <legend>Phone</legend>
            <Field
              component={TextField}
              name='phone'
              value={this.state.phone}
              validate={phoneNumber}
              warn={phoneNumber}
            />
            <legend>Email</legend>
            <Field
              component={TextField}
              name='email'
              validate={[email]}
              warn={email}
            />
            <ButtonWrapper>
            <SubmitButton type='submit'><SubmitButtonWrapper><FontAwesome name='check-circle'/></SubmitButtonWrapper></SubmitButton>
            <CancelButton onClick={()=>this.toggleEditing()} type='button'><CancelButtonWrapper><FontAwesome name='times'/></CancelButtonWrapper></CancelButton>
            </ButtonWrapper>
          </Form>
        }
      </div>
    </AllMemberInfo>
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
