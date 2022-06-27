const dataBase = require('./database.js');

controller = {};

// POST signup: function to create user and store info in database
controller.createUser = (req, res, next) => {

    const {username, password} = req.body;
    // console.log(req.body);
    // console.log(username);

    const query = `INSERT INTO users
    (username, password)
    VALUES ('${username}', '${password}') RETURNING _id, username;`
    
    dataBase.query(query)
        .then(data =>
            // console.log(data);
            data.rows
            //console.log(data.rows)
        )
        .then(data => {
            //console.log(data[0]);
            res.locals.createUser = data[0];
            next();
        })
        .catch(err => console.log(err))
    
};

// GET login data: function to find user in database
// send back in res.body.name
controller.getUser = (req, res, next) => {
    const {username, password} = req.body;

    const query = `SELECT _id, username
    FROM users
    WHERE username = '${username}' AND password = '${password}';`

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
    //use inner join
    
    // [{id: id, questionTitle: title, questionAuthor: theirname, timestamp: time}]
    //const query = `SELECT _id, title, time_stamp FROM questions`;
    const query = `SELECT questions._id, questions.title, questions.time_stamp, users.username
    FROM questions
    INNER JOIN users
    ON questions.id_author = users._id;`

    dataBase.query(query)
        .then(data => {
            // console.log(data.rows);
            res.locals.getQuestions = data.rows;
            // console.log(res.locals.getQuestions);
            next();
        })
        .catch(err => console.log(err))
        next();
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
    const userId = req.cookies.userid; //Author will just be the username from now on JUST IN CASE WE NEED IT

    //changed the schema so the current datetime is automatically added to the time_stamp column
    const queryString = `INSERT INTO questions
    (title, id_author, q_content)
    VALUES ('${title}', '${userId}', '${content}') RETURNING _id, title, id_author, q_content, time_stamp;`

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
    const userId = req.cookies.userid; //Author will just be the username from now on JUST IN CASE WE NEED IT

    //changed the schema so the current datetime is automatically added to the time_stamp column
    const queryString = `INSERT INTO comments
    (id_author, c_content, id_question)
    VALUES ('${userId}', '${content}', '${question_id}') RETURNING _id, id_author, c_content, id_question, time_stamp;`

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