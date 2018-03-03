import React from 'react';
import ReactDOM from 'react-dom';
import HowTo from './howTo';
import {shallow, mount} from 'enzyme'
import store from '../../store';

describe('<HowTo />', () => {
  it('renders without crashing', () => {
    shallow(<HowTo store={store}/>);
  });
});
