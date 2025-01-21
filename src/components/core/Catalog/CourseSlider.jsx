import React from 'react'
import Swiper from 'swiper';
import { SwiperSlide } from 'swiper/react';
import {Autoplay, FreeMode, Pagination} from 'swiper'

import "swiper/css";
import "swiper/css/free-mode"
import "swiper/css/pagination"

import { CourseCard } from './CourseCard';

export const CourseSlider = ({courses}) => {
  return (
    <>
        {
            courses?.length ? (
                <Swiper
                    className="mySwiper"
                    slidesPerView={1}
                    loop={true}
                    spaceBetween={30}
                    pagination={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Pagination, Autoplay]}
                >
                    {
                        courses.map((course, index) => (
                            <SwiperSlide key={index}>
                                <CourseCard course={course} Height={'h-[250px]'}/>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            ) : (
                <p>No Course Found</p>
            )
        }
    </>
  )
}
