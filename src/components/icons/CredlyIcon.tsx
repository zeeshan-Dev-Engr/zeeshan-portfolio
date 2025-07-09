import React from "react";

const CredlyIcon = ({ size = 24, color = "#FF6B00", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="16" cy="16" r="16" fill={color} />
    <path
      d="M16 7.5c-4.7 0-8.5 3.8-8.5 8.5s3.8 8.5 8.5 8.5 8.5-3.8 8.5-8.5-3.8-8.5-8.5-8.5zm0 15.3c-3.8 0-6.8-3-6.8-6.8s3-6.8 6.8-6.8 6.8 3 6.8 6.8-3 6.8-6.8 6.8zm0-11.1a4.3 4.3 0 100 8.6 4.3 4.3 0 000-8.6zm0 7a2.7 2.7 0 110-5.4 2.7 2.7 0 010 5.4z"
      fill="#fff"
    />
  </svg>
);

export default CredlyIcon;
