import React, { useEffect, useState } from 'react'

import { IoMdCloseCircle } from "react-icons/io";

export const ChipInput = ({label, name, placeholder, register, errors, setValue, getValues}) => {

  const [currentTag, setCurrentTag] = useState('');
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    register(name, {
      required: true
    });
  }, []);

  useEffect(() => {
    setValue(name, tagList);
  }, [tagList]);

  const handleTagEnter = (e) => {
    if(e.key === "Enter") {
      const inputTag = currentTag.trim().split(',')
      // console.log(inputTag);
     inputTag.forEach((tag) => {
      const capitalizeTag = tag.replace(/^./, char => char.toUpperCase());
      setTagList((prevTags) => [...prevTags, capitalizeTag]);
     });
      setCurrentTag('');
    }
  }

  const handleTagRemove = (index) => {
    let updatedTags = [...tagList];
    updatedTags.splice(index, 1);
    setTagList(updatedTags);
  }

  return (
    <div className='space-y-3 text-richblack-25'>

        <label className='label-style' htmlFor={name}>{label}<sup className='text-pink-300'>*</sup></label>
        {/* Input Tags */}
        <div className='flex flex-wrap gap-4'>
          {
            tagList.length > 0 && (
              tagList.map((tag, index) => (
                <div 
                key={index}
                className='flex items-center space-x-2 bg-yellow-400 px-2 py-1 rounded-full'>
                  <span>{tag}</span>
                  <span onClick={() => handleTagRemove(index)} className='hover:scale-125 transition-all duration-200 cursor-pointer'>
                    <IoMdCloseCircle size={14}/>
                  </span>
                </div>
              ))
            )
          }
        </div>

        <input
          type='text'
          id={name}
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          onKeyDown={handleTagEnter}
          placeholder={placeholder}
          className='form-style w-full'
        />
        {
          errors[name] && (
            <span>{label} is required</span>
          )
        }
    </div>  
  )
}
