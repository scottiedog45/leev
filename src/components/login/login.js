import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import {reduxForm} from 'redux-form';
import {userLogin} from '../../actions';
import {Link} from 'react-router-dom';
import {media} from '../style-utils';
import Loader from '../loader/loader'


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

const Input = styled.input`
  height: 30px;
  width: 100%;
  ${media.handheld`
    width: 206px;
    `}
`;

const FormWrapper = styled.div`
  display: block;
`;

const DemoWrapper = styled.div`
  text-align: center;
  &:child {
    margin-top: none;
    margin-bottom: none;
  }
`;

const DemoP = styled.p`

`;

class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      password: '',
      loading: false,
      token: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.token !== '') {
        this.props.history.push('/services');
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
    this.props.dispatch(userLogin(values));
    this.setState({
      loading: true
    });
  }

  render() {

    return(
      <div>
      {(this.state.loading) ? (<Loader loading={this.state.loading}/>) :
      (<FormWrapper>
        <Loginbox>
          <LoginTitle role = 'banner'>
            Login or <Link to={'/signUp'}>Sign up</Link>
          </LoginTitle>
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
            <DemoWrapper>
            <DemoP>Demo Administrator account:</DemoP>
            <DemoP>email: something3@something.com</DemoP>
            <DemoP>password: test2 </DemoP>
            </DemoWrapper>
            <ButtonWrapper>
              <button type='submit'>Login</button>
            </ButtonWrapper>
          </form>
        </Loginbox>
      </FormWrapper>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.leev.loading,
  token: state.leev.token
})

Login = reduxForm({
  form:'login'
})(Login);

export default connect(mapStateToProps)(Login);
