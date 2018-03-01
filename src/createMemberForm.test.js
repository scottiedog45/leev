import React from 'react';
import ReactDOM from 'react-dom';
import CreateMemberForm from '../src/components/createMemberForm/createMemberForm';
import {shallow, mount} from 'enzyme'
import store from './store';

describe('<CreateMemberForm />', () => {
  it('renders without crashing', () => {
    shallow(<CreateMemberForm store={store}/>);
  });
});
