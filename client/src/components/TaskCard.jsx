import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdAttachFile, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from "react-icons/md";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import TaskDialog from "./task/TaskDialog";
import AddSubTask from "./task/AddSubTask";
import UserInfo from "./UserInfo";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils";
import clsx from "clsx";

const PRIORITY_ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TaskCard = ({ task }) => {
  const { user } = useSelector((state) => state.auth);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className='bg-white shadow-lg rounded-lg p-5'>
        <div className='flex justify-between items-center'>
          <div
            className={clsx(
              "flex items-center text-sm font-semibold",
              PRIOTITYSTYELS[task?.priority]
            )}
          >
            <span className='text-lg'>{PRIORITY_ICONS[task?.priority]}</span>
            <span className='capitalize'>{task?.priority} Priority</span>
          </div>

          {user?.isAdmin && <TaskDialog task={task} />}
        </div>

        <div className='mt-2'>
          <div className='flex items-center space-x-2'>
            <div
              className={clsx("w-5 h-5 rounded-full", TASK_TYPE[task.stage])}
            />
            <h4 className='text-black truncate'>{task?.title}</h4>
          </div>
          <span className='text-gray-500 text-sm'>{formatDate(new Date(task?.date))}</span>
        </div>

        <div className='border-t border-gray-200 my-2' />
        <div className='flex justify-between items-center mb-2'>
          <div className='flex space-x-3'>
            <div className='flex items-center space-x-1 text-gray-500 text-sm'>
              <BiMessageAltDetail />
              <span>{task?.activities?.length}</span>
            </div>
            <div className='flex items-center space-x-1 text-gray-500 text-sm'>
              <MdAttachFile />
              <span>{task?.assets?.length}</span>
            </div>
            <div className='flex items-center space-x-1 text-gray-500 text-sm'>
              <FaList />
              <span>0/{task?.subTasks?.length}</span>
            </div>
          </div>

          <div className='flex space-x-2'>
            {task?.team?.map((member, idx) => (
              <div
                key={idx}
                className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm -ml-2",
                  BGS[idx % BGS.length]
                )}
              >
                <UserInfo user={member} />
              </div>
            ))}
          </div>
        </div>

        {task?.subTasks?.length > 0 ? (
          <div className='py-3 border-t border-gray-200'>
            <h5 className='text-lg text-black truncate'>{task?.subTasks[0].title}</h5>
            <div className='flex items-center space-x-4 mt-2'>
              <span className='text-gray-500 text-sm'>{formatDate(new Date(task?.subTasks[0]?.date))}</span>
              <span className='bg-blue-100 px-2 py-1 rounded-full text-blue-600 font-semibold'>
                {task?.subTasks[0].tag}
              </span>
            </div>
          </div>
        ) : (
          <div className='py-3 border-t border-gray-200'>
            <span className='text-gray-400'>No Sub Task</span>
          </div>
        )}

        <div className='pb-2'>
          <button
            onClick={handleButtonClick}
            disabled={!user.isAdmin}
            className='w-full flex items-center space-x-4 text-gray-500 font-medium disabled:opacity-50'
          >
            <IoMdAdd className='text-xl' />
            <span>Add Subtask</span>
          </button>
        </div>
      </div>

      <AddSubTask open={isDialogOpen} setOpen={setIsDialogOpen} id={task._id} />
    </>
  );
};

export default TaskCard;