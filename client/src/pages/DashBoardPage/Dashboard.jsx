import React from "react";
import styled from "styled-components";
import { Footer, OverView, TaskSummary, TaskAnalytics } from "./components";

const Dashboard = () => {
  return (
    <Wrapper className="px-[1rem]">
      <div className="flex flex-col gap-[1rem]">
        <OverView />

        <TaskSummary />
        <TaskAnalytics />
        <Footer />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Dashboard;
