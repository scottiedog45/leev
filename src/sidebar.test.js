import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from '../src/components/sidebar/sidebar';
import {shallow} from 'enzyme'
import store from './store';

it('renders without crashing', () => {
  shallow(<Sidebar store={store}/>);
});
