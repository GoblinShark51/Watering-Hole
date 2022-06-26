import React, { useState } from 'react';
import { Outlet, Link, useParams } from 'react-router-dom';

function Question(props) {
  // this hook retrievieves the url parameter and stores it for querying use
  const params = useParams(); // this is the id of the question which we can use to query the db
  // initializing state to undefined values for now
  const [state, setState] = useState({
    questionTitle: undefined,
    questionAuther: undefined,
    questionContent: undefined,
    timeStamp: undefined,
    comments: undefined,
  });

  // this is the functional component version of componentDidMount. This is where we can make our fetch request.
  // By passing the empty array as a second argument to useEffect it will cause it to only run once - only the first time the component is renderd
  useEffect(() => {
    fetch(`/question/${params}`) // --> using the params taken from the url on line 6
      .then((resp) => resp.json())
      .then((data) => {
        setState({
            // just as demo
            questionTitle: data.title,
            questionAuther: data.auther,
            questionContent: data.content,
            timeStamp: data.timeStamp,
            comments: data.comments, // most likely an array here
        })
      });
  }, []);

  return (
    <div className='question-container'>
      <h3 className='question-title'>{questionTitle}</h3>
      <p>Auther: {questionAuther} </p>
      <p>{timeStamp}</p>
      <br />
      <p>{questionContent}</p>
    </div>
    // probably can render a list of comment components here if there are any comments
  );
}

export default Question;
