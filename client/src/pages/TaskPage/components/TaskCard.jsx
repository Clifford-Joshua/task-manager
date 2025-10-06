import React from "react";
import axios from "axios";
import moment from "moment";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { useDispatch, useSelector } from "react-redux";

import {
  toggleUpdateTaskModal,
  setTotalTask,
} from "../../../Features/useStateSlice";

const url = import.meta.env.VITE_Task_API_BACKEND_URL;

const TaskCard = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [TaskData, setTaskData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { reRender } = useSelector((store) => store.stateSlice);

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
      dispatch(setTotalTask(count));

      if (count === 0) {
        setError(true);
        setErrorMessage("No task added yet");
      } else {
        setError(false);
        setErrorMessage("");
      }

      setTaskData(tasks);
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
          TaskData.map(
            (
              {
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

                  <div className="grid grid-cols-2  gap-[1rem] text-gray-700 text-[0.9rem] md:text-[1rem]">
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

                    <div>
                      <h3 className="font-bold">Status : </h3>
                      <p
                        className={`border w-max px-[0.4rem] rounded shadow-[_0_0_5px_1px_black] font-bold bg-[${statusColor}] font-bold text-black`}
                      >
                        {status}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch(toggleUpdateTaskModal())}
                    className="border py-[0.6rem] mt-[1rem] rounded-[10px] capitalize cursor-pointer bg-black text-white font-bold hover:bg-gray-800 transition duration-300 ease-in-out"
                  >
                    update
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
