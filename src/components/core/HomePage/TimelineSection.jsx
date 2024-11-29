import React from 'react'

import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg';
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import TimeLineImage from '../../../assets/Images/TimelineImage.png'

const timeLine = [
    {
        Logo: Logo1,
        Heading: "Leadership",
        Desciptoin: "Fully commited to the success company",
        DottedLine: true,
    },
    {
        Logo: Logo2,
        Heading: "Responsibility",
        Desciptoin: "Students will always be our top priority",
        DottedLine: true,
    },
    {
        Logo: Logo3,
        Heading: "Flexibility",
        Desciptoin: "The ability to switch is an important skill",
        DottedLine: true,
    },
    {
        Logo: Logo4,
        Heading: "Solve the problem",
        Desciptoin: "Code your way to a solution",
        DottedLine: false,
    },
]

function TimelineSection() {
  return (
    <div className='flex flex-row gap-15 items-center'>
        <div className='w-[45%] flex flex-col gap-12'>
            {
                timeLine.map((element, idx) => {
                    return (
                        <div key={idx} className='flex flex-row gap-6'>
                            <div className='relative h-[50px] w-[50px] rounded-full bg-white flex items-center justify-center'>
                                <img src={element.Logo} />
                                {
                                    element.DottedLine 
                                    ? 
                                    <div className=' absolute -bottom-10 h-8 border-richblack-50 border-dotted border-l-2'>
                                    </div> 
                                    : 
                                    <div></div> 
                                }
                            </div   >

                            <div>
                                <h2 className='font-semibold text-[18px]'>{element.Heading}</h2>
                                <p className='text-base'>{element.Desciptoin}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>

        <div className='relative shadow-blue-200'>
            <img src={TimeLineImage} className='shadow-white object-cover h-fit'/>

            <div className='absolute left-[50%] -translate-x-[50%] -translate-y-[50%] bg-caribbeangreen-700 flex flex-row text-white uppercase py-7'>
                <div className='flex flex-row gap-4 items-center border-r border-caribbeangreen-400 px-10'>
                    <p className='text-3xl font-bold'>10</p>
                    <p className='text-caribbeangreen-300 text-sm'>Years Experiences</p>
                </div>

                <div className='flex gap-4 items-center px-10'>
                    <p className='text-3xl font-bold'>250</p>
                    <p className='text-caribbeangreen-300 text-sm'>Types of Courses</p>
                </div>
            </div>
        </div>  

    </div>
  )
}

export default TimelineSection