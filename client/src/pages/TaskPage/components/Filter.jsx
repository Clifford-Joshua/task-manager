import React from "react";
import styled from "styled-components";

import { filterExecutor, filterStatus } from "../../../Features/useStateSlice";
import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div className="flex flex-wrap gap-[1rem] py-[0.5rem]">
        <select
          name="status"
          onChange={(e) => dispatch(filterStatus(e.target.value))}
          className="p-[0.5rem] rounded-[5px] bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
        >
          <option value="">All</option>
          <option value="In progress">In progress</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Rejected">Rejected</option>
        </select>

        {/* filter based on executor */}
        <select
          name="executedBy"
          onChange={(e) => dispatch(filterExecutor(e.target.value))}
          className="p-[0.5rem] rounded-[5px] bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
        >
          <option value="all">All</option>
          <option value="executed by others">Executed By Others</option>
          <option value="executed by self">Executed By Self</option>
        </select>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Filter;
