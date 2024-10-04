import React from 'react'
import { GiBookmarklet } from "react-icons/gi";
import { GiHamburgerMenu } from "react-icons/gi";
import './header.css'
import { Link } from 'react-router-dom';
import{ QuizContext } from '../../Context/TriviaContext.jsx';
export const Header = () => {
  const{setSidebarVisible}=React.useContext(QuizContext)
  return (
    <header>
        <GiHamburgerMenu size={28} 
        color='white'
         className='hamburger'
         onClick={() => setSidebarVisible(prev=>!prev)} />
        <Link to={'/'} className='title-container'	 >
          <GiBookmarklet size={35} color='white'/>
          <h2 className='title'>Random trivia</h2>
        </Link>
        
    </header>

  )
}
