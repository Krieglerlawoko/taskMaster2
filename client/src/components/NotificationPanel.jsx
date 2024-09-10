import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { BiMessageRounded } from "react-icons/bi";
import { HiBell } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import moment from "moment";

const notifications = [
  {
    id: "1",
    teamMembers: [
      "member1",
      "member2",
      "member3",
    ],
    content: "You've been assigned a new task with normal priority. Please review it by Thu Feb 29 2024.",
    relatedTask: null,
    type: "alert",
    readStatus: [],
    created: "2024-02-09T05:45:23.353Z",
    updated: "2024-02-09T05:45:23.353Z",
  },
  {
    id: "2",
    teamMembers: [
      "member1",
      "member2",
      "member3",
    ],
    content: "A new high-priority task has been assigned to you. The due date is Fri Feb 09 2024.",
    relatedTask: {
      id: "task1",
      title: "Test Task",
    },
    type: "alert",
    readStatus: [],
    created: "2024-02-09T09:32:26.810Z",
    updated: "2024-02-09T09:32:26.810Z",
  },
];

const Icons = {
  alert: <HiBell className='h-5 w-5 text-gray-600 hover:text-indigo-600' />,
  message: <BiMessageRounded className='h-5 w-5 text-gray-600 hover:text-indigo-600' />,
};

const NotificationPanel = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const markAllAsRead = () => {
    // Add functionality here
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    // Add additional logic here
  };

  const actions = [
    { label: "Cancel", href: "#", onClick: () => setIsPanelOpen(false) },
    { label: "Mark All as Read", href: "#", onClick: markAllAsRead },
  ];

  return (
    <>
      <Popover className='relative'>
        <Popover.Button className='inline-flex items-center focus:outline-none'>
          <div className='w-8 h-8 flex items-center justify-center text-gray-800 relative'>
            <IoNotificationsOutline className='text-2xl' />
            {notifications.length > 0 && (
              <span className='absolute top-0 right-1 w-4 h-4 text-xs text-white font-bold rounded-full bg-red-600'>
                {notifications.length}
              </span>
            )}
          </div>
        </Popover.Button>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-200'
          enterFrom='opacity-0 translate-y-1'
          enterTo='opacity-100 translate-y-0'
          leave='transition ease-in duration-150'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 translate-y-1'
        >
          <Popover.Panel className='absolute -right-16 md:-right-2 z-10 mt-5 flex w-screen max-w-xs px-4'>
            {({ close }) => (
              <div className='w-full max-w-md bg-white rounded-lg shadow-lg ring-1 ring-gray-900/5'>
                <div className='p-4'>
                  {notifications.slice(0, 5).map((notification, index) => (
                    <div
                      key={notification.id}
                      className='group flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg'
                    >
                      <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-gray-200 group-hover:bg-white'>
                        {Icons[notification.type]}
                      </div>

                      <div className='flex-1' onClick={() => handleNotificationClick(notification)}>
                        <div className='flex items-center gap-3 text-gray-900 font-semibold'>
                          <p>{notification.type}</p>
                          <span className='text-xs text-gray-500'>{moment(notification.created).fromNow()}</span>
                        </div>
                        <p className='mt-1 text-gray-600 truncate'>{notification.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='grid grid-cols-2 divide-x bg-gray-50'>
                  {actions.map((action) => (
                    <Link
                      key={action.label}
                      to={action.href}
                      onClick={action.onClick}
                      className='flex items-center justify-center p-3 text-blue-600 font-semibold hover:bg-gray-100'
                    >
                      {action.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};

export default NotificationPanel;