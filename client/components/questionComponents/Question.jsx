import React, { useState, useEffect } from "react";
import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
import Comment from "../Comment.jsx";
import CommentMaker from "./CommentMaker.jsx";

function Question(props) {
  // this hook retrievieves the url parameter and stores it for querying use
  const params = useParams(); // this is the id of the question which we can use to query the db
  // initializing state to undefined values for now
  const [state, setState] = useState({
    questionTitle: "Default Title",
    questionAuthor: "Default Author",
    questionContent: "how do i center a div",
    timeStamp: "right now",
  });

  const [comments, setComments] = useState([
    { username: "toast", content: "heres a solution" },
  ]);

  const navigate = useNavigate();
  const backToQuestionList = function () {
    console.log("Navigating to questionList");
    return navigate("/questions", { replace: true }), [navigate];
  };

  // useEffect(() => {
  //   fetch(`/question/${params}`)
  //     .then((response) => {
  //       console.log("Verified: recieved response from server.");
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // do something
  //       setState({
  //         // just as demo
  //         questionTitle: data.title,
  //         questionAuthor: data.author,
  //         questionContent: data.content,
  //         timeStamp: data.timeStamp
  //       });

  //       setComments(data.comments);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  console.log(state);

  const commentElements = [];
  for (const c of comments) {
    commentElements.push(
      <Comment
        username={c.username}
        content={c.content}
        timeStamp={c.time_stamp}
      />
    );
  }

  return (
    <React.Fragment>
      <div className="question-container">
        <button id="back-to-questionlist-btn" onClick={backToQuestionList}>
          Back
        </button>
        <h3 className="question-title">{state.questionTitle}</h3>
        <p>Author: {state.questionAuthor} </p>
        <p>{state.timeStamp}</p>
        <br />
        <p>{state.questionContent}</p>
      </div>
      <div className="comments-container">
        <h2>Comments</h2>
        {commentElements}
      </div>
      <h2>Comment Maker</h2>
      <CommentMaker
        questionId={params}
        oldComments={comments}
        updateComments={setComments}
      />
    </React.Fragment>

    // probably can render a list of comment components here if there are any comments
  );
}

export default Question;
