const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.post('/create', rejectUnauthenticated, (req, res) => {
    const migs = req.body;
    console.log('req.body in create MIGS POST - ', migs);
  
    const sqlText = `
        INSERT INTO "migs" ("persona", "legal_name", "email")
        VALUES ($1, $2, $3);`;
    pool.query( sqlText, 
        [migs.persona, migs.legalName, migs.email] )
    .then((results) => {
        console.log('MIGS Created!');
        res.sendStatus(200) 
    })
    .catch((error) => {
        console.log('Error in POST new MIGS - ', error);
    }) 
});

router.get('/all', rejectUnauthenticated, (req, res) => {
    console.log('Req.user id in GET all MIGS - ', req.user.id);

    const sqlText = `
        SELECT * FROM "migs"
        ORDER BY "persona" DESC;`;
    pool.query(sqlText)
    .then((result) => {
        console.log('GET ALL MIGS - ', result.rows);
        res.send(result.rows); })
    .catch((error) => {
        console.log('Error in getting all MIGS - ', error);
        res.sendStatus(500);
    })
})

router.delete('/delete/:id', rejectUnauthenticated, async (req, res) => {
    console.log('req.params in DELETE migs - ', req.params.id);
    const migsId = req.params.id;
    const sqlText = `DELETE FROM "migs" WHERE "id" = $1;`;
    pool.query(sqlText, [migsId])
    .then((result) => {
        console.log('Migs Deleted - ', migsId);
        res.sendStatus(200)
    })
    .catch((error) => {
        res.sendStatus(500) 
        console.log('Error in DELETE migs - ', error);
    })
})

router.put('/update/:id', rejectUnauthenticated, async (req, res) => {
    console.log('req.params in UPDATE migs - ', req.body);
    const migs = req.body;
    const sqlText = `
        UPDATE "migs" 
        SET "persona" = $1,
        "legal_name" = $2,
        "email" = $3
        WHERE "id" = $4;`;
    pool.query(sqlText, [migs.persona, migs.legalName, migs.email, migs.id])
    .then((result) => {
        console.log('Migs Updated - ', migs);
        res.sendStatus(200)
    })
    .catch((error) => {
        res.sendStatus(500) 
        console.log('Error in UPDATE migs - ', error);
    })
})

module.exports = router;