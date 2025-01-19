import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { IconBtn } from '../../../../common/IconBtn';

export const PublishCourse = () => {

    const {token} = useSelector((state) => state.auth);
    const {course} = useSelector((state) => state.course);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        errors,
    } = useForm();

    const goBack = () => {

    }

    const onSubmit = (data) => {

    }

  return (
    <div className='rounded-md border-[1px] border-richblack-600 bg-richblack-800 text-richblack-5'>
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

            <div>
                <button
                    disabled={loading}
                    type='button'
                    onClick={goBack}
                    className='flex items-center rounded-md'
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
