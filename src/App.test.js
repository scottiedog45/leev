import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import enzyme from 'enzyme'



it('renders without crashing', () => {
  shallow(<App />);
});
