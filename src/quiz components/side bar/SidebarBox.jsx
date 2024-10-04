import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'

export const SidebarBox = ({title,element,link}) => {
  return (
    <Link to={link} className='sidebar-box'>
        {element}
        <h3>{title}</h3>
    </Link>
  )
}
