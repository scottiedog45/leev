import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

export function Sidebar(props) {
  console.log(props.options);
  const options = 'heeyyyyy';


  return (
    <div className='sidebar sidebar-left'>
      <nav className='option-menu'>
        <ul className='option-menu-list'>
          <Link to = {`/`} activeClassName='active'>
            <button>Home</button>
          </Link>
          <Link to = {`/services`} activeClassName='active'>
            <button>Services</button>
          </Link>
          <Link to ={`/members`} activeClassName='active'>
            <button>Member List</button>
          </Link>
        </ul>
      </nav>
    </div>
  )
}

Sidebar.defaultProps = {
  options: 'personnelllll'
};

const mapStateToProps = (state, props)  => ({
  optionList: state.leev.optionList
});

export default connect(mapStateToProps)(Sidebar);
