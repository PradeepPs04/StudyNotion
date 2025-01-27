import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import "../../../common/loader.css"

import { getInstructorData } from '../../../../services/operations/profileAPI';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { InstructorChart } from './InstructorChart';
import { Link } from 'react-router-dom';
import { Card } from './Card';

export const Instructor = () => {

  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [coursesData, setCoursesData] = useState([]);
  const [totalStudentsEnrolled, setTotalStudentsEnrolled] = useState(0);
  const [totalAmountGenerated, setTotalAmountGenerated] = useState(0);

  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);

  useEffect(() => {
    const getCourseDataWithStats = async () => {
      setLoading(true);

      // API call
      const instructorDataApiResult = await getInstructorData(token);
      const instructorCoursesData = await fetchInstructorCourses(token);

      // set states
      if(instructorDataApiResult) {
        setInstructorData(instructorDataApiResult.courses);
        setTotalStudentsEnrolled(instructorDataApiResult.totalStudentsEnrolled);
        setTotalAmountGenerated(instructorDataApiResult.totalAmountGenerated);
      }

      if(instructorCoursesData?.length) {
        setCoursesData(instructorCoursesData);
      }

      setLoading(false);
    }

    getCourseDataWithStats();
  }, []);

  if(loading) {
    return (
      <div className='relativew-[80vw] h-[80vh]'>
        <div className='loader absolute top-1/2 left-1/2'></div>
      </div>
    )
  }

  return (
    <div className='text-richblack-50'>
      <div>
        <h1>Hi {user?.firstName} 👋</h1>
        <p>Let's start something new</p>
      </div>

      {
        coursesData?.length > 0 
        ? (
          <div>
            <InstructorChart instructorData={instructorData}/>

            {/* statics */}
            <div>
              <p>Statics</p>
              <div>
                <p>Total Courses</p>
                <p>{coursesData.length}</p>
              </div>

              <div>
                <p>Total Students</p>
                <p>{totalStudentsEnrolled}</p>
              </div>

              <div>
                <p>Total Income</p>
                <p>{totalAmountGenerated}</p>
              </div>

            </div>

            {/* Render 3 courses */}
            <div>
              <div>
                <p>Your courses</p>
                <Link to="/dashboard/my-courses">
                  <p>View all</p>
                </Link>
              </div>

              <div>
                {
                  coursesData.slice(0, 3).map((course) => (
                    <Card key={course._id} course={course}/>
                  ))
                }
              </div>
            </div>
          </div>
        )
        : (
          <div>
            <p>You have not created any courses yet</p>
            <Link to="/dashboard/add-course">
              Create a course
            </Link>
          </div>
        )
      }
    </div>
  )
}
