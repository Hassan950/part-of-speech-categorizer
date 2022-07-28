import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Practice from './components/practice';
import Rank from './components/rank';

function App() {
  const [score, setScore] = useState(0);

  return (
    <Routes>
      <Route path='/' element={<Practice setScore={setScore} />} />
      <Route path='/rank' element={<Rank score={score} />} />
    </Routes>
  );
}

export default App;
