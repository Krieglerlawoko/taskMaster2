import { Tab } from "@headlessui/react";
import React from "react";

const mergeClasses = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const Tabs = ({ tabs, setSelected, children }) => {
  return (
    <div className='w-full px-2 sm:px-4'>
      <Tab.Group>
        <Tab.List className='flex space-x-4 rounded-lg p-1 bg-gray-100'>
          {tabs.map((tab, idx) => (
            <Tab
              key={tab.title}
              onClick={() => setSelected(idx)}
              className={({ selected }) =>
                mergeClasses(
                  "flex items-center outline-none gap-3 px-4 py-2 text-lg font-semibold",
                  selected
                    ? "text-blue-800 border-b-2 border-blue-700"
                    : "text-gray-700 hover:text-blue-600"
                )
              }
            >
              {tab.icon}
              <span>{tab.title}</span>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='w-full mt-3'>{children}</Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Tabs;