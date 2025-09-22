import React from "react";
import styled from "styled-components";
const TaskAnalytics = () => {
  return (
    <Wrapper>
      <div>
        <div className="bg-white p-[1rem] md:py-[1.5rem] lg:py-[2rem] rounded-[10px] shadow flex flex-col gap-[2rem] md:flex-row">
          <div className="flex flex-col gap-[0.5rem] md:w-[50%]">
            <h2 className="text-[1.2rem] md:text-[1.3rem] font-bold">
              Task Analytics
            </h2>
            <p className="text-[0.9rem]">
              Work Progress (In Progress Vs Completed)
            </p>

            <div className="h-[40vh] border bg-black"></div>
          </div>

          <div className="flex flex-col gap-[0.5rem] md:w-[50%]">
            <h2 className="text-[1.2rem] md:text-[1.3rem] font-bold">
              Task Status
            </h2>
            <p className="text-[0.9rem]">Task Status (Pending vs Rejected)</p>

            <div className="h-[40vh] border bg-black"></div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default TaskAnalytics;
