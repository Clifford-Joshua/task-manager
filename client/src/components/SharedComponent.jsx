import React from "react";
import Nav from "./NavBar/Nav";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const SharedComponent = () => {
  return (
    <>
      <Nav />
      <SideBar />
      <Outlet />
    </>
  );
};

export default SharedComponent;
