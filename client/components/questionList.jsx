import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import QuestionPreview from './questionComponents/QuestionPreview.jsx';

function QuestionList() {
    console.log('Rendering QuestionList.jsx');
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        fetch('/getList')
        .then((response) => {
            console.log('Verified: recieved response from server.');
            return response.json();
        })
        .then((data) => {
            // do something
            setQuestions(data);
        })
        .catch((err) => {
            console.log(err);
        })
      }, []);
    

    const ql = [];
    for(let i = 0; i < questions.length; i++) {
        const curQues = questions[i];

        //"2022-06-27 T 12:48:15 . 693Z"
        const splitTime = curQues.time_stamp.split('T');
        const tsDateConv = splitTime[0];
        const tsTimeConv = splitTime[1].split('.')[0];

        // console.log('Getting date time: ' + tsDate + ' and ' + tsTime);

        ql.push(
            <QuestionPreview
            // just added the key here to remove the error
                key={curQues._id}
                id={curQues._id}
                title={curQues.title}
                author={curQues.username}
                tsDate={tsDateConv}
                tsTime={tsTimeConv}
            />
        );
    }
    
    const askButtonHandler = function() {
        console.log('Navigating to questionAsk');
        return navigate('/questions/create', {replace: true}), [navigate];
    };

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
        {id: 'id1', questionTitle: 'Question 1', questionAuthor: 'Ian', timestamp: '2022-06-27T12:48:15.693Z'},
        {id: 'id2', questionTitle: 'Question 2', questionAuthor: 'Jared', timestamp: '2022-06-27T12:20:15.693Z'},
        {id: 'id3', questionTitle: 'Question 3', questionAuthor: 'Tran', timestamp: '2022-06-26T12:48:15.693Z'},
        {id: 'id4', questionTitle: 'Question 4', questionAuthor: 'Keyla', timestamp: '2022-06-25T12:48:15.693Z'}
    ] 
}


export default QuestionList;