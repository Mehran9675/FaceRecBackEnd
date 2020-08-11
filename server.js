const express = require('express');
const bodyParser = require('body-parser');
const Clarifai = require ('clarifai');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const apiApp = new Clarifai.App({
 apiKey: '2189951c5f0b49eca9f2a59266a9070f'
});


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '123',
    database : 'smartbrain'
  }
});


const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/api',(req,res) => {
      apiApp.models.predict(
      	Clarifai.FACE_DETECT_MODEL, req.body.input)
      	.then(data=>{
      		res.json(data);
      	})
      	.catch(err => res.status(400).json('API no work'))
  })


app.listen(process.env.port || 3000, ()=> {
	console.log('App is Running');
});