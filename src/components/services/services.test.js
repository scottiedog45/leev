import React from 'react';
import ReactDOM from 'react-dom';
import Services from './services';
import {shallow, mount} from 'enzyme'
import store from '../../store';

describe('<Services />', () => {
it('renders without crashing', () => {
  shallow(<Services store={store}/>);
  });
});
