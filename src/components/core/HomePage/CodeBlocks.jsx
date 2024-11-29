import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { TypeAnimation } from 'react-type-animation';

import './CodeBlocks.css'
import CTAButton from './CTAButton';

const CodeBlocks = ({position, heading, subHeading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor}) => {
  return (
        <div className={`flex ${position} my-20 justify-between`}>

            {/* section-1 */}
            <div className='w-[45%] lg:w-[550px] flex flex-col gap-8'>
                {heading}
                <div className='text-richblack-300 font-semibold'>
                    {subHeading}
                </div>
                <div className='flex flex-row gap-7 mt-7'>
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className='flex flex-row gap-2 items-center'>
                            {ctabtn1.text}
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.text}
                    </CTAButton>
                </div>
            </div>

            {/* section-2 */}
            <div className='relative flex flex-row h-fit w-[45%] lg:w-[550px] py-4 rounded-lg transition-all duration-200 glass-effect'>
               
                {/* TODO */}
               {/* Change this div to follow cursor on mouse move */}
            <div className={
                `bg-[${backgroundGradient}]/40 blur-3xl
                shadow-[1px_0px_70px_10px_${backgroundGradient}]
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full z-10`}>
            </div>

                <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold z-20'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                    <p>12</p>
                </div>

                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor}`}>
                    
                    <TypeAnimation
                        sequence={[codeblock, 3000, ""]}
                        repeat={Infinity}
                        omitDeletionAnimation={true}
                        cursor={true}
                        style={
                            {
                                whiteSpace: 'pre-line',
                                display: 'block'
                            }
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default CodeBlocks;