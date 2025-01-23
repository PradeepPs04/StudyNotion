import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { useNavigate, useParams } from 'react-router-dom';

import '../components/common/loader.css';

import { IconBtn } from '../components/common/IconBtn'


export const CourseDetails = () => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {paymentLoading} = useSelector((state) => state.course);

    const {courseId} = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourse = async () => {
        if(token) {
            buyCourse([courseId], token, user, navigate, dispatch);
        }
    }

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
    {
        paymentLoading 
        ? (<div className='loader'></div>) 
        : (
            <IconBtn
                text='Buy Now'
                onClick={handleBuyCourse}
            />
        )
    }
    </div>
  )
}
