import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

function CommentMaker(props) {
    /* Props
    makeCommentHandler
    */
    
    return (
      <form onSubmit={props.makeCommentHandler}>
        <label for='comment'>Details:</label>
        <textarea
        id='comment'
        name='comment'
        >
        Comment goes here!
        </textarea>

        <input type='submit' value='Submit'/>
      </form> 
    );
}

export default CommentMaker;