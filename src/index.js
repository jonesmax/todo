import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './components/home.jsx';

ReactDOM.render(
  <React.StrictMode>
      <div className='Home'><Home /></div>
    
  </React.StrictMode>,
  document.getElementById('root')
);
