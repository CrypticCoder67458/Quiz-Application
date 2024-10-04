import{ContentBox} from './ContentBox.jsx'
import { GiBookCover } from "react-icons/gi";
import { MdOutlineQuiz } from "react-icons/md";
import './main_content.css'
import { Link } from 'react-router-dom';
import {QuizContext } from '../../Context/TriviaContext.jsx';
import React, { useEffect } from 'react';
export const ContentContainer = () => {
    const {setCurrentPage} = React.useContext(QuizContext);
    const content = [
        {element: <GiBookCover size={35} />,
        title: 'Random Trivia'},
        {element: <MdOutlineQuiz size={35}/>,
        title: 'Quizzes'},
        
    ]
    useEffect(() => {
        setCurrentPage('');
    }, []);
  return (
    <div className='content-container'>
      {content.map((box,index) => (
        <Link to={`/${box.title}`} key={index} onClick={() => setCurrentPage(box.title)}>
          <ContentBox 
            element={box.element} 
            title={box.title} 
          />
        </Link>
        

      ))}
    </div>
  )
}
