import React from 'react';
import ReactDOM from 'react-dom';
import Attendance from './attendance';
import {shallow, mount} from 'enzyme'
import store from '../../store';

describe('<Attendance />', () => {
  it('renders without crashing', () => {
    shallow(<Attendance store={store}/>);
  });
});
