import React from 'react'
import { useSelector } from 'react-redux'
import { IconBtn } from '../../../common/IconBtn';

export const RenderTotalAmount = () => {
    const {cart, total} = useSelector((state) => state.cart);

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        console.log("Course will be bought: ", courses);
        // TODO: Payment gateway integrate :)
    }

  return (
    <div>
        <p>Total:</p>
        <p>Rs {total}</p>

        <IconBtn
            text="Buy Now"
            onClick={handleBuyCourse}
            customClasses={'w-full justify-center bg-yellow-50 text-richblack-900 font-bold'}
        />
    </div>
  )
}
