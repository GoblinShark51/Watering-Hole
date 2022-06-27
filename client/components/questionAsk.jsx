import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import QuestionMaker from './questionComponents/QuestionMaker.jsx';

function QuestionAsk() {
    const navigate = useNavigate();
    const postQuestionHandler = function(event) {
        //This should post question information to the server
        const questionTitle = event.target[0].value;
        const questionContent = event.target[1].value;

        console.log('You will try to post a question with a title of: ' + questionTitle + '\nAnd content: ' + questionContent);
        const sendData = {
          title: questionTitle,
          content: questionContent,
          author: 'we dont use the author part of the body anymore'
        };
        event.preventDefault();
        fetch('/postQuestion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(sendData)
        }).then((response) => {
          console.log('Verified: recieved response from server.');
          return response.json();
        })
        .then((data) => {
          // do something
          console.log('Posted question: ', sendData);
          return navigate('/questions', {replace: true}), [navigate];
        })
        .catch((err) => {
          console.log(err);
        })
    }
    
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