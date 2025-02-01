import React from "react";

const Sfour = ({ color }) => {
  return (
    <>
      <svg
        width="18"
        height="12"
        viewBox="0 0 18 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.875 10.7489L6.5 5.12392L10.0887 8.71261C11.0918 6.73902 12.7535 5.08417 14.9335 4.11354L17.2174 3.0967M17.2174 3.0967L12.2664 1.19617M17.2174 3.0967L15.3169 8.04776"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
};

export default Sfour;
