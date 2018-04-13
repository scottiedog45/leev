import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Home from '../home/home';
import MemberList from '../memberList/memberList';
import Services from '../services/services';
import Sidebar from '../sidebar/sidebar';
import {connect} from 'react-redux';
import Profile from '../profile/profile'
import Attendance from '../attendance/attendance';
import Login from '../login/login'
import HowTo from '../howTo/howTo';
import SignUp from '../signUp/signUp';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      loggedIn: false
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.token !== '') {
        this.setState({
          loggedIn: true
        });
    } else {
      this.setState({
        loggedIn: false
      });
    }
  }

  render() {

    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <Sidebar loggedIn={this.state.loggedIn}/>
            <main>
              <Route exact path="/" component={Home} />
              <Route exact path='/signup' component={SignUp} />
              <Route exact path='/login' component = {Login} />
              <Route exact path='/howTo' component={HowTo} />
              <Route exact path='/members' render={()=> (
                this.state.loggedIn ? (
                  <MemberList />
                ) : (
                  <Redirect to="/" />
                )
              )} />
              <Route exact path='/members/:memberId' render={(props)=> (
                this.state.loggedIn ? (
                  <Profile {...props}/>
                ) : (
                  <Redirect to="/" />
                )
              )} />
              <Route exact path='/services' render={()=> (
                this.state.loggedIn ? (
                  <Services />
                ) : (
                  <Redirect to="/" />
                )
              )} />
              <Route exact path='/services/:serviceId' render={(props)=> (
                this.state.loggedIn ? (
                  <Attendance {...props}/>
                ) : (
                  <Redirect to="/" />
                )
              )} />
            </main>
          </div>
        </Router>
        </MuiThemeProvider>
      )
  }
}

const mapStateToProps = state => ({
  state: state.leev,
  token: state.leev.token,
  loading: state.leev.loading,
});

export default connect(mapStateToProps)(App);
