import React from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";

import Landing from "./components/Landing/landing";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/signup";
import CreateAuction from "./components/auction/createAuction";

import { AuthProvider } from "react-auth-kit";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/createAuction" element={<CreateAuction />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>


  );
}

export default App;
