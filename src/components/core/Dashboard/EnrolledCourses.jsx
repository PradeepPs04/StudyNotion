import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import ProgressBar from '@ramonak/react-progress-bar';

import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';

function EnrolledCourses() {
    const {token} = useSelector((state) => state.auth);

    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async () => {
        try {
           const response = await getUserEnrolledCourses(token);
           setEnrolledCourses(response);
        } catch(err) {
            console.log('Error while fetching enrolled courses');
            console.log(err);
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    }, []);

  return (
    <div className='text-richblack-25'>
        <div>Enrolled Courses</div>
        {
            !enrolledCourses ? (
                <div>Loading</div>
            )
            : !enrolledCourses.length ? (
                <p>You have not enrolled in any course yet</p>
            )
            : (
                <div>
                    <div>
                        <p>Course Name</p>
                        <p>Duration</p>
                        <p>Progress</p>
                    </div>

                    {
                        enrolledCourses.map((course, index) => (
                            <div key={index}>
                                <div>
                                    <img src={course?.thumbnail}/>
                                    <div>
                                        <p>{course?.courseName}</p>
                                        <p>{course?.courseDescription}</p>
                                    </div>
                                </div>

                                <div>
                                    {course.totalDuration}
                                </div>

                                <div>
                                    <p>Progress: {course.progressPercentage || 0}</p>
                                    <ProgressBar
                                        completed={course.progressPercentage || 0}
                                        height='8px'
                                        isLabelVisible={false}
                                    />
                                </div>

                            </div>
                        ))
                    }
                </div>
            )
        }
    </div>
  )
}

export default EnrolledCourses