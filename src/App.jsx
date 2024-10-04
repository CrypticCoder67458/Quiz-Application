import React from 'react'
import { Header } from './quiz components/main content/header/Header.jsx'
import './App.css'
import { ContentContainer } from './quiz components/Main content/content/ContentContainer.jsx'
import { SidebarHeader } from './quiz components/side bar/SidebarHeader.jsx'
import { Sidebar } from './quiz components/side bar/Sidebar.jsx'
import{ QuizContext } from './quiz components/Context/TriviaContext.jsx'
function App() {
  const{isSidebarVisible} = React.useContext(QuizContext)
  return (
    <div  className={`app fixed_height`}>
        <div className={`sidebar-container ${isSidebarVisible ? 'visible' : ''}`}>
          <SidebarHeader />
          <Sidebar/>
        
        </div>
        <hr className='sidebar-spacer'/>
        <div className={`maincontent-container `}>
            <Header />
            <ContentContainer/>
        </div>
        

    </div>
    
  )
}

export default App
