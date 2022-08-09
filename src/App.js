import React from 'react';
import './App.css';
import QueryForm from './components';
import configs from './components/configs';
import loadedInitLogic from './components/initialValues';

function App() {
  return (
    <div className="wrapper">
      <QueryForm config={configs} loadedInitLogic={loadedInitLogic} />
    </div>
  );
}

export default App;
