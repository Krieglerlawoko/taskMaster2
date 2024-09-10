import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";

const ModalWrapper = ({ open, setOpen, children }) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-50 overflow-auto'
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter='transition-opacity duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-800 bg-opacity-70' />
        </Transition.Child>

        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <Transition.Child
            as={Fragment}
            enter='transition-transform duration-300'
            enterFrom='opacity-0 transform translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 transform translate-y-0 sm:scale-100'
            leave='transition-transform duration-200'
            leaveFrom='opacity-100 transform translate-y-0 sm:scale-100'
            leaveTo='opacity-0 transform translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <Dialog.Panel className='relative bg-white rounded-lg shadow-lg w-full max-w-md p-6'>
              <div className='flex flex-col'>
                <div className='flex-1'>
                  {children}
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalWrapper;