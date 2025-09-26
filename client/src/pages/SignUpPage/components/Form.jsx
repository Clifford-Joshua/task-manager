import React from "react";
import Title from "./Title";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa6";

const Form = () => {
  return (
    <Wrapper className="w-full lg:w-[50%] py-[2rem] ">
      <div className="h-full w-full  flex flex-col justify-center items-center gap-[1rem] px-[1rem]">
        <Title />

        <form className="w-full md:w-[70%] flex flex-col gap-[1.2rem]">
          {/* =========================================================================== */}
          {/* username */}
          <div className="flex flex-col gap-[0.5rem]">
            <label htmlFor="taskName" className="font-bold capitalize">
              username :
            </label>
            <div className="bg-gray-200 border-gray-200  rounded-[10px] overflow-hidden">
              <input
                type="text"
                name="taskName"
                className="focus:outline-hidden p-[0.6rem]  text-black w-[100%]"
              />
            </div>
          </div>

          {/* =========================================================================== */}
          {/* email */}
          <div className="flex flex-col gap-[0.5rem]">
            <label htmlFor="taskName" className="font-bold capitalize">
              Email:
            </label>
            <div className="flex items-center  bg-gray-200 rounded-[10px] overflow-hidden border-gray-200">
              <input
                type="text"
                name="taskName"
                className="focus:outline-none  p-[0.6rem] w-[90%] text-black"
              />
              <FaEye className="text-gray-600 text-[1.3rem]" />
            </div>
          </div>

          {/* =========================================================================== */}
          {/* password */}
          <div className="flex flex-col gap-[0.5rem]">
            <label htmlFor="taskName" className="font-bold capitalize">
              password:
            </label>
            <div className="flex items-center  bg-gray-200 rounded-[10px] overflow-hidden border-gray-200">
              <input
                type="text"
                name="taskName"
                className="focus:outline-none  p-[0.6rem] w-[90%] text-black"
              />
              <FaEye className="text-gray-600 text-[1.3rem]" />
            </div>
          </div>

          {/* =========================================================================== */}
          {/*confirm password */}
          <div className="flex flex-col gap-[0.5rem]">
            <label htmlFor="taskName" className="font-bold capitalize">
              Confirm password:
            </label>
            <div className="flex items-center  bg-gray-200 rounded-[10px] overflow-hidden border-gray-200">
              <input
                type="text"
                name="taskName"
                className="focus:outline-none  p-[0.6rem] w-[90%] text-black"
              />
              <FaEye className="text-gray-600 text-[1.3rem]" />
            </div>
          </div>

          {/* =========================================================================== */}
          {/*submit btn */}
          <button className="border py-[0.5rem] mt-[1rem] font-bold text-[1rem] rounded-[5px] bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition duration-300 ease-in-out capitalize">
            Sign Up
          </button>

          {/* =========================================================================== */}
          {/*create account*/}
          <div className="text-center mt-[1rem]">
            <p className="text-gray-600">Already have an account ? </p>
            <Link to={"/login"} className="text-blue-600 font-bold">
              Login
            </Link>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Form;
