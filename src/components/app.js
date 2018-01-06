import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Home from './home';
import PersonnelList from './personnelList';
import Services from './services';


export default function App(props) {
  return (
    <Router>
      <div className='app'>
        <header>
          <h1><Link to ="/">Leev</Link></h1>
        </header>
        <main>
        <p>Home!</p>
          <Route exact path="/" component={Home} />
          <Route exact path='/personnelList' component = {PersonnelList}/>
          <Route exact path='/services' component = {Services}/>
        </main>
      </div>
    </Router>
  )
}
