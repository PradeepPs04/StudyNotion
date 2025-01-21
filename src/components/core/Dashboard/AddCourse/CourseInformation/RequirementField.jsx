import React, { useEffect, useState } from 'react'

import { IoMdCloseCircle } from "react-icons/io";
import { useSelector } from 'react-redux';

export const RequirementField = ({label, name, register, errors, setValue, getValues}) => {

    const {editCourse, course} = useSelector((state) => state.course);

    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    useEffect(() => {
        if(editCourse) {
            setRequirementList(course?.instructions)
        }
        register(name, {
            required:true, 
            // validate: (value) => value.length > 0
        });
    }, []);

    useEffect(() => {
        setValue(name, requirementList);
    }, [requirementList]);

    const handleAddRequirement = (e) => {
        e.preventDefault();
        
        if(requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement('');
        }
    }

    const handleRemoveRequirement = (index) => {
        let updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    }

  return (
    <div className="flex flex-col space-y-2">
        <label htmlFor={name} className='text-sm text-richblack-5'>
            {label}<sup className='text-pink-300'>*</sup>
        </label>

        <div className="flex flex-col items-start space-y-2">
            <input
                type='text'
                id={name}
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                className='form-style w-full'
            />

            <button 
            onClick={handleAddRequirement} 
            className='font-semibold text-yellow-50 mt-1 hover:text-yellow-200 transition-all duration-200'>
                Add
            </button>

        </div>

        {
            requirementList.length > 0 && (
                <ul className="mt-2 list-inside list-disc">
                    {
                        requirementList.map((value, index) => (
                            <li key={index} className="flex items-center text-richblack-5">
                                <span>{value}</span>
                                <button 
                                type='button'
                                onClick={() => handleRemoveRequirement(index)}
                                className='text-xs flex items-center text-pure-greys-300 hover:text-pure-greys-400 transition-all duration-200'>
                                    <IoMdCloseCircle size={14}/>
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )
        }
        {
            errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {label} is required
                </span>
            )
        }
    </div>


  )
}
