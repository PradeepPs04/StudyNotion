import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import { HiOutlineCurrencyRupee } from 'react-icons/hi';

import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';

import { setStep, setCourse } from '../../../../../slices/courseSlice';

import ChipInput from './ChipInput';
import { Upload } from '../Upload';
import { RequirementField } from './RequirementField';
import { IconBtn } from '../../../../common/IconBtn';
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
  const {course, editCourse} = useSelector((state) => state.course);
  
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
        currentValues.courseTags.toString() !== course.tag.toString() ||
        currentValues.courseBenefits !== course.whatYouWillLearn ||
        currentValues.courseCategory._id !== course.categories._id ||
        currentValues.courseImage !== course.thumbnail ||
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

        if(currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags));
        }

        if(currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }

        if(currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }

        if(currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnail", data.courseImage);
        }

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
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("thumbnail", data.courseImage);
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
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      
        {/* course title */}
        <div className="flex flex-col space-y-2">
          <label htmlFor='courseTitle' className="text-sm text-richblack-5">
            Course Title<sup className='text-pink-300'>*</sup>
          </label>
          <input
            id='courseTitle'
            placeholder="Enter course title"
            {...register('courseTitle', {required:true})}
            className='form-style w-full'
          />
          {
            errors.courseTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Course title is required
              </span>
            )
          }

        </div>

        {/* course short description */}
        <div className="flex flex-col space-y-2">
          <label htmlFor='courseShortDescription' className='text-sm text-richblack-5'>
            Course Short description<sup className='text-pink-300'>*</sup>
          </label>
          <textarea
            id='courseShortDescription'
            placeholder='Enter description'
            {...register('courseShortDescription', {required:true})}
            className="form-style resize-x-none min-h-[130px] w-full"
          />
          {
            errors.courseShortDescription && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Course description is required
              </span>
            )
          }
        </div>

        {/* course price */}
        <div className="relative flex flex-col space-y-2">
          <label htmlFor='coursePrice' className='text-sm text-richblack-5'>
            Course Price<sup className='text-pink-300'>*</sup>
          </label>
          <input
            id='coursePrice'
            type='number'
            placeholder='Enter course price'
            {...register('coursePrice', {
              required:true, 
              valueAsNumber:true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className='w-full form-style !pl-12'
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-[58%] inline-block -translate-y-1/2 text-2xl text-richblack-400"/>
          {
            errors.coursePrice && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Course price is required
              </span>
            )
          }
        </div>
        
        {/* course category */}
        <div className="flex flex-col space-y-2">
          <label htmlFor='courseCategory' className='text-sm text-richblack-5'>
            Course Category<sup className='text-pink-300'>*</sup>
          </label>
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
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Course category is required
              </span>
            )
          }
        </div>

        {/* course Tags */}
        <ChipInput
          label="Tags"
          name="courseTags"
          placeholder="Enter tags and press Enter"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        {/* course thumbnail */}
        <Upload
          name="courseImage"
          label="Course Thumbnail"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editCourse ? course?.thumbnail : null}
        />

        {/* course benefits */}
        <div className="flex flex-col space-y-2">
          <label htmlFor='courseBenefits' className='text-sm text-richblack-5'>
            Benefits of the course<sup className='text-pink-300'>*</sup>
          </label>
          <textarea
            id='courseBenefits'
            placeholder='Enter benefits of the course'
            {...register('courseBenefits', {required:true})}
            className="form-style resize-x-none min-h-[130px] w-full"
          />
          {
            errors.courseBenefits && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Benefits of the course is required
              </span>
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

        {/* Next button */}
        <div className="flex justify-end gap-x-2">
          {
            editCourse && (
              <button
                onClick={() => dispatch(setStep(2))}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
              >
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
