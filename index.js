const express = require('express');
const db = require('./data/db');

const app = express();

app.get('/api/users', (req, res) => {
    db.find()
        .then(data => {
            if(data){
                res.status(200).json(data)
            } else {
                res.status(404).json({
                    error: "No users exist"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "There was an error while saving the user to the database"
            })
        })
});

app.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    db.findById(id)
        .then(data => {
            if(data){
                res.status(200).json(data)
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist."
                })
            }       
        })
        .catch(err => {
            res.status(500).json({
                error: "There was an error while saving the user to the database"
            })
        })
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log('server listening on ' + (process.env.PORT || 3000))
});