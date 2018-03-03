import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './profile';
import {shallow, mount} from 'enzyme'
import store from '../../store';

describe('<Profile />', () => {
  it('renders without crashing', () => {
    shallow(<Profile store={store}/>);
  });
});
