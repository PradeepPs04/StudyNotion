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
    <div className="text-white">
        <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
            <Swiper 
                className="w-full"
                slidesPerView={4}
                spaceBetween={25}
                loop={true}
                freeMode={true}
                autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                }}
                modules={[Autoplay,FreeMode]}
            >
                {
                    reviews.map((review, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                            
                                {/* reviewer details */}
                                <div className="flex items-center gap-4">
                                    <img
                                        src={review?.user?.image 
                                            ? review?.user?.image 
                                            : `https://api.dicebar.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastname}`}
                                        alt=""
                                        className='h-9 w-9 rounded-full object-cover'
                                    />

                                    <div className="flex flex-col">
                                        {/* student name */}
                                        <p className="font-semibold text-richblack-5">
                                            {review?.user?.firstName} {review?.user?.lastName}
                                        </p>

                                        {/* course name */}
                                        <p className="text-[12px] font-medium text-richblack-500">
                                            {review?.course?.courseName}
                                        </p>

                                    </div>
                                </div>
                                
                                {/* review */}
                                <p className="font-medium text-richblack-25">{
                                    review?.review.split(" ").length > turncateWords 
                                    ? (review?.review.split(' ')
                                        .splice(0,turncateWords)
                                        .join(' ')+"...") 
                                    : (review?.review)
                                }</p>
                                
                                {/* rating & stars */}
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold text-yellow-100">
                                        {review?.rating.toFixed(1)}
                                    </p>

                                    <RatingStars Review_Count={review?.rating}/>    
                                </div>

                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    </div>
  )
}
