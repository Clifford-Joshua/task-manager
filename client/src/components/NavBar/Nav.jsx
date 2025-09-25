import React from "react";
import styled from "styled-components";
import { Title, SideBarBtn, IntroMessage } from "./components";

const Nav = () => {
  return (
    <Wrapper className="bg-white h-[10vh] md:h-[9vh] lg:h-[12vh]">
      <nav className="h-[100%]">
        <div className="flex md:justify-between items-center p-[1rem] h-[100%]">
          <SideBarBtn />

          <Title />

          <IntroMessage />
        </div>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Nav;
