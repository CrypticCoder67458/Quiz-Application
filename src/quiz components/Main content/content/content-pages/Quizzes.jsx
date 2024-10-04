import { useContext, useState, useEffect, useRef } from 'react';
import { QuizContext } from '../../../Context/TriviaContext.jsx';
import { Categories } from './Categories.jsx';
import { Header } from '../../header/Header.jsx';
import { Sidebar } from '../../../side bar/Sidebar.jsx';
import { SidebarHeader } from '../../../side bar/SidebarHeader.jsx';
 

export const Quizzes = () => {
  const { quizData,loading,currentCategory,setCurrentCategory,isSidebarVisible } = useContext(QuizContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [options, setOptions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);
  const checkboxRefs = useRef([]);

  useEffect(() => {
    if (quizData.length > 0 && quizData[currentQuestion]) {
      const newOptions = quizData[currentQuestion].incorrect_answers.map(answer => ({
        answer,
        isCorrect: false
      }));
      newOptions.push({
        answer: quizData[currentQuestion].correct_answer,
        isCorrect: true,
      });
      for (let i = newOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newOptions[i], newOptions[j]] = [newOptions[j], newOptions[i]];
      }
      setOptions(newOptions);
    }
  }, [quizData, currentQuestion]);

  useEffect(() => {
    if (hasStarted && !isSubmitted && currentQuestion < quizData.length-1) {
      setCurrentQuestion((prev) => prev + 1);
    }
    if(currentQuestion >= quizData.length-1 ){
      setShouldReset(true);
      
    }
  }, [isSubmitted, quizData.length, hasStarted]);


  const handleClick = (e) => {
    e.preventDefault();
    console.log("handleClick");
    setIsSubmitted((prev) => !prev);
    if(isSubmitted){
      clearCheckboxes();
    }
    else{
      setTimeout(checkAnswer, 100);
      
    }
    
    if (shouldReset) {
      setHasStarted(false);
      setCurrentQuestion(0);
      setCurrentCategory("");
      setShouldReset(false);
      setIsSubmitted(false);

    }
  };
  const clearCheckboxes = () => {
    checkboxRefs.current.forEach(checkbox => {
        if (checkbox) checkbox.checked = false;
    });
};
const checkAnswer = () => {
  checkboxRefs.current.forEach(checkbox => {
      if (checkbox) checkbox.checked = true;
  });
};




  if (loading) {
    return <div>Loading...</div>;
  }
  if (!hasStarted) {
    return (
      <div  className={`app `}>
        <div className={`sidebar-container ${isSidebarVisible ? 'visible' : ''}`}>
          <SidebarHeader />
          <Sidebar/>
        
        </div>
        <hr className='sidebar-spacer'/>
        <div className={`maincontent-container `}>
            <Header />
            <div className='center'>
            <div className='welcome-box content-box'>
              <p>Welcome to the Quiz Section! To get started, please select a category from the options below and then click the "Start Quiz" button. In this section, you can test yourself with ten random questions within a category. Have fun and enjoy your time!</p>
              <p><b>Current Category:</b>{currentCategory}</p>
              <button onClick={()=>setHasStarted(true)}>Start Quiz</button>
            </div>
            <Categories />
        </div>
        </div>
        

    </div>

    )
  }else{
    return (
      <div  className={`app `}>
        <div className={`sidebar-container ${isSidebarVisible ? 'visible' : ''}`}>
          <SidebarHeader />
          <Sidebar/>
        
        </div>
        <hr className='sidebar-spacer'/>
        <div className={`maincontent-container `}>
            <Header />
            <div className='center'>
          
          
          <div  className='question-info'>
            <h3>Question {currentQuestion } from 10</h3>
            <div className='info'>
              <p><b>Category: </b> {quizData[currentQuestion].category}</p>
              <p><b>Difficulty: </b> {quizData[currentQuestion].difficulty}</p>
            </div>
          </div>
          {currentQuestion < quizData.length && (
          <div className='content-box random-trivia quiz'>
            <h4>{quizData[currentQuestion].question}</h4>
            <form className='quiz-form'>
              {options.map((option, index) => (
                  <div key={index} className={'option-answer'}>                    
                  <label>
                    <input
                      type="checkbox" 
                      name="option"
                      value={option.answer}
                      ref={(el) => (checkboxRefs.current[index] = el)}
                      className={!isSubmitted ?'normal': option.isCorrect  ? 'correct  ' : 'incorrect'}
                      
                    />
                    {option.answer}
                  </label>
                  <label className={isSubmitted && checkboxRefs.current[index]?.checked ? 'show-answer' : 'invisible'}>
                    {checkboxRefs.current[index]?.checked ? (option.isCorrect ? 'Correct' : 'Incorrect') : ''}
                  </label>
                </div>
              ))}
              <button type="submit" onClick={handleClick}>
                {shouldReset?'Start a new Quiz':isSubmitted ? 'Next question' : 'Show answer'}
              </button>
            </form>
          </div>)}
        </div>
        
        </div>
        </div>
    );
  }
  
  }