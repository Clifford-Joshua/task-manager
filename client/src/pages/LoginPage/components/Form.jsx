import React, { useState } from "react";
import Title from "./Title";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { toast } from "react-toastify";
import { GoEyeClosed } from "react-icons/go";
const url = import.meta.env.VITE_API_BACKEND_URL;

import { useNavigate } from "react-router-dom";

const Form = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userDetails.email || !userDetails.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);

      const res = await axios.post(
        `${url}/users/login`,
        {
          email: userDetails.email,
          password: userDetails.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = res.data;

      // ✅ Handle "remember me"
      if (rememberMe) {
        localStorage.setItem("user", true);
      } else {
        localStorage.setItem("user", false);
      }

      sessionStorage.setItem("user", true);
      localStorage.setItem("username", data.user.name);
      localStorage.setItem("token", data.token);

      toast.success("Login successful");

      // Reset form
      setUserDetails({
        email: "",
        password: "",
      });

      navigate("/");
    } catch (err) {
      // ✅ Error handling
      if (err.response) {
        toast.error(err.response.data.msg || "Invalid credentials");
      } else if (err.request) {
        toast.error("No response from server. Please try again.");
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper className="w-full lg:w-[50%] py-[2rem] ">
      <div className="h-full w-full  flex flex-col justify-center items-center gap-[1rem] px-[1rem]">
        <Title />

        <form
          className="w-full md:w-[70%] flex flex-col gap-[1.2rem]"
          onSubmit={handleSubmit}
        >
          {/* =========================================================================== */}
          {/* username */}
          <div className="flex flex-col gap-[0.5rem]">
            <label htmlFor="taskName" className="font-bold capitalize">
              email :
            </label>
            <div className="bg-gray-200 border-gray-200  rounded-[10px] overflow-hidden">
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleOnChange}
                className="focus:outline-hidden p-[0.6rem]  text-black w-[100%]"
              />
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
                type={showPassword ? "text" : "password"}
                name="password"
                value={userDetails.password}
                onChange={handleOnChange}
                className="focus:outline-none  p-[0.6rem] w-[90%] text-black"
              />
              {showPassword ? (
                <FaEye
                  className="text-gray-600 text-[1.3rem] cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <GoEyeClosed
                  className="text-gray-600 text-[1.3rem] cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>

          {/* =========================================================================== */}
          {/*Remember me */}
          <div className="flex justify-between">
            <div className="flex items-center gap-[0.5rem]">
              <input
                type="checkbox"
                className="size-[1.2rem] accent-black"
                onChange={(e) => {
                  e.target.checked ? setRememberMe(true) : setRememberMe(false);
                }}
              />
              <h3 className="font-bold cursor-pointer">Remember me</h3>
            </div>

            <Link to={"/forgotten-password"} className="hover:text-gray-500 ">
              Forgotten Password ?
            </Link>
          </div>

          {/* =========================================================================== */}
          {/*submit btn */}
          <button
            className="border py-[0.5rem] mt-[1rem] font-bold text-[1rem] rounded-[5px] bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition duration-300 ease-in-out capitalize"
            type="submit"
          >
            {isLoading ? "Loading ..... " : "Login"}
          </button>

          {/* =========================================================================== */}
          {/*create account*/}
          <div className="text-center mt-[1rem]">
            <p className="text-gray-600">Don't have an account ? </p>
            <Link to={"/signup"} className="text-blue-600 font-bold">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Form;
