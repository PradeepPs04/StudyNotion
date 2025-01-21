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
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">Publish Course</p>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-6 mb-8">
                {/* checkbox */}
                <label className="inline-flex items-center text-lg" htmlFor='public'>
                    <input
                        type='checkbox'
                        id='public'
                        {...register('public')}
                        className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
                    />
                    <span className="ml-2 text-richblack-400">
                        Make this Course as Public
                    </span>
                </label>
            </div>
            
            {/* next & previous buttons */}
            <div className="ml-auto flex max-w-max items-center gap-x-4">
                <button
                    disabled={loading}
                    type='button'
                    onClick={goBack}
                    className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
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
