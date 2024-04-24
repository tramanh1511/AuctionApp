import React from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";

import Landing from "./components/Landing/landing";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/signup";
import CreateAuction from "./components/auction/createAuction";
import AuctionDetail from "./components/auction/auctionDetail";
import Profile from "./components/authentication/profile";

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
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/auctions/:auctionId" component={<AuctionDetail />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>


  );
}

export default App;
