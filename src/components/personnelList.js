import React from 'react';
import {connect} from 'react-redux';
import Profile from './profile'

export default function PersonnelList(props){
  
  const personnel = 'person';
  return (
    <div className='personnelList'>
    <button className='addPerson'>Add Person</button>
      <ul className='allPeople'>
      <p>'profile'</p>
      <button
        name='addPerson'
        id='addPersonButton'
        className='button'
      >Add Person</button>
        <Profile />
      </ul>
    </div>
  )
}
