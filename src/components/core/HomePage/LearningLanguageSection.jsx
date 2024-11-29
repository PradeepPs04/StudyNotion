import React from 'react'
import HighlightText from './HighlightText'

import Know_your_progress from '../../../assets/Images/Know_your_progress.png';
import Compare_with_others from '../../../assets/Images/Compare_with_others.png';
import Plan_your_lessons from '../../../assets/Images/Plan_your_lessons.png';
import CTAButton from './CTAButton';

function LearningLanguageSection() {
  return (
    <div className='mt-[130px] mb-24'>
      <div className='flex flex-col gap-5 items-center'>
          <div className='text-4xl font-semibold text-center'>
            Your swiss knife for
            <HighlightText text={"learning any language"} color={'text-[#15CCFB]'}/>
          </div>

          <div className='text-center text-richblack-600 text-base font-medium w-[70%] mx-auto'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
          </div>

          <div className='flex flex-row items-center justify-center mt-5'>
            <img src={Know_your_progress} className='object-contain -mr-32 mb-12'/>
            <img src={Compare_with_others} className='object-contain -mr-14'/>
            <img src={Plan_your_lessons} className='object-contain -ml-24 mb-12'/>
          </div>

          <div className='w-fit flex justify-center items-center'>
            <CTAButton active={true} linkto={'/singup'}>
              Learn More
            </CTAButton>
          </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection