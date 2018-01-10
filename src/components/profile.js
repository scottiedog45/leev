import React from 'react';
import {connect} from 'react-redux';
import Services from './services.js';
import Leaves from './leaves.js';


export function Profile(props) {
  return (
    <div className='individualProfile'>
      <div className='name'>
        <h3>{props.name}</h3>
      </div>
      <p className='role'>{props.role}</p>
      <div className='services'>
        <h2>Services</h2>
        <div className='individualService'>
          {Services}
          'Some Service'
        </div>
      </div>
      <div className='leaves'>
        <h2>Leave:</h2>
          {Leaves}
          'Some Leave'
      </div>
    </div>
  );
}

// Profile.defaultProps = {
//   name: 'nothing',
//   role: 'oboe'
// }

export const mapStateToProps = state => ({
  name: state.personnel.name,
  role: state.personnel.role
});

export default connect (mapStateToProps)(Profile);
