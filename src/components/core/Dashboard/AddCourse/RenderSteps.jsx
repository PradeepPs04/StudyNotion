import React from 'react'
import { useSelector } from 'react-redux'

import { FaCheck } from 'react-icons/fa';
import { CourseInformationForm } from './CourseInformation/CourseInformationForm';
import { CourseBuilderForm } from './CourseBuilder/CourseBuilderForm';

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
    <div>
        <>
            {/* TODO: check last line of this div */}
            <div>
                {
                    steps.map((item) => (
                        <div key={item.id}>
                            <div>
                                <div className={`${step === item.id 
                                ? 'bg-yellow-900 border-yellow-50 text-yellow-50' 
                                : 'border-richblack-700 bg-richblack-800 text-richblack-300'}`}>
                                    {
                                        item.id < step ? (<FaCheck/>) : (item.id)
                                    }
                                </div>
                            </div>

                            {/* TODO: Add dashed lines between steps (lines before completed steps must be yellow) */}
                        </div>
                    ))
                }
            </div>

            <div>
                {
                    steps.map((item) => (
                        <div>
                            <p>{item.title}</p>
                        </div>
                    ))
                }
            </div>

            {step === 1 && <CourseInformationForm/>}
            {step === 2 && <CourseBuilderForm/>}
            {/* {step === 3 && } */}
        </>
    </div>
  )
}
