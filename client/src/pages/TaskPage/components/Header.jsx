import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { openCreateTaskModal } from "../../../Features/useStateSlice";
const Header = () => {
  const dispatch = useDispatch();
  const { TotalTask } = useSelector((store) => store.stateSlice);

  return (
    <Wrapper>
      <div className="pt-[0.7rem] text-[1.05rem] md:text-[1.2rem] ">
        <div className="flex justify-between items-center">
          <h2 className="text-[0.95rem] md:text-[1rem] font-bold">
            Total :{TotalTask}
          </h2>

          <button
            className="border font-bold px-[0.8rem] py-[0.3rem] rounded-[5px] bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition duration-300 ease-in-out capitalize"
            onClick={() => dispatch(openCreateTaskModal())}
          >
            <h2>create task +</h2>
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Header;
