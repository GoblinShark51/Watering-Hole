import React from 'react';

function Comment(props) {
  return (
    <div className='comment-container'>
      <h3 className='comment-username'>{props.username} {props.tsDate} | {props.tsTime}</h3>
      <p>{props.content}</p>
    </div>
    // probably can render a list of comment components here if there are any comments
  );
}

export default Comment;
