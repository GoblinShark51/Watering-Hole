import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginSignup() {
  //Navigate
  const navigate = useNavigate();

  // pretty sure this can all be in one state but can just change it later
  const [hasAccount, sethasAccount] = useState(false);
  const [username, setUsername] = useState(undefined);

  let ENDPOINT;

  // changing the value of the route to send request to depending on state
  hasAccount ? ENDPOINT = '/login' : ENDPOINT = '/signup';

const handleClick = (event) => {
  const username = event.target.username.value
  const password = event.target.password.value

  console.log('Verified: got username and password');
  // realized this has to be a POST request no matter what, you can send info in the body of the request BUT
  // the internet says that it's bad practice and you should send a post request if you want to put info in the req.body
  // send a different request depending on state
  fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  }).then((response) => {
    console.log('Verified: recieved response from server.');
    return response.json();
  })
  .then((data) => {
    // do something
    setUsername({
      username: data.username,
      id: data._id
    })

    console.log('Logged in with: ', data);

    return navigate('/questions', {replace: true}), [navigate];
  })
  .catch((err) => {
    console.log(err);
  })
}

  return (
    // using fragment as a wrapper instead of a div as to not have ajacent elements
    <React.Fragment>
    <div className='LoginSignup'>
      <h1>Welcome to the WateringHole</h1>
      <div className='signupBox'>
        <form onSubmit={(event) => {
          event.preventDefault();
          handleClick(event)
        }}>
          <input type='text' name='username' />
          <br />
          <br />
          <input type='text' name='password' />
          <br />
          {/* this is just here because I can't figure out how to wrap a submite button with the link tag */}
          <input type="submit" name="" id="" />
        </form>
        {username}
      
      {/* conditionaly rendering a diferrent element and content depending on the state */}
      {hasAccount ? (
        <div>
          Don't have an account yet?
          <br />
          <button type='submit' onClick={() => sethasAccount(false)}>
            Sign Up
          </button>
        </div>
      ) : (
        <div>
          Already have an account?
          <br />
          <button type='submit' onClick={() => sethasAccount(true)}>
            Log In
          </button>
        </div>
      )}
      </div>
    </div>
    </React.Fragment>
  );
}

export default LoginSignup;
