import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

export function Sidebar(props) {

  return (
    <div className='sidebar sidebar-left'>
      <nav className='option-menu'>
        <ul className='option-menu-list'>
          <Link to = {`/services`} className='active'>
            <button>Services</button>
          </Link>
          <Link to ={`/members`} className='active'>
            <button>Member List</button>
          </Link>
        </ul>
      </nav>
    </div>
  )
}

const mapStateToProps = (state, props)  => ({
  optionList: state.leev.optionList
});

export default connect(mapStateToProps)(Sidebar);
