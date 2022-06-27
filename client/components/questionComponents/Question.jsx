import React, { useState, useEffect } from 'react';
import { Outlet, Link, useParams, useNavigate } from 'react-router-dom';
import Comment from '../Comment.jsx';

function Question(props) {
  // this hook retrievieves the url parameter and stores it for querying use
  const params = useParams(); // this is the id of the question which we can use to query the db
  // initializing state to undefined values for now
  const [state, setState] = useState({
    questionTitle: 'Default Title',
    questionAuthor: 'Default Author',
    questionContent: 'how do i center a div',
    timeStamp: 'right now',
    comments: [{ username: 'toast', content: 'heres a solution'}],
  });

  const navigate = useNavigate();
  const backToQuestionList = function () {
    console.log('Navigating to questionList');
    return navigate('/questions', { replace: true }), [navigate];
  };

  // this is the functional component version of componentDidMount. This is where we can make our fetch request.
  // By passing the empty array as a second argument to useEffect it will cause it to only run once - only the first time the component is renderd
  // useEffect(() => {
  //   fetch(`/question/${params}`) // --> using the params taken from the url on line 6
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setState({
  //           // just as demo
  //           questionTitle: data.title,
  //           questionAuthor: data.author,
  //           questionContent: data.content,
  //           timeStamp: data.timeStamp,
  //           comments: data.comments, // most likely an array here
  //       })
  //     });
  // }, []);

  console.log(state);

  const commentss = [];
  for (const comment of state.comments) {
    commentss.push(
      <Comment
        username={comment.username}
        content={comment.content}
        timeStamp={comment.timeStamp}
      />
    );
  }

  return (
    <React.Fragment>
      <div className='question-container'>
        <button id='back-to-questionlist-btn' onClick={backToQuestionList}>
          Back
        </button>
        <h3 className='question-title'>{state.questionTitle}</h3>
        <p>Author: {state.questionAuthor} </p>
        <p>{state.timeStamp}</p>
        <br />
        <p>{state.questionContent}</p>
      </div>
      <div className='comments-container'>
        <h2>Comments</h2>
        {commentss}
      </div>
    </React.Fragment>

    // probably can render a list of comment components here if there are any comments
  );
}

export default Question;
