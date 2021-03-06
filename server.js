const express = require('express')
const parser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const register = require('./Controllers/register')
const signin = require('./Controllers/signin')
const profile = require('./Controllers/profile')
const image = require('./Controllers/image')


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'faisal',
      password : 'allahuakbar',
      database : 'smart_brain'
    }
  });

  

const app = express();
app.use(cors());
app.use(parser.json());



app.get('/',(req,res) =>{
    db.select('*').from('users')
    .then(user => res.json(user));
})

app.post('/signin', (req,res) => {
    signin.handleSignin(req,res,db,bcrypt)
}) 


app.post('/register' , (req,res) => { 
    register.handleRegister(req,res,db,bcrypt)
})


app.get('/profile/:id', (req,res) => {
    profile.handleProfile(req,res,db)
})

app.put('/image' , (req,res) => {
    image.handleImage(req,res,db)
})

app.post('/imageUrl', (req,res) => {
    image.handleApicall(req,res)
})

app.listen(3000, () => {
    console.log('app is running on the port 3000')
})