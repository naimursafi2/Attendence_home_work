import React from "react";

const Switch = ({ onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input onChange={onChange} className="sr-only peer" defaultValue type="checkbox" />
      <div className="peer rounded-br-xl rounded-tl-xl outline-none duration-80 after:duration-300 w-20 h-7 bg-blue-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500 after:content-['No'] after:absolute after:outline-none after:rounded-br-xl after:rounded-tl-xl after:h-7 after:w-9 after:bg-white after:top-1 after:left-1 after:flex after:justify-center after:items-center after:text-sky-800 after:font-bold peer-checked:after:translate-x-10 peer-checked:after:content-['Yes'] peer-checked:after:border-white"></div>
    
    </label>
  );
};

export default Switch;
