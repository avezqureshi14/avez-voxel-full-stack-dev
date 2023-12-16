import React from 'react';

const CustomTag = ({ color, text }) => {
  return (
    <span className={`inline-block border border-${color}-500 text-${color}-500 text-xs font-semibold px-2 py-1 rounded`}>
      {text}
    </span>
  );
};

export default CustomTag;
