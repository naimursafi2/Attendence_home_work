import React from "react";

const Loading = () => {
  return <div className="flex h-screen w-full items-center justify-center">
    <div className="animate-spin w-10 h-10 rounded-full border-b border-b-white"></div>
  </div>;
};

export default Loading;