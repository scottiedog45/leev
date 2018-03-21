import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome';
import {userLogout} from '../../actions';
import {media} from '../style-utils';

const List = styled.ul`
  list-style: none;
  padding-left: 0px;
  margin:0px;
  ${media.handheld`
    display: none;
    `}
`;

const NavBar = styled.nav`
  background-color: #252422;
  overflow: hidden;
  ${media.handheld`

    `}
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
  ${media.handheld`
    margin-top: 5px;
    display: block;
    float: none;
    `}
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
 };
 ${media.handheld`
   margin-top: 15px;
   position: absolute;
   `}
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

const Hamburger = styled.div`
  float: right;
  display: none;
  ${media.handheld`
    display: unset;
    margin: 10px;
    text-align: right;
    float: right;
    `}
`;

const HamburgerMeat = styled.div`
  &:children: {
    margin: 5px;
  }
`;

const BarWrapper = styled.span`
  color: white;
  font-size: 38px;
  display: inherit;
`;

const HamburgerButton = styled.button`
  background-color: inherit;
  border: none;
`;


class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      showingHamburger: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loggedIn: nextProps.loggedIn
    })
  }

logout(e) {
  this.turnOffHamburger();
  this.props.dispatch(userLogout());
}

toggleHamburger() {
  this.setState({
    showingHamburger: !this.state.showingHamburger
  })
}

turnOffHamburger() {
  this.setState({
    showingHamburger: false
  })
}

render() {
  return (
      <NavBar role='navigation'>
      <Hamburger>
        <HamburgerButton
          onClick={(e)=>this.toggleHamburger()}>
          <BarWrapper>
            <FontAwesome name='bars' />
          </BarWrapper>
          </HamburgerButton>
          {this.state.showingHamburger && <HamburgerMeat>
          {this.state.loggedIn ? (
            <div>
              <StyledRightLinks to={`/howTo`} onClick={()=>this.toggleHamburger()}>How To</StyledRightLinks>
              <StyledRightLinks to={`/members`} onClick={()=>this.toggleHamburger()}>Members</StyledRightLinks>
              <StyledRightLinks to={`/services`} onClick={()=>this.toggleHamburger()}>Services</StyledRightLinks>
              <StyledRightLinks to={`/`} onClick={()=>this.logout()}>Logout</StyledRightLinks>
            </div>) :
            (<div>
              <StyledRightLinks to={`/howTo`} onClick={()=>this.toggleHamburger()}>How To</StyledRightLinks>
              <StyledRightLinks to={`/signup`} onClick={()=>this.toggleHamburger()}>Sign Up</StyledRightLinks>
              <StyledRightLinks to={`login`} onClick={()=>this.toggleHamburger()}>Login</StyledRightLinks>
            </div>)}
            </HamburgerMeat>
          }

      </Hamburger>
      <StyledLink to ={`/`} onClick={()=>this.turnOffHamburger()}>
        <CalendarWrapper><FontAwesome name='calendar' /></CalendarWrapper>
        Leev
      </StyledLink>
        <List>
          <li>
          {!this.state.loggedIn ? (
            <Link to ={`/login`}>
              <SignUpLoginButton>Login</SignUpLoginButton>
            </Link>
          ) : (
            <Link to ={`/`}>
              <LogOutButton onClick={()=> this.logout()}>Logout</LogOutButton>
            </Link>
          )}
          </li>
            <li>
              <StyledRightLinks to ={'/howTo'}>
                How to use Leev
              </StyledRightLinks>
            </li>
            {this.state.loggedIn &&
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

const mapStateToProps = state => ({
  loading: state.leev.loading
});

export default connect(mapStateToProps)(Sidebar);
