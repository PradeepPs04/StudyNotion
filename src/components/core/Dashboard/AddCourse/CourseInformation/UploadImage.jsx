import React from 'react'

export const UploadImage = ({name, label, register, errors, setValue}) => {
  return (
    <div>
      <label htmlFor={name} className='label-style'>{label}<sup className='text-pink-300'>*</sup></label>
      <input 
      type='file'
      id={name}
      />
    </div>
  )
}
