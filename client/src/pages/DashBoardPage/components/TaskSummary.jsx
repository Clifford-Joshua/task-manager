import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
const TaskSummary = () => {
  const { TotalTask } = useSelector((store) => store.stateSlice);

  return (
    <Wrapper>
      <div>
        <div className="bg-white p-[1rem] md:py-[1.5rem] lg:py-[2rem] rounded-[10px] shadow ">
          <h2 className="text-[1.2rem] md:text-[1.3rem] lg:text-[1.6rem] font-bold">
            Task Summary
          </h2>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[1rem] mt-[1rem] text-white">
            <div className="flex border rounded-[10px] p-[1rem] justify-center items-end md:items-center gap-[0.5rem] bg-[#4B5563]">
              <h2 className="font-bold text-[1.1rem]">Total Task : </h2>
              <p className="text-[1.2rem]">{TotalTask} </p>
            </div>

            <div className="flex border rounded-[10px] p-[1rem] justify-center items-end md:items-center gap-[0.5rem] bg-orange-400">
              <h2 className="font-bold text-[1.1rem]">Total Task : </h2>
              <p className="text-[1.2rem]"> 10 </p>
            </div>

            <div className="flex border rounded-[10px] p-[1rem] justify-center items-end md:items-center gap-[0.5rem] bg-[#FACC15]">
              <h2 className="font-bold text-[1.1rem]">Total Task : </h2>
              <p className="text-[1.2rem]"> 10 </p>
            </div>

            <div className="flex border rounded-[10px] p-[1rem] justify-center items-end md:items-center gap-[0.5rem] bg-red-500">
              <h2 className="font-bold text-[1.1rem]">Total Task : </h2>
              <p className="text-[1.2rem]"> 10 </p>
            </div>

            <div className="flex border rounded-[10px] p-[1rem] justify-center items-end md:items-center gap-[0.5rem] bg-[#008000]">
              <h2 className="font-bold text-[1.1rem]">Total Task : </h2>
              <p className="text-[1.2rem]"> 10 </p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default TaskSummary;
