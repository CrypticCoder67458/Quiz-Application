import React from 'react'
import { GiBookCover } from "react-icons/gi";
import { MdOutlineQuiz } from "react-icons/md";
import{ SidebarBox } from './SidebarBox.jsx';
import { QuizContext } from '../../quiz components/Context/TriviaContext.jsx';
export const Sidebar = () => {
    
    const sidebar_content = [
        {element: <GiBookCover size={30} />,
        title: 'Random Trivia',
        link: '/Random trivia'},
        {element: <MdOutlineQuiz size={30}/>,
        title: 'Quizzes',
        link: '/Quizzes'}, 
    ]
  return (
    <div className='sidebar' >
        {sidebar_content.map((box,index) => (
            <SidebarBox
                key={index} {...box}/>
        ))}
      
    </div>
  )
}
