import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import Button from "../Button";

const TASK_LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY_LEVELS = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const initialFileURLs = [];

const AddTask = ({ open, setOpen }) => {
  const initialTask = "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedTeam, setSelectedTeam] = useState(initialTask?.team || []);
  const [currentStage, setCurrentStage] = useState(initialTask?.stage?.toUpperCase() || TASK_LISTS[0]);
  const [taskPriority, setTaskPriority] = useState(
    initialTask?.priority?.toUpperCase() || PRIORITY_LEVELS[2]
  );
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const onSubmit = async (data) => {
    // Implement your submit logic here
  };

  const onFileChange = (event) => {
    setFiles(event.target.files);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            {initialTask ? "UPDATE TASK" : "ADD TASK"}
          </Dialog.Title>

          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Task Title'
              type='text'
              name='title'
              label='Task Title'
              className='w-full rounded'
              register={register("title", { required: "Title is required" })}
              error={errors.title ? errors.title.message : ""}
            />

            <UserList setTeam={setSelectedTeam} team={selectedTeam} />

            <div className='flex gap-4'>
              <SelectList
                label='Task Stage'
                lists={TASK_LISTS}
                selected={currentStage}
                setSelected={setCurrentStage}
              />

              <div className='w-full'>
                <Textbox
                  placeholder='Date'
                  type='date'
                  name='date'
                  label='Task Date'
                  className='w-full rounded'
                  register={register("date", {
                    required: "Date is required!",
                  })}
                  error={errors.date ? errors.date.message : ""}
                />
              </div>
            </div>

            <div className='flex gap-4'>
              <SelectList
                label='Priority Level'
                lists={PRIORITY_LEVELS}
                selected={taskPriority}
                setSelected={setTaskPriority}
              />

              <div className='w-full flex items-center justify-center mt-4'>
                <label
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
                  htmlFor='fileUpload'
                >
                  <input
                    type='file'
                    className='hidden'
                    id='fileUpload'
                    onChange={onFileChange}
                    accept='.jpg, .png, .jpeg'
                    multiple
                  />
                  <BiImages />
                  <span>Add Assets</span>
                </label>
              </div>
            </div>

            <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
              {isUploading ? (
                <span className='text-sm py-2 text-red-500'>
                  Uploading files...
                </span>
              ) : (
                <Button
                  label='Submit'
                  type='submit'
                  className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                />
              )}

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Cancel'
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddTask;