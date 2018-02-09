import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});


it('renders without crashing', () => {
  shallow(<App />);
});
