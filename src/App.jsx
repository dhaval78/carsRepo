import logo from './logo.svg';
import './App.css';
import { ReactDOM } from 'react';
import { BrowserRouter } from 'react-router-dom';

import MainComp  from "./Maincomp"
function App() {
  return (
    <>
  <BrowserRouter>
  <MainComp/>
      </BrowserRouter>
      </>
  );
}

export default App;
