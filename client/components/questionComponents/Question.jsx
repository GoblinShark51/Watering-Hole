import React, { useState, useEffect } from "react";
import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
import Comment from "../Comment.jsx";
import CommentMaker from "./CommentMaker.jsx";

function Question(props) {
  // this hook retrievieves the url parameter and stores it for querying use
  const params = useParams()['questionId']; // this is the id of the question which we can use to query the db
  // initializing state to undefined values for now
  const [state, setState] = useState({
    questionTitle: "Default Title",
    questionAuthor: "Default Author",
    questionContent: "how do i center a div",
    timeStamp: "right now",
  });

  const [comments, setComments] = useState([]);

  const navigate = useNavigate();
  const backToQuestionList = function () {
    console.log("Navigating to questionList");
    return navigate("/questions", { replace: true }), [navigate];
  };
  
  useEffect(() => {
    console.log('ATTEMPTING TO FETCH FROM: ', params);
    fetch(`/question/${params}`)
      .then((response) => {
        console.log("Verified: recieved response from server.");
        return response.json();
      })
      .then((data) => {
        // do something
        setState({
          // just as demo
          questionTitle: 'no title yet',
          questionAuthor: data.question_author,
          questionContent: data.q_content,
          timeStamp: data.time_stamp
        });

        setComments(data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  comments.sort((a, b) => (a.time_stamp > b.time_stamp) ? 1 : -1)
  const commentElements = [];
  for (let i = 0; i < comments.length; i++) {
    const c = comments[i];

    let splitTime = 'split time';
    let tsDateConv = 'some date';
    let tsTimeConv = 'something';

    if(c.time_stamp) {
      splitTime = c.time_stamp.split('T');
      tsDateConv = splitTime[0];
      tsTimeConv = splitTime[1].split('.')[0];
    }
    

    commentElements.push(
      <Comment
        key={i}
        username={c.comment_author}
        content={c.c_content}
        tsDate={tsDateConv}
        tsTime={tsTimeConv}
      />
    );
  }

  return (
    <React.Fragment>
      <div className='question-page-body'>
          <button id="back-to-questionlist-btn" onClick={backToQuestionList}>
            Back
          </button>
          
        <div className="question-container">
          <h3 className="question-title">{state.questionTitle}</h3>
          <p className="question-subinfo">Author: {state.questionAuthor} | {state.timeStamp}</p>
          <div className="question-content">
            {state.questionContent}
          </div>
        </div>

        <div className="comments-container">
          <h2>Comments</h2>
          {commentElements}
        </div>
        <h2>Comment Maker</h2>
        <CommentMaker
          questionId={params}
          oldComments={[...comments]}
          updateComments={setComments}
        />
      </div>
    </React.Fragment>

    // probably can render a list of comment components here if there are any comments
  );
}

export default Question;
