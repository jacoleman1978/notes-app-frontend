import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import DisplayContainer from "./components/DisplayContainer";
import CurrentUserProvider from './contexts/currentUser'

function App() {
  return (
      <CurrentUserProvider>
        <div className="App">
          <NavBar />
          <Router>
            <Routes>
              <Route path='/' element={<Navigate to='/auth/login'/>} />
              <Route path='/auth/login' element={<LoginForm/>} />
              <Route path='/auth/signup' element={<SignupForm/>} />
              <Route path='/notes/:userName' element={<DisplayContainer isHome={true}/>} />
              <Route path='/notes/:userName/:topicId' element={<DisplayContainer isHome={false}/>} />
            </Routes>
          </Router>
        </div>
      </CurrentUserProvider>
  );
}

export default App;
