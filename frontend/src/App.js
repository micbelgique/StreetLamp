import React, { Component} from 'react';
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AppNavbar from './components/AppNavbar';
import AlertList from './components/AlertList';
import AlertModal from './components/AlertModal';
import AlertMap from './components/AlertMap';

import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <AppNavbar/>
      <Container>
        <Routes>
          <Route path="/" element={<AlertList />} />
          <Route path="map" element={<AlertMap/>} />
        </Routes>
      </Container>
    </div>
    </Provider>
  );
}

export default App;
