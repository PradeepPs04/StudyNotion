import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars';

import { FaRegStar, FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { removeFromCart } from '../../../../slices/cartSlice';

export const RenderCartCourses = () => {
    const {cart} = useSelector((state) => state.cart);
    const [rating, setRating] = useState(0);
    const dispatch = useDispatch();

    const getAverageRating = async () => {
        // call average rating api
        // set rating with response
    }

    useEffect(() => {
        getAverageRating();
    }, []);

  return (
    <div>
        {
            cart.map((course, index) => (
                <div key={index}>
                    <div>
                        <img src={course.thumbnail}/>
                        <div>
                            <p>{course?.CourseName}</p>
                            <p>{course?.category?.name}</p>
                            <div>
                                <span>{rating}</span>
                                <ReactStars
                                    count={5}
                                    size={20}
                                    edit={false}
                                    activeColor="#ffd700"
                                    emptyIcon={<FaRegStar/>}
                                    fullIcon={<FaStar/>}
                                    value={rating}
                                />
                                <span>{course?.ratingAndReviews?.length} Ratings</span>

                            </div>
                        </div>
                    </div>

                    <div onClick={() => dispatch(removeFromCart(course._id))}>
                        <button>
                            <MdDelete />
                            <span>Remove</span>
                        </button>
                        <p>{course?.price}</p>
                    </div>
                    
                </div>
            ))
        }
    </div>
  )
}
