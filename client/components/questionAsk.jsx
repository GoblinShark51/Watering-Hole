import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import QuestionMaker from './questionComponents/QuestionMaker.jsx';

function QuestionAsk() {
    const postQuestionHandler = function(event) {
        //This should post question information to the server
        const questionTitle = event.target[0].value;
        const questionContent = event.target[1].value;

        console.log('You will try to post a question with a title of: ' + questionTitle + '\nAnd content: ' + questionContent);

        event.preventDefault();
    }
    const navigate = useNavigate();
    const cancelQuestionHandler = function() {
      console.log('Navigating to questionList');
      return navigate('/questions', {replace: true}), [navigate];
    };

    return (
      <div id='page-question-ask'>
        <header id='question-ask-header'>
            <h1>Ask Question</h1>
        </header>
        <button id='cancel-question-btn' onClick={cancelQuestionHandler}>Cancel</button>
        <QuestionMaker postQuestionHandler={postQuestionHandler}/>
      </div>
    );
}

export default QuestionAsk;