import React, { useState } from "react";
import axios from "axios";
import Title from "./Title";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const url = import.meta.env.VITE_API_BACKEND_URL;

const Form = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email field is required");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(`${url}/users/forgotten-password`, {
        email,
      });

      const {
        msg,
        token,
        user: { name },
      } = res.data;

      toast.success(msg);
      localStorage.setItem("token", token);
      localStorage.setItem("username", name);
      localStorage.setItem("user", true);

      setEmail("");

      navigate("/");
    } catch (err) {
      if (err.response) {
        // ✅ error toast from backend message
        toast.error(err.response.data.msg || "Something went wrong");
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
                value={email}
                onChange={handleChange}
                className="focus:outline-hidden p-[0.6rem]  text-black w-[100%]"
              />
            </div>
          </div>

          {/* =========================================================================== */}
          {/*submit btn */}
          <button
            className="border py-[0.5rem] mt-[1rem] font-bold text-[1rem] rounded-[5px] bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition duration-300 ease-in-out capitalize"
            type="submit"
          >
            {isLoading ? " Loading ......" : "Login"}
          </button>

          {/* =========================================================================== */}
          {/*create account*/}
          <div className="text-center mt-[1rem]">
            <p className="text-gray-600">Don't have an account ? </p>
            <Link to={"/signup"} className="text-blue-600 font-bold">
              Create a new account
            </Link>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Form;
