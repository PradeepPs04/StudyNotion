import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';

import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { GiBackwardTime } from "react-icons/gi";

import { sendOtp, signUp } from '../services/operations/authAPI';

function VerifyEmail() {
    const {loading, signupData} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!signupData) {
            navigate('/signup');
        }
    }, [])

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;
        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));

        // setOtp('');
    }

  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center px-8 md:px-0'>
        {
            loading ? (<div>Loading...</div>)
            : (
                <div>
                    <h1 className='text-xl font-semibold text-white'>Verify Email</h1>
                    <p className='text-richblack-200 max-w-sm mt-2'>A verification code has been sent to you. Enter the code below</p>

                    <form onSubmit={formSubmitHandler} className='mt-4'>
                        <OTPInput 
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span >-</span>}
                            renderInput={(props) => <input {...props} />}
                        />
                        <button 
                            type='submit'
                            className='mt-8 text-center w-full text-md py-3 rounded-md font-semibold bg-yellow-50 hover:scale-[98%] transition-all duration-200 text-black'>
                            Verify Email
                        </button>
                    </form>

                    <div className='flex justify-between items-center mt-6'>
                        <Link to='/login'>
                            <div className='flex space-x-1 items-center text-richblack-100 hover:text-richblack-25 transition-all duration-200'>
                                <HiMiniArrowLongLeft size={20}/>
                                <p>Back to login</p>
                            </div>  
                        </Link>

                        <button onClick={() => {
                                dispatch(sendOtp(signupData.email, navigate));
                                setOtp('');    
                            }}>
                            <div className='text-blue-200 hover:text-blue-100 flex gap-1 items-center transition-all duration-200'>
                                <GiBackwardTime/>
                                Resend it
                            </div>
                        </button>
                    </div>    


                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail