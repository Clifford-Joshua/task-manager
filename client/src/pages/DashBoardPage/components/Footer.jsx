import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Wrapper>
      <div className="py-[1rem] flex flex-col justify-center items-center gap-[1rem] md:pb-[1.5rem] text-center">
        <Link
          to={"/task"}
          className="border px-[1.5rem] py-[0.6rem] rounded-[8px]   bg-[#2563eb] text-white  transition duration-500 ease-in-out hover:bg-[#211be2] border-[#211be2] hover:shadow-[0_0_25px_2px_#00000082]"
        >
          View Task
        </Link>

        <p className="md:text-[1.05rem] lg:text-[1.1rem]">
          You are all caught up for now. Keep up the good work!
        </p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* color: lig; */
  /* #00000082 0px 6px 10px;
 */
`;

export default Footer;
