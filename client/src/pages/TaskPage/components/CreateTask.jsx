import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";

import {
  closeCreateTaskModal,
  setReRender,
} from "../../../Features/useStateSlice";
import { useEffect } from "react";

const url = import.meta.env.VITE_Task_API_BACKEND_URL;
const baseApi = import.meta.env.VITE_API_BACKEND_URL;

const CreateTask = () => {
  const dispatch = useDispatch();
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    dueDate: "",
    description: "",
    assignedTo: "",
  });
  const [user, setUser] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [executedBy, setExecutedBy] = useState("others");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTaskDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !taskDetails.title ||
      !taskDetails.description ||
      !taskDetails.dueDate
    ) {
      toast.error("All fields are required");
      return;
    }

    if (executedBy === "others" && !taskDetails.assignedTo) {
      toast.error("Please provide assignee");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${url}/tasks`,
        {
          ...taskDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = res.data;

      dispatch(closeCreateTaskModal());

      toast.success(data.msg);

      setTaskDetails({
        title: "",
        dueDate: "",
        description: "",
        assignedTo: "",
      });

      dispatch(setReRender());
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
        toast.error("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios(`${baseApi}/users`);

      if (res.status !== 200) {
        toast.error("Failed to fetch users");
        return;
      }

      const { users } = res.data;

      setUser(users);
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
        toast.error("Network error. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Wrapper className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
      <div className="bg-white w-[95%] md:w-[65%] lg:w-[40%] p-[1rem] rounded-[8px] flex flex-col gap-[01rem]">
        <div className="flex justify-between items-center text-gray-400">
          <h2 className="text-[1.2rem] font-bold hover:text-black">
            Create New Task
          </h2>

          <IoMdClose
            className="text-[1.5rem] font-extrabold  cursor-pointer hover:text-red-700"
            onClick={() => dispatch(closeCreateTaskModal())}
          />
        </div>

        <form className="flex flex-col gap-[1rem]" onSubmit={handleSubmit}>
          {/* =========================================================================== */}
          {/* Task Title */}
          <div className="flex flex-col gap-[0.5rem]">
            <label htmlFor="taskName" className="font-bold capitalize">
              Task Name :
            </label>
            <input
              type="text"
              name="title"
              value={taskDetails.title}
              onChange={handleChange}
              className="border border-gray-200 rounded-[10px] p-[0.3rem] bg-gray-200 text-black"
            />
          </div>

          {/* =========================================================================== */}
          {/* Due Date */}
          <div className="flex flex-col gap-[0.5rem]">
            <label htmlFor="dueDate" className="font-bold capitalize">
              Due Date :
            </label>
            <input
              type="date"
              name="dueDate"
              value={taskDetails.dueDate}
              onChange={handleChange}
              className="border border-gray-200 rounded-[10px] p-[0.3rem] px-[0.8rem] bg-gray-200 text-black"
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
              value={taskDetails.description}
              onChange={handleChange}
              className="border h-[15vh] border-gray-200 rounded-[10px] p-[0.3rem] bg-gray-200 text-black"
            />
          </div>

          {/* =========================================================================== */}
          {/* Executed By self */}
          <div className="flex items-center  gap-[0.5rem]  text-black font-bold">
            <input
              type="checkbox"
              name="executedBy"
              value={executedBy}
              onChange={(e) => {
                const checked = e.target.checked;

                checked ? setExecutedBy("self") : setExecutedBy("others");
              }}
              className="size-[1.3rem] accent-green-800"
            />
            <label htmlFor="executedBySelf" className="ml-[0.3rem]">
              Executed By Self
            </label>
          </div>

          {/* =========================================================================== */}
          {/* users */}
          {user.length > 1 && executedBy === "others" && (
            <div className="flex flex-col gap-[0.5rem] ">
              <label htmlFor="assignedTo" className="font-bold capitalize">
                Assigned To :
              </label>
              <select
                name="assignedTo"
                value={taskDetails.assignedTo}
                onChange={handleChange}
                className="p-[0.5rem] rounded-[5px] bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-500 w-[100%] focus:border-black transition duration-300 ease-in-out "
              >
                <option value=""></option>
                {user.map(({ name }, ind) => {
                  return (
                    <option value={name} key={ind}>
                      {name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          <button
            className="border py-[0.5rem] font-bold text-[1rem] rounded-[5px] bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition duration-300 ease-in-out capitalize"
            type="submit"
          >
            {Loading ? "creating....." : "submit"}
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default CreateTask;
