import React from 'react'
import { Header } from './quiz components/main content/header/Header.jsx'
import './App.css'
import { SidebarHeader } from './quiz components/side bar/SidebarHeader.jsx'
import { Sidebar } from './quiz components/side bar/Sidebar.jsx'
import{ QuizContext } from './quiz components/Context/TriviaContext.jsx'

export const Layout = ({content,hasFixedHeight}) => {
    const{isSidebarVisible} = React.useContext(QuizContext)
    return (
        <div  className={`app ${hasFixedHeight ? 'fixed_height' : ''}`}>
            <div className={`sidebar-container ${isSidebarVisible ? 'visible' : ''}`}>
              <SidebarHeader />
              <Sidebar/>
            
            </div>
            <hr className='sidebar-spacer'/>
            <div className={`maincontent-container `}>
                <Header />
                {content}
            </div>
            
    
        </div>
    )    
}
