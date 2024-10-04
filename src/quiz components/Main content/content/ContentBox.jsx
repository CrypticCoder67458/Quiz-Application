import React from 'react'
import './main_content.css'
export const ContentBox = ({element,title}) => {
  return (
    <div className='content-box'>
      {element}
      <h3>{title}</h3>
    </div>
  )
}
