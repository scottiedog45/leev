import React from 'react';
import ReactDOM from 'react-dom';
import MemberInfo from './memberInfo';
import {shallow, mount} from 'enzyme'
import store from '../../store';

describe('<MemberInfo />', () => {
  it('renders without crashing', () => {
    shallow(<MemberInfo store={store}/>);
  });
});
