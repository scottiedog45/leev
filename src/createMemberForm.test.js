import React from 'react';
import ReactDOM from 'react-dom';
import CreateMemberForm from './components/createMemberForm';
import {shallow} from 'enzyme'



it('renders without crashing', () => {
  shallow(<createMemberForm />);
});
