import React, { useState } from "react";
import Title from "./Title";
import axios from "axios";
import styled from "styled-components";
import { FaEye } from "react-icons/fa6";
import { toast } from "react-toastify";
import { GoEyeClosed } from "react-icons/go";
import { useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_API_BACKEND_URL;

const Form = () => {
  const [userDetails, setUserDetails] = useState({
    username: localStorage.getItem("username"),
    email: localStorage.getItem("userEmail"),
    password: "",
    confirmPassword: "",
    confirmDeletePassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showDeletePassword, setShowDeletePassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setUserDetails((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userDetails.email || !userDetails.username) {
      toast.error("Please fill out all required fields");
      return;
    }

    // If password fields are filled, validate them
    if (userDetails.password || userDetails.confirmPassword) {
      if (userDetails.password !== userDetails.confirmPassword) {
        toast.error("Confirm password does not match password");
        return;
      }
    }

    try {
      setLoading(true);

      // Build request body dynamically
      const updateData = {
        name: userDetails.username,
        email: userDetails.email,
      };

      if (userDetails.password) {
        updateData.password = userDetails.password;
      }

      const res = await axios.patch(`${url}/users/${userId}`, updateData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success(res.data.msg);
      navigate("/");

      setUserDetails({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.msg || "Something went wrong");
      } else if (err.request) {
        toast.error("No response from server. Please try again.");
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(userId);

      const res = await axios.delete(`${url}/users/${userId}`, {
        data: { password: userDetails.confirmDeletePassword },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const { msg } = res.data;

      toast.success(msg);

      // Reset form
      setUserDetails({
        confirmDeletePassword: "",
      });

      localStorage.clear();

      navigate("/");
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
              Change username :
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
              Change Email:
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
              New password:
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
              Confirm New password:
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
            {loading ? "Updating user info..." : "Update Info"}
          </button>
        </form>

        <div className="w-full md:w-[70%] flex flex-col gap-[1.2rem]">
          <div className="w-[100%] md:w-[70%] flex flex-col gap-[0.5rem] items-center ">
            {/* ======================================================================== */}
            {/* Login */}
            <div className="flex flex-col gap-[0.3rem] text-center">
              <h2 className="font-bold text-[1.6rem] mt-[2rem] text-red-700">
                Danger Zone
              </h2>
              <p className="text-gray-600 text-[0.9rem] md:text-[1rem]">
                Please enter your password before deleting your account to
                confirm that you really want to proceed.
              </p>
            </div>
          </div>

          <form
            className="w-full md:w-[70%] flex flex-col gap-[1.2rem]"
            onSubmit={handleDeleteUser}
          >
            {/* =========================================================================== */}
            {/* password */}
            <div className="flex flex-col gap-[0.5rem]">
              <label htmlFor="taskName" className="font-bold capitalize">
                password:
              </label>
              <div className="flex items-center  bg-gray-200 rounded-[10px] overflow-hidden border-gray-200">
                <input
                  type={showDeletePassword ? "text" : "password"}
                  name="confirmDeletePassword"
                  value={userDetails.confirmDeletePassword}
                  onChange={handleOnchange}
                  className="focus:outline-none  p-[0.6rem] w-[90%] text-black"
                />

                {showDeletePassword ? (
                  <FaEye
                    className="text-gray-600 text-[1.3rem] cursor-pointer"
                    onClick={() => setShowDeletePassword(!showDeletePassword)}
                  />
                ) : (
                  <GoEyeClosed
                    className="text-gray-600 text-[1.3rem] cursor-pointer"
                    onClick={() => setShowDeletePassword(!showDeletePassword)}
                  />
                )}
              </div>
            </div>
            {/* =========================================================================== */}
            {/*delete btn */}
            <button
              className="border py-[0.5rem]  font-bold text-[1rem] rounded-[5px] bg-red-600 text-white hover:bg-red-700 cursor-pointer transition duration-300 ease-in-out capitalize"
              disabled={loading}
              type="submit"
            >
              {loading ? "Deleting Account..." : "Delete Account"}
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Form;
