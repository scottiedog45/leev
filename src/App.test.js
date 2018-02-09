import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';


it('renders without crashing', () => {
  shallow(<App />);
});
