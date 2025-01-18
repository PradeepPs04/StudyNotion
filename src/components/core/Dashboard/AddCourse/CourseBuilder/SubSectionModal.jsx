import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { RxCross2 } from "react-icons/rx";

import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { Upload } from '../CourseInformation/Upload';
import { IconBtn } from '../../../../common/IconBtn';

export const SubSectionModal = ({modalData, setModalData, add=false, view=false, edit=false}) => {

  const {
    register,
    handleSubmit,
    setValue,
    formState: errors,
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {token} = useSelector((state) => state.auth);
  const {course} = useSelector((state) => state.course);

  useEffect(() => {
    if(view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDescription", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();

    if(currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDescription !== modalData.description ||
      currentValues.video !== modalData.videoUrl) {
        return true;
      }
    else {
      return false;
    }
  }

  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append('sectionId', modalData.sectionId);
    formData.append('subSectionId', modalData._id);

    if(currentValues.lectureTitle !== modalData.title) {
      formData.append('title', currentValues.lectureTitle);
    }
    if(currentValues.lectureDescription !== modalData.description) {
      formData.append('description', currentValues.lectureDescription);
    }
    if(currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append('videoUrl', currentValues.lectureVideo);
    }

    setLoading(true);

    const result = await updateSubSection(formData, token);

    if(result) {
      dispatch(setCourse(result));
    }

    setModalData(null);
    setLoading(false);
  }

  const onSubmit = async (data) => {
    if(view) {
      return;
    }

    if(edit) {
      if(!isFormUpdated()) {
        toast.error("No changes made to the form");
      }
      else {
        handleEditSubSection();
      }
      return;
    }

    const formData = new FormData();
    formData.append('sectionId', modalData);
    formData.append('title', data.lectureTitle);
    formData.append('description', data.lectureDescription);
    formData.append('video', data.lectureVideo);

    setLoading(true);
    
    const result = await createSubSection(formData, token);

    if(result) {
      dispatch((setCourse(result)));
    }

    setModalData(null);
    setLoading(false);
  }

  

  return (
    <div>

      <div>
        <div>
            <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
            <button
            onClick={() => (!loading ? setModalData(null) : {})}>
              <RxCross2/>
            </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Upload
            name='lectureVideo'
            label='Lecture Video'
            register={register}
            errors={errors}
            setValue={setValue}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl:null}
          />

          {/* Lecture title */}
          <div>
            <label htmlFor='lectureTitle' className='label-style'>Lecture Title<sup className='text-pink-300'>*</sup></label>
            <input
              id='lectureTitle'
              placeholder='Enter lecture title'
              {...register('lectureTitle', {required:true})}
              className='w-full form-style'
            />
            {
              errors.lectureTitle && (
                <span>Lecture title is required</span>
              )
            }
          </div>

          {/* Lecture description */}
          <div>
            <label htmlFor='lectureDescription' className='label-style'>Lecture Description<sup className='text-pink-300'>*</sup></label>
              <textarea
                id='lectureDescription'
                placeholder='Enter lecture description'
                {...register('lectureDescription', {required:true})}
                className='w-full form-style min-h-[130px]'
              />
              {
                errors.lectureDescription && (
                  <span>Lecture description is required</span>
                )
              }
          </div>

          {
            !view && (
              <div>
                <IconBtn
                  text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                />
              </div>
            )
          }

        </form>
      </div>

    </div>
  )
}
