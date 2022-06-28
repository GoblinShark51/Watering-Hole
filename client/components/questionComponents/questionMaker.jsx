import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

function QuestionMaker(props) {

    
    return (
      <form onSubmit={props.postQuestionHandler}>
        <label for='qtitle'>Title:</label>
        <input type='text' id='qtitle' name='qtitle'/>
        <label for='qcontent'>Details:</label>

        <textarea
        id='qcontent'
        name='qcontent'
        >Question details go here. Be descriptive!
        </textarea>

        <input type='submit' value='Submit'/>
      </form> 
    );
}

export default QuestionMaker;