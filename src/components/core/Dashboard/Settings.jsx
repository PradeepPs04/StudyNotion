import React, { useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { IconBtn } from '../../common/IconBtn';
import { FaXmark } from "react-icons/fa6";
import { uploadDisplayPicture } from '../../../services/operations/settingsAPI';
import { useReducer } from 'react';
import toast from 'react-hot-toast';
import { UpdateProfileForm } from './UpdateProfileForm';

export const Settings = () => {
  const {user} = useSelector((state) => state.profile);
  const [file, setFile] = useState('');

  const ref = useRef();
  const dispatch = useDispatch();

  const uploadProfilePictureHandler = (e) => {
    e.preventDefault();
    if(!file) {
      toast.error('Please select a file to upload');
      return;
    }
    console.log('printing file', file);
    console.log('logging user: ', user);
    dispatch(uploadDisplayPicture(file, useReducer));
  }

  return (
    <div className='text-richblack-5 flex flex-col gap-10'>
    
            <h1 className='text-3xl font-[500]'>
                Edit Profile
            </h1>
    
    
            {/* Section-1 */}
            <div className='flex flex-col sm:flex-row justify-center sm:justify-start gap-4 items-center bg-richblack-800 p-8 rounded-md'>
                {/* Profile picture div */}
                <div>
                  <img 
                      src={user?.image} 
                      alt={`profile-${user?.firstName}`}
                      className='aspect-square w-[80px] object-cover rounded-full'
                  />
                </div>

                {/* Upload picture div */}
                <div className='flex flex-col gap-2'>
                    <p className='text-center sm:text-start'>Change Profile Picture</p>
                    
                    <form className='flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-center space-x-4 items-center'>
                      <label className='flex'>
                        <input
                            className={`w-full text-sm text-gray-500 cursor-pointer
                            ${file ? 'text-md' : 'text-[0px]'}
                            file:me-4 file:py-3 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-richblack-700 file:text-richblack-100
                            hover:file:bg-richblack-600
                            transition-all duration-200 text-richblack-400`}
                            type='file'
                            name='file'
                            ref={ref}
                            onChange={(e) => setFile(e.target.files[0])}
                          />

                          <button className='text-pink-300 w-3'
                            onClick={(e) => {
                              e.preventDefault();
                              ref.current.value = ''; 
                              setFile(null);
                            }}
                          >
                            <span className={`${file ? 'block' : 'hidden'}`}>
                              <FaXmark />
                            </span>
                          </button>
                      </label>
                      
                      <IconBtn
                          text='Upload'
                          iconName={'FaUpload'} 
                          onClick={uploadProfilePictureHandler} 
                      />
                    </form>

                </div>
            </div>
    
            {/* Section-2 */}
            <div className='flex flex-col gap-8 bg-richblack-800 p-8 rounded-md'>
                <h4 className='font-[600] text-lg'>Profile Information</h4>
                <UpdateProfileForm/>
            </div>
    
            {/* Section-3 */}
            <div className='flex flex-col gap-10 bg-richblack-800 p-8 rounded-md'>
                
    
            </div>
    
        </div>
  )
}
