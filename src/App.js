import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import Player from './components/Player/Player';
import { Button } from './elements/Button/Button';
import store from './store';
import './style/common.scss';

const App = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Provider store={store}>
        <Player></Player>
      </Provider>
    </Suspense>
  );
};

export default App;
