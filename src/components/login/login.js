import React from 'react';
import styled from 'styled-components';
import {reduxForm, Field} from 'redux-form';

const Loginbox = styled.div`
  width: 400px;
  height: 300px;
  background-color: grey;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 100px;
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

onSubmit() {

}

  render() {



    return(
      <FormWrapper>
      <Loginbox>
        <form>
          <legend>Email</legend>
          <Input
          name='email'
          component='input'
          type='text'
          />
          <legend>Password</legend>
          <Input
            component='input'
            type='text'
          />
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

export default Login = reduxForm({
  form:'login'
})(Login);
