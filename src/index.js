import express from 'express';
import bodyParser from  'body-parser';
import mongoose from 'mongoose';
import http from 'http';
import passport from  'passport';
import User from './models/user';
const cors = require('cors')
const router = require('./routes/routes')
const LocalStrategy = require('passport-local').Strategy
const path = require('path')

require('dotenv').config()


const app = express()
const server = http.createServer(app);
const io = require('socket.io')(server);


const mongodbUri = process.env.DB_URL;
mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  auth: {
    user: 'kilu',
    password: 'P@$$w0rd'
  }
})
const conn = mongoose.connection;    
conn.on('error', console.error.bind(console, 'connection error:')) 
 
conn.once('open', () =>{
 console.log('connected to adatabase')                       
})



app.use(bodyParser.json({
    limit: process.env.LIMIT
}));
app.use(bodyParser.urlencoded({ extended: true }))

app.use(passport.initialize());
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, User.authenticate() ));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(cors())

io.on('connection', (socket) => {
    socket.on('vote', (data) => {
        io.emit('vote', data);
    })
    socket.on('COMMENT', (data)=> {
        io.emit('COMMENTED', data)
    })
})


router(app);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, "ui", "dist")))
}
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "ui", "dist", "index.html"))
})

if (!module.parent) {
    server.listen(process.env.PORT, (err)=> {
        if (err) return err;
        console.log(process.env.PORT);
    });
}
module.exports = app

