import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Header, Filter, TaskCard, CreateTask, Update } from "./components";

const Task = () => {
  const { isCreateTaskModalOpen, isUpdateTaskModalOpen } = useSelector(
    (store) => store.stateSlice
  );

  return (
    <Wrapper className="px-[1rem]">
      <div className="flex flex-col gap-[1rem]">
        <Header />
        <Filter />
        <TaskCard />

        {isCreateTaskModalOpen && <CreateTask />}

        {isUpdateTaskModalOpen && <Update />}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Task;
