import React from 'react';
import ReactDOM from 'react-dom';
import MarkLeave from './markLeave';
import {shallow, mount} from 'enzyme'
import store from '../../store';

describe('<MarkLeave />', () => {
  it('renders without crashing', () => {
    shallow(<MarkLeave store={store}/>);
  });
});
