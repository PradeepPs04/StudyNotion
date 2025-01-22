import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

import { COURSE_STATUS } from '../../../../utils/constants';

import { ConfirmationModal } from '../../../common/ConfirmationModal';

import { FaClock } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';

export const CoursesTable = ({courses, setCourses}) => {
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleCourseDelete = async (courseId) => {
        setLoading(true);

        await deleteCourse({courseId}, token);
        const result = await fetchInstructorCourses(token);

        if(result) {
            setCourses(result);
        }

        setConfirmationModal(null);
        setLoading(false);
    }

  return (
    <div className='text-richblack-5'>
    {
        courses.length === 0 ? (
            <p>No Courses Found</p>
        )
        : (
            <Table>
            <Thead>
                <Tr className='flex gap-x-10 border-richblack-800 p-8'>
                    <Th>Courses</Th>
                    <Th>Duration</Th>
                    <Th>Price</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>

                <Tbody>
                {
                    
                    courses.map((course) => (
                        <Tr 
                            key={course._id}
                            className='flex gap-x-10 border-richblack-800 p-8'
                            >
                            {/* Thumbnail, name & description */}
                            <Td className='flex gap-x-4'>
                                <img 
                                    src={course?.thumbnail} 
                                    alt='Thumbnail image'
                                    className='h-[150px] w-[220px] rounded-lg object-cover'
                                />

                                <div className='flex flex-col'>
                                    <p>{course?.courseName}</p>
                                    <p>{course?.courseDescription}</p>
                                    <p>Created: </p>
                                    {
                                        course.status === COURSE_STATUS.DRAFT ? (
                                            <p className='text-pink-300 flex items-center'>
                                                DRAFTED <span className='ml-1'><FaClock/></span>
                                            </p>
                                        )
                                        : (
                                            <p className='text-yellow-50 flex items-center'>
                                                PUBLISHED <span className='ml-1'><FaCheckCircle/></span>
                                            </p>
                                        )
                                    }
                                </div>
                            </Td>
                            
                            {/* duration */}
                            <Td>
                                2hr 30mins
                            </Td>
                            
                            {/* Price */}
                            <Td>
                                {course?.price}
                            </Td>
                            
                            {/* Buttons */}
                            <Td>
                                {/* Edit button */}
                                <button
                                    disabled={loading}
                                    className='mr-[19px]'
                                    onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                                    >
                                        <FiEdit2 />
                                </button>
                                
                                {/* Delete button */}
                                <button
                                    disabled={loading}
                                    onClick={() => {
                                        setConfirmationModal({
                                            text1: 'Do you want to delete this course?',
                                            text2: 'All the data related to this course will be deleted',
                                            btn1Text: 'Delete',
                                            btn2Text: 'Cancel',
                                            btn1Handler: !loading ? () => handleCourseDelete(course._id) : () => {},
                                            btn2Handler: !loading ? () => setConfirmationModal(null) : ()=> {},
                                        })
                                    }}
                                    >
                                        <RiDeleteBin6Line />
                                </button>
                            </Td>
                        </Tr>
                    ))
                }
                </Tbody>
            </Table>
        )  
    } 

        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}
