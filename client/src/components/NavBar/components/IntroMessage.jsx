import React from "react";
import styled from "styled-components";
const IntroMessage = () => {
  return (
    <Wrapper>
      <div className=" md:hidden border w-[40px] h-[40px] text-center flex justify-center items-center rounded-[10px] bg-black text-white">
        <h2 className="font-bold text-[1.2rem]"> E</h2>
      </div>

      <div className="hidden md:flex items-center gap-[0.4rem]">
        <h2 className="font-bold text-[1.1rem] lg:text-[1.3rem]">Welcome , </h2>
        <h2 className="text-[1rem] lg:text-[1.1rem]">Energy</h2>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default IntroMessage;
