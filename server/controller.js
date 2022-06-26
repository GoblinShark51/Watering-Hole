const dataBase = require('./database.js');

controller = {};

// POST signup: function to create user and store info in database
controller.createUser = (req, next) => {
    const {username, password} = req.body;

    const query = `INSERT INTO users
    (username, password)
    VALUES ('${username}', '${password}')`

    dataBase.query(query)
        .then(data => next())
        .catch(err => console.log(err))
    next();
};

// GET login data: function to find user in database
// send back in res.body.name
controller.getUser = (req, res, next) => {
    const {username, password} = req.body;

    const query = `SELECT username, password
    FROM users
    WHERE username = '${username}' AND password = '${password}'`

    dataBase.query(query)
        .then(data => {
            res.locals.getUser = username;
            next();
        })
        .catch(err => console.log(err))
        next();
};

// GET questions list (questions page): function to get list of questions stored in database
controller.getQuestions = (req, res, next) => {

}
// GET question (with comment data)
controller.getQuestionsWithComments = (req, res, next) => {

}
// GET user info: function to get user profile from database

// POST question: function to post question to database
controller.postQuestion = (req, res, next) => {
    const {title, content, author} = req.body;
    const timestamp = Date.now();
    const queryString = `INSERT INTO questions
    (title, id_author, q_content, time_stamp)
    VALUES (${title}, ${author}, ${content}, ${timestamp});`

    dataBase.query(queryString)
        .then(data => {
            res.locals.postQuestion = data;
            return next();
        }).catch(err => next({
            log: 'Middleware error in postQuestion',
            message: { err: 'An error occured'}
        }));

}
// POST comment: function to post comment to database
controller.postComment = (req, res, next) => {
    const {author, content, question_id} = req.body;
    const timestamp = Date.now();
    const queryString = `INSERT INTO comments
    (id_author, c_content, id_question, time_stamp)
    VALUES (${author}, ${content}, ${question_id}, ${timestamp});`

    dataBase.query(queryString)
        .then(data => {
            res.locals.postQuestion = data;
            return next();
        }).catch(err => next({
            log: 'Middleware error in postQuestion',
            message: { err: 'An error occured'}
        }));

    
}

module.exports = controller;