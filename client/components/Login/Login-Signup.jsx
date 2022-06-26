import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginSignup() {
  // pretty sure this can all be in one state but can just change it later
  const [hasAccount, sethasAccount] = useState(false);
  const [username, setUsername] = useState(undefined);

  let ENDPOINT;

  // changing the value of the route to send request to depending on state
  hasAccount ? ENDPOINT = '/login' : ENDPOINT = '/signup';

const handleClick = (event) => {
  const username = event.target.username.value
  const password = event.target.password.value
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
    response.json();
  })
  .then((data) => {
    // do something
    setUsername({
      username: data.username
    })
    
  }) 
}

  return (
    // using fragment as a wrapper instead of a div as to not have ajacent elements
    <React.Fragment>
      Welcome to the WateringHole
      <div>
        <form onSubmit={(event) => {
          event.preventDefault();
          handleClick(event)
        }}>
          <input type='text' name='username' />
          <br />
          <br />
          <input type='text' name='password' />
          <br />
          <button type='submit'>
            {' '}
            {/* conditionaly rendering a diferrent button depending on the state */}
            <Link to='/questions'>{hasAccount ? 'Log in' : 'Sign up'}</Link>
          </button>
          {/* this is just here because I can't figure out how to wrap a submite button with the link tag */}
          <input type="submit" name="" id="" />
        </form>
        {username}
      </div>
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
    </React.Fragment>
  );
}

export default LoginSignup;
