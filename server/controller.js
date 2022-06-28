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
};


// GET question (with comment data)
/*
* GET question. Client will use /:id param where id is the ID of the question
{
  id: id
  questionTitle: title,
  -> questionAuthor: theirname,
  questionContent: content,
  timestamp: time,
  comments: [{id: id, author: theirname, content: theirtext, timestamp: time}]
}
*/
<<<<<<< HEAD
controller.getQuestionsWithComments1 = (req, res, next) => {
    /*
    const peopleQuery = 'SELECT p.*, s.name AS species, h.name AS homeworld' + 
 ' FROM people p LEFT OUTER JOIN  species s' + ' ON p.species_id =s._id' 
 + ' LEFT OUTER JOIN planets h' + ' ON p.homeworld_id = h._id;'
*/
    const id = req.params.id;
    console.log(id);
    const query = `SELECT q._id, q.id_author, u.username AS question_author, q.q_content, q.time_stamp 
    FROM questions q LEFT OUTER JOIN users u ON q.id_author=u._id WHERE q._id='${id}';`
    
    dataBase.query(query)
    .then(data => data.rows[0])
    .then(data => {
        res.locals.getQuestionsWithComments = data;
        return next();
    })
    .catch(err => next({err}))

}

controller.getQuestionsWithComments2 = (req, res, next) => {
    /*
    const peopleQuery = 'SELECT p.*, s.name AS species, h.name AS homeworld' + 
 ' FROM people p LEFT OUTER JOIN  species s' + ' ON p.species_id =s._id' 
 + ' LEFT OUTER JOIN planets h' + ' ON p.homeworld_id = h._id;'
*/  
    //this is the _id of the question
    const id = res.locals.getQuestionsWithComments._id;

    const query = `SELECT c.*, u.username AS comment_author 
    FROM comments c LEFT OUTER JOIN users u ON c.id_author=u._id WHERE c.id_question='${id}';`
    
    dataBase.query(query)
    .then(data => data.rows)
    .then(data => {
        console.log(data);
        res.locals.getQuestionsWithComments.comments = data;
        return next();
    })
    .catch(err => next({err}))

}
=======
controller.getQuestionsWithComments = (req, res, next) => {
/*
const peopleQuery = 'SELECT p.*, s.name AS species, h.name AS homeworld' + 
 ' FROM people p LEFT OUTER JOIN  species s' + ' ON p.species_id =s._id' 
 + ' LEFT OUTER JOIN planets h' + ' ON p.homeworld_id = h._id;';
*/

    // const {question_id} = req.body;
    // console.log(req.body);
    // q._id, u.username AS questionAuthor, q.q_content, q.time_stamp, c.  WHERE u.username = q.id_author
    //RETURN INFO ABOUT THE QUESTION WITHOUT THE COMMENT INFO YET
    //q._id, title, author, content, timstamp
    // const query = `SELECT  q._id, u.username AS  questionAuthor, q.q_content, q.time_stamp
    // FROM questions q LEFT OUTER JOIN 
    // INNER JOIN users u ON c.id_author = u._id 
    // INNER JOIN questions q ON c.id_question = c._id`
    
    // dataBase.query(query)
    // .then(data => {
    //     // console.log(data.rows);
    //     res.locals.getQuestions = data.rows;

    //     console.log(res.locals.getQuestions);
    //     next();
    // })
    // .catch(err => console.log(err))
    // next();
};
>>>>>>> dev

// GET user info: function to get user profile from database

// POST question: function to post question to database
controller.postQuestion = (req, res, next) => {
    
    const {title, content, author} = req.body;
    const userId = req.cookies.userid; //Author will just be the username from now on JUST IN CASE WE NEED IT
    console.log(userId)

    //changed the schema so the current datetime is automatically added to the time_stamp column
    const queryString = `INSERT INTO questions
    (title, id_author, q_content)
    VALUES ('${title}', '${userId}', '${content}') RETURNING _id, title, id_author, q_content, time_stamp;`

    dataBase.query(queryString)
        .then(data => data.rows)
        .then(data => {
            res.locals.postQuestion = data[0];
            console.log(data[0])
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