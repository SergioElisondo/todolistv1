
// INITIAL SETUP IN NOTES PAD NOTES COVERS ALL OF THIS FROM HERE including mongoDB setup  START----

const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()

// dbConnectionStr = 'mongodb+srv://yuki:yukii@cluster0.qkej8.mongodb.net/todo?retryWrites=true&w=majority',
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Hey, connected to ${dbName} database`)
        db = client.db(dbName) // anywhere you see 'db' that's the connection to the database -- also when connceted to database, we store that into this variable
    })
    .catch(err => { 
        console.log(err) // we do a .catch in case there is an error, it will tell it what it was
    })

// TO HERE   END----



    // ONCE SERVER IS FULLY SET UP AS IT IS ABOVE, YOU ARE READY TO ROCK -- do a simple GET next (code above is acting like a template)

// 'MIDDLEWARE' below

// ALWAYS USE THIS ORDER of MIDDLEWARES
// step 4 set up "view engine" -- out app is set up to use EJS files
app.set('view ending', 'ejs')
// this is AFTER server set up!! now we gotta set up a USE -- what the server is going to 'use'
// step 2
app.use(express.static('public')) //anything that goes in 'public' folder, our server can serve up -- aka our static MAIN.JS file can still be found and read because of this
// step 3 these enable us to look at and use application by pulling information out of requests
app.use(express.urlencoded({ extended: true}))
app.use(express.json())



// step 5 ALL COMMENTS INCLUDED
// '/' <--- this is the get request and the MAIN ROUTE
// app.get('/', (req, res)=>{ // "when we hear route aka '/', this is what happens () => {}"  AND req = request, res = response
//    // step 6 add db.collection('')
//    db.collection('todos').find().toArray()// THIS IS A PROMISE --- find() will find all of those 'todos' and toArray() turns them into an array -- ALWAYS after a PROMISE, use a .then
//    // step 7
//    .then(data => { // 'data' will the data we got as an array from the database - now we want to send this into the 'render' below
//         //step 8 is adding zebra - 'zebra' will now always be "data" and 'data' is the array of info from the database 
//         // zebra: data is a KEY:VALUE pair
//         res.render('index.ejs', {zebra: data}) // SPITS OUT HTML part of step 5 this helps server up out EJS file -- we are creating EJS NOW at this point!!
//    })
// }) 

// STEP 5.1 no comments
app.get('/', async (req,res)=>{
    const todoItems = await db.collection('todos').find().toArray()
    const itemsLeft = await db.collection('todos').countDocuments({completed: false})
    res.render('index.ejs', {zebra: todoItems, left: itemsLeft})
})




// step 9 GRAB all li's in database with a for loop or forEach() method in INDEX.EJS -- go there

// step 10 ADD the DELETE span in index.ejs but needs eventListener from client side -- add eventListener to MAIN.JS

// step 11 create main.js in 'public' folder and add the script to index.ejs

// step 12 add class of 'del' in span of Delete in index.ejs

// step 13.1 adding a app.delete (place it ABOVE the app.listen)

// step 14 adding condition for marking completed or NOT completed in INDEX.EJS

// step 15 set up API to hear PUT -- app.put ABOVE app.delete


// step 6 set up INDEX.EJS file


// step 7 ALL COMMENTS  after comma means "once it hears request, do something"
// you want to send this data to the server /database
// app.post('/createTodo', (req, res)=>{ // this starts a "promise"
//     //console.log(req) this shows a ton of info from PROPERTY of request, but you want BODY from it
//     //console.log(req.body) now, go deeper, you want to grab from 'todoItem'
//     //console.log(req.body.todoItem) now only grabs DATA INPUT from FORM in INDEX.EJS
//     db.collection('todos').insertOne({todo: req.body.todoItem, completed: false }) // this method built in from mongoDB enables us to insert a document into our collection
//     // completed: false because you don't want your app to start TRUE and have stuff already completed

//     // step 8 let's add out .then
//     .then(result =>{
//         console.log('todo has been added') //
//         res.redirect('/') // refresh page -- this says that once the reponse has been made, redirect to the main page
//     })
// })


// STEP 7.1 NO comments
app.post('/createTodo', (req, res)=>{
    db.collection('todos').insertOne({todo: req.body.todoItem, completed: false})
    .then(result =>{
        console.log('Todo has been added!')
        res.redirect('/')
    })
})




//choose route which is /markComplete, then get request, get response
// another mongoDB method ".updateOne" and takes in a bunch of stuff
app.put('/markComplete', (req, res)=>{
    db.collection('todos').updateOne({todo: req.body.rainbowUnicorn},{
        $set: {
            completed: true
        }
    })
    .then(result =>{
        console.log('Marked Complete')
        res.json('Marked Complete')
    })
})


// STEP 17 making UNDO which is the same set up as others, just chaning the directory and completed to FALSE
app.put('/undo', (req, res)=>{
    db.collection('todos').updateOne({todo: req.body.rainbowUnicorn},{
        $set: {
            completed: false
        }
    })
    .then(result =>{
        console.log('Marked Complete')
        res.json('Marked Complete')
    })
})




// step 13.2 adding app.delete THIS ONE HAS COMMENTS
// app.delete('/deleteTodo', (req, res)=>{ // deleteTodo is the route that we use and we need to 'request' it and 'respond' to it
//     console.log(req.body.rainbowUnicorn)// make sure it's actually grabbing the text do this to see what is happening first
//     db.collection('todos').deleteOne({todo: req.body.rainbowUnicorn}) // deleteOne is a mongoDB method -- you pass in an object and it will try and find a match -- the syntax is 'todo is equal to req.body.Unicorn
//     .then(result => { // this is the result of what happens
//         console.log('Deleted Todo') // show in the console what happened
//         res.json('Deleted It') // this answers the fetch
//     })
//     .catch(err => console.log(err)) // to see what is wrong in case something is off
// }) 

// step 13.3 NO comments in this DELETE

app.delete('/deleteTodo', (req, res)=>{
    db.collection('todos').deleteOne({todo:req.body.rainbowUnicorn})
    .then(result =>{
        console.log('Deleted Todo')
        res.json('Deleted It')
    })
    .catch( err => console.log(err))
})

// STEP 1 this was added early from the start, BUT this listener will always get pushed down as code gets added
app.listen(process.env.PORT || PORT, () =>{
    console.log('Server is Running you better catch it')
})