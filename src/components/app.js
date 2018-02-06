import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Home from './home';
import MemberList from './memberList';
import Services from './services';
import {Sidebar} from './sidebar';
import {connect} from 'react-redux';
import ChangeServices from './changeServices';
import Profile from './profile'
import Attendance from './attendance';
import {fetchServices, fetchMembers} from '../actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchServices());
    this.props.dispatch(fetchMembers());
  }

  render() {

    return (
      <MuiThemeProvider>
        <Router>
          <div className='app'>
            <header>
              <h1><Link to ="/">Leev</Link></h1>
            </header>
            <Sidebar />
            <main>
              <Route exact path="/" component={Home} />
              <Route exact path='/members' component={MemberList}/>
              <Route exact path='/members/:memberId' component={Profile}/>
              <Route exact path='/services' component={Services}/>
              <Route exact path='/services/:serviceId' component={Attendance} />
            </main>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  state: state.leev
});

export default connect(mapStateToProps)(App);
