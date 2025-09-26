import React from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

import { useDispatch } from "react-redux";

import { toggleUpdateTaskModal } from "../../../Features/useStateSlice";

const Update = () => {
  const dispatch = useDispatch();

  return (
    <Wrapper className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
      <div className="bg-white w-[90%] md:w-[65%] lg:w-[40%] p-[1rem] rounded-[8px] flex flex-col gap-[01rem]">
        <div className="flex justify-between items-center ">
          <h2 className="text-[1.2rem] font-bold text-black hover:text-gray-400">
            Update Task
          </h2>

          <IoMdClose
            onClick={() => dispatch(toggleUpdateTaskModal())}
            className="text-[1.5rem] font-extrabold  cursor-pointer hover:text-red-700"
          />
        </div>

        <form className="flex flex-col gap-[1rem]">
          {/* =========================================================================== */}
          {/* Status */}
          <div className="flex flex-col gap-[0.5rem]">
            <label htmlFor="taskName" className="font-bold capitalize">
              Status :
            </label>
            <input
              type="text"
              name="taskName"
              className="border border-gray-200 rounded-[10px] p-[0.3rem] bg-gray-200 text-black"
            />
          </div>

          {/* =========================================================================== */}
          {/* Due date */}
          <div className="flex flex-col gap-[0.5rem]">
            <label htmlFor="taskName" className="font-bold capitalize">
              Due Date :
            </label>
            <input
              type="text"
              name="taskName"
              className="border border-gray-200 rounded-[10px] p-[0.3rem] bg-gray-200 text-black"
            />
          </div>

          {/* =========================================================================== */}
          {/* Task Name */}
          <div className="flex flex-col gap-[0.5rem]">
            <label htmlFor="taskName" className="font-bold capitalize">
              Task Name :
            </label>
            <input
              type="text"
              name="taskName"
              className="border border-gray-200 rounded-[10px] p-[0.3rem] bg-gray-200 text-black"
            />
          </div>

          {/* =========================================================================== */}
          {/* Task Description */}
          <div className="flex flex-col gap-[0.5rem] ">
            <label htmlFor="taskName" className="font-bold capitalize">
              description :
            </label>
            <textarea
              type="text"
              name="taskName"
              className="border h-[15vh] border-gray-200 rounded-[10px] p-[0.3rem] bg-gray-200 text-black"
            />
          </div>

          {/* =========================================================================== */}
          {/* update */}

          <button className="border py-[0.5rem] font-bold text-[1rem] rounded-[5px] bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition duration-300 ease-in-out capitalize">
            submit
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Update;
