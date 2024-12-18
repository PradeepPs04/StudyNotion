import React from 'react'
import HighlightText from '../HomePage/HighlightText'

function Quote() {
  return (
    <div>
        We are passionate about revolutionizing the way we learn. Our innovative platform 
        <HighlightText text={'combines technology'}/> 
        <span className='text-brown-100'>{" "}expertise</span>
        , and community to create an
        <span className='text-brown-100'>{" "}unparalled educational experience.</span>
    </div>
  )
}

export default Quote