import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {QuizProvider } from './quiz components/Context/TriviaContext.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import{ RandomTrivia } from './quiz components/Main content/content/content-pages/RandomTrivia.jsx'
import{ Quizzes } from './quiz components/Main content/content/content-pages/Quizzes.jsx'

const router=createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },

  {
    path: "/Random trivia",
    element: <RandomTrivia/>
  },
  {
    path: "/Quizzes",
    element: <Quizzes/>
  }
]);
createRoot(document.getElementById('root')).render(
  <QuizProvider>
    <StrictMode>
      <RouterProvider router={router}/>
    </StrictMode>

  </QuizProvider>
  
)
