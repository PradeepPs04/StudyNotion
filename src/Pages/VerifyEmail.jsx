import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
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

        setOtp('');
    }

  return (
    <div className='flex justify-center items-center text-richblack-200'>
        {
            loading ? (<div>Loading...</div>)
            : (
                <div>
                    <h1>Verofu Email</h1>
                    <p>A verification code has been sent to you. Enter the code below</p>

                    <form onSubmit={formSubmitHandler}>
                        <OTPInput 
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} className='text-richblack-900'/>}
                        />
                        <button type='submit'>
                            Verify Email
                        </button>
                    </form>

                    <div>
                        <Link to='/login'>
                            <p>Back to login</p>
                        </Link>    

                        <button onClick={() => {
                            dispatch(sendOtp(signupData.email, navigate));
                            setOtp('');    
                        }}>
                            Resend it
                        </button>
                    </div>

                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail