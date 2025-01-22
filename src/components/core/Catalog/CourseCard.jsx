import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import RatingStars from '../../common/RatingStars'
import GetAverageRating from '../../../utils/avgRating'

export const CourseCard = ({course, Height}) => {

    const [averageReviewCount, setAverageReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAverageRating(course?.ratingAndReviews);
        setAverageReviewCount(count);
    }, [course]);

  return (
    <div>
        <Link to={`/courses/${course._id}`}>
            <div>
                <img 
                    src={course?.thumbnail}
                    alt={course?.courseName}    
                    className={`${Height} w-full rounded-xl object-cover`}
                />
            </div>

            <div>
                <p>{course?.courseName}</p>
                <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                
                <div className='flex gap-x-3'>
                    <span>{averageReviewCount || 0}</span>
                    <RatingStars Review_Count={averageReviewCount}/>
                    <span>{course?.ratingAndReviews?.length} Ratings</span>
                </div>

                <p>₹ {course?.price}</p>
            </div>
        </Link>
    </div>
  )
}
