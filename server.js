const express = require("express");
const inputCheck = require('./utils/inputCheck');
const { resourceLimits } = require("worker_threads");
const db = require('./db/connection');
const apiRoutes = require("./routes/apiRoutes");

const PORT = process.env.PORT || 3001;
const app = express();


//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//use apiRoutes
app.use('/api', apiRoutes);


//Default response for any other request (Not Found)
app.use((req,res) => {
    res.status(404).end();
});

//connection function
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

//start sever after DB connection
db.connect(err => {
    if(err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});