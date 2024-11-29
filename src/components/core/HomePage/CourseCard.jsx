import React from 'react'

import { HiUsers } from "react-icons/hi";
import { TbBinaryTree2 } from "react-icons/tb";

function CourseCard({cardData, currentCard, setCurrentCard}) {
  return (
    <div onClick={() => setCurrentCard(cardData.heading)} className={`${cardData.heading == currentCard ? 'bg-white shadow-[18px_18px_0px_0px_rgba(255,_214,_10)]' : 'bg-richblack-800'} w-[33%] -mb-20`}>

        <div className='flex flex-col justify-end gap-7 transition-all duration-200 cursor-pointer'>
        
            <div className='flex flex-col gap-3 p-8'>
                <h2 
                className={
                    `text-lg font-semibold 
                    ${cardData.heading == currentCard ? 'text-richblack-900' : 'text-richblack-5'}`
                    }>{cardData.heading}

                </h2>
                <p className='text-richblack-400 w-[90%]'>
                    {cardData.description}
                </p>
            </div>

            <div className={
                `flex justify-between items-center mt-8  border-t-2 border-dashed p-4
                ${cardData.heading == currentCard ? 'text-blue-500 border-richblack-100' : 'text-richblack-100 border-richblack-600'}`
                }>
                <div className='flex gap-3 font-semibold justify-center items-center'>
                    <HiUsers className='text-xl'/>
                    <p>{cardData.level}</p>
                </div>
                <div className='flex gap-3 font-semibold justify-center items-center'>
                    <TbBinaryTree2 fill='blue-500' className='text-xl'/>
                    <p>{cardData.lessionNumber} Lessions</p>
                </div>
            </div>
        </div>

    </div>
  )
}

export default CourseCard