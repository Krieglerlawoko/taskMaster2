import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { BsChevronDown } from "react-icons/bs";
import { MdCheckCircle } from "react-icons/md";

const DropdownList = ({ options, currentSelection, updateSelection, title }) => {
  return (
    <div className='w-full'>
      {title && <p className='text-gray-900 dark:text-gray-400'>{title}</p>}

      <Listbox value={currentSelection} onChange={updateSelection}>
        <div className='relative mt-2'>
          <Listbox.Button className='relative w-full cursor-pointer rounded bg-gray-50 pl-3 pr-10 py-2.5 text-left border border-gray-300 sm:text-sm'>
            <span className='block truncate'>{currentSelection}</span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <BsChevronDown className='h-5 w-5 text-gray-500' aria-hidden='true' />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
              {options.map((option, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? "bg-yellow-100 text-yellow-900" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-semibold" : "font-normal"
                        }`}
                      >
                        {option}
                      </span>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-yellow-600'>
                          <MdCheckCircle className='h-5 w-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default DropdownList;