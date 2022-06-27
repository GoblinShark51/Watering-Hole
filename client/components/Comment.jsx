import React from 'react';

function Comment(props) {
    console.log(props)
  return (
    <div className='comment-container'>
      <h3 className='comment-username'>{props.username}</h3>
      <p>{props.timeStamp}</p>
      <br />
      <p>{props.content}</p>
    </div>
    // probably can render a list of comment components here if there are any comments
  );
}

export default Comment;
