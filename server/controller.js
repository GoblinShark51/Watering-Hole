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

}
// POST comment: function to post comment to database
controller.postComment = (req, res, next) => {

}

module.exports = controller;