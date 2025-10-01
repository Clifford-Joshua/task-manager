import React from "react";
import styled from "styled-components";
const Loader = () => {
  return (
    <Wrapper>
      <div className="absolute h-[100vh] bg-black flex items-center justify-center">
        <div className="flex gap-[1rem]">
          <div className="h-[20px] w-[20px] border"></div>
          <div className="h-[20px] w-[20px] border"></div>
          <div className="h-[20px] w-[20px] border"></div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Loader;
