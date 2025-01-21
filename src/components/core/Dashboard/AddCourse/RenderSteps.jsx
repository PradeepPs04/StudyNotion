import React from 'react'
import { useSelector } from 'react-redux'

import { FaCheck } from 'react-icons/fa';
import { CourseInformationForm } from './CourseInformation/CourseInformationForm';
import { CourseBuilderForm } from './CourseBuilder/CourseBuilderForm';
import { PublishCourse } from './PublishCourse/PublishCourse';

export const RenderSteps = () => {

    const {step} = useSelector((state) => state.course);

    const steps = [
        {
            id: 1,
            title: "Course Information",
        },
        {
            id: 2,
            title: "Course Builder",
        },
        {
            id: 3,
            title: "Publish",
        },
    ]

  return (
    <>
        {/* Step number and dashed line */}
        <div className='relative mb-2 flex w-full justify-center'>
            {
                // Display current step number (if completed shows check icon) 
                steps.map((item) => (
                    <>
                        <div 
                            key={item.id}
                            className='flex flex-col items-center'
                        >
                            <div
                                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                                step === item.id 
                                ? 'border-yellow-50 bg-yellow-900 text-yellow-50' 
                                : 'border-richblack-700 bg-richblack-800 text-richblack-300'}
                                ${item.id < step ? 'bg-yellow-50' : ''}`}
                            >
                                {
                                    step > item.id 
                                    ? (<FaCheck className='font-bold text-richblack-900'/>)
                                    : (item.id)
                                }
                            </div>
                            
                        </div>
                        
                        {/* Display dashed lines */}
                        {
                            item.id != steps.length && (
                                <>
                                    <div
                                        className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2
                                        ${step > item.id ? 'border-yellow-50' : 'border-richblack-500'}`}
                                    >

                                    </div>
                                </>
                            )
                        }
                    </>

                ))
            }
        </div>
        
        {/* Steps name */}
        <div className='relative mb-16 flex w-full select-none justify-between'>
        {
            steps.map((item) => (
                <>
                    <div 
                        className='flex min-w-[130px] flex-col items-center gap-y-2'
                        key={item.id}
                    >
                        <p
                            className={`text-sm 
                            ${step === item.id ? 'text-richblack-5' : 'text-richblack-500'}
                            ${item.id < step ? 'text-richblack-500' : ''}`}
                        >
                            {item.title}
                        </p>
                    </div>
                </>
            ))
        }
        </div>

        {step === 1 && <CourseInformationForm/>}
        {step === 2 && <CourseBuilderForm/>}
        {step === 3 && <PublishCourse/>}
    </>
  )
}
