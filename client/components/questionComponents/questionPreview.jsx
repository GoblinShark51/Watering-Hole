import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function QuestionPreview(props) {
  /* Props
    id
    title
    author
    tsDate
    tsTime
    */

  return (
    // just changed these to className
    <div className='question-preview'>
      <h3 className='preview-title'>
        {/* NOTES: changed this to a router link to be more compatible with react-router
        added a dynamic route to react router... refer to index.js  
        I never finished this component, just wanted to have something rendered to test the routes */}
        <Link to={`${props.id}`} >{props.title}</Link>
      </h3>
      <p>by: {props.author}</p>
      {/* just added these for visual */}
      <br />
      <p>timestamp: {props.tsDate + ', ' + props.tsTime}</p>
    </div>
  );
}

export default QuestionPreview;
