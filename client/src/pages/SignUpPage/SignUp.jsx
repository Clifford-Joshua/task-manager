import React from "react";
import styled from "styled-components";
import { Background, Form } from "./components";
const SignUp = () => {
  return (
    <Wrapper>
      <div className="flex min-h-[100vh]">
        <Background />
        <Form />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default SignUp;
