const dataBase = require('./database.js');

controller = {};

// POST signup: function to create user and store info in database
controller.createUser = (req, res, next) => {
    const {username, password} = req.body;

    console.log(req.body);

    const query = `INSERT INTO users
    (username, password)
    VALUES ('${username}', '${password}') RETURNING _id, username;`
    //VALUES ('${username}', '${password}')`

    dataBase.query(query)
        
        .then(data => {
            console.log(data)
            data.rows;
        })
        .then(data => {
            res.locals.createUser = data[0];
            next();
        })      
        .catch(err => console.log(err))
    
};

// GET login data: function to find user in database
// send back in res.body.getUser
controller.getUser = (req, res, next) => {
    const {username, password} = req.body;

    const query = `SELECT _id, username
    FROM users
    WHERE username = '${username}' AND password = '${password};'`

    // database.query(query, [username, password])
    //`SELECT username, password FROM users WHERE username=$1 AND password=$2

    dataBase.query(query)
        .then(data => data.rows)
        .then(data => {
            res.locals.getUser = data[0];
            next();
        })
        .catch(err => console.log(err))
};

// GET questions list (questions page): function to get list of questions stored in database
controller.getQuestions = (req, res, next) => {
    // use inner join
    // const{} = re.body;
    // // [{id: id, questionTitle: title, questionAuthor: theirname, timestamp: time}]
    // const query = `SELECT questions.id, questions.title, questions.timestamp, users.username
    // FROM questions
    // INNER JOIN users
    // ON questions.id_author = users.id;`

    // dataBase.query(query)
    //     .then(data => {
    //         res.locals.getQuestions = [data.rows];
    //         next();
    //     })
    //     .catch(err => console.log(err))
    //     next();
};

// GET question (with comment data)
/*
* GET question. Client will use /:id param where id is the ID of the question
{
  id: id
  questionTitle: title,
  questionAuthor: theirname,
  questionContent: content,
  timestamp: time,
  comments: [{id: id, author: theirname, content: theirtext, timestamp: time}]
}
*/
controller.getQuestionsWithComments = (req, res, next) => {
    // const {id} = req.body;

    // const query = `SELECT q.id, q.title, q.q_content, q.times_tamp, 
    // u.author AS question_author,
    // comments.id, comments.author, comments.content, comments.timestamp
    // FROM questions q
    // INNER JOIN users u ON q.id_author = u.id
    // INNER JOIN comments
    // ON `

}


// GET user info: function to get user profile from database

// POST question: function to post question to database
controller.postQuestion = (req, res, next) => {
    const {title, content, author} = req.body;

    //changed the schema so the current datetime is automatically added to the time_stamp column
    const queryString = `INSERT INTO questions
    (title, id_author, q_content)
    VALUES ('${title}', '${author}', '${content}') RETURNING _id, title, id_author, q_content, time_stamp;`

    dataBase.query(queryString)
        .then(data => data.rows)
        .then(data => {
            res.locals.postQuestion = data[0];
            return next();
        }).catch(err => next({
            log: 'Middleware error in postQuestion',
            message: { err: 'An error occured'}
        }));

}
// POST comment: function to post comment to database
controller.postComment = (req, res, next) => {
    const {author, content, question_id} = req.body;

    //changed the schema so the current datetime is automatically added to the time_stamp column
    const queryString = `INSERT INTO comments
    (id_author, c_content, id_question)
    VALUES ('${author}', '${content}', '${question_id}') RETURNING _id, id_author, c_content, id_question, time_stamp;`

    dataBase.query(queryString)
        .then(data => data.rows)
        .then(data => {
            console.log(data)
            res.locals.postComment = data[0];
            return next();
        }).catch(err => next({
            log: 'Middleware error in postQuestion',
            message: { err: 'An error occured'}
        }));

    
}

module.exports = controller;