import React from "react";
import "./App.css";
import Register from "./Component/Register/Register";
import Userlist from "./Component/UserList/UserList";
import Header from "./Component/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/userlist" element={<Userlist />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
