import React from "react";
import "./Loader.css";
function SpinnerLoader({ width, height }) {
  return (
    <svg className="spinner" style={{ width, height }} viewBox="0 0 50 50">
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      ></circle>
    </svg>
  );
}

export default SpinnerLoader;
