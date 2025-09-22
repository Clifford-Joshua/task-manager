import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { FaUser } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MdSpaceDashboard } from "react-icons/md";

import { toggleSideBar } from "../Features/useStateSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const { isSideBarOpen } = useSelector((state) => state.stateSlice);

  return (
    <Wrapper
      className={`absolute h-[90vh] md:h-[91vh] w-[100%] md:w-[50%] lg:w-[30%] bg-gray-800 transition-all  duration-700 ease-in-out
        
        ${isSideBarOpen ? "translate-x-0 " : "translate-x-[-100%]"}
          `}
    >
      <Link
        to={"/"}
        onClick={() => dispatch(toggleSideBar())}
        className="text-white flex flex-col gap-[1rem] p-[1rem]"
      >
        <div className="flex items-center gap-[1rem] py-[1rem]  rounded-[10px]  transition duration-500 ease-in-out hover:text-black hover:bg-white hover:px-[1.2rem] cursor-pointer">
          <MdSpaceDashboard className="text-[1.5rem]" />

          <h2 className=" text-[1.1rem] ">DashBoard</h2>
        </div>

        <Link
          to={"/task"}
          onClick={() => dispatch(toggleSideBar())}
          className="flex items-center gap-[1rem] py-[1rem]  rounded-[10px]  transition duration-500 ease-in-out hover:text-black hover:bg-white hover:px-[1.2rem] cursor-pointer"
        >
          <FaTasks className="text-[1.25rem]" />

          <h2 className="  text-[1.1rem]  ">Tasks</h2>
        </Link>

        <div
          className="flex items-center gap-[1rem] py-[1rem]  rounded-[10px]  transition duration-500 ease-in-out hover:text-black hover:bg-white hover:px-[1.2rem] cursor-pointer"
          onClick={() => dispatch(toggleSideBar())}
        >
          <RiLogoutBoxLine className="text-[1.3rem]" />
          <button className="text-left text-[1.1rem]">LogOut</button>
        </div>

        <div
          className="flex items-center gap-[1rem] py-[1rem]  rounded-[10px]  transition duration-500 ease-in-out hover:text-black hover:bg-white hover:px-[1.2rem] cursor-pointer"
          onClick={() => dispatch(toggleSideBar())}
        >
          <FaUser />

          <button className="text-left text-[1.1rem]">Sign In</button>
        </div>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default SideBar;
