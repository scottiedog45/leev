import React from 'react';
import ReactDOM from 'react-dom';
import Leaves from './leaves';
import {shallow, mount} from 'enzyme'
import store from '../../store';

describe('<Leaves />', () => {
  it('renders without crashing', () => {
    shallow(<Leaves store={store}/>);
  });
});
