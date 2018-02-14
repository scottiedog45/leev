import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from './sidebar.css'
export function Sidebar(props) {

  return (
    <div className='sidebar-top'>
      <nav className='option-menu'>
        <ul className='option-menu-list'>
        <li>
          <Link to = {`/services`} className='active'>
            <button className={styles.servicesButton}>Services</button>
          </Link>
        </li>
          <li>
          <Link to ={`/members`} className='active'>
            <button>Member List</button>
          </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

const mapStateToProps = (state, props)  => ({
  optionList: state.leev.optionList
});

export default connect(mapStateToProps)(Sidebar);
