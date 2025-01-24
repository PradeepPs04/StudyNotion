import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';

import '../components/common/loader.css';

import {ConfirmationModal} from '../components/common/ConfirmationModal'

import { buyCourse } from '../services/operations/studentFeaturesAPI';
import {fetchCourseDetails} from '../services/operations/courseDetailsAPI';
import GetAvgRating from '../utils/avgRating'
import RatingStars from '../components/common/RatingStars'

import {formatDate} from '../services/formatDate';
import {convertSecondsToDuration} from '../utils/secondsToDuration';
import { CourseDetailsCard } from '../components/core/Course/CourseDetailsCard';

export const CourseDetails = () => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {loading} = useSelector((state) => state.profile);
    const {paymentLoading} = useSelector((state) => state.course);

    const {courseId} = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [confirmationModal, setConfirmationModal] = useState(null);

    // get course data
    const [courseData, setCourseData] = useState(null);
    useEffect(() => {
        const getCourseFullDetails = async () => {
            try {
                const result = await fetchCourseDetails(courseId);
                if(result) {
                    console.log("Logging result:...", result);
                    setCourseData(result);
                }
            } catch(err) {
                console.log("Could not fetch couse details");
            }
        }
        
        if(courseId) {
            getCourseFullDetails();
        }
    }, [courseId]);
    
    // get average review count
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    useEffect(() => {
        const count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReviews);
        setAvgReviewCount(count);
    }, [courseData]);

    // get total number of lectures
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    useEffect(() => {
        let lectures = 0;
        courseData?.courseContent?.forEach((section) => {
            lectures += section.subSection.length || 0;
        });

        setTotalNoOfLectures(lectures);
    }, [courseData]);


    // get total time duration of course
    const [totalDuration, setTotalDuration] = useState(0);
    useEffect(() => {
        const totalSeconds = courseData?.courseContent?.reduce((total, sectionObj) => {
            return total + sectionObj.subSection.reduce((subTotal, subSection) => {
                return subTotal + subSection.timeDuration;
            }, 0);
        }, 0);
        
        const totalTime = convertSecondsToDuration(Number.parseInt(totalSeconds));
        setTotalDuration(totalTime);
    }, [courseData]);

    // show and hide course section details
    const [isActive, setIsActive] = useState(Array(0));
    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id)
            ? isActive.concat(id)
            : isActive.filter((e) => e !== id)
        )
    }

    const handleBuyCourse = async () => {
        if(token) {
            const buyingFromCatalogPage = true;
            await buyCourse([courseId], token, user, navigate, dispatch, buyingFromCatalogPage);
            return;
        }

        // user is not logged in
        setConfirmationModal({
            text1: "You are not logged in",
            text2: "Please login to purchase the course",
            btn1Text:"Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate('/login'),
            btn2Handler: () => setConfirmationModal(null),
        });
    }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent, 
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = courseData ? courseData : [];

  if(loading || paymentLoading || !courseData) {
    return (
        <div className='h-screen w-screen relative'>
            <div className='loader absolute top-1/2 left-1/2'></div>
        </div>
    )
  }

  return (
    <div className='text-richblack-5'>
        <div className='relative'>
            <p>{courseName}</p>
            <p>{courseDescription}</p>
            
            <div className='flex gap-x-2'>
                <span>{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24}/>
                <span>{`${ratingAndReviews.length} reviews`}</span>
                <span>{`${studentsEnrolled.length} students enrolled`}</span>
            </div>
        
            <div>
                <p>Created by {`${instructor.firstName} ${instructor.lastName}`}</p>
            </div>

            <div className='flex gap-x-3'>
                <p>Created At {formatDate(createdAt)}</p>
                <p>{" "} English</p>
            </div>

            <div>
                <CourseDetailsCard
                    course={courseData}
                    setConfirmationModal={setConfirmationModal}
                    handleBuyCourse={handleBuyCourse}
                />
            </div>

            <div>
                <p>What you'll learn</p>
                <p>{whatYouWillLearn}</p>
            </div>
        </div>

        <div>
            <p>Course Content:</p>

            <div className='flex gap-x-3 justify-between'>
                <div className='flex gap-x-3'>
                    <span>
                        {courseContent?.length} section(s)
                    </span>    

                    <span>
                        {totalNoOfLectures} lectures
                    </span>
                    
                    <span>
                        {totalDuration} total length
                    </span>
                </div>

                <div>
                    <button 
                        onClick={() => setIsActive([])}
                    >
                        Collapse all sections
                    </button>
                </div>
            </div>

            <Accordion className='mt-10 mb-10'>
                {
                    courseData.courseContent.map((sectionObj) => (
                        <AccordionItem 
                            key={sectionObj._id}
                            header={
                                <div className='flex justify-between w-[500px] border-[1px] border-richblack-300'>
                                    <p>{sectionObj.sectionName}</p>
                                    <p>{sectionObj.subSection.length} lecture(s)</p>
                                </div>
                            }
                        >
                            <div>
                                {
                                    sectionObj.subSection.map((subSec) => (
                                        <p>{subSec.title}</p>
                                    ))
                                }
                            </div>
                        </AccordionItem>
                    ))
                }
            </Accordion>
        </div>
    {
        confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
    }
    </div>
  )
}
