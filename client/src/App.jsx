import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import MainNavbar from "./components/Navbar";
import MainSidebar from "./components/Sidebar";
import SignIn from "./pages/Login";
import TaskInfo from "./pages/TaskDetails";
import TaskList from "./pages/Tasks";
import DeletedItems from "./pages/Trash";
import UserList from "./pages/Users";
import MainDashboard from "./pages/dashboard";
import { toggleSidebar } from "./redux/slices/authSlice";

const MainLayout = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  return currentUser ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
        <Sidebar />
      </div>

      <MobileMenu />

      <div className='flex-1 overflow-y-auto'>
        <Navbar />

        <div className='p-4 2xl:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/sign-in' state={{ from: location }} replace />
  );
}

const MobileMenu = () => {
  const { sidebarVisible } = useSelector((state) => state.user);
  const menuRef = useRef(null);
  const dispatch = useDispatch();

  const handleSidebarClose = () => {
    dispatch(toggleSidebar(false));
  };

  return (
    <Transition
      show={sidebarVisible}
      as={Fragment}
      enter='transition-opacity duration-700'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity duration-700'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      {(ref) => (
        <div
          ref={(node) => (menuRef.current = node)}
          className={clsx(
            "md:hidden w-full h-full bg-black/40 transition-transform duration-700",
            sidebarVisible ? "translate-x-0" : "translate-x-full"
          )}
          onClick={() => handleSidebarClose()}
        >
          <div className='bg-white w-3/4 h-full'>
            <div className='w-full flex justify-end px-5 mt-5'>
              <button
                onClick={() => handleSidebarClose()}
                className='flex justify-end items-end'
              >
                <IoClose size={25} />
              </button>
            </div>

            <div className='-mt-10'>
              <Sidebar />
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

const AppRoutes = () => {
  return (
    <main className='w-full min-h-screen bg-[#f3f4f6] '>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index path='/' element={<Navigate to='/dashboard' />} />
          <Route path='/dashboard' element={<MainDashboard />} />
          <Route path='/tasks' element={<TaskList />} />
          <Route path='/completed/:status' element={<TaskList />} />
          <Route path='/in-progress/:status' element={<TaskList />} />
          <Route path='/todo/:status' element={<TaskList />} />
          <Route path='/team' element={<UserList />} />
          <Route path='/deleted' element={<DeletedItems />} />
          <Route path='/task/:id' element={<TaskInfo />} />
        </Route>

        <Route path='/sign-in' element={<SignIn />} />
      </Routes>

      <Toaster richColors />
    </main>
  );
}

export default AppRoutes;