import React from 'react';
import './Loader.css'; 

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <h3>Please wait while we retrieve the data...</h3>
    </div>
  );
};

export default Loader;
