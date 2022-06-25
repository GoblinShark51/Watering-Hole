import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";

function QuestionPreview(props) {
    /* Props
    id
    title
    author
    timestamp
    */
    
    return (
      <div class='question-preview'>
        <h3 class='preview-title'>
            <a href='some link using props.id goes here'>{props.title}</a>
        </h3>
        by: {props.author}
        timestamp: {props.timestamp}
      </div>
    );
}

export default QuestionPreview;