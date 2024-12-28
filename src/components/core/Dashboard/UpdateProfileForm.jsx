import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export const UpdateProfileForm = () => {
    const {
        register, 
        handleSubmit, 
        reset,
        formState: {isSubmitSuccessful},
    } = useForm();

    const updateProfileFormSubmitHandler = async (data) => {
        console.log('logging data: ', data);
        // call updateProfile API

    }

    useEffect(() => {
        if(isSubmitSuccessful) {
            reset({
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                gender: '',
                contactNumber: '',
                About: '',
            });
        }
    }, [reset, isSubmitSuccessful]);

  return (
    <form 
        onSubmit={handleSubmit(updateProfileFormSubmitHandler)}
        className='grid grid-cols-1  md:grid-cols-2 gap-6'
    >
        {/* first name */}
        <label>
            <p className='text-richblack-25 text-sm'>First Name</p>
            <input
                className='bg-richblack-700 text-richblack-25 border-b border-richblack-500 w-full py-3 px-3 pr-12 mt-2 rounded-md'
                type='text'
                name='firstName'
                id='firstName'
                placeholder='Enter first Name'
                
                {...register('firstName')}
              />
        </label>
        
        {/* last name */}
        <label>
            <p className='text-richblack-25 text-sm'>Last Name</p>
            <input
                className='bg-richblack-700 text-richblack-25 border-b border-richblack-500 w-full py-3 px-3 pr-12 mt-2 rounded-md'
                type='text'
                name='lastName'
                id='lastName'
                placeholder='Enter last Name'
                
                {...register('lastName')}
              />
        </label>

        {/* date of birth */}
        <label>
            <p className='text-richblack-25 text-sm'>Date of Birth</p>
            <input
                className='bg-richblack-700 text-richblack-25 border-b border-richblack-500 w-full py-3 px-3 pr-12 mt-2 rounded-md'
                type='date'
                name='dateOfBirth'
                id='dateOfBirth'
                placeholder='Enter dob'
                
                {...register('dateOfBirth')}
              />
        </label>
        
        {/* gender */}
        <label>
            <p className='text-richblack-25 text-sm'>Gender</p>
            <select
                className='flex px-3 py-[0.90rem] mt-2 w-full gap-5 bg-richblack-700 text-richblack-200 border-b border-richblack-500 rounded-md'
                name='dropdown'
                id='dropdown'
                {...register('gender')}
            >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
            </select>
        </label>

        {/* contact number */}
        <label>
            <p className='text-richblack-25 text-sm'>Contact Number</p>
            <input
                className='bg-richblack-700 text-richblack-25 border-b border-richblack-500 w-full py-3 px-3 pr-12 mt-2 rounded-md'
                type='text'
                name='contact'
                id='contact'
                placeholder='Enter contact number'
                
                {...register('contact')}
              />
        </label>
        
        {/* about */}
        <label>
            <p className='text-richblack-25 text-sm'>About</p>
            <input
                className='bg-richblack-700 text-richblack-25 border-b border-richblack-500 w-full py-3 px-3 pr-12 mt-2 rounded-md'
                type='text'
                name='about'
                id='about'
                placeholder='Enter about you'
                
                {...register('about')}
              />
        </label>

    </form>
  )
}
