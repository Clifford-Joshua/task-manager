import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { FaUser } from "react-icons/fa";
import { FaTasks, FaUserEdit } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaGear } from "react-icons/fa6";

import { closeSideBar } from "../Features/useStateSlice";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSideBarOpen } = useSelector((state) => state.stateSlice);
  const user = localStorage.getItem("user") || sessionStorage.getItem("user");

  return (
    <Wrapper
      className={`absolute h-[90vh] md:h-[91vh] lg:h-[88vh] w-[100%] md:w-[50%] lg:w-[30%] bg-gray-800 transition-all  duration-700 ease-in-out
        
        ${isSideBarOpen ? "translate-x-0 " : "translate-x-[-100%]"}
          `}
    >
      <div className="text-white flex flex-col gap-[1rem] p-[1rem]">
        <Link
          to={"/dashboard"}
          onClick={() => dispatch(closeSideBar())}
          className="flex items-center gap-[1rem] py-[1rem]  rounded-[10px]  transition duration-500 ease-in-out hover:text-black hover:bg-white hover:px-[1.2rem] cursor-pointer"
        >
          <MdSpaceDashboard className="text-[1.5rem]" />

          <h2 className=" text-[1.1rem] ">DashBoard</h2>
        </Link>

        <Link
          to={"/"}
          onClick={() => dispatch(closeSideBar())}
          className="flex items-center gap-[1rem] py-[1rem]  rounded-[10px]  transition duration-500 ease-in-out hover:text-black hover:bg-white hover:px-[1.2rem] cursor-pointer"
        >
          <FaTasks className="text-[1.25rem]" />

          <h2 className="  text-[1.1rem]  ">Tasks</h2>
        </Link>

        <Link
          to={"/signup"}
          className="flex items-center gap-[1rem] py-[1rem]  rounded-[10px]  transition duration-500 ease-in-out hover:text-black hover:bg-white hover:px-[1.2rem] cursor-pointer"
          onClick={() => dispatch(closeSideBar())}
        >
          <FaUser />

          <h2 className="  text-[1.1rem]  ">Sign Up</h2>
        </Link>

        {user ? (
          <div
            className="flex items-center gap-[1rem] py-[1rem]  rounded-[10px]  transition duration-500 ease-in-out hover:text-black hover:bg-white hover:px-[1.2rem] cursor-pointer"
            onClick={() => dispatch(closeSideBar())}
          >
            <RiLogoutBoxLine className="text-[1.3rem]" />
            <button
              className="text-left text-[1.1rem] cursor-pointer"
              onClick={() => {
                localStorage.setItem("user", false);
                sessionStorage.removeItem("user");
                navigate("/login");
              }}
            >
              LogOut
            </button>
          </div>
        ) : (
          <Link
            to={"/login"}
            className="flex items-center gap-[1rem] py-[1rem] rounded-[10px]
          transition duration-500 ease-in-out hover:text-black hover:bg-white
          hover:px-[1.2rem] cursor-pointer"
            onClick={() => dispatch(closeSideBar())}
          >
            <FaUserEdit />
            <h2 className="  text-[1.1rem]  ">Login</h2>
          </Link>
        )}

        <Link
          to={"/setting"}
          className="flex items-center gap-[1rem] py-[1rem]  rounded-[10px]  transition duration-500 ease-in-out hover:text-black hover:bg-white hover:px-[1.2rem] cursor-pointer"
          onClick={() => dispatch(closeSideBar())}
        >
          <FaGear className="text-[1.3rem]" />

          <h2 className="  text-[1.1rem]  ">Setting And Privacy</h2>
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default SideBar;
