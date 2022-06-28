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
          //{ author: "we dont use the author part of the body anymore", content: "I am placing a comment without thinking about the consequences.", question_id: "1" }
          //SHOULD BE LIKE: 
          /*
          {
            "_id": 4,
            "id_author": 1,
            "id_question": 1,
            "c_content": "testing, commit content",
            "time_stamp": "2022-06-28T02:13:25.219Z",
            "comment_author": "Tran"
          },
          */

          const newComment = {};
          newComment.c_content = data.c_content;
          newComment.comment_author = 'YOU, DUMMY';
          props.oldComments.push(newComment);

          props.updateComments([...props.oldComments]);

          console.log('Posted new comment: ', newComment);
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