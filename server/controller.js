const dataBase = require('./database.js');

controller = {};

// POST signup: function to create user and store info in database
controller.createUser = (req, res, next) => {
    const {username, firstName, lastName} = req.body;

    const query = `INSERT INTO user
    (username, firstName, lastName)
    VALUES ('${username}', '${firstName}', '${lastName}')`

    dataBase.query(query)
    .then(data => next())
    
};

// GET login data: function to find user in database
// send back in res.body.name
constroller.getUser = (req, res, next) => {

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