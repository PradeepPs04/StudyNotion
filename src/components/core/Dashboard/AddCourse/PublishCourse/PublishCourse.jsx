import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { IconBtn } from '../../../../common/IconBtn';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';

export const PublishCourse = () => {

    const {token} = useSelector((state) => state.auth);
    const {course} = useSelector((state) => state.course);
    
    const dispatch = useDispatch();
    
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        errors,
    } = useForm();

    useEffect(() => {
        if(course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public", true);
        }
    }, []);

    const goBack = () => {
        dispatch(setStep(2));
    }

    const goToCourses = () => {
        dispatch(resetCourseState());
        // navigate('/dashboard/my-courses');
    }

    const handleCoursePublish = async () => {
        // if no update in form
        if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true || 
        (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)) {
            // no need to call api
            goToCourses();
            return;
        }   

        // if form is updated
        const formData = new FormData();
        formData.append('courseId', course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append('status', courseStatus);

        setLoading(true);
        const result = await editCourseDetails(formData, token);

        if(result) {
            goToCourses();
        }

        setLoading(false);
    }

    const onSubmit = () => {
        handleCoursePublish();
    }

  return (
    <div className='rounded-md border-[1px] border-richblack-600 bg-richblack-800 text-richblack-5 p-8'>
        <p>Publish Course</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label className='label-style flex items-center' htmlFor='public'>
                    <input
                        type='checkbox'
                        id='public'
                        {...register('public')}
                        className='rounded-full h-4 w-4'
                    />
                    <span className='ml-3'>Make this Course as Public</span>
                </label>
            </div>

            <div className='flex justify-end gap-x-3'>
                <button
                    disabled={loading}
                    type='button'
                    onClick={goBack}
                    className='flex items-center rounded-md bg-richblack-500 px-6 text-richblack-800 font-bold'
                >
                    Back
                </button>

                <IconBtn
                    disabled={loading}
                    text="Save Changes"
                />
            </div>
        </form>
    </div>
  )
}
