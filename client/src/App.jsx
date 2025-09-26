import React from "react";
import ScrollToTop from "./ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SharedComponent from "./components/SharedComponent";
import {
  Error,
  Dashboard,
  Task,
  Login,
  SignUp,
  ForgottenPassword,
} from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<SharedComponent />}>
          <Route index element={<Dashboard />} />
          <Route path="/task" element={<Task />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotten-password" element={<ForgottenPassword />} />
        <Route path="*" element={<Error />} />
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
