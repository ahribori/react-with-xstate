import React, {useEffect} from 'react';
import './App.css';
import promiseMachine from './machine/promise';
import { useMachine } from '@xstate/react';

function App() {
  const [current, send] = useMachine(promiseMachine);

  useEffect(() => {
    send('FETCH')
  }, [])


  return (
    <div className="App">
      <pre>{JSON.stringify(current, null, 2)}</pre>
    </div>
  );
}

export default App;
