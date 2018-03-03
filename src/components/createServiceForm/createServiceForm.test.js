import React from 'react';
import ReactDOM from 'react-dom';
import {CreateServiceForm} from './createServiceForm';
import {shallow, mount} from 'enzyme'
import store from '../../store';

describe('<CreateServiceForm />', () => {
  it('renders without crashing', () => {
    shallow(<CreateServiceForm store={store} />);
  });
});
