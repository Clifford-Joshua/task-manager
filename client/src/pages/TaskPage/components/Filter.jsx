import React from "react";
import styled from "styled-components";

import {
  filterExecutor,
  filterStatus,
  setReRender,
} from "../../../Features/useStateSlice";
import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div className="flex flex-wrap gap-[1rem] py-[0.5rem]">
        <select
          name="status"
          onChange={(e) => {
            dispatch(setReRender());
            dispatch(filterStatus(e.target.value));
          }}
          className="p-[0.5rem] rounded-[5px] bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
        >
          <option value="all">All</option>
          <option value="in progress">In progress</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
        </select>

        {/* filter based on executor */}
        <select
          name="executedBy"
          onChange={(e) => {
            dispatch(setReRender());
            dispatch(filterExecutor(e.target.value));
          }}
          className="p-[0.5rem] rounded-[5px] bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
        >
          <option value="all">All</option>
          <option value="others">Executed By Others</option>
          <option value="self">Executed By Self</option>
        </select>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Filter;
