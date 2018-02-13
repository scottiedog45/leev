import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Home from '../home/home';
import MemberList from '../memberList/memberList';
import Services from '../services/services';
import {Sidebar} from '../sidebar/sidebar';
import {connect} from 'react-redux';
import Profile from '../profile/profile'
import Attendance from '../attendance/attendance';
import {fetchServices, fetchMembers} from '../../actions';
import './app.css';


class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchServices());
    this.props.dispatch(fetchMembers());
  }

  render() {

    return (
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
    );
  }
}

const mapStateToProps = state => ({
  state: state.leev
});

export default connect(mapStateToProps)(App);
