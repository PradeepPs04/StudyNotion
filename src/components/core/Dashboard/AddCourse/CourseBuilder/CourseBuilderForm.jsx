import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { IconBtn } from '../../../../common/IconBtn';
import { useDispatch, useSelector } from 'react-redux';
import { NestedView } from './NestedView';

import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';


export const CourseBuilderForm = () => {

  const {course} = useSelector((state)  => state.course);
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    setValue,
    formState:{errors},
    getValues,
  } = useForm();
  
  const [editSectionName, setEditSectionName] = useState(null);
  const [loading, setLoading] = useState(false);

  const {token} = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    setLoading(true);
    let result = null;

    if(editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        }, 
        token,
      )
    }
    else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token,
      )
    }

    if(result) {
      dispatch((setCourse(result)));
      setEditCourse(null);
      setValue("sectionName", "");
    }

    setLoading(false);
  }

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  }

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  const goToNext = () => {
    if(course.courseContent.length === 0) {
      toast.error("Please add atleast one section");
      return;
    }
    if(course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }

    dispatch(setStep(3));
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }

  return (
    <div className='text-richblack-5'>
      <p>Course Builder</p>

      <form 
      onSubmit={handleSubmit(onSubmit)}
      className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8 flex flex-col'>
        <div>
            <label className='label-style' htmlFor='sectionName'>section name <sup className='text-pink-300'>*</sup></label>
            <input
              id='sectionName'
              placeholder='Add section name'
              {...register('sectionName', {required:true})}
              className='w-full form-style'
            />
            {
              errors.sectionName && (
                <span>Section name is required</span>
              )
            }
        </div>

        <div className='flex space-x-10'>
          <IconBtn
            type='Submit'
            text={editSectionName ? 'Edit Section Name' : 'Create Section'}
            iconName={editSectionName ? 'FaRegEdit' : 'FaPlusCircle'}
            customClasses='border border-richblack-300 text-yellow-50 font-semibold'
          />
          {
            editSectionName && (
              <button 
                type='button'
                onClick={cancelEdit}
                className='text-sm text-richblack-300 underline hover:text-richblack-200 transition-all duration-200'>
                Cancel Edit
              </button>
            )
          }
        </div>

      </form>

      {
        course?.courseContent?.length > 0 && (
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
        )
      }

      <div className='mt-6 flex justify-end space-x-3'>
        <button
        onClick={goBack}
        className='text-richblack-25 rounded-md cursor-pointer flex items-center px-4 border border-richblack-300 hover:bg-richblack-700 transition-all duration-200'>
          Back
        </button>

        <IconBtn
          text='Next'
          onClick={goToNext}
          iconName='FaArrowRight'
        />
      </div>

    </div>
  )
}
