import React from "react";
import styled from "styled-components";
const Title = () => {
  return (
    <Wrapper className="m-auto">
      <h2 className="font-bold text-[1.2rem] md:text-[1.3rem] lg:text-[1.4rem]">
        Task Manager
      </h2>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Title;
