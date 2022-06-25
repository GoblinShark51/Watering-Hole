import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import QuestionMaker from './questionComponents/questionMaker.jsx';

function questionAsk() {
    // Declare a new state variable, which we'll call "count"  const [count, setCount] = useState(0);
    // const [count, setCount] = useState(0);
    const questions = GetQuestionList();

    const postQuestionHandler = function(event) {
        //This should post question information to the server

        console.log(event);

        event.preventDefault();
    }

    const cancelQuestionHandler = function(event) {
        //Return to questionList.jsx route
        console.log('Cancelling question.');
    }

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

export default questionAsk;