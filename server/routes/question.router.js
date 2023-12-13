const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  router.post( '/create', rejectUnauthenticated, (req, res) => {
    console.log('Req.body in post question - ', req.body);
    
    const question = req.body;
    const sqlText = `
        INSERT INTO "questions" ("question_text", "survey_id")
        VALUES ($1, $2);`;
    pool.query(sqlText, 
        [question.questionText, question.surveyId])
    .then((results) => {
        console.log('Question Created - ', results.rows);
        res.sendStatus(201) })
    .catch((error) => {
        console.log('Error in POST new question - ', error);
        res.sendStatus(500);
    }) 
})

router.get('/get/:id', rejectUnauthenticated, (req, res) => {
    console.log('req.params in get questions - ', req.params);
    const question = req.params.id
    console.log('question before sqlText - ',question)
    const sqlText = `
        SELECT * FROM "questions"
        WHERE "survey_id" = $1
        ORDER BY "id" DESC;`;
    pool.query( sqlText, [req.params.id] )
        .then((results) => {
            // What is this sending back? Current blank on first question creation. 
            console.log('results in get QUESTIONS with surveyid - ', results.rows)
            res.send(results.rows); })
        .catch((error) => {
            console.log('Error in GET question query - ', error);
        })
})

module.exports = router;