import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import QuizQuestions from './components/QuizQuestions';
import { useState } from 'react';

function App() {
  const [score, setScore] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/quiz/:id' element={<QuizQuestions score={score} setScore={setScore}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
