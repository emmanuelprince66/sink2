import React from "react";

const Sone = ({ color }) => {
  return (
    <>
      <svg
        width="18"
        height="17"
        viewBox="0 0 18 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.875 8.74888L8.33709 1.28679C8.7032 0.920678 9.2968 0.920678 9.66291 1.28679L17.125 8.74888M2.75 6.87388V15.3114C2.75 15.8291 3.16973 16.2489 3.6875 16.2489H7.125V12.1864C7.125 11.6686 7.54473 11.2489 8.0625 11.2489H9.9375C10.4553 11.2489 10.875 11.6686 10.875 12.1864V16.2489H14.3125C14.8303 16.2489 15.25 15.8291 15.25 15.3114V6.87388M5.875 16.2489H12.75"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
};

export default Sone;
