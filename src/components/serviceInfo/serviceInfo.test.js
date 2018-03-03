import React from 'react';
import ReactDOM from 'react-dom';
import ServiceInfo from './serviceInfo';
import {shallow, mount} from 'enzyme'
import store from '../../store';

describe('<ServiceInfo />', () => {
  it('renders without crashing', () => {
    shallow(<ServiceInfo store={store}/>);
  });
});
