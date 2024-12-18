import React from 'react'
import { ContactUsForm } from '../../ContactPage/ContactUsForm'

export const ContactForm = () => {
  return (
    <div className='mx-auto flex flex-col space-y-14'>
        <div className='flex flex-col space-y-2'>
          <h2 className='text-center text-3xl font-semibold text-richblack-5'>Get in Touch</h2>
          <p className='text-center text-sm text-richblack-200'>We'd love to here for you, Please fill out this form.</p>
        </div>
      
        <ContactUsForm/>
    </div>
  )
}
