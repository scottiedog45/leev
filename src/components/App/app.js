import React from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import Home from '../home/home';
import MemberList from '../memberList/memberList';
import Services from '../services/services';
import Sidebar from '../sidebar/sidebar';
import {connect} from 'react-redux';
import Profile from '../profile/profile'
import Attendance from '../attendance/attendance';
import {fetchServices, fetchMembers} from '../../actions';
import Login from '../login/login'
import styled from 'styled-components';
import store from 'store';
import HowTo from '../howTo/howTo';



const StyledLink = styled(Link)`
  color: #E85E28;
  font-size: 30px;
  position: absolute;
  text-decoration: none;

`;

const Header = styled.header`


`;



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      loggedIn: true
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchServices());
    this.props.dispatch(fetchMembers(this.props.token));
    console.log(this.props);
    }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token !== '') {
      this.setState({
        loggedIn: true
      });
    } else {
      this.setState({
        loggedIn: true
      });
    }
  }

  render() {

    return (
        <Router>
          <div>
            <Sidebar loggedIn={this.state.loggedIn}/>
            <main>
              <Route exact path="/" component={Home} />
              <Route exact path='/login' component = {Login} />
              <Route exact path='/members' render={()=> (
                this.state.loggedIn ? (
                  <MemberList />
                ) : (
                  <Redirect to="/" />
                )
              )} />
              <Route exact path='/members/:memberId' component={Profile}/>
              <Route exact path='/services' component={Services}/>
              <Route exact path='/services/:serviceId' component={Attendance} />
              <Route exact path='/howTo' component={HowTo} />
            </main>
          </div>
        </Router>
    );
  }
}

const mapStateToProps = state => ({
  state: state.leev,
  token: state.leev.token
});

export default connect(mapStateToProps)(App);
