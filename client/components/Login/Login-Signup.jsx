import React, { useState } from 'react';

function LoginSignup() {
  const [hasAccount, sethasAccount] = useState(true);

  return (
    <React.Fragment>
      Welcome to the WateringHole
      <div>
        <form action=''>
          <input type='text' />
          <br />
          <br />
          <input type='text' />
          <input type='submit' value='Log in' />
        </form>
      </div>
      {hasAccount ? (
        <div>
          Don't have an account yet?
          <button type='submit' onClick={() => sethasAccount(false)}></button>
        </div>
      ) : (
        <div>
          Already have an account?
          <button type='submit' onClick={() => sethasAccount(true)}></button>
        </div>
      )}
    </React.Fragment>
  );
}


export default LoginSignup;
