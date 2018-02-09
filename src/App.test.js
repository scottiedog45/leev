import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';


it('renders without crashing', () => {
  shallow(<App />);
});
