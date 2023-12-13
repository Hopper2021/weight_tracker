const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
  

router.put( '/update', rejectUnauthenticated, (req, res) => {
    console.log('Req.body in /update PUT - ', req.body); 
    const vote = req.body;
    const sqlText = `
        UPDATE "answers"
        SET "num_of_votes" = "num_of_votes" + 1
        WHERE "survey_id" = $1
        AND "question_id" = $2
        AND "answer_text" = $3;`;
    pool.query(sqlText, [vote.surveyId, vote.questionId, vote.answerText])
    .then((result) => {
        console.log('Vote Updated!')
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in score PUT - ', error);
        res.sendStatus(500);
    })
})

router.get('/get/:id', rejectUnauthenticated, (req, res) => {
    console.log('req.params.id in get votes - ', req.params.id);
    const sqlText = `
        SELECT * FROM "answers"
        WHERE "survey_id" = $1
        ORDER BY "id" ASC;`;
    pool.query( sqlText, [req.params.id])
        .then((results) => {
            console.log('Fetched votes: ', results.rows)
            res.send(results.rows); })
        .catch((error) => {
            console.log('Error in GET votes query - ', error);
        })
})

router.get('/chart/:id', rejectUnauthenticated, (req, res) => {
    console.log('req.params.id in get votes - ', req.params.id);
    const sqlText = `
        SELECT * FROM "answers"
        WHERE "question_id" = $1;`;
    pool.query( sqlText, [req.params.id])
        .then((results) => {
            console.log('Fetched chart votes: ', results.rows)
            res.send(results.rows); })
        .catch((error) => {
            console.log('Error in GET CHART votes query - ', error);
        })
})

module.exports = router;