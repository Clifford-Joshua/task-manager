import React, { useState } from "react";
import Title from "./Title";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { toast } from "react-toastify";
import { GoEyeClosed } from "react-icons/go";
import { useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_API_BACKEND_URL;

const Form = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setUserDetails((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !userDetails.confirmPassword ||
      !userDetails.email ||
      !userDetails.password ||
      !userDetails.username
    ) {
      toast.error("Fill out the form, all fields are required");
      return;
    }

    if (userDetails.confirmPassword !== userDetails.password) {
      toast.error("confirm password does not match password");
      return;
    }
    try {
      setLoading(true);

      const res = await axios.post(
        `${url}/users/register`,
        {
          name: userDetails.username,
          email: userDetails.email,
          password: userDetails.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // ✅ success toast
      toast.success(res.data.msg || "Registration successful!");
      navigate("/login");

      // Reset form
      setUserDetails({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      // ✅ error toast
      if (err.response) {
        // Backend returned an error
        toast.error(err.response.data.msg || "Something went wrong");
      } else if (err.request) {
        // No response from server
        toast.error("No response from server. Please try again.");
      } else {
        // Other errors
        toast.error("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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
                name="username"
                value={userDetails.username}
                onChange={handleOnchange}
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
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleOnchange}
                placeholder="email@gmail.com"
                className="focus:outline-none  p-[0.6rem] w-[100%] text-black"
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
                onChange={handleOnchange}
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
          {/*confirm password */}
          <div className="flex flex-col gap-[0.5rem]">
            <label htmlFor="taskName" className="font-bold capitalize">
              Confirm password:
            </label>
            <div className="flex items-center  bg-gray-200 rounded-[10px] overflow-hidden border-gray-200">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={userDetails.confirmPassword}
                onChange={handleOnchange}
                className="focus:outline-none  p-[0.6rem] w-[90%] text-black"
              />

              {showConfirmPassword ? (
                <FaEye
                  className="text-gray-600 text-[1.3rem] cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              ) : (
                <GoEyeClosed
                  className="text-gray-600 text-[1.3rem] cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              )}
            </div>
          </div>

          {/* =========================================================================== */}
          {/*submit btn */}
          <button
            className="border py-[0.5rem] mt-[1rem] font-bold text-[1rem] rounded-[5px] bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition duration-300 ease-in-out capitalize"
            onClick={handleSubmit}
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Sign Up"}
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
