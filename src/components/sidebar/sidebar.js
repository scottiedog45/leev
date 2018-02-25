import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import styles from './sidebar.css'
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome';
import {userLogout} from '../../actions';


const Button = styled.button`
  width: 200px;
  display: inline-block;
  margin-top: 10px;
  margin-bottm: 10px;
  height: 40px;
  background-color: #252422;;
  color: #eb5e28;
  font-size: 20px;
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0px;
  margin:0px;
`;

const NavBar = styled.nav`
  background-color: #252422;
  overflow: hidden;
`;

const RightButton = styled.button`
  float: right;
  width: 200px;
  display: inline-block;

  height: 40px;
  background-color: #252422;;
  color: #eb5e28;
  font-size: 20px;
`;

const LeftButton = styled.button `
  float: left;
  width: 200px;
  display: inline-block;

  height: 40px;
  background-color: #252422;;
  color: #eb5e28;
  font-size: 20px;
`;

const StyledRightLinks = styled(Link)`
text-decoration: none;
float: right;
font-size: 15px;
color: #FFFCF2;
margin-top: 22px;
margin-left: 20px;
margin-right: 10px;
margin-bottom: 15px;
&:hover {
  color: #eb5e2896;
}
`;

const StyledLink = styled(Link)`
  margin-top: 11px;
   text-decoration: none;
   float: left;
   font-size: 35px;
   color: #FFFCF2;
   display: inline-block;
   margin-left: 15px;
   &:hover {
     color: #eb5e2896;
   }
`;

const CalendarWrapper = styled.span`
  margin-left: 15px;
  margin-right: 20px;
`;

const SignUpLoginButton = styled.button`
  font-size: 15px;
  width: 127px;
  height: 31px;
  border: none;
  border-radius: 5px;
  background-color: #eb5e28;
  color: white;
  margin-right: 15px;
  margin-left: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
  float: right;
  display: inline-block;
`;

const LogOutButton = SignUpLoginButton.extend`

`;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true
      // this.props.loggedIn
    }
  }

logout(e) {
  this.props.dispatch(userLogout());

}

render() {
  return (
      <NavBar>
        <List>
          <li>
          {!this.props.loggedIn ? (
            <Link to ={`/login`}>
              <SignUpLoginButton>Login</SignUpLoginButton>
            </Link>
          ) : (
            <Link to ={`/`}>
              <LogOutButton onClick={(e)=> this.logout()}>Logout</LogOutButton>
            </Link>
          )}
          </li>
            <li>
              <StyledLink to ={`/`}>
              <CalendarWrapper><FontAwesome name='calendar' /></CalendarWrapper>
                Leev
              </StyledLink>
            </li>
            <li>
              <StyledRightLinks to ={'/howTo'}>
                How to use leev
              </StyledRightLinks>
            </li>
            {this.props.loggedIn &&
              <div>
              <li>
              <StyledRightLinks to ={`/members`}>
                Members
              </StyledRightLinks>
              </li>
              <li>
              <StyledRightLinks to = {`/services`}>
                Services
              </StyledRightLinks>
              </li>
              </div>
            }

        </List>
      </NavBar>
  )
}
}

const mapStateToProps = (state)  => ({
  optionList: state.leev.optionList
});

export default connect(mapStateToProps)(Sidebar);
