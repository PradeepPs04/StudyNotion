import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';

import { ChipInput } from './ChipInput';

import {addCourseDetails, editCourseDetails, fetchCourseCategories} from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { UploadImage } from './UploadImage';
import { RequirementField } from './RequirementField';
import { IconBtn } from '../../../../common/IconBtn';
import toast from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../utils/constants';

export const CourseInformationForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors},
  } = useForm();

  const {token} = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const {course, editCourse, setStep, setCourse} = useSelector((state) => state.course);
  
  const [loading, setLoading] = useState(false);
  const [courseCategory, setCourseCategory] = useState([]);

  const fetchCategories = async () => {
    setLoading(true);
    const categories = await fetchCourseCategories();
    if(categories.length > 0) {
      setCourseCategory(categories);
    }
    setLoading(false);
  }

  useEffect(() => {
    // If editing course add courese details in form (eg. name, price etc.)
    if(editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDescription", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
    fetchCategories();
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if(
        currentValues.courseTitle !== course.courseName ||
        currentValues.courseShortDescription !== course.courseDescription ||
        currentValues.coursePrice !== course.price ||
        // currentValues.courseTags.toString() !== course.tag.toString() ||
        currentValues.courseBenefits !== course.whatYouWillLearn ||
        currentValues.courseCategory._id !== course.categories._id ||
        // currentValues.courseImage !== course.thumbnail ||
        currentValues.courseRequirements.toString() !== course.instructions.toString()
      ) {
      return true;
    }
    return false;
  }

  // handles next button click
  const onSubmit = async (data) => {
    if(editCourse) {
      if(isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("courseId", course._id);
        
        if(currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }

        if(currentValues.courseShortDescription !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDescription);
        }

        if(currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }

        // handle for tags

        if(currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }

        if(currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }

        // handle for thumbnail image

        if(currentValues.courseRequirements.toString() !== course.instructions.toString()) {
          formData.append("instructions", JSON.stringify(data.courseRequirements));
        }

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if(result) {
          dispatch(setStep(2));
          dispatch((setCourse(result)));
        }
      }
      else {
        toast.error("No changes made to the form");
      }
      return;
    }

    // creating course 
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDescription);
    formData.append("price", data.coursePrice);
    // handle tag
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    // handle thumbnain
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("status", COURSE_STATUS.DRAFT);

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if(result) {
      dispatch(setStep(2));
      dispatch((setCourse(result)));
    }
  } 

  return (
    <form 
    onSubmit={handleSubmit(onSubmit)}
    className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'>
      {/* course title */}
      <div>
        <label htmlFor='courseTitle' className='label-style'>Course Title<sup className='text-pink-300'>*</sup></label>
        <input
          id='courseTitle'
          placeholder="Enter course title"
          {...register('courseTitle', {required:true})}
          className='form-style w-full'
        />
        {
          errors.courseTitle && (
            <span>Course title is required</span>
          )
        }

      </div>

      {/* course description */}
      <div>
        <label htmlFor='courseShortDescription' className='label-style'>Course Short description<sup className='text-pink-300'>*</sup></label>
        <textarea
          id='courseShortDescription'
          placeholder='Enter description'
          {...register('courseShortDescription', {required:true})}
          className='min-h-[140px] w-full form-style'
        />
        {
          errors.courseShortDescription && (
            <span>Course description is required</span>
          )
        }
      </div>

      {/* course price */}
      <div className='relative'>
        <label htmlFor='coursePrice' className='label-style'>Course Price<sup className='text-pink-300'>*</sup></label>
        <input
          id='coursePrice'
          type='number'
          placeholder='Enter course price'
          {...register('coursePrice', {required:true, valueAsNumber:true})}
          className='w-full form-style pl-10'
        />
        <HiOutlineCurrencyRupee size={18} className='absolute top-10 left-2 text-richblack-400'/>
        {
          errors.coursePrice && (
            <span>Course price is required</span>
          )
        }
      </div>
      
      {/* course category */}
      <div>
        <label htmlFor='courseCategory' className='label-style'>Course Category<sup className='text-pink-300'>*</sup></label>
        <select
        id='courseCategory'
        defaultValue=""
        {...register('courseCategory', {required:true})}
        className='form-style w-full'
        >
          <option value="" disabled>Choose a category</option>
          {
            !loading && courseCategory.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))
          }
        </select>
        {
          errors.courseCategory && (
            <span>Course category is required</span>
          )
        }
      </div>

      {/* course Tags */}
      <ChipInput
        label="Tags"
        name="CourseTags"
        placeholder="Enter tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* course thumbnail */}
      {/* TODO: create a component for uploading and showing preview of course thumbnil */}
      <UploadImage
        name="courseImage"
        label="Course thumbnail"
        register={register}
        errors={errors}
        setValue={setValue}
      />

      {/* course benefits */}
      <div>
        <label htmlFor='courseBenefits' className='label-style' >Benefits of the course<sup className='text-pink-300'>*</sup></label>
        <textarea
          id='courseBenefits'
          placeholder='Enter benefits of the course'
          {...register('courseBenefits', {required:true})}
          className='min-h-[140px] w-full form-style'
        />
        {
          errors.courseBenefits && (
            <span>Benefits of the course is required</span>
          )
        }
      </div>

      <RequirementField
        label="Requirements/Instructions"
        name="courseRequirements"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <div>
        {
          editCourse && (
            <button
            onClick={() => dispatch(setStep(2))}
            className='flex items-center gap-x-2 bg-richblack-300 rounded-md'>
              Continue Without Saving
            </button>
          )
        }
        <IconBtn
          text={`${!editCourse ? 'Next' : 'Save Changes'}`}
        />
      </div>

    </form>
  )
}
