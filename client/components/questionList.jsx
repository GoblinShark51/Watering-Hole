import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";

function questionList() {
    // Declare a new state variable, which we'll call "count"  const [count, setCount] = useState(0);
    const [count, setCount] = useState(0);
    const questions = GetQuestionList();
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
}

const GetQuestionList = function() {
    //Fetch request for questions would go here
    //Returning model for now
    return [
        {questionTitle: 'Question 1', questionAuthor: 'Ian', timestamp: Date.now},
        {questionTitle: 'Question 2', questionAuthor: 'Jared', timestamp: Date.now},
        {questionTitle: 'Question 3', questionAuthor: 'Tran', timestamp: Date.now},
        {questionTitle: 'Question 4', questionAuthor: 'Keyla', timestamp: Date.now}
    ]
    
}

export default questionList;