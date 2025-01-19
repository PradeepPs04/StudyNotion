import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";

import {setCourse} from '../../../../../slices/courseSlice';

import { SubSectionModal } from './SubSectionModal';
import {ConfirmationModal} from '../../../../common/ConfirmationModal';

import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';


export const NestedView = ({handleChangeEditSectionName}) => {
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const [addSubsection, setAddSubsection] = useState(null);
    const [viewSubsection, setViewSubsection] = useState(null);
    const [editSubsection, setEditSubsection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection(
            {sectionId, courseId: course._id,},
            token,                               
        );
        
        if(result) {
            dispatch(setCourse(result));
        }

        setConfirmationModal(null);
    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection(
            {subSectionId, sectionId},
            token
        );

        if(result) {
            const updatedCourseContent = course.courseContent.map((section) => (
                section._id === sectionId ? result : section
            ))
            const updatedCourse = {...course, courseContent:updatedCourseContent};
            dispatch(setCourse(updatedCourse));
        }

        setConfirmationModal(null);
    }

  return (
    <div>
        <div className='rounded-md bg-richblack-700 p-6 px-8 flex flex-col gap-6'>
            {
                course?.courseContent?.map((section) => (
                    <details key={section._id} open>
                        <summary className='flex items-center justify-between gap-x-3 border-b-2'>
                            <div className='flex items-center gap-x-2'>
                                <RxDropdownMenu />
                                <p>{section.sectionName}</p>
                            </div>

                            <div className='flex items-center gap-x-2'>
                                <button
                                onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}>
                                    <MdEdit/>
                                </button>

                                <button
                                onClick={() => setConfirmationModal({
                                    text1: 'Delete this section',
                                    text2: 'All the lectures in this section will be deleted',
                                    btn1Text: 'Delete',
                                    btn2Text: 'Cancel',
                                    btn1Handler: () => handleDeleteSection(section._id),
                                    btn2Handler: () => setConfirmationModal(null),
                                })}>
                                    <RiDeleteBin6Line />
                                </button>

                                <span>|</span>
                                <IoMdArrowDropdown className={`text-xl text-richblack-300`}/>
                            </div>

                        </summary>
                        
                        <div>
                            {
                                section.subSection.map((data) => (
                                    <div 
                                    key={data?._id}
                                    onClick={() => setViewSubsection(data)}
                                    className='flex items-center justify-between gap-x-3 border-b-2'
                                    >
                                        <div>
                                            <RxDropdownMenu />
                                            <p>{data.title}</p>
                                        </div>
                                        
                                        <div
                                          onClick={(e) => e.stopPropagation()} 
                                          className='flex items-center gap-x-3'>
                                            <button
                                            onClick={() => setEditSubsection({...data, sectionId:section._id})}>
                                                <MdEdit/>
                                            </button>
                                            <button
                                            onClick={() => setConfirmationModal({
                                            text1: 'Delete this sub section',
                                            text2: 'Selected lecture will be deleted',
                                            btn1Text: 'Delete',
                                            btn2Text: 'Cancel',
                                            btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                            btn2Handler: () => setConfirmationModal(null),
                                            })}>
                                                <RiDeleteBin6Line />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }

                            <button
                            onClick={() => setAddSubsection(section._id)}
                            className='flex items-center space-x-2'>
                                <AiOutlinePlus />
                                <p>Add Lecture</p>
                            </button>

                        </div>

                    </details>
                ))
            }
        </div>

        {
            addSubsection ? (
                <SubSectionModal 
                    modalData={addSubsection} 
                    setModalData={setAddSubsection}
                    add={true}
                />) : 
            viewSubsection ? (
                <SubSectionModal
                    modalData={viewSubsection}
                    setModalData={setViewSubsection}
                    view={true}
                />) : 
            editSubsection ? (
                <SubSectionModal
                    modalData={editSubsection}
                    setModalData={setEditSubsection}
                    edit={true}
                />) : 
            (<div></div>)
        }

        {
            confirmationModal && (<ConfirmationModal modalData={confirmationModal}/>)
        }
    </div>
  )
}
