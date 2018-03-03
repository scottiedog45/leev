import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home';
import {shallow, mount} from 'enzyme'
import store from '../../store';

describe('<Home />', () => {
  it('renders without crashing', () => {
    shallow(<Home store={store}/>);
  });
});
