import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { SubSectionModal } from './SubSectionModal';

export const NestedView = ({handleChangeEditSectionName}) => {
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const [addSubsection, setAddSubsection] = useState(null);
    const [viewSubsection, setViewSubsection] = useState(null);
    const [editSubsection, setEditSubsection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleDeleteSection = (sectionId) => {

    }

    const handleDeleteSubSection = (subSectionId, sectionId) => {

    }

  return (
    <div>
        <div className='rounded-md bg-richblack-700 p-6 px-8'>
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
                                        
                                        <div className='flex items-center gap-x-3'>
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
            addSubsection ? (<SubSectionModal/>) : 
            viewSubsection ? (<SubSectionModal/>) : 
            editSubsection ? <SubSectionModal/> : 
            (<div></div>)
        }
    </div>
  )
}
