import React, { useEffect, useState } from 'react'

import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoMdCloseCircle } from "react-icons/io";

export const Upload = ({name, label, register, errors, setValue}) => {

  const [previewFile, setPreviewFile] = useState(null);
  const [file, setFile] = useState(null);

  const acceptedFormats = ".bmp, .png, .webp, .jpeg, .jpg, .gif, .tiff, .svg, .ico, .heic";

  useEffect(() => {
      register(name, {required:true});
  }, []);
  
  useEffect(() => {
      setValue(name, file);
  }, [file]);

  const handleChange = (e) => {
    setPreviewFile(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  }

  const handleFileRemove = (e) => {
    e.stopPropagation(); // Prevent triggering the parent click (i.e. prevents file input on clicking this)
    setFile(null);
    setPreviewFile(null);
  }

  return (
    <>
      <label htmlFor={name} className='label-style'>{label}<sup className='text-pink-300'>*</sup></label>
      <div className="flex flex-col w-full">
          
          <div className="relative flex flex-col items-center justify-center w-full p-8 border-2 border-richblack-600 border-dashed rounded-lg cursor-pointer bg-richblack-700"
          onClick={() => document.getElementById(name).click()}>
          
            {/* file input box */}
            {
              !previewFile && (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className=" p-4 mb-4 text-yellow-50 bg-richblack-800 rounded-full flex items-center justify-center">
                    <AiOutlineCloudUpload size={30}/>
                  </div>

                  <div className='flex flex-col justify-center items-center -space-y-1 text-richblack-200'>
                    <p className="mb-2 text-gray-500">
                      Drag and drop an image, or <span className='text-yellow-50'>Browse</span>
                    </p>
                    <p className="text-gray-500">
                      Max 6MB each (12MB for videos)
                    </p>
                  </div>

                  <ul className='mt-8 flex space-x-28 list-disc text-richblack-400 font-semibold'>
                    <li>Aspect ratio 16:9</li>
                    <li>Recommended size 1024x576</li>
                  </ul>
              </div>
              )}

              <input id={name} type="file" accept={acceptedFormats} className="hidden" onChange={handleChange}/>

              {/* File preview */}
              {
                previewFile && (
                  <img 
                  src={previewFile}
                  alt='file preview'
                  className=' h-[400px] object-cover' 
                  />
                )
              }

              {/* Remove file button */}
              {
                previewFile && (
                  <div 
                  onClick={handleFileRemove}
                  className='absolute right-2 top-2 p-3 bg-richblack-800 rounded-full text-pink-300 hover:bg-pink-400 hover:text-pink-800 transition-all duration-200'>
                    <IoMdCloseCircle size={18}/>
                  </div>
                )
              }

          </div>
          
          {
            errors[name] && (
              <span className='mt-1'>{label} is required</span>
            )
          }
      </div> 
    </>

  )
}
