import React from 'react'

import Swiper from 'swiper';
import { SwiperSlide } from 'swiper/react';
import {Autoplay, Pagination, Navigation} from 'swiper'

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
                    slidesPerView={1}
                    loop={true}
                    spaceBetween={200}
                    pagination={true}
                    modules={[Autoplay,Pagination,Navigation]}
                    className="mySwiper"
                    autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                    }}
                    navigation={true}
                    breakpoints={{
                        1024:{slidesPerView:3,}
                    }}
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
