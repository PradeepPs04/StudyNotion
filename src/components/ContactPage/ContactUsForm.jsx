import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from "react-hot-toast"

import { apiConnector } from '../../services/apiConnector';
import { contactusEndpoint } from '../../services/apis';

export const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register, 
    handleSubmit, 
    reset,
    formState: {errors, isSubmitSuccessful},
  } = useForm();  

  const contactFormSubmitHandler = async (data) => {
    console.log("logging data: ", data);
    const toastId = toast.loading("Loading...")

    try {
      setLoading(true);
      const response = await apiConnector('POST', contactusEndpoint.CONTACT_US_API, data);
      console.log('logging response: ', response);
      setLoading(false);
      toast.success("Message Sent Successfully")
    } catch(err) {
        console.log(err);
        toast.error(err.response.data.message);
        setLoading(false);
    }

    toast.dismiss(toastId)
  }

  useEffect(() => {
      if(isSubmitSuccessful) {
        reset({
          email: '',
          firstName: '',
          lastName: '',
          message: '',
          phoneNo: '',
        });
      }
  }, [reset, isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(contactFormSubmitHandler)}>
      
      <div className='flex flex-col gap-6 text-richblack-50'>
          {/* first name & last name */}
          <div className='flex gap-5'>
              {/* first name */}
              <div>
                  <label className='flex flex-col'>
                      <p>First Name</p>
                      <input 
                        type='text'
                        name='firstName'
                        id='firstName'
                        placeholder='Enter first name'
                        className='bg-richblack-800'
                        {...register('firstName', {required:true})}
                      />
                      {
                        errors.firstName && (
                          <span>
                            Please enter your name
                          </span>
                        )
                      }
                  </label>
              </div>
              {/* last name */}
              <div>
                  <label className='flex flex-col'>
                      <p>Last Name</p>
                      <input 
                        type='text'
                        name='lastName'
                        id='lastName'
                        placeholder='Enter last name'
                        className='bg-richblack-800'
                        {...register('lastName')}
                      />
                  </label>
              </div>
          </div>

          {/* email */}
          <div>
            <label>
              <p>Email Address</p>
              <input
                className='w-full bg-richblack-800'
                type='email'
                name='email'
                id='email'
                placeholder='Enter email address'
                
                {...register('email', {required:true})}
              />
                {
                    errors.email && (
                      <span>Please enter email address</span>
                    )
                }
            </label>
          </div>

          {/* message-box */}
          <div>
              <label>
                  <p>Message</p>
                  <textarea
                    name='message'
                    id='message'
                    rows={4}
                    placeholder='Enter message here'
                    className='w-full bg-richblack-800'
                    {...register('message', {required:true})}
                  />
                  {
                      errors.message && (
                        <span>Please enter your message</span>
                      )
                  }
              </label>
          </div>
            
          {/* Submit-button */}
          <button 
            type='submit'
            className='text-center w-full text-md py-2 rounded-md font-semibold bg-yellow-50 hover:scale-[98%] transition-all duration-200 text-richblack-900'>
              Send Message
          </button>
      </div>
    </form>
  )
}
