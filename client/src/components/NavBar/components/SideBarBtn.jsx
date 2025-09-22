import React from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { toggleSideBar } from "../../../Features/useStateSlice";

const SideBarBtn = () => {
  const dispatch = useDispatch();
  const { isSideBarOpen } = useSelector((state) => state.stateSlice);

  return (
    <Wrapper>
      <div>
        <button
          className="flex items-center justify-center text-center bg-black w-[40px] h-[35px] md:h-[38px] md:w-[42px] text-white font-bold text-[1.1rem] md:text-[1.3rem] rounded-[10px] shadow-[0_0_10px_5px_rgba(107,114,128,0.5)] cursor-pointer  transition duration-500 ease-in-out hover:bg-white hover:text-black"
          onClick={() => dispatch(toggleSideBar())}
        >
          {isSideBarOpen ? <IoClose className="text-[1.5rem]" /> : <FaBars />}
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default SideBarBtn;
