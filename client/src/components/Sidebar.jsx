import React from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";

const navigationItems = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: <MdDashboard />,
  },
  {
    name: "Tasks",
    path: "tasks",
    icon: <FaTasks />,
  },
  {
    name: "Completed Tasks",
    path: "completed/completed",
    icon: <MdTaskAlt />,
  },
  {
    name: "In Progress",
    path: "in-progress/in-progress",
    icon: <MdOutlinePendingActions />,
  },
  {
    name: "To Do",
    path: "todo/todo",
    icon: <MdOutlinePendingActions />,
  },
  {
    name: "Team",
    path: "team",
    icon: <FaUsers />,
  },
  {
    name: "Trash",
    path: "trashed",
    icon: <FaTrashAlt />,
  },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const currentPath = location.pathname.split("/")[1];

  const menuItems = user?.isAdmin ? navigationItems : navigationItems.slice(0, 5);

  const handleClose = () => {
    dispatch(setOpenSidebar(false));
  };

  const SidebarLink = ({ item }) => {
    return (
      <Link
        to={item.path}
        onClick={handleClose}
        className={clsx(
          "flex gap-3 px-4 py-2 rounded-lg items-center text-gray-800 text-base hover:bg-blue-200",
          currentPath === item.path.split("/")[0] ? "bg-blue-600 text-white" : ""
        )}
      >
        {item.icon}
        <span className='hover:text-blue-600'>{item.name}</span>
      </Link>
    );
  };

  return (
    <div className='w-full h-full flex flex-col gap-6 p-6'>
      <header className='flex gap-2 items-center'>
        <div className='bg-blue-700 p-3 rounded-full'>
          <MdOutlineAddTask className='text-white text-3xl' />
        </div>
        <h1 className='text-3xl font-extrabold text-gray-900'>TaskMe</h1>
      </header>

      <nav className='flex-1 flex flex-col gap-y-4 py-8'>
        {menuItems.map((item) => (
          <SidebarLink item={item} key={item.name} />
        ))}
      </nav>

      <footer>
        <button className='w-full flex gap-3 p-3 items-center text-lg text-gray-700'>
          <MdSettings />
          <span>Settings</span>
        </button>
      </footer>
    </div>
  );
};

export default Sidebar;