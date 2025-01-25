import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import ReactStars from 'react-stars';
import { IconBtn } from '../../common/IconBtn';
import { createRating } from '../../../services/operations/courseDetailsAPI';
import { useParams } from 'react-router-dom';

export const CourseReviewModal = ({setReviewModal}) => {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);

    // TODO: instead of using course Entire data for course ID check it using useParams() hook
    // const {courseId} = useParams();
    const {courseEntireData} = useSelector((state) => state.viewCourse);
    
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm();

    const onSubmit = async (data) => {
        await createRating({
            courseId: courseEntireData._id,
            rating: data.courseRating,
            review: data.courseExperience,
        }, token);

        setReviewModal(false);
    }

    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating);
    }

    useEffect(() => {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    }, []);

  return (
    <div>
        <div>
            {/* heading */}
            <div>
                <p>Add Review</p>
                <button
                    onClick={() => setReviewModal(false)}
                >
                    Close
                    {/* TODO: add x icon instead of text */}
                </button>
            </div>

            {/* main container */}
            <div>
                <div>
                    <img
                        src={user?.image}
                        alt={"Profile-image"}
                        className='aspect-square w-[50px] rounded-full object-cover'
                    />
                    <div>
                        <p>{user.firstName} {user.lastName}</p>
                        <p>Posting Publicly</p>
                    </div>
                </div>

                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    className='mt-6 flex flex-col items-center'    
                >
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                    />

                    <div>
                        <label
                            htmlFor='courseExperience'
                        >
                            Add your Experinces
                        </label>
                        <textarea
                            id='courseExperience'
                            placeholder='Add your experience'
                            {...register('courseExperience', {required:true})}
                            className='form-style min-h-[130px] w-full'
                        />
                        {
                            errors.courseExperience && (
                                <span>Please add your experience</span>
                            )
                        }
                    </div> 
                    
                    {/* cancel & save button */}
                    <div>
                        <button
                            onClick={() => setReviewModal(false)}
                            type='button'
                        >
                            Cancel
                        </button>

                        <IconBtn
                            text="Save"
                        />
                    </div>   
                </form>
            </div>
        </div>
    </div>
  )
}
