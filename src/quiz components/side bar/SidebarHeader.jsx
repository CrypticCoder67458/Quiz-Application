import React from 'react'

import { Link } from 'react-router-dom';
export const SidebarHeader = () => {
  return (
    <header className='sidebar-header'>
        <Link to={'/'} className='title-container'>
          <h2 className='title'>Menu</h2>
        </Link>
        
    </header>
  )
}
