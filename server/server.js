const express = require('express');
const app = express();
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const controller = require('./controller');
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.cookieParser());

app.use('/', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

//////////////////////
// route 
//CHECK IF USER IS IN THE DATABASE
//* GET login data {username: x, password: none} <- CLIENT SENDS THIS TO SERVER
                 //{username: x} <- SERVER SENDS THIS BACK (FOR NOW)
app.post('/login', controller.getUser, (req, res) => {
    res.cookie('userid', res.locals.userid, { maxAge: 900000, httpOnly: true });
    return res.status(200).json(res.locals.getUser);
})

//CREATE USERNAME
//* POST signup {username: x, password: none}
app.post('/signup', controller.createUser, (req, res) => {
    res.cookie('userid', res.locals.userid, { maxAge: 900000, httpOnly: true });
    return res.status(200).json(res.locals.createUser);
})

//GET LIST OF ALL THE QUESTIONS
//* GET questions list [{id: id, questionTitle: title, questionAuthor: theirname, timestamp: time}] (its an array)
app.get('/getList', controller.getQuestions, (req, res) => {
    return res.status(200).json(res.locals.getQuestions);
})

//GET A SPECIFIC QUESTION ACCORDING TO ITS ID 
/* GET question. Client will use /:id param where id is the ID of the question
{
  id: id
  questionTitle: title,
  questionAuthor: theirname,
  questionContent: content,
  timestamp: time,
  comments: [{id: id, author: theirname, content: theirtext, timestamp: time}]
}
*/
app.get('/question/:id', controller.getQuestionsWithComments, (req, res) => {
    return res.status(200).json(res.locals.getQuestionsWithComments);
})
//GET USER INFO(ACCOUNT INFO STRETCH)
//* GET user info {???} idk yet

//POST QUESTION TO THE DATABASE
//* POST question {title, content, author}
app.post('/postQuestion', controller.postQuestion, (req, res) => {
    return res.status(200).json(res.locals.postQuestion);
})

//POST COMMENT TO THE DATABASE
//* POST comment {author: theirname, content: theirtext}
app.post('/postComment', controller.postComment, (req,res) => {
    return res.status(200).json(res.locals.postComment)
})

//IF THE URL IS INVALID
app.use('*', (req, res) => {
    res.status(404).send('404: Page not found')
})

//GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    const globalErr = {
        log: 'Middleware error',
        status: 400,
        message: { err: 'An error occured'}
    }
    const error = Object.assign({}, globalErr, err);
    return res.status(error.status).json(error.message);
})

// app.use(
//     '/',
//     createProxyMiddleware({
//       target: 'http://www.example.org/secret',
//       changeOrigin: true,
//     })
//   );
  

app.listen(3000);