import React from "react";
import styled from "styled-components";
import backgroundImg from "../../../assets/images/SignUp.jpeg";
const Background = () => {
  return (
    <Wrapper className="hidden lg:flex w-[50%]">
      <div
        className="h-full w-full bg-black"
        style={{
          background: `url(${backgroundImg}) center/cover no-repeat`,
        }}
      ></div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Background;
