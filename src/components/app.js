import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Home from './home';
import PersonnelList from './personnelList';
import {Services} from './services';
import {Sidebar} from './sidebar';
import {Profile} from './profile';


export default function App(props) {
  return (
    <Router>
      <div className='app'>
        <header>
          <h1><Link to ="/">Leev</Link></h1>
        </header>
        <Sidebar />
        <main>
        <p>Home!</p>
          <Route exact path="/" component={Home} />
          <Route exact path='/personnelList' component = {PersonnelList}/>
          <Route exact path='/services' component = {Services}/>
          <Route exact path='/personnelList/profile' component  = {Profile}/>
        </main>
      </div>
    </Router>
  );
}
