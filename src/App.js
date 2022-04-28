import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import DisplayContainer from "./components/DisplayContainer";
import {Container} from 'react-bootstrap';

function App() {
  return (
      <Container className="App">
        <NavBar />
        <Router>
          <Routes>
            <Route path='/' element={<Navigate to='/auth/login'/>} />
            <Route path='/auth/login' element={<LoginForm/>} />
            <Route path='/notes' element={<DisplayContainer/>} />
          </Routes>
        </Router>
      </Container>
  );
}

export default App;
