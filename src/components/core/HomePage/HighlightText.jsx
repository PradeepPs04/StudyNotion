import React from 'react'

function HighlightText({text, color}) {
  return (
    <span className={`font-bold ${color}`}>
        {" "}
        {text}
    </span>
  )
}

export default HighlightText