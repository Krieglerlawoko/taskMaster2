import React from "react";
import { IoMdAdd } from "react-icons/io";
import clsx from "clsx";

const TaskTitle = ({ label, className }) => {
  return (
    <div className='flex items-center justify-between w-full h-12 px-3 md:px-5 rounded-lg bg-white'>
      <div className='flex items-center gap-3'>
        <div className={clsx("w-5 h-5 rounded-full", className)} />
        <p className='text-xs md:text-sm text-gray-700'>{label}</p>
      </div>

      <button className='hidden md:flex items-center'>
        <IoMdAdd className='text-xl text-gray-800' />
      </button>
    </div>
  );
};

export default TaskTitle;