import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import AuthComponent from "wrappers/Auth";

const Login = lazy(() => import("pages/Login"));
const SignUp = lazy(() => import("pages/SignUp"));

const RootComponent = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="*" element={<AuthComponent />} />
    </Routes>
  );
};

export default RootComponent;
