import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";

import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/CTAButton';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import Footer from '../components/common/Footer';

const Home = () => {
  return (
    <div>
        {/* Section-1 */}
        <section className='relative w-11/12 mx-auto max-w-maxContent flex flex-col justify-between items-center text-white'>

            <Link to={"/signup"}>
                <div className='group mt-16 p-[0.30rem] mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 shadow-sm shadow-richblack-300'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-7 bg-yello'>
                Empower your Future with 
                <HighlightText text={'Coding Skills'} color={'text-caribbeangreen-50'}/>
            </div>

            <div className='mt-4 w-[70%] text-center text-md text-richblack-300'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={'/signup'}>
                    Learn More
                </CTAButton>
                <CTAButton active={false} linkto={'/login'}>
                    Book a Demo
                </CTAButton>
            </div>

            <div className='mx-3 my-12'>
                <video loop muted autoPlay className='mx-auto shadow-[18px_18px_0px_0px_rgba(255,_255,_255)]'>
                    <source src={Banner} type="video/mp4"/>
                </video>    
            </div>

            
            {/* Code section-1 */}
            <div className='mx-auto'>
                <CodeBlocks
                    position={"lg:flex-row gap-x-32"}
                    heading={
                        <div className='text-4xl font-bold'>
                            Unlock your <HighlightText text={'coding potential'} color={'text-caribbeangreen-50'}/>
                            {" "}
                            with our online courses
                        </div>
                    }
                    subHeading={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}
                    ctabtn1={
                        {
                            text: 'Try it Yourself',
                            linkto: '/signup',
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            text: 'Learn More',
                            linkto: '/login',
                            active: false,
                        }
                    }
                    codeblock={
                        `<!DOCTYPE html>
                        <html>
                        head><>Example</
                        title><linkrel="stylesheet"href="styles.css">
                        /head>
                        body>
                        h1><ahref="/">Header</a>
                        /h1>
                        nav><ahref="one/">One</a><ahref="two/">Two</
                        a><ahref="three/">Three</a>
                        /nav>
                    `}
                    backgroundGradient = {'#F59E0B'}
                    codeColor={'text-yellow-25'}
                />
            </div>

            {/* Code section-2 */}
            <div>
                <CodeBlocks
                    position={"lg:flex-row-reverse gap-x-32"}
                    heading={
                        <div className='text-4xl font-bold'>
                            Start <HighlightText text={'coding'} color={'text-[#15CCFB]'}/>
                            <br/>
                            <HighlightText text={'in '} color={'text-[#15CCFB]'}/>
                            <HighlightText text={'seconds'} color={'text-[#15CCFB]'}/>
                        </div>
                    }
                    subHeading={`Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.`}
                    ctabtn1={
                        {
                            text: 'Continue Lession',
                            linkto: '/signup',
                            active: true,
                        }
                    }

                    ctabtn2={
                        {
                            text: 'Learn More',
                            linkto: '/login',
                            active: false,
                        }
                    }
                    codeblock={
                        `<!DOCTYPE html>
                        <html>
                        head><>Example</
                        title><linkrel="stylesheet"href="styles.css">
                        /head>
                        body>
                        h1><ahref="/">Header</a>
                        /h1>
                        nav><ahref="one/">One</a><ahref="two/">Two</
                        a><ahref="three/">Three</a>
                        /nav>
                    `}
                    backgroundGradient = {'#0077B3'}
                    codeColor={'text-pink-100'}
                />
            </div>
            
            <ExploreMore/>

        </section>

        {/* Section-2 */}
        <section className='bg-pure-greys-5 text-richblack-700'>

            <div className='homepage_bg h-[335px]'>
                <div className='w-11/12 mx-auto max-w-maxContent flex items-center gap-5'>

                    <div className='mt-[150px] w-full flex flex-row justify-center gap-7 text-white'>
                        <CTAButton active={true} linkto={'/signup'}>
                            <div className='flex gap-2 items-center'>
                                Explore full Catalog
                                <FaArrowRight/>
                            </div>
                        </CTAButton>

                        <CTAButton active={false} linkto={'/login'}>
                            <div className='flex gap-2 items-center'>
                                Learn More
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>

            <div className='w-11/12 mx-auto max-w-maxContent flex flex-col justify-between items-center gap-7'>
                <div className='flex flex-row gap-5 mt-[100px] mb-10'>
                    <div className='text-4xl font-semibold w-[45%]'>
                        Get the skills you need for a
                        <HighlightText text={'job that is in demand.'} color={'text-[#15CCFB]'}/>
                    </div>
                    
                    <div className='flex flex-col gap-10 w-[40%] items-start'>
                        <p className='text-[16px]'>
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </p>
                        <CTAButton active={true} linkto={'/signup'}>
                            <p>Learn More</p>
                        </CTAButton>
                    </div>
                </div>
            
                <TimelineSection/>
                
                <LearningLanguageSection/>
            </div>


        </section>


        {/* Section-3 */}
        <section className='bg-richblack-900 text-white'>
            <div className='w-11/12 mx-auto max-w-maxContent flex flex-col justify-between items-center gap-8'>
                
                <InstructorSection/>
                <h2 className='text-4xl text-center font-semibold mt-10'>Review from other learners</h2>
            </div>
        </section>


        {/* Footer */}
        <Footer/>
        
    </div>
  )
}

export default Home;