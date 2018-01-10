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
          {props.optionList}
        </ul>
      </nav>
    </div>
  )
}

Sidebar.defaultProps = {
  options: 'personnelllll'
};

const mapStateToProps = (state, props)  => ({
  optionList: state
});

export default connect(mapStateToProps)(Sidebar);
