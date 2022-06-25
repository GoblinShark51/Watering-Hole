import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

function questionMaker(props) {
    /* Props
    postQuestionHandler
    */
    
    return (
      <form>
        <label for='qtitle'>Title:</label>
        <input type='text' id='qtitle' name='qtitle'/>
        <label for='qcontent'>Details:</label>
        <textarea id='qcontent' name='qcontent'>Question details go here. Be descriptive!</textarea>
        <input type='submit' value='Submit' onClick={props.postQuestionHandler}/>
      </form> 
    );
}

export default questionMaker;