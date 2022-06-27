import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

function CommentMaker(props) {
  /*
  props:
  questionId
  oldComments
  updateComments
  */
    const navigate = useNavigate();
    const makeCommentHandler = function(event) {
       //This should post question information to the server
       const commentContent = event.target[0].value;
       
       console.log('You will try to post a comment with content of: ' + commentContent);
        const sendData = {
          author: 'we dont use the author part of the body anymore',
          content: commentContent,
          question_id: props.questionId
        };
        event.preventDefault();
        fetch('/postComment', {
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
          console.log('Posted comment: ', sendData);
          oldComments.push(sendData);
          updateComments(oldComments);
        })
        .catch((err) => {
          console.log(err);
        })
    }

    return (
      <form className='commentMaker' onSubmit={makeCommentHandler}>
        <label for='comment'>Details:</label>
        <textarea
        className='comment-maker-text'
        id='comment'
        name='comment'
        >
        Comment goes here!
        </textarea>

        <input className='comment-submit-btn' type='submit' value='Submit'/>
      </form> 
    );
}

export default CommentMaker;