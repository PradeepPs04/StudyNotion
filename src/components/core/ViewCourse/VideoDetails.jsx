import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';

import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';

import { IconBtn } from '../../common/IconBtn';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';

import { CiPlay1 } from "react-icons/ci";

export const VideoDetails = () => {

    const {courseId, sectionId, subSectionId} = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playerRef = useRef();
    const location = useLocation();

    const {token} = useSelector((state) => state.auth);
    const {courseSectionData, courseEntireData, completedLectures} = useSelector((state) => state.viewCourse);

    const [videoData, setVideoData] = useState([]);
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        const setVideoSpecificDetails = () => {
            if(!courseSectionData.length) return;

            if(!courseId && !sectionId && !subSectionId) {
                navigate("/dashboard/enrolled-courses");
            }
            else {
                // get section data
                const fileterdData = courseSectionData?.filter((section) => section._id === sectionId);

                // get video data
                const filteredVideoData = fileterdData?.[0]?.subSection.filter((subSection) => subSection._id === subSectionId);

                setVideoData(filteredVideoData[0]);
                setVideoEnded(false);
            }
        }   

        setVideoSpecificDetails();
    }, [courseSectionData, courseEntireData, location.pathname]);

    // check if the current video is the first video of section
    const isFirstVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId);
        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((subSection) => subSection._id === subSectionId);

        if(currentSectionIndex === 0 && currentSubSectionIndex === 0) {
            return true;
        } else {
            return false;
        }
    }

    // check if the current video is the last video of section
    const isLastVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId);

        const noOfSubSections = courseSectionData?.[currentSectionIndex]?.subSection.length;

        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((subSection) => subSection._id === subSectionId);

        if(currentSectionIndex === courseSectionData.length - 1 && 
            currentSubSectionIndex === noOfSubSections - 1) {
                return true;
        } else {
                return false;
        }
    }

    const goToPreviousVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId);

        const noOfSubSections = courseSectionData?.[currentSectionIndex]?.subSection.length;

        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((subSection) => subSection._id === subSectionId);

        // go to previous video of same section
        if(currentSubSectionIndex !== 0) {
            const previousSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex - 1]?._id;

             // navigate to this video
             navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${previousSubSectionId}`);
        } 
        // go to first video of previous section
        else {
            const previousSectionId = courseSectionData?.[currentSectionIndex - 1]._id;
            const previousSubSectionLength = courseSectionData?.[currentSectionIndex - 1]?.subSection.length;
            const previousSubSectionId = courseSectionData?.[currentSectionIndex - 1]?.subSection[previousSubSectionLength - 1]?._id;

            // navigate to this video
            navigate(`/view-course/${courseId}/section/${previousSectionId}/sub-section/${previousSubSectionId}`);
        }
    }

    const goToNextVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId);

        const noOfSubSections = courseSectionData?.[currentSectionIndex]?.subSection.length;

        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((subSection) => subSection._id === subSectionId);

        // go to next video of same section
        if(currentSubSectionIndex !== noOfSubSections - 1) {
            const nextSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex + 1]?._id;

            // navigate to this video
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
        } 
        // go to first video of next section
        else {
            const nextSectionId = courseSectionData?.[currentSectionIndex + 1]._id;
            const nextSubSectionId = courseSectionData?.[currentSectionIndex + 1]?.subSection?.[0]?._id;

            // navigate to this video
            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
        }
    }

    const hadleLectureCompletion = async () => {
        setLoading(true);

        console.log(subSectionId," will be completed");

        const result = await markLectureAsComplete({courseId: courseId, subSectionId: subSectionId}, token);

        // update state in slice
        if(result) {
            dispatch(updateCompletedLectures(subSectionId));
        }

        setLoading(false);
    }

  return (
    <div>
        {
            !videoData ? (
                <div>
                    No Data Found
                </div>
            ) : (
                <Player
                    ref={playerRef}
                    aspectRatio='16:9'
                    playsInline
                    onEnded={() => setVideoEnded(true)}
                    src={videoData?.videoUrl}
                >
                    {/* Play icon */}
                    <CiPlay1 />

                    {
                        videoEnded && (
                            <div>
                                {
                                    // complete button
                                    !completedLectures.includes(subSectionId) && (
                                        <IconBtn
                                            disabled={loading}
                                            onClick={hadleLectureCompletion}
                                            text={!loading ? "Mark as Completed" : "Loading..."}
                                        />
                                    )
                                }
                                
                                {/* re-watch button */}
                                <IconBtn
                                    disabled={loading}
                                    text="Rewatch"
                                    onClick={() => {
                                        playerRef?.current?.seek(0);
                                        setVideoEnded(false);
                                    }}
                                />

                                {/* previous & next buttons */}
                                <div className='flex gap-2 mt-4'>
                                    {/* previous */}
                                    {
                                        !isFirstVideo() && (
                                            <button
                                                disabled={loading}
                                                onClick={goToPreviousVideo}
                                                className='blackButton'
                                            >
                                                Prev  
                                            </button>
                                        )
                                    }
                                    {/* next */}
                                    {
                                        !isLastVideo() && (
                                            <button
                                                disabled={loading}
                                                onClick={goToNextVideo}
                                                className='blackButton'
                                            >
                                                Next
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                </Player>
            )
        }

        <div>
            <h1>
                {videoData?.title}
            </h1>
            <p>
                {videoData?.description}
            </p>
        </div>
    </div>
  )
}
