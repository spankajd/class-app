import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import MainContainer from './containers/MainContainer/MainContainer';
import store from './store';
import './style/common.scss';

const App = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Provider store={store}>
        <MainContainer></MainContainer>
      </Provider>
    </Suspense>
  );
};

export default App;
