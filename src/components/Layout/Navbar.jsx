import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="flex justify-center bg-gray-600 up">
      <div className="flex gap-8 p-5 text-slate-100  text-2xl uppercase">
        <Link className="hover:text-blue-300 " to="/"> Batch List</Link>
        <Link className="hover:text-blue-300 " to="/addstudents">Add Students</Link>
        <Link className="hover:text-blue-300 " to="/attendence">Attendence</Link>
        <Link className="hover:text-blue-300 " to="/report">Report</Link>
      </div>
    </div>
  );
};

export default Navbar;
