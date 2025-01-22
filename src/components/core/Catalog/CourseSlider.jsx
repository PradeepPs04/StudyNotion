import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, Navigation, FreeMode} from 'swiper'

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
                    spaceBetween={30}
                    freeMode={true}
                    autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    }}
                    navigation={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Autoplay,FreeMode,Navigation]}
                    className="mySwiper"
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
