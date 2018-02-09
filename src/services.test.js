import React from 'react';
import ReactDOM from 'react-dom';
import Services from './components/services';
import {shallow} from 'enzyme'



it('renders without crashing', () => {
  shallow(<Services />);
});
