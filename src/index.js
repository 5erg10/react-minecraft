import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SceneStatus from './context/SceneStatusProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SceneStatus>
      <App />
    </SceneStatus>
  </React.StrictMode>
);
