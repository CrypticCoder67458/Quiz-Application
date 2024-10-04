import {ContentBox} from '../ContentBox.jsx'
import { GiBookPile } from "react-icons/gi";
import { MdScience } from "react-icons/md";
import { MdSportsHandball } from "react-icons/md";
import { HiOutlineGlobeAsiaAustralia } from "react-icons/hi2";
import { GiRomanToga } from "react-icons/gi";
import { FaComputer } from "react-icons/fa6";
import '../../content/main_content.css'
import {QuizContext } from '../../../Context/TriviaContext.jsx';
import {React, useContext} from 'react';

export const Categories = () => {
    const {setCurrentCategory,currentCategory,currentPage} = useContext(QuizContext)
    const categories = [
        {element: <GiBookPile size={46} />,
        title: 'General knowledge'},
        {element: <MdScience size={50}/>,
        title: 'Science & Nature'},
        {element: <MdSportsHandball size={50}/>,
        title: 'Sports'},
        {element: <HiOutlineGlobeAsiaAustralia size={50}/>,
        title: 'Geography'},
        {element: <GiRomanToga size={60}/>,
        title: 'History'},
        {element: <FaComputer size={50}/>,
        title: 'Computer Science'},
        
    ]
    function handleClick(title){
        setCurrentCategory(title);
        console.log(title);
    }
    return (
        <div className='categories'>
          {categories.map((category) => (
            <div onClick={()=>handleClick(category.title)} className='box'>
              <ContentBox 
                element={category.element} 
                title={category.title} 
              />
            </div>
          ))}
        </div>
      )
}

