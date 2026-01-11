import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Layout from "./components/Layout/Index";
import AddStudents from "./pages/AddStudents";
import Registration from "./pages/Registration";
import Login from "./pages/Login.Jsx";
import Attendence from "./pages/Attendence";
import Report from "./pages/Report";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login/>}/>
          <Route path="registration" element={<Registration/>}/>
          <Route path="/" element={<Layout />} >
          <Route index element={<Home/>} />
          <Route path="/addstudents" element={<AddStudents />} />
          <Route path="/attendence" element={<Attendence/>} />
          <Route path="/report" element={<Report/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
