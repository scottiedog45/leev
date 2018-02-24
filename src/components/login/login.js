import React from 'react';
import styled from 'styled-components';
import {reduxForm, Field} from 'redux-form';
import {userLogin, createNewUser} from '../../actions'


const Loginbox = styled.div`
  width: 400px;
  height: 300px;
  background-color: grey;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  border-radius: 7px;
  padding:
`;

const LoginTitle = styled.h2`
  margin: 20px;
  padding-top: 20px;
`;

const InputWrapper = styled.div`
  margin: 20px
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
`;

const LoginButton = styled.button`
  border: none;
  width: 100px;
  height: 25px;
  display: inline-block;
`;

const Input = styled.input`
  height: 30px;
  width: 300px;
`;

const FormWrapper = styled.div`
  display: block;
`;

class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      password: ''
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

onSubmit() {
  let values = {
    email: this.state.email,
    password: this.state.password
  };
  console.log(values);
  this.props.dispatch(userLogin(values));
  
}

signUp() {
  let email = this.state.email;
  let pword = this.state.password;
  // this.props.dispatch(signup(email, pword))
}

  render() {

    return(
      <FormWrapper>
        <Loginbox>
          <LoginTitle>Login</LoginTitle>
          <form onSubmit={this.props.handleSubmit((values) => this.onSubmit(values))}>
          <InputWrapper>
            <legend>Email</legend>
            <Input
              value={this.state.email}
              name='email'
              component='input'
              type='text'
              onChange={(e)=> this.onEmailChange(e)}
            />
            </InputWrapper>
            <InputWrapper>
            <legend>Password</legend>
            <Input
              value={this.state.password}
              component='input'
              type='password'
              onChange={(e)=>this.onPasswordChange(e)}
            />
            </InputWrapper>
            <ButtonWrapper>
              <button type='submit'>Login</button>
              <button type='button'>Sign Up</button>
            </ButtonWrapper>
          </form>
        </Loginbox>
      </FormWrapper>

    )
  }
}

//add connect to this

export default Login = reduxForm({
  form:'login'
})(Login);
