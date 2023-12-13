const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.post('/create', rejectUnauthenticated, (req, res) => {
    const survey = req.body;
    console.log('req.user.id in create survey - ', req.user.id);
    console.log('req.body in create survey POST - ', req.body);
  
    const sqlText = `
        INSERT INTO "surveys" ("name", "end_date", "user_id", "status")
        VALUES ($1, $2, $3, $4);`;
    pool.query( sqlText, 
        [survey.name, survey.end_date, req.user.id, survey.status] )
    .then((results) => {
        console.log('Survey Created!');
        res.sendStatus(200) 
    })
    .catch((error) => {
        console.log('Error in POST new survey - ', error);
        res.sendStatus(500);
    }) 
});

router.get('/new', rejectUnauthenticated, (req, res) => {
    console.log('Req.user id in GET new survey - ', req.user.id);

    const user = req.user
    
    const sqlText = `
        SELECT * FROM "surveys"
        WHERE "surveys"."user_id" = $1
        ORDER BY "surveys"."id" DESC LIMIT 1;`;
    pool.query(sqlText, [user.id])
    .then((result) => {
        console.log('Newest survey GET - ', result.rows[0]);
        res.send(result.rows[0]); }) 
    .catch((error) => {
        console.log('Error in getting newest surveys - ', error);
        res.sendStatus(500);
    })
})

router.get('/all', rejectUnauthenticated, (req, res) => {
    console.log('Req.user id in GET all surveys - ', req.user.id);

    const sqlText = `
        SELECT * FROM "surveys"
        ORDER BY "surveys"."id" DESC;`;
    pool.query(sqlText)
    .then((result) => {
        console.log('GET ALL Surveys - ', result.rows);
        res.send(result.rows); })
    .catch((error) => {
        console.log('Error in getting all surveys - ', error);
        res.sendStatus(500);
    })
})

router.get('/details/:id', rejectUnauthenticated, (req, res) => {
    console.log('req.params.id in GET survey details - ', req.params.id);
    const sqlText = `
        SELECT * FROM "surveys"
        WHERE "surveys"."id" = $1;`;
    pool.query( sqlText, [req.params.id] )
        .then((results) => {
            res.send(results.rows[0]); })
        .catch((error) => {
            console.log('Error in SELECT survey query - ', error);
        })
})

router.get('/details/questions/:id', rejectUnauthenticated, (req, res) => {
    console.log('req.params.id in GET question details - ', req.params.id);
    const sqlText = `
        SELECT
        "questions"."id", 
        "question_text"
        FROM "questions"
        WHERE "questions"."survey_id" = $1
        ORDER BY "questions"."id" ASC;`;
    pool.query( sqlText, [req.params.id] )
        .then((results) => {
            console.log('results from get details questions - ', results.rows)
            res.send(results.rows); })
        .catch((error) => {
            console.log('Error in SELECT questions query - ', error);
        })
})

router.get('/details/answers/:id', rejectUnauthenticated, (req, res) => {
    console.log('req.params.id in GET answer details - ', req.params.id);
    const sqlText = `
        SELECT
        "answers"."id", 
        "answers"."question_id",
        "answer_text" AS "text"
        FROM "answers"
        WHERE "answers"."survey_id" = $1
        ORDER BY "answers"."id" ASC;`;
    pool.query( sqlText, [req.params.id] )
        .then((results) => {
            console.log('results from get details answers - ', results.rows)
            res.send(results.rows); })
        .catch((error) => {
            console.log('Error in SELECT questions query - ', error);
        })
})

router.delete('/delete/:id', rejectUnauthenticated, async (req, res) => {
    console.log('req.params in DELETE survey - ', req.params.id);
    const surveyId = req.params.id;
    const deleteVotes = `DELETE FROM "votes" WHERE "survey_id" = $1;`;
    await pool.query(deleteVotes, [surveyId])
    // Delete associated answers
    const deleteAnswers = `DELETE FROM "answers" WHERE "survey_id" = $1;`;
    await pool.query(deleteAnswers, [surveyId])
    // Delete associated questions
    const deleteQuestions = `DELETE FROM "questions" WHERE "survey_id" = $1;`;
    await pool.query(deleteQuestions, [surveyId])
    // Delete survey itself from survey table
    const deleteSurvey = `DELETE FROM "surveys" WHERE "id" = $1;`;
    await pool.query(deleteSurvey, [surveyId])
    .then((results) => {
        res.send(results.rows); })
    .catch((error) => {
        console.log('Error in DELETE survey - ', error);
    })
})

module.exports = router;