import React from "react";
import styled from "styled-components";
const Title = () => {
  return (
    <Wrapper className="w-[100%] md:w-[70%] flex flex-col gap-[0.5rem] items-center ">
      {/* ================================================================================ */}
      {/* Logo */}
      <div className="flex gap-[0.5rem] items-center">
        <h2 className="p-[0.4rem] border rounded-[10px] font-extrabold text-white bg-blue-600 text-[0.9rem]">
          TM
        </h2>
        <h2 className="font-bold">Task Manager</h2>
      </div>

      {/* ======================================================================== */}
      {/* Login */}
      <div className="flex flex-col gap-[0.3rem] text-center">
        <h2 className="font-bold text-[1.6rem]">Log in to your Account</h2>
        <p className="text-gray-600">welcome back......................!</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Title;
