import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter } from "react-router-dom"
import {Provider} from 'react-redux'
import SocketApp from '../src/components/VirtualRooms/SocketApp';
import {ContextProvider} from '../src/components/VirtualRooms/SocketContext'
import store from './redux/store'

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <Provider store={store}>
        <HashRouter>
          <App />
          <SocketApp />
        </HashRouter>
      </Provider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


