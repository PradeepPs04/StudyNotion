import React from 'react'
import { IconBtn } from './IconBtn'

export const ConfirmationModal = ({modalData}) => {
  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg'>
        <div>
            <p>{modalData.text1}</p>
            <p>{modalData.text2}</p>
        </div>

        <div className='flex space-x-8 font-semibold'>
            <IconBtn
                onClick={modalData?.btn1Handler}
                text={modalData.btn1Text}
            />
            <button onClick={modalData?.btn2Handler}>
                {modalData?.btn2Text}
            </button>
        </div>
    </div>
  )
}
