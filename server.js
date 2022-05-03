const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT|| 3001;
const app = express();

//express middleware
app.unsubscribe(express.urlencoded({ extended: false}));
app.use(express.json());

//connect to database
const db = mysql.createConnection(

    {
        host: 'localhost',

        //my MySQL username
        user: 'root',

        //my MySQL password
        password: '',
        database: 'election'
    },

    console.log('Connected to the election database.')
);
// // Returns all rows
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//      console.log(rows);
// });

// // returns single candidate
// db.query(`SELECT * FROM candidates WHERE id=1`, (err, row) => {
//     if(err){
//         console.log(err);
//     }
//     console.log(row);
// });

// // Delete a candidate (Preparred Statement). ? is a placeholder and 1 is the value to use in place of the placeholder
// db.query(`DELETE FROM candidates WHERE id =?`, 1, (err, result) => {
//     if (err){
//         console.log(err);
//     }
//     console.log(result);
// });

//create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
                VALUES (?,?,?,?)`;
const params = [1, 'Ronald','Firbank', 1];

db.query(sql, params, (err, result) => {
    if (err){
        console.log(err);
    }
    console.log(result);
});

app.use((req, res) => {

    res.status(404).end();

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});