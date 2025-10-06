import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Loader = () => {
  const loaderBox = ["", "", "", ""];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev >= loaderBox.length - 1 ? 0 : prev + 1));
    }, 500);
    return () => clearInterval(interval);
  }, [loaderBox.length]);

  return (
    <Wrapper>
      <div className="fixed top-0 left-0 w-[100%] h-[100vh] bg-black flex flex-col gap-[0.6rem] items-center justify-center">
        <h2 className="text-amber-300 font-bold text-[1.1rem]">Loading....</h2>
        <div className="flex gap-[2rem] bg-white p-[1rem] rounded-xl">
          {loaderBox.map((_, ind) => (
            <div
              key={ind}
              className={`h-[20px] w-[20px] border rounded transition-all duration-500 ${
                ind === index ? "active" : "next"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .active {
    background: blue;
    transform: scale(1.1);
  }
  .next {
    background: blue;
    opacity: 0.5;
  }
`;

export default Loader;
