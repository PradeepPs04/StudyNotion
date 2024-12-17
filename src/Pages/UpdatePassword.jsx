import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

import '../components/core/loader.css'
import { resetPassword } from '../services/operations/authAPI';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function UpdatePassword() {
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState( {
        password: '',
        confirmPassword: ''
    });

    const {password, confirmPassword} = formData;

    const [showNewPassword, setShowNewPassoword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleFormChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value,
            }
        ))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            toast.error('Password are not matching');
            return;
        }
        const token = location.pathname.split('/').at(-1);
        console.log('token is: ', token);
        dispatch(resetPassword(password, confirmPassword, token, navigate));
    }

  return (
    <div className='text-richblack-200 flex justify-center items-center'>
        {
            loading ? (<div  className='spinner'></div>)
            : (
                <div>
                    <h1>Choose new password</h1>
                    <p>Almost done. Enter your new password and you are all set</p>

                    <form onSubmit={handleFormSubmit}>
                        <labeL>
                            <p>New password <sup>*</sup></p>
                            <input
                                required
                                type={`${showNewPassword ? 'text' : 'password'}`}
                                name='password'
                                value={password}
                                placeholder='Enter new password'
                                onChange={handleFormChange}
                            />
                            <span onClick= {() => setShowNewPassoword((prev) => !prev)}>
                                {
                                    showNewPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />)
                                    : (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)
                                }
                            </span>
                        </labeL>

                        <label>
                            <p>Confirm New password <sup>*</sup></p>
                            <input
                                required
                                type={`${showConfirmPassword ? 'text' : 'password'}`}
                                name='confirmPassword'
                                value={confirmPassword}
                                placeholder='Confirm new password'
                                onChange={handleFormChange}
                            />
                            <span onClick= {() => setShowConfirmPassword((prev) => !prev)}>
                                {
                                    showConfirmPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />)
                                    : (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)
                                }
                            </span>
                        </label>

                        <button type='submit'>
                            Reset Password
                        </button>
                    </form>

                    <div>
                        <Link to={'/login'}>
                            <p>Back to login</p>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default UpdatePassword