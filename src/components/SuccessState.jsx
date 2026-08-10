import React from 'react';

const SuccessState = ({ handleReset }) => {
  return (
    <div className="success-container">
      <div className="success-icon-wrapper">
        <svg
          className="check-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>

      <h2 className="success-title">THANK YOU!</h2>
      <p className="success-subtitle">We've added your card details</p>

      <button type="button" className="btn-confirm" onClick={handleReset}>
        Continue
      </button>
    </div>
  );
};

export default SuccessState;
