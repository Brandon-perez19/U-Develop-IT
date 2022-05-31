const express = require('express');
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');
const router = express.Router();

//retreives all voters
router.get('/voters', (req, res) => {
    const sql = 'SELECT * FROM voters ORDER BY last_name';

    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json ({
            message: 'success',
            data: rows
        });
    });
});

//selects single voter
router.get ('/voter/:id', (req, res) => {
    const sql = `SELECT * FROM voters WHERE id =?`;
    const params = [req.params.id];

    db.query(sql, params, (err, rows) => {
        if(err) {
            res.status(400).json({ error: err.message });
            return;
        } 
        res.json ({
            message: 'success',
            data: rows
        });
    });
});

//creates a voter
router.post('/voter', ({ body }, res) => {
    //data validation
    const errors = inputCheck(body, `first_name`, `last_name`, `email`);
    if(errors) {
        res.status(400).json({ error: errors});
        return;
    }

    const sql = `INSERT INTO voters (first_name, last_name, email) VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.email];

    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json ({ error: err.message});
            return;
        }
        res.json ({
            message: 'success',
            data: body
        });
    });
});

//update voters email
router.put('/voter/:id', (req, res) => {
    //data validation
    const errors = inputCheck(req.body, 'email');
    if(errors) {
        res.status(400).json({error : errors });
        return;
    }
    const sql = `UPDATE voters SET email = ? WHERE id = ?`
    const params = [req.body.email, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json ({
                message: 'Voter not found'
            });
        } else {
            res.json ({ 
                message: 'succes',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});

//delete a voter
router.delete('/voter/:id', (req, res) => {
    const sql = `DELETE FROM voters WHERE id = ?`;
// dont need array to hold params. costs memory
    db.query(sql, req.params.id, (err, result) => {
        if(err) {
            res.status(400).json({ error: res.message });
        } else if (!result.affectedRows){
            res.json({
                message: 'Voter Not Found'
            });
        } else {
            res.json ({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

module.exports = router;