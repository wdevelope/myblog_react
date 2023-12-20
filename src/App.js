import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import BasicHeader from './components/common/BasicHeader';
import BasicNav from './components/common/BasicNav';
import HomePage from './components/pages/Home/HomePage';
import LoginPage from './components/pages/Login/LoginPage';
import RegisterPage from './components/pages/Register/RegisterPage';
import VisitorPage from './components/pages/Visitor/VisitorPage';
import VisitorWritePage from './components/pages/Visitor/VisitorWritePage';

function App() {
  return (
    <Router>
      <div className="App">
        <BasicHeader />
        <BasicNav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate replace to="/" />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/Visitor" element={<VisitorPage />} />
          <Route path="/Visitor/write" element={<VisitorWritePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
