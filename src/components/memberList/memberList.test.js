import React from 'react';
import ReactDOM from 'react-dom';
import MemberList from './memberList';
import {shallow, mount} from 'enzyme'
import store from '../../store';

describe('<MemberList />', () => {
  it('renders without crashing', () => {
    shallow(<MemberList store={store}/>);
  });
});
