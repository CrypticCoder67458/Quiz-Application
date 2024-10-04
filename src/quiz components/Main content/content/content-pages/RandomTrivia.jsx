import { useContext, useState, useEffect } from 'react';
import { QuizContext } from '../../../Context/TriviaContext.jsx';
import { Categories } from './Categories.jsx';
import { Header } from '../../header/Header.jsx';
import { Sidebar } from '../../../side bar/Sidebar.jsx';
import { SidebarHeader } from '../../../side bar/SidebarHeader.jsx';
export const RandomTrivia = () => {
  const {quizData,loading,currentCategory,currentPage,setCurrentCategory,isSidebarVisible} = useContext(QuizContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    setCurrentQuestion(0);
    console.log("RandomTrivia useEffect: currentQuestion is now 0");
  },[currentCategory,currentPage]);



  const handleClickNext = (e) => {
    e.preventDefault();
    console.log("RandomTrivia handleClickNext: e is ",e);
    if (currentQuestion < 9) {
      setCurrentQuestion((prev) => prev + 1);
      console.log("RandomTrivia handleClickNext: currentQuestion is now ",currentQuestion);
    }
    if(currentQuestion === 9){
      setHasStarted(false);
      setCurrentQuestion(0);
      setCurrentCategory("");


    }
  };

  const handleClickPrev = (e) => {
    e.preventDefault();
    console.log("RandomTrivia handleClickPrev: e is ",e);
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      console.log("RandomTrivia handleClickPrev: currentQuestion is now ",currentQuestion);
    }
  };


  const currentQuizData = quizData[currentQuestion];

  if (loading) {
    console.log("RandomTrivia: loading is true");
    return <div>Loading...</div>;
  }
  if(!hasStarted){
    console.log("RandomTrivia: hasStarted is false");
    return (
      <div  className={`app page`}>
        <div className={`sidebar-container ${isSidebarVisible ? 'visible' : ''}`}>
          <SidebarHeader />
          <Sidebar/>
        
        </div>
        <hr className='sidebar-spacer'/>
        <div className={`maincontent-container `}>
            <Header />
            <div className='center'>
          <div className='welcome-box content-box'>
              <p>Welcome to the Random Trivia Section! To get started, please select a category from the options below and then click the "Learn more" button.in this section you will go through 10 random questions and could see their answer to learn more.  Have fun and enjoy your time!</p>
              <p><b>Current Category:</b>{currentCategory}</p>
              <button onClick={()=>setHasStarted(true)} className='start-btn'>Learn more</button>
          </div>
          <Categories />
        </div>
        
        </div>
        

    </div>








    )
  }
  else{
    console.log("RandomTrivia: hasStarted is true");
    return (
      <>
        <Header/>
        <div className={`sidebar-container ${isSidebarVisible ? 'visible' : ''}`}>
          <SidebarHeader />
          <Sidebar/>
        
        </div>
        <div className='center'>
          <div className='question-info'>
            <h2>Question {currentQuestion + 1} from 10</h2>
            <div className='info'>
              <p><b>Category: </b> {currentQuizData.category}</p>
              <p><b>Difficulty: </b> {currentQuizData.difficulty}</p>
            </div>
          </div>


          <div className='content-box random-trivia'>
            <h4>{currentQuizData.question}</h4>
            <p>The answer is:</p>
            <b>{currentQuizData.correct_answer}</b>
            <div className='btns'>
              <button onClick={handleClickPrev}>Previous Question</button>
              <button onClick={handleClickNext}>{currentQuestion === 9 ? "Start a new Quiz" : "Next Question"}</button>
            </div>
          </div>

        </div>

        
        
      </>
    );
  }
  
};

