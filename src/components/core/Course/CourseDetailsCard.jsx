import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';

import { IconBtn } from '../../common/IconBtn';
import {ACCOUNT_TYPE} from '../../../utils/constants';

import { MdKeyboardArrowRight } from "react-icons/md";
import { FaShareSquare } from "react-icons/fa";
import { addToCart } from '../../../slices/cartSlice';


export const CourseDetailsCard = ({course, setConfirmationModal, handleBuyCourse}) => {


    const {
        thumbnail: thumbnailImage,
        price: currentPrice,
    } = course;

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor, you can't buy a course");
            return;
        }

        if(token) {
            dispatch(addToCart(course));
            return;
        }

        setConfirmationModal({
            text1: "You are not logged in",
            text2: "Please login to purchase the course",
            btn1Text:"Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate('/login'),
            btn2Handler: () => setConfirmationModal(null),
        });
    }

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Linked copied to clipboard");
    }

  return (
    <div>
        <img
            src={thumbnailImage}
            alt='thumbnail image'
            className='mzx-h-[300px] min-h-[180px] w-[400px] rounded-xl'
        />

        <div>Rs. {currentPrice}</div>
        
        {/* buttons */}
        <div>
            <IconBtn
                text={user && course.studentsEnrolled.includes(user?._id) 
                    ? "Go to Course"
                    : "Buy Now"}
                onClick={user && course.studentsEnrolled.includes(user?._id)
                    ? () => navigate('/dashboard/enrolled-courses')
                    : handleBuyCourse}
            />
            
            {
                !course?.studentsEnrolled.includes(user?._id) && (
                    <button
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                )
            }
        </div>
        
        <div>
            <p>
                30-Day Money-Back Gurantee
            </p>
            <p>
                This Course Includes:
            </p>

            <div className='flex flex-col gap-y-3'>
                {
                    course?.instructions?.map((item, index) => (
                        <p key={index} className='flex gap-x-2 items-center'>
                            <MdKeyboardArrowRight size={18}/>
                            <span>{item}</span>
                        </p>
                    ))
                }
            </div>
        </div>

        <div>
            <button
                onClick={handleShare}
                className='mx-auto flex items-center gap-2 p-6 text-yellow-50'
            >
                <FaShareSquare />
                Share
            </button>
        </div>

    </div>
  )
}
