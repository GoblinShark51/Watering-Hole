import ReactDOM from 'react-dom/client';
import React from 'react';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import QuestionList from './components/questionList.jsx';
import Question from './components/questionComponents/Question.jsx'
import QuestionAsk from './components/questionAsk.jsx';

//style 
import styles from './scss/stylish.css';
import questionStyles from './scss/question.css';
import jaredSteeze from './scss/jaredStyles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Link to='test/id1'>Test</Link>
    <Routes>
      <Route path='/test/:questionId' element={<Question /> }/>
      <Route path='/questions' element={<QuestionList />} />
      <Route path='/questions/create' element={<QuestionAsk />}/>
      {/* this is the dynamic route segment */}
      <Route path='/questions/:questionId' element={<Question />}/>
      <Route path='/' element={<App /> }>
        {/* <Route path='invoices' element={<Invoices />} /> */}
      </Route>
      <Route
        path='*'
        element={
          <main style={{ padding: '1rem' }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  </BrowserRouter>
);
