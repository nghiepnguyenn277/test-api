import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import './App.css';
import 'react-toastify/dist/ReactToastify.css'

import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import View from "./pages/View";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <div className='App'>
        <ToastContainer />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/add" element={<AddEdit />} />
          <Route path="/update:id" element={<AddEdit />} />
          <Route path="/view:id" element={<View />} />

        </Routes>
      </div>
    </Router>

  );
}

export default App;
