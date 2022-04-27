import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import {Container} from 'react-bootstrap';

function App() {
  return (
    <Container className="App">
      <NavBar />
      <Router>
        <Routes>
          <Route path='/' element={
            <div>
              <div>Home</div>
            </div>
          } />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
