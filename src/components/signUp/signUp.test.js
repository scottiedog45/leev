import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from './signUp';
import {shallow, mount} from 'enzyme'
import store from '../../store';

describe('<SignUp />', () => {
  it('renders without crashing', () => {
    shallow(<SignUp store={store}/>);
  });
});
