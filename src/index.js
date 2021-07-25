import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from "react-i18next";

import App from './App';
import i18n from "./i18n";

const rootEl = document.getElementById('root');

ReactDOM.render(<App />, rootEl);

// if (module.hot) {
//   module.hot.accept('./App', () => {
//     // eslint-disable-next-line
//     const NextApp = require('./App').default;
//     ReactDOM.render(
//       <I18nextProvider i18n={i18n}>
//         <NextApp />
//       </I18nextProvider>, rootEl);
//   });
// }


if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line
    const NextApp = require('./App').default;
    ReactDOM.render(<NextApp />, rootEl);
  });
}
