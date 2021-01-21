const express=require("express");
const Router=express.Router();
var pool = require('../db')

//Displaying All Events
Router.get("/",(req,res)=>{
        pool.getConnection((err, connection) => {
                if(err) throw err
                
                connection.query('SELECT * from events', (err, rows) => {
                    connection.release() // return the connection to pool
        
                    if (!err) {
                        res.send(rows)
                    } else {
                        console.log(err)
                    }
        
                    // if(err) throw err
                    console.log( rows);
                })
            })
})


// Displaying Event By Id
Router.get('/:id', function (req, res) {
        pool.getConnection((err, connection) => {
                if(err) throw err
                connection.query('SELECT * FROM events WHERE id = ?', [req.params.id], (err, rows) => {
                    connection.release() 
                    if (!err) {
                        res.send(rows)
                    } else {
                        console.log(err)
                    }
                    
                    console.log( rows);
                })
            })
     });

 // Inserting Event

Router.post('/', function (req, res) {

        pool.getConnection((err, connection) => {
                if(err) throw err
                
                const params = req.body
                console.log(params);
                connection.query('INSERT INTO events SET ?', params, (err, rows) => {
                connection.release() 
                if (!err) {
                    res.send(rows)
                    console.log("Inserted Successfully!")
                } else {
                    console.log(err)
                }
                
                console.log(rows)
        
                })
            })
}); 


//Updating The Event

Router.put('/:id', function (req, res) {

    pool.getConnection((err, connection) => {
            if(err) throw err
            
            const { eventName,eventDate} = req.body
            console.log(req.body);

            connection.query('UPDATE events SET eventName=?, eventDate=? where id=?', [eventName,eventDate,req.params.id], (err, rows) => {
            connection.release() 
            if (!err) {
                res.send(rows)
                console.log("Updated Successfully")
            } else {
                console.log(err)
            }
            
            console.log(rows)
    
            })
        })
}); 


//Deleting The Event

Router.delete('/:id', function (req, res) {

    pool.getConnection((err, connection) => {
            if(err) throw err
            
            
            console.log(req.body);

            connection.query('DELETE FROM events where id=?', [req.params.id], (err, rows) => {
            connection.release() 
            if (!err) {
                res.send("Deleted Successfully!")
            } else {
                console.log(err)
            }
            
            console.log(rows)
    
            })
        })
}); 

module.exports = Router;