import React from 'react'

export const Card = ({course}) => {
  return (
    <div>
        <img
            src={course.thumbnail}
            alt='thumbnail'
            className='max-w-[350px] object-cover'
        />
        
        <div>
            <p>{course.courseName}</p>
            <div className='flex gap-x-1'>
                <p>{course.studentsEnrolled.length} students</p>
                <p>|</p>
                <p>Rs.{course.price}</p>
            </div>
        </div>
    </div>
  )
}
