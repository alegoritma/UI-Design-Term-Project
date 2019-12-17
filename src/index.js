import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import initialState from './features/initialState';
import configureStore from './store/configureStore';

// import {MuiThemeProvider, getMuiTheme} from '@material-ui/styles';

// const muiTheme = getMuiTheme({
//   appBar: {
//     height: 56, // Instead of 64
//   },
// });
const store = configureStore(initialState);


ReactDOM.render(
  <Provider store={store}>
    {/* <MuiThemeProvider muiTheme={muiTheme}> */}
    <App />
    {/* </MuiThemeProvider> */}
</Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
