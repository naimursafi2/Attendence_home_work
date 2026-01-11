import React from "react";

const ListLoading = () => {
  return (
    <div className="space-y-4 mt-5 animate-pulse">
      <div className="h-12 w-full bg-slate-300 rounded-full"></div>
      <div className="h-12 w-full bg-slate-300 rounded-full"></div>
      <div className="h-12 w-full bg-slate-300 rounded-full"></div>
    </div>
  );
};

export default ListLoading;
