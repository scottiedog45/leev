import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './sidebar';
import {shallow} from 'enzyme'
import store from '../../store';

describe('<Sidebar />', () => {
  it('renders without crashing', () => {
    shallow(<Sidebar store={store}/>);
  });
});
