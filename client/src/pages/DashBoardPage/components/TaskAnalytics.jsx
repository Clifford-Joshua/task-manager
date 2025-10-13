import React from "react";
import styled from "styled-components";
import ChartComponent from "../../../components/Pie2dChart";
import Pie3dChartComponent from "../../../components/Pie3dChart";
const TaskAnalytics = () => {
  const { pending, inProgress, completed, rejected } = JSON.parse(
    localStorage.getItem("taskStats")
  );

  const chart2dData = [
    {
      label: "In Progress",
      value: `${inProgress}`,
    },
    {
      label: "Completed",
      value: `${completed}`,
    },
  ];
  const chart3dData = [
    {
      label: "Pending",
      value: `${pending}`,
    },
    {
      label: "Rejected",
      value: `${rejected}`,
    },
  ];

  return (
    <Wrapper>
      <div>
        <div className="bg-white p-[1rem] md:py-[1.5rem] lg:py-[2rem] rounded-[10px] shadow flex flex-col gap-[2rem] md:flex-row">
          <div className="flex flex-col gap-[0.5rem] md:w-[50%]">
            <h2 className="text-[1.2rem] md:text-[1.3rem] font-bold">
              Task Analytics
            </h2>

            <div>
              <ChartComponent data={chart2dData} />
            </div>
          </div>

          <div className="flex flex-col gap-[0.5rem] md:w-[50%]">
            <h2 className="text-[1.2rem] md:text-[1.3rem] font-bold">
              Task Status
            </h2>

            <div>
              <Pie3dChartComponent data={chart3dData} />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default TaskAnalytics;
