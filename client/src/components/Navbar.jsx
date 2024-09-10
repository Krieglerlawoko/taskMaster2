import React from "react";
import { MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/slices/authSlice";
import UserAvatar from "./UserAvatar";
import NotificationPanel from "./NotificationPanel";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <header className='fixed top-0 w-full flex items-center justify-between bg-white p-4 shadow-md z-10'>
      <div className='flex items-center gap-4'>
        <button
          onClick={() => dispatch(toggleSidebar())}
          className='text-xl text-gray-600 md:hidden'
        >
          ☰
        </button>

        <div className='flex items-center gap-3 p-2 rounded-full bg-gray-100'>
          <MdSearch className='text-gray-600 text-lg' />
          <input
            type='text'
            placeholder='Search...'
            className='flex-1 bg-transparent outline-none placeholder-gray-600 text-gray-900'
          />
        </div>
      </div>

      <div className='flex items-center gap-3'>
        <Alerts />
        <ProfilePicture />
      </div>
    </header>
  );
};

export default Navbar;