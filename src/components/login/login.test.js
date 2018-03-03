import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login';
import {shallow, mount} from 'enzyme'
import store from '../../store';

describe('<Login />', () => {
  it('renders without crashing', () => {
    shallow(<Login store={store}/>);
  });
});
