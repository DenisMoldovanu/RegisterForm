import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import ViewProfile from "./components/ViewProfile";
import Layout from "./components/Layout";
import EditProfile from "./components/EditProfile";
import ManageListings from "./components/ManageListings";
import Register from "./components/Register";
import Forgot from "./components/ForgotPassword/Forgot";
import Login from "./components/Login/Login";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import { useParams } from "react-router-dom";

function App() {
  return (
    <HashRouter basename='/' hastype='slash'>
      <Layout>
        <Routes>
          <Route path='/profile' element={<ViewProfile />} />
          <Route path='/edit' element={<EditProfile />} />
          <Route path='/manage-listings' element={<ManageListings />} />
          <Route path='/registration-page' element={<Register />} />
          <Route path='/forgot-password' element={<Forgot />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
