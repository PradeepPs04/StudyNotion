import React, { useState } from 'react'
import {HomePageExplore} from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = [
    "Free", 
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
];

function ExploreMore() {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

  return (
    <div>
        <div className='text-4xl text-center font-semibold'>
            Unlock The
            <HighlightText text={'Power of code'} color={'text-[#15CCFB]'}/>
        </div>

        <p className='text-center text-richblack-300 text-[16px] mt-3'>
            Learn to Build Anything You Can Imagine
        </p>

        <div className='w-fit mx-auto'>
            <div className='flex flex-row items-center gap-2 bg-richblack-800 mb-5 mt-5 border border-richblack-100 rounded-full px-1 py-1'>
            {
                tabsName.map((element, idx) => {
                    return (
                        <div key={idx} 
                        className=
                        {`
                            text-[16px] 
                            ${currentTab == element ? 'bg-richblack-900 text-richblack-5 font-medium' : 'text-richblack-200'} 
                            rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2
                        `}
                        onClick={() => setMyCards(element)}>
                            {element}
                        </div>
                    )
                })
            }
            </div>
        </div>
        <div className='h-[150px]'></div>
        
        <div className='flex flex-row gap-10 justify-between w-full'>
        {
            courses.map((element, idx) => {
                return (
                    <CourseCard 
                        key={idx} 
                        cardData={element}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}
                    />
                )
            })
        }
        </div>

    </div>
  )
}

export default ExploreMore