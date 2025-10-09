import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";

import {
  toggleUpdateTaskModal,
  setReRender,
} from "../../../Features/useStateSlice";

const url = import.meta.env.VITE_L0CAL_HOST_5000_Task_API_BACKEND_URL;

const Update = () => {
  const dispatch = useDispatch();
  const [newUpdate, setNewUpdate] = useState({
    status: localStorage.getItem("status"),
    dueDate: localStorage.getItem("dueDate"),
    title: localStorage.getItem("title"),
    description: localStorage.getItem("description"),
  });
  const [Loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !newUpdate.description ||
      !newUpdate.dueDate ||
      !newUpdate.status ||
      !newUpdate.title
    ) {
      toast("Please fill out all required fields before updating the task.");
      return;
    }

    try {
      setLoading(true);

      const Id = localStorage.getItem("Id");

      const res = await axios.patch(`${url}/tasks/${Id}`, newUpdate, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const { msg } = res.data;

      toast.success(msg);

      dispatch(setReRender());

      dispatch(toggleUpdateTaskModal());
    } catch (err) {
      // ✅ error toast

      if (err.response) {
        // Backend returned an error
        toast.error(err.response.data.msg || "Something went wrong");
      } else if (err.request) {
        // No response from server

        toast.error("No response from server. Please try again.");
      } else {
        // Other errors
        console.log(err);
        toast.error("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
      <div className="bg-white w-[90%] md:w-[65%] lg:w-[40%] p-[1rem] rounded-[8px] flex flex-col gap-[01rem]">
        <div className="flex justify-between items-center ">
          <h2 className="text-[1.2rem] font-bold text-black hover:text-gray-400">
            Update Task
          </h2>

          <IoMdClose
            onClick={() => {
              dispatch(toggleUpdateTaskModal());
            }}
            className="text-[1.5rem] font-extrabold  cursor-pointer hover:text-red-700"
          />
        </div>

        <form className="flex flex-col gap-[1rem]" onSubmit={handleSubmit}>
          {/* =========================================================================== */}
          {/* Status */}

          <div className="flex flex-col gap-[0.5rem] ">
            <label htmlFor="status" className="font-bold capitalize">
              Status :
            </label>
            <select
              name="status"
              id="status"
              value={newUpdate.status}
              onChange={handleChange}
              className="p-[0.5rem] rounded-[5px] bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-500 w-[100%] focus:border-black transition duration-300 ease-in-out "
            >
              <option value=""></option>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* =========================================================================== */}
          {/* Due date */}
          <div className="flex flex-col gap-[0.5rem]">
            <label htmlFor="dueDate" className="font-bold capitalize">
              Due Date :
            </label>
            <input
              type="date"
              name="dueDate"
              id="dueDate"
              value={newUpdate.dueDate}
              onChange={handleChange}
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
              name="title"
              id="title"
              value={newUpdate.title}
              onChange={handleChange}
              className="border border-gray-200 rounded-[10px] p-[0.3rem] bg-gray-200 text-black"
            />
          </div>

          {/* =========================================================================== */}
          {/* Task Description */}
          <div className="flex flex-col gap-[0.5rem] ">
            <label htmlFor="description" className="font-bold capitalize">
              description :
            </label>
            <textarea
              type="text"
              name="description"
              id="description"
              value={newUpdate.description}
              onChange={handleChange}
              className="border h-[15vh] border-gray-200 rounded-[10px] p-[0.3rem] bg-gray-200 text-black"
            />
          </div>

          {/* =========================================================================== */}
          {/* update */}

          <button
            className="border py-[0.5rem] font-bold text-[1rem] rounded-[5px] bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition duration-300 ease-in-out capitalize"
            type="submit"
            disabled={Loading}
          >
            {Loading ? "Loading ..........." : "submit"}
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Update;
