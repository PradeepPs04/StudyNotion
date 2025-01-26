import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getRatingAndReviews } from '../../services/operations/ratingAndReviews';
import RatingStars from './RatingStars';
import { Autoplay, FreeMode } from 'swiper';

export const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);
    const turncateWords = 15;

    useEffect(() => {
        const fetchAllReviews = async () => {
            const data = await getRatingAndReviews();
            setReviews(data);
        }

        fetchAllReviews();
    }, []);

  return (
    <>
        <div className='h-[190px] max-w-maxContent text-richblack-5'>
            <Swiper className="mySwiper"
                slidesPerView={4}
                spaceBetween={24}
                loop={true}
                freeMode={true}
                autoplay={{
                        delay: 2500,
                }}
                modules={[Autoplay,FreeMode]}
            >
                {
                    reviews.map((review, index) => (
                        <SwiperSlide key={index}>
                            {/* user profile image */}
                            <img
                                src={review?.user?.image 
                                    ? review?.user?.image 
                                    : `https://api.dicebar.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastname}`}
                                className='h-9 w-9 rounded-full object-cover'
                            />
                            
                            {/* course name */}
                            <p>{review?.course?.courseName}</p>

                            {/* student name */}
                            <p>{review?.user?.firstName} {review?.user?.lastName}</p>

                            {/* review */}
                            <p>{
                                review?.review.split.length > turncateWords ? (review?.review.split(' ').splice(0,turncateWords).join(' ')+"...") : (review?.review)
                            }</p>
                            
                            {/* rating & stars */}
                            <div className='flex gap-x-1'>
                                <p>{review?.rating.toFixed(1)}</p>
                                <RatingStars Review_Count={review?.rating}/>    

                            </div>

                            
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    </>
  )
}
