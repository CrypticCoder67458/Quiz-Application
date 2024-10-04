import { useState, useEffect, createContext } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizData, setQuizData] = useState([]);
  const [currentPage, setCurrentPage] = useState("");
  const [currentCategory, setCurrentCategory] = useState("General knowledge");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const fetchWithRetry = async (url, retries = 5, backoff = 300) => {
    for (let i = 0; i < retries; i++) {
      try {
        let response = await fetch(url);
        if (response.ok) {
          return await response.json();
        } else if (response.status === 429) {
          let retryAfter = response.headers.get('Retry-After');
          if (retryAfter) {
            await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
          } else {
            await new Promise(resolve => setTimeout(resolve, backoff * Math.pow(2, i)));
          }
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        if (i === retries - 1) throw error;
      }
    }
  };

  const FetchQuestions = async () => {
    setLoading(true);
    setError(null);
    let URL;
    switch (currentCategory) {
      case "General knowledge":
        URL = "https://opentdb.com/api.php?amount=11&category=9";
        break;
      case "Science & Nature":
        URL = "https://opentdb.com/api.php?amount=11&category=17";
        break;
      case "Sports":
        URL = "https://opentdb.com/api.php?amount=11&category=21";
        break;
      case "Geography":
        URL = "https://opentdb.com/api.php?amount=11&category=22";
        break;
      case "History":
        URL = "https://opentdb.com/api.php?amount=11&category=23";
        break;
      case "Computer Science":
        URL = "https://opentdb.com/api.php?amount=11&category=18";
        break;
      default:
        URL = "https://opentdb.com/api.php?amount=11&category=9";
    }
    try {
      const data = await fetchWithRetry(URL);
      setQuizData(data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchQuestions();
  }, [currentCategory, currentPage]);

  return (
    <QuizContext.Provider value={{ quizData: quizData || [], setQuizData, currentPage, setCurrentPage, currentCategory, setCurrentCategory, loading, error,isSidebarVisible, setSidebarVisible }}>
      {children}
    </QuizContext.Provider>
  );
};
