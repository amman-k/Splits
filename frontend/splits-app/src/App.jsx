import React from "react";
import {Routes,Route} from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import GroupDetailsPage from './pages/GroupDetailsPage';

function App(){
  return(
    <Routes>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path="/register" element={<RegisterPage/>}></Route>
      <Route path="/dashboard" element={<DashboardPage/>}></Route>
      <Route path="/group/id:" element={<GroupDetailsPage/>}></Route>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;