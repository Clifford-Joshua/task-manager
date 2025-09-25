import React from "react";
import styled from "styled-components";
const TaskCard = () => {
  return (
    <Wrapper>
      <div className="py-[1.5rem] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[1.5rem] ">
        {/* ============================================================================== */}
        {/* Task Card*/}

        <div className="bg-white p-[1rem] rounded-[8px] flex flex-col gap-[0.5rem] md:gap-[0.9rem] shadow-md max-w-[500px]">
          <h2 className="font-bold capitalize md:text-[1.1rem]">
            Design Landing Page
          </h2>
          <p className="text-gray-600 text-[0.9rem] md:text-[0.95rem]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa
            minima nulla odio modi ratione laborum exercitationem ipsam
            molestias, perferendis error!
          </p>

          <div className="grid grid-cols-2  gap-[1rem] text-gray-700 text-[0.9rem] md:text-[1rem]">
            <div>
              <h3 className="font-bold">Date : </h3>
              <p>April 27, 2024</p>
            </div>

            <div>
              <h3 className="font-bold">Created By : </h3>
              <p>Alex Johnson</p>
            </div>

            <div>
              <h3 className="font-bold">Assigned To : </h3>
              <p>Jamie Smith</p>
            </div>

            <div>
              <h3 className="font-bold">Status : </h3>
              <p className="border w-max px-[0.4rem] rounded shadow-[_0_0_5px_1px_black] bg-orange-500 font-bold text-black">
                In progress
              </p>
            </div>
          </div>

          <button className="border py-[0.6rem] mt-[1rem] rounded-[10px] capitalize cursor-pointer bg-black text-white font-bold hover:bg-gray-800 transition duration-300 ease-in-out">
            update
          </button>
        </div>

        <div className="bg-white p-[1rem] rounded-[8px] flex flex-col gap-[0.5rem] md:gap-[0.9rem] shadow-md max-w-[500px]">
          <h2 className="font-bold capitalize md:text-[1.1rem]">
            Design Landing Page
          </h2>
          <p className="text-gray-600 text-[0.9rem] md:text-[0.95rem]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa
            minima nulla odio modi ratione laborum exercitationem ipsam
            molestias, perferendis error!
          </p>

          <div className="grid grid-cols-2  gap-[1rem] text-gray-700 text-[0.9rem] md:text-[1rem]">
            <div>
              <h3 className="font-bold">Date : </h3>
              <p>April 27, 2024</p>
            </div>

            <div>
              <h3 className="font-bold">Created By : </h3>
              <p>Alex Johnson</p>
            </div>

            <div>
              <h3 className="font-bold">Assigned To : </h3>
              <p>Jamie Smith</p>
            </div>

            <div>
              <h3 className="font-bold">Status : </h3>
              <p className="border w-max px-[0.4rem] rounded shadow-[_0_0_5px_1px_black] bg-orange-500 font-bold text-black">
                In progress
              </p>
            </div>
          </div>

          <button className="border py-[0.6rem] mt-[1rem] rounded-[10px] capitalize cursor-pointer bg-black text-white font-bold hover:bg-gray-800 transition duration-300 ease-in-out">
            update
          </button>
        </div>

        <div className="bg-white p-[1rem] rounded-[8px] flex flex-col gap-[0.5rem] md:gap-[0.9rem] shadow-md max-w-[500px]">
          <h2 className="font-bold capitalize md:text-[1.1rem]">
            Design Landing Page
          </h2>
          <p className="text-gray-600 text-[0.9rem] md:text-[0.95rem]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa
            minima nulla odio modi ratione laborum exercitationem ipsam
            molestias, perferendis error!
          </p>

          <div className="grid grid-cols-2  gap-[1rem] text-gray-700 text-[0.9rem] md:text-[1rem]">
            <div>
              <h3 className="font-bold">Date : </h3>
              <p>April 27, 2024</p>
            </div>

            <div>
              <h3 className="font-bold">Created By : </h3>
              <p>Alex Johnson</p>
            </div>

            <div>
              <h3 className="font-bold">Assigned To : </h3>
              <p>Jamie Smith</p>
            </div>

            <div>
              <h3 className="font-bold">Status : </h3>
              <p className="border w-max px-[0.4rem] rounded shadow-[_0_0_5px_1px_black] bg-orange-500 font-bold text-black">
                In progress
              </p>
            </div>
          </div>

          <button className="border py-[0.6rem] mt-[1rem] rounded-[10px] capitalize cursor-pointer bg-black text-white font-bold hover:bg-gray-800 transition duration-300 ease-in-out">
            update
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default TaskCard;
