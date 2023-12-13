const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.post( '/new', rejectUnauthenticated, (req, res) => {
    console.log('Req.body in post answer - ', req.body);
    
    const answer = req.body;
    const sqlText = `
        INSERT INTO "answers" ("answer_text", "survey_id", "question_id" )
        VALUES ($1, $2, $3);`;
    pool.query(sqlText, 
        [answer.answerText, answer.newSurveyId, answer.questionId])
    .then((result) => {
        console.log('Answers Created - ', answer.answerText);
        res.sendStatus(201) })
    .catch((error) => {
        console.log('Error in POST new answer - ', error);
        res.sendStatus(500);
    }) 
})

router.get('/get/:id', rejectUnauthenticated, (req, res) => {
    console.log('req.params in get answers - ', JSON.stringify(req.params.id));
    const sqlText = `
        SELECT * FROM "answers"
        WHERE "question_id" = $1;`;
    pool.query( sqlText, [req.params.id] )
        .then((results) => {
            res.send(results.rows); })
        .catch((error) => {
            console.log('Error in GET answer query - ', error);
        })
})

module.exports = router;