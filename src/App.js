import React, { useState } from 'react';
import './App.css';
import QueryForm from './components/QueryBuilder';
import configs from './components/QueryBuilder/configs';
import initValue from './initialValues';

function App() {
  const [state, setState] = useState(initValue);

  const onReaderLoad = (e) => {
    setState(JSON.parse(e.target.result));
  };

  const onChangeSpelJson = (e) => {
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(e.target.files[0]);
  };

  return (
    <div className="wrapper">
      <div className="query-import-spel">
        Import JSON Rules:
        <input type="file" name="file" onChange={onChangeSpelJson} />
      </div>
      <QueryForm config={configs} initValue={state} />
    </div>
  );
}

export default App;
