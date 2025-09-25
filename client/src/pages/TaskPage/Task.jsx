import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Header, Filter, TaskCard, CreateTask } from "./components";

const Task = () => {
  const { isCreateTaskModalOpen } = useSelector((store) => store.stateSlice);

  return (
    <Wrapper className="px-[1rem]">
      <div className="flex flex-col gap-[1rem]">
        <Header />
        <Filter />
        <TaskCard />

        {isCreateTaskModalOpen && <CreateTask />}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Task;
