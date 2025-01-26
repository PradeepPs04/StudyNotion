import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IconBtn } from '../../common/IconBtn';
import { useSelector } from 'react-redux';

export const VideoDetailsSidebar = ({setReviewModal}) => {

    const [activeStatus, setActiveStaus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    
    const navigate = useNavigate();
    const location = useLocation();

    const {sectionId, subSectionId} = useParams();

    const {
        courseSectionData,
        courseEntireData,
        completedLectures,
        totalNoOfLectures
    } = useSelector((state) => state.viewCourse);

    useEffect(() => {
        // define and call the function
        // no need to explicitly call using this syntax
        ;(() => {
            if(!courseSectionData.length) return;

            const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId);
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((subSection) => subSection._id === subSectionId);


            const activeSectionId = courseSectionData?.[currentSectionIndex]?._id;
            const activeSubSectionId = courseSectionData[currentSectionIndex].subSection?.[currentSubSectionIndex]?._id;

            // set current section
            setActiveStaus(activeSectionId);
            // set current sub-section
            setVideoBarActive(activeSubSectionId);

            // console.log("Logging courseSection data:....", courseSectionData);
            // console.log("logging course entire data:...", courseEntireData);
            // console.log("logging completed lectures:...", completedLectures);
            // console.log("logging total no of lectures:...", totalNoOfLectures);
        })()
    },[courseSectionData, courseEntireData, location.pathname]);

    const goToVideo = (sectionId, subSectionId) => {
        navigate(`/view-course/${courseEntireData?._id}/section/${sectionId}/sub-section/${subSectionId}`);
        setVideoBarActive(subSectionId);
    }

  return (
    <>
        <div className='text-richblack-25'>
            {/* buttons & headings */}
            <div>
                {/* buttons */}
                <div>
                    <button
                        onClick={() => navigate('/dashboard/enrolled-courses')}
                        className='blackButton'
                    >
                        {/* TODO: use back icon instead */}
                        Back
                    </button>

                    <div>
                        <IconBtn
                            text="Add Review"
                            onClick={() => setReviewModal(true)}
                        />
                    </div>
                </div>

                {/* headings */}
                <div>
                    <p>{courseEntireData?.courseName}</p>
                    <p>{completedLectures?.length} / {totalNoOfLectures}</p>
                </div>
            </div>

            {/* sections and sub-sections */}
            <div>
                {
                    courseSectionData.map((section) => (
                        <div 
                            key={section._id}
                            onClick={(() => setActiveStaus(section._id))}
                            className='cursor-pointer'
                        >

                            {/* section */}
                            <div>
                                <div>
                                    {section?.sectionName}
                                </div>
                                {/* TODO: Add arrow icon here and handle rotate logic */}
                            </div>

                            {/* sub-sections */}
                            <div>
                                {
                                    activeStatus === section._id && (
                                        <div>
                                            {
                                                section.subSection.map((subSection) => (
                                                    <div 
                                                        key={subSection._id}
                                                        className={`flex gap-5 p-5 
                                                        ${videoBarActive === subSection._id 
                                                        ? 'bg-yellow-200 text-richblack-900' 
                                                        : 'bg-richblack-800 text-white'}
                                                        `}
                                                        onClick={() => goToVideo(section._id, subSection._id)}
                                                    >
                                                            <input
                                                                type='checkbox'
                                                                checked={completedLectures.includes(subSection._id)}
                                                                onChange={() => console.log("clicked on check")}
                                                            />
                                                            <span>{subSection.title}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
}
