// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import SignUp from './components/signup/signup';
import Login from './components/login/login';
import Home from './components/home/home';
import UserHome from './components/userHome/userHome';
import AddItem from './components/addItem/addItem';
import ViewItem from './components/viewItems/viewItems';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/userHome" element={<UserHome />} />
        <Route path="/userHome" element={<AddItem />} />
        <Route path="/userHome" element={<ViewItem />} />
      </Routes>
    </Router>
  );
}

export default App;
