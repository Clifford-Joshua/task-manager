import React from "react";
import axios from "axios";
import moment from "moment";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { CiNoWaitingSign } from "react-icons/ci";

import {
  toggleUpdateTaskModal,
  setReRender,
  filterTotalTask,
} from "../../../Features/useStateSlice";

const url = import.meta.env.VITE_Task_API_BACKEND_URL;

const TaskCard = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [TaskData, setTaskData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { reRender, filterByStatus, filterByExecutor } = useSelector(
    (store) => store.stateSlice
  );

  const HandleFetch = async () => {
    try {
      setLoading(true);

      const res = await axios(`${url}/tasks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const { tasks, count } = res.data;

      // =============================================
      // dynamic set the total number of count

      if (count === 0) {
        setError(true);
        setErrorMessage("No task added yet");
      } else {
        setError(false);
        setErrorMessage("");
      }

      const filterTasks = tasks.filter((item) => {
        const byStatus =
          filterByStatus === "all" || item.status === filterByStatus;
        const byExecutor =
          filterByExecutor === "all" || item.executedBy === filterByExecutor;
        return byStatus && byExecutor;
      });

      setTaskData(filterTasks);

      const pendingTask = tasks.filter(
        (task) => task.status === "pending"
      ).length;

      const RejectedTask = tasks.filter(
        (task) => task.status === "rejected"
      ).length;

      const CompletedTask = tasks.filter(
        (task) => task.status === "completed"
      ).length;

      const InProgressTask = tasks.filter(
        (task) => task.status === "in progress"
      ).length;

      const totalFilterTasks = filterTasks.length;

      dispatch(filterTotalTask(totalFilterTasks));

      // ==========================================================================
      // setting the status to local storage so it can be accessible from anywhere
      localStorage.setItem(
        "taskStats",
        JSON.stringify({
          total: count,
          pending: pendingTask,
          completed: CompletedTask,
          inProgress: InProgressTask,
          rejected: RejectedTask,
        })
      );
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

  const Color = (status) => {
    if (status === "pending") return "#FACC15";
    if (status === "in progress") return "#f97316";
    if (status === "rejected") return "#EF4444";
    return "#008000";
  };

  const handleDelete = async (Id) => {
    try {
      setLoading(true);
      const res = await axios.delete(`${url}/tasks/${Id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const { msg } = res.data;

      toast.success(msg);

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

  useEffect(() => {
    HandleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reRender]);

  return (
    <Wrapper>
      <div className="py-[1.5rem] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[1.5rem] ">
        {Loading ? (
          <Loader />
        ) : error ? (
          <div className="flex items-center justify-center">
            <p className="font-bold text-red-500 capitalize text-[1.2rem]">
              {errorMessage}
            </p>
          </div>
        ) : (
          TaskData &&
          TaskData.map(
            (
              {
                _id,
                title,
                dueDate,
                status,
                assignedTo,
                createdAt,
                description,
                createdBy,
              },
              ind
            ) => {
              const statusColor = Color(status);

              const loginUser = localStorage.getItem("username");

              const isDisabled = loginUser !== assignedTo.name;

              // ==============================================================================
              //  Task Card

              return (
                <div
                  className="bg-white p-[1rem] rounded-[8px] flex flex-col gap-[0.5rem] md:gap-[0.9rem] shadow-md max-w-[500px]"
                  key={ind}
                >
                  <h2 className="font-bold capitalize md:text-[1.1rem]">
                    {title}
                  </h2>
                  <p className="text-gray-600 text-[0.9rem] md:text-[0.95rem]">
                    {description}
                  </p>

                  <div className="grid grid-cols-2  gap-[1rem] text-gray-700 text-[0.9rem] md:text-[1rem] mb-[1rem]">
                    <div>
                      <h3 className="font-bold">Date : </h3>
                      <p>{moment(createdAt).format("MMM Do YYYY")}</p>
                    </div>

                    <div>
                      <h3 className="font-bold">DueDate : </h3>
                      <p>{moment(dueDate).format("MMM Do YYYY")}</p>
                    </div>

                    <div>
                      <h3 className="font-bold">Created By : </h3>
                      <p>{createdBy.name}</p>
                    </div>

                    <div>
                      <h3 className="font-bold">Assigned To : </h3>
                      <p>{assignedTo.name}</p>
                    </div>

                    <div className="flex flex-col gap-[0.4rem]">
                      <h3 className="font-bold">Status : </h3>
                      <p
                        className={`border w-max px-[0.4rem] rounded shadow-[_0_0_5px_1px_black] font-bold  text-black capitalize`}
                        style={{ backgroundColor: statusColor }}
                      >
                        {status}
                      </p>
                    </div>

                    <button
                      disabled={isDisabled}
                      className={`border py-[0.6rem]  rounded-[10px] capitalize cursor-pointer   font-bold  transition duration-300 ease-in-out mt-auto flex items-center justify-center gap-[0.5rem]

                  
                      
                      ${
                        isDisabled
                          ? "bg-gray-500 text-gray-800"
                          : "bg-red-600 hover:bg-red-500 text-white"
                      }
                      `}
                      onClick={() => handleDelete(_id)}
                    >
                      Delete
                      {isDisabled && (
                        <CiNoWaitingSign className="text-[1.2rem] text-black" />
                      )}
                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      if (isDisabled) return;
                      dispatch(toggleUpdateTaskModal());

                      // =======================================================
                      // save current value on local storage
                      const parentDiv = e.target.parentElement;
                      const childListElements = parentDiv.children;
                      const title = childListElements[0].textContent;
                      const description = childListElements[1].textContent;

                      // ============================================================================
                      // get the children element of the div containing status,due date

                      const statusDueDateChild = childListElements[2].children;

                      const dueDate =
                        statusDueDateChild[0].children[1].textContent;
                      const status =
                        statusDueDateChild[4].children[1].textContent;

                      // ================================================================
                      // convert due date to string format
                      const convertedDate = moment(
                        `${dueDate}`,
                        "MMM Do YYYY"
                      ).format("YYYY-MM-DD");

                      // ===================================================================
                      // set localstorage
                      localStorage.setItem("title", title);
                      localStorage.setItem("description", description);
                      localStorage.setItem("status", status);
                      localStorage.setItem("dueDate", convertedDate);
                      localStorage.setItem("Id", _id);
                    }}
                    className={`border py-[0.6rem]  rounded-[10px] capitalize cursor-pointer   font-bold  transition duration-300 ease-in-out mt-auto flex items-center justify-center gap-[0.5rem]
                      
                      ${
                        isDisabled
                          ? "bg-gray-500 text-gray-800"
                          : "bg-black hover:bg-gray-800 text-white"
                      }
                      `}
                    disabled={isDisabled}
                  >
                    update
                    {isDisabled && (
                      <CiNoWaitingSign className="text-[1.2rem] text-black" />
                    )}
                  </button>
                </div>
              );
            }
          )
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default TaskCard;
