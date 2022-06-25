import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import QuestionPreview from './questionComponents/questionPreview.jsx';

function questionList() {
    // Declare a new state variable, which we'll call "count"  const [count, setCount] = useState(0);
    // const [count, setCount] = useState(0);
    const questions = GetQuestionList();

    const ql = [];
    for(let i = 0; i < questions.length; i++) {
        const curQues = questions[i];
        ql.push(
            <QuestionPreview
                id={curQues.id}
                title={curQues.questionTitle}
                author={curQues.questionAuthor}
                timestamp={curQues.timestamp}
            />
        );
    }

    const askButtonHandler = function(event) {
        //This should route to the ask question page
    }

    return (
      <div id='page-question-list'>
        <header id='question-list-header'>
            <h1>Questions</h1>
        </header>
        <button id='ask-button' onClick={askButtonHandler}>Ask Question</button>
        <div id='question-list-container'>
            {ql}
        </div>
      </div>
    );
}

const GetQuestionList = function() {
    //Fetch request for questions would go here
    //Returning model for now
    return [
        {id: 'id1', questionTitle: 'Question 1', questionAuthor: 'Ian', timestamp: Date.now},
        {id: 'id2', questionTitle: 'Question 2', questionAuthor: 'Jared', timestamp: Date.now},
        {id: 'id3', questionTitle: 'Question 3', questionAuthor: 'Tran', timestamp: Date.now},
        {id: 'id4', questionTitle: 'Question 4', questionAuthor: 'Keyla', timestamp: Date.now}
    ] 
}

export default questionList;