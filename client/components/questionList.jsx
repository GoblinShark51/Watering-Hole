import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import QuestionPreview from './questionComponents/QuestionPreview.jsx';

function QuestionList() {
    console.log('Rendering QuestionList.jsx');

    const questions = GetQuestionList();

    const ql = [];
    for(let i = 0; i < questions.length; i++) {
        const curQues = questions[i];
        ql.push(
            <QuestionPreview
            // just added the key here to remove the error
                key={curQues.id}
                id={curQues.id}
                title={curQues.questionTitle}
                author={curQues.questionAuthor}
                timestamp={curQues.timestamp}
            />
        );
    }

    const askButtonHandler = function(event) {
        //This should route to the ask question page
        console.log('Moving to questionAsk page');
    }

    return (
      <div id='page-question-list'>
        <header id='question-list-header'>
            <h1>Questions</h1>
        </header>
        <button id='ask-btn' onClick={askButtonHandler}>Ask Question</button>
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
        {id: 'id1', questionTitle: 'Question 1', questionAuthor: 'Ian', timestamp: new Date(Date.now()).toString()},
        {id: 'id2', questionTitle: 'Question 2', questionAuthor: 'Jared', timestamp: Date.now},
        {id: 'id3', questionTitle: 'Question 3', questionAuthor: 'Tran', timestamp: Date.now},
        {id: 'id4', questionTitle: 'Question 4', questionAuthor: 'Keyla', timestamp: Date.now}
    ] 
}


export default QuestionList;