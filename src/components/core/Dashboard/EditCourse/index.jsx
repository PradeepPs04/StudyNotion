import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

import { RenderSteps } from '../AddCourse/RenderSteps';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';

export default function EditCourse () {
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const {course} = useSelector((state) => state.course);

    const {courseId} = useParams();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const populateCourseDetails = async() => {
            setLoading(true);
            const result = await getFullDetailsOfCourse(courseId, token);

            if(result?.courseDetails) {
                dispatch(setEditCourse(true));
                dispatch(setCourse(result.courseDetails));
            }
            setLoading(false);
        }

        populateCourseDetails();
    }, []);

    if(loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

  return (
    <div className='text-richblack-5'>
        <h2>Edit Course</h2>

        <div>
            {
                course ? (<RenderSteps/>) : (<p>Course Not Found</p>)
            }
        </div>
    </div>
  )
}
