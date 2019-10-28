const express = require('express');
const cors = require('cors');
const db = require('./data/db');

const app = express();

app.use(express.json());
app.use(cors());

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

app.post('/api/users', (req,res) => {
    const user = req.body;

    if(user.name && user.bio){
        db.insert(user)
        .then(data => {
            db.findById(data.id).then(createdUser=> {
                res.status(200).json(createdUser)
            })
        })
        .catch(err => {
            res.status(500).json({
                error: "There was an error while saving the user to the database"
            })
        })
    } else {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
    }
   
})

app.put('/api/users/:id', (req, res)=>{
    const update = req.body;
    const id = req.params.id;

    if(update.name && update.bio){
        db.update(id,update)
        .then(user => {
            if(user){
                db.findById(id).then(updatedUser=> {
                    res.status(200).json(updatedUser)
                })
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist."
                })
            }
        })
        .catch( err => {
            res.status(500).json({
                error: "The user information could not be modified."
            })
        })
    } 
    else {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
    } 
})


app.delete('/api/users/:id', (req, res)=>{
    const id = req.params.id;

    db.remove(id)
        .then(data => {
            if(data){
                res.status(200).json({
                    message: "user deleted"
                })
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist."
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The user could not be removed"
            })
        })
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log('server listening on ' + (process.env.PORT || 3000))
});