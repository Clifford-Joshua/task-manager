import React, { useState } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleExecutedBySelf,
  closeCreateTaskModal,
} from "../../../Features/useStateSlice";
const CreateTask = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [executedBy, setExecutedBy] = useState("other");
  const { isExecutedBySelf } = useSelector((store) => store.stateSlice);

  return (
    <Wrapper className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
      <div className="bg-white w-[90%] md:w-[65%] lg:w-[40%] p-[1rem] rounded-[8px] flex flex-col gap-[01rem]">
        <div className="flex justify-between items-center text-gray-400">
          <h2 className="text-[1.2rem] font-bold hover:text-black">
            Create New Task
          </h2>

          <IoMdClose
            className="text-[1.5rem] font-extrabold  cursor-pointer hover:text-red-700"
            onClick={() => dispatch(closeCreateTaskModal())}
          />
        </div>

        <form className="flex flex-col gap-[1rem]">
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
          {/* Executed By self */}
          <div className="flex items-center  gap-[0.5rem]  text-black font-bold">
            <input
              type="checkbox"
              name="executedBySelf"
              onChange={(e) => {
                const checked = e.target.checked;
                dispatch(toggleExecutedBySelf());
                setExecutedBy(checked ? "self" : "other");
              }}
              className="size-[1.3rem] accent-green-800"
            />
            <label htmlFor="executedBySelf" className="ml-[0.3rem]">
              Executed By Self
            </label>
          </div>

          {/* =========================================================================== */}
          {/* users */}
          {!isExecutedBySelf && (
            <div>
              <select
                name="user"
                id=""
                className="p-[0.5rem] rounded-[5px] bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-500 w-[100%] focus:border-black transition duration-300 ease-in-out "
              >
                <option value=""></option>
                <option value="">James Done</option>
                <option value="">Peter Done</option>
                <option value="">Andrew Done</option>
                <option value="">Paul Done</option>
                <option value="">Energy Done</option>
              </select>
            </div>
          )}

          <button className="border py-[0.5rem] font-bold text-[1rem] rounded-[5px] bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition duration-300 ease-in-out capitalize">
            submit
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default CreateTask;
