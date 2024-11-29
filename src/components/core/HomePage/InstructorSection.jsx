import React from 'react'

import Instructor from '../../../assets/Images/Instructor.png';
import HighlightText from './HighlightText';
import CTAButton from './CTAButton';
import { FaArrowRight } from 'react-icons/fa6';

function InstructorSection() {
  return (
    <div className='mt-16'>
        <div className='flex flex-row items-center gap-20'>
            <div className='w-[50%]'>
                <img src={Instructor} className='shadow-white'/>
            </div>

            <div className='w-[50%] flex flex-col gap-5'>
                <div className='text-4xl font-semibold w-[50%]'>
                    Become an
                    <HighlightText text={'Instructor'} color={'text-[#15CCFB]'}/>
                </div>

                <p className='font-md text-[16px] w-[80%] text-richblack-300'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>

                <div className='w-fit mt-10'>
                    <CTAButton active={true} linkto={'/singup'}>
                        <div className='flex flex-row gap-2 items-center'>
                            <p>Start Teaching Today</p>
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InstructorSection