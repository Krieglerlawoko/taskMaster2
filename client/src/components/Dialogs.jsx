import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { FaQuestion } from "react-icons/fa";
import ModalWrapper from "./ModalWrapper";
import Button from "./Button";

export default function ConfirmationDialog({
  open,
  setOpen,
  msg,
  setMsg = () => {},
  onClick = () => {},
  type = "delete",
  setType = () => {},
}) {
  // Function to handle closing the dialog
  const handleClose = () => {
    setType("delete");
    setMsg(null);
    setOpen(false);
  };

  return (
    <ModalWrapper open={open} setOpen={handleClose}>
      <div className='w-full py-4 flex flex-col gap-4 items-center justify-center'>
        <Dialog.Title as='h3'>
          <div
            className={clsx(
              "p-3 rounded-full",
              type === "restore" || type === "restoreAll"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-red-200 text-red-600"
            )}
          >
            <FaQuestion size={60} />
          </div>
        </Dialog.Title>

        <p className='text-gray-500 text-center'>
          {msg ?? "Are you sure you want to delete this record?"}
        </p>

        <div className='flex flex-col sm:flex-row-reverse gap-4 bg-gray-50 py-3'>
          <Button
            type='button'
            className={clsx(
              "px-8 text-sm font-semibold text-white sm:w-auto",
              type === "restore" || type === "restoreAll"
                ? "bg-yellow-600"
                : "bg-red-600 hover:bg-red-500"
            )}
            onClick={onClick}
            label={type === "restore" ? "Restore" : "Delete"}
          />

          <Button
            type='button'
            className='bg-white px-8 text-sm font-semibold text-gray-900 sm:w-auto border'
            onClick={handleClose}
            label='Cancel'
          />
        </div>
      </div>
    </ModalWrapper>
  );
}

export function UserActionDialog({ open, setOpen, onClick = () => {} }) {
  const closeDialog = () => setOpen(false);

  return (
    <ModalWrapper open={open} setOpen={closeDialog}>
      <div className='w-full py-4 flex flex-col gap-4 items-center justify-center'>
        <Dialog.Title as='h3'>
          <div className='p-3 rounded-full text-red-600 bg-red-200'>
            <FaQuestion size={60} />
          </div>
        </Dialog.Title>

        <p className='text-gray-500 text-center'>
          {"Are you sure you want to activate or deactivate this account?"}
        </p>

        <div className='flex flex-col sm:flex-row-reverse gap-4 bg-gray-50 py-3'>
          <Button
            type='button'
            className='px-8 text-sm font-semibold text-white sm:w-auto bg-red-600 hover:bg-red-500'
            onClick={onClick}
            label='Yes'
          />

          <Button
            type='button'
            className='bg-white px-8 text-sm font-semibold text-gray-900 sm:w-auto border'
            onClick={closeDialog}
            label='No'
          />
        </div>
      </div>
    </ModalWrapper>
  );
}