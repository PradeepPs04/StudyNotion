import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { MdClose } from "react-icons/md"
import toast from "react-hot-toast"

export default function ChipInput({label, name, placeholder, register, errors, setValue, getValues }) {
  const { editCourse, course } = useSelector((state) => state.course)

  const [chips, setChips] = useState([])

  useEffect(() => {
    if (editCourse) {
      setChips(course?.tag)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
  }, [])

  useEffect(() => {
    setValue(name, chips)
  }, [chips])

  // Function to handle user input when chips are added
  const handleKeyDown = (event) => {
    // Check if user presses "Enter" or ","
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault()
      const chipValue = event.target.value.trim()

      if(chips.includes(chipValue)) {
        toast.error("Tag already added");
        return;
      }

      if (chipValue && !chips.includes(chipValue)) {
        const newChips = [...chips, chipValue]
        setChips(newChips)
        event.target.value = ""
      }
    }
  }

  // Function to handle deletion of a chip
  const handleDeleteChip = (index) => {
    // Filter the chips array to remove the chip with the given index
    // const newChips = chips.filter((_, index) => index !== index)

    // second way to do the same
    let newChips = [...chips];
    newChips.splice(index, 1);
    
    setChips(newChips)
  }

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label}<sup className="text-pink-200">*</sup>
      </label>

      <div className="flex w-full flex-wrap gap-y-2">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
          >
            {chip}
            {/* button to delete the chip */}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}

        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="form-style w-full"
        />
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}