import React from 'react';
import styled from 'styled-components';
import {reduxForm, Field} from 'redux-form';
import {createNewUser} from '../../actions';
import {Link} from 'react-router-dom';
import {media} from '../style-utils'


const required = value => (value ? undefined : 'Required');

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

const Loginbox = styled.div`
  width: 400px;
  background-color: #ccc9c7;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  border-radius: 7px;
  padding: 20px;
  ${media.handheld`
    width: 250px;
    `}
`;

const Input = styled.input`
  width: 300px;
  height: 30px;
  ${media.handheld`
    width: 206px;
    `}
`;

const LoginTitle = styled.h2`
  margin: 20px;
`;

const InputWrapper = styled.div`
  margin: 20px
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
`;

const FormWrapper = styled.div`
  display: block;
`;

const StyledField = styled(Field)`
  width: 400px;
`;

class SignUp extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      password: '',
      passwordConfirm:''
    }
  }

  onEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  onPasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  onPasswordConfirmChange(e) {
    this.setState({
      passwordConfirm: e.target.value
    });
  }

  onSubmit(values) {
    if(this.state.password !== this.state.passwordConfirm) {
      window.alert('Passwords do not match');
      return;
    } else {
    this.props.dispatch(createNewUser(values));
    this.props.history.push('/howTo');
    }
  }

  renderField ({
   input,
   label,
   type,
   meta: { touched, error, warning }
   }) {
     return  (
       <div>
         <label>{label}</label>
         <div>
           <Input {...input} placeholder={label} type={type} />
           {touched &&
             ((error && <span>{error}</span>) ||
               (warning && <span>{warning}</span>))}
         </div>
       </div>
     )
   }

  render() {

    return(
      <FormWrapper>
        <Loginbox>
          <LoginTitle role='banner'>
            Sign Up or <Link to={'/login'}>Login</Link>
          </LoginTitle>
          <form onSubmit={this.props.handleSubmit((e, values) => this.onSubmit(e,values))}>
          <InputWrapper>
            <legend>Email</legend>
            <StyledField
              name='email'
              component={this.renderField}
              type='text'
              validate={[required, email]}
              warn={email}
            />
            </InputWrapper>
            <InputWrapper>
            <legend>Password</legend>
            <Field
              name='password'
              value={this.state.password}
              component={this.renderField}
              type='password'
              validate={required}
              onChange={(e)=>this.onPasswordChange(e)}
            />
            </InputWrapper>
            <InputWrapper>
            <legend>Confirm Password</legend>
            <Field
              name='passwordConfirm'
              value={this.state.passwordConfirm}
              component={this.renderField}
              type='password'
              validate={required}
              onChange={(e)=>this.onPasswordConfirmChange(e)}
            />
            </InputWrapper>
            <ButtonWrapper>
              <button type='submit'>Sign Up</button>
            </ButtonWrapper>
          </form>
        </Loginbox>
      </FormWrapper>

    )
  }
}

//add connect to this

export default SignUp = reduxForm({
  form:'signup'
})(SignUp);
