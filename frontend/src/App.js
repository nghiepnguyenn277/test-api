import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import Header from './compoment/Header';
import Home from "./pages/Home";
import Update from "./pages/Update";
import Add from './pages/Add';
import View from "./pages/View";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/view/:id" element={<View />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
