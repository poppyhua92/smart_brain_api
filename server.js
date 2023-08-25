
//--> res= this is working
//signin --> post = success/fail
//register --> post = user
//profile/: userId --> GET = user
//image --> put --> user
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
//const profile = require('./controllers/profile');
//const image = require('./controllers/image');

//pg is postgre
//127.0.0.1 local host home
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'poppyhua',
    password : '',
    database : 'smart-brain'
  }
});

//in order to access data in users, need to use .then
// db.select('*').from ('users').then(data => {
// 	console.log(data);
// });

const app = express();

app.use(bodyParser.json());
app.use(cors())


// const database = {
	// users: [
	// {
	// 	id: '123',
	// 	name: 'John',
	// 	email: 'john@gmail.com',
	// 	password: 'cookies',
	// 	entries: 0,
	// 	joined: new Date()
	// }, {
	// 	id: '124',
	// 	name: 'Sally',
	// 	email: 'sally@gmail.com',
	// 	password: 'cookies',
	// 	entries: 0,
	// 	joined: new Date()
	// 	}
	// ],
	// login: [
	// {
	// 	id: '987',
	// 	hash: '',
	// 	email: 'john@gmail.com' 
	// }]
// // }

app.get('/', (req,res) => {
	// res.send(db.users);
	res.send('success');
})

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

	//use knex instead of:
	// database.users.push({		
	// 	id: '125',
	// 	name: name,
	// 	email: email,
	// 	password: password,
	// 	entries: 0,
	// 	joined: new Date()
	// })

//in postman, post body raw json {    "name": "Ann", "email": "ann@gmail.com","password": "cookies"}
//to localhost:3000/register

//app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	db.select('*').from('users')
	.where({id})
	.then(user => {
		if (user.length){
			res.json(user[0])
		} else {
			res.status(400).json('Not found')
		}
	}).catch(err => res.status(400).json('error getting user'))
	// if 
}) 
//with this syntax means we can enter in our browser anything
//and we will be able to grab this 'id'.we can grab the id through 'req.params' property

//app.put('/image', (req, res) => {image.handleImage(req, res, db)})
 app.put('/image',(req, res) => {
	const{ id } = req.body;
  	db('users').where('id', '=', id)
  	.increment('entries', 1)
  	.returning('entries')
  	.then(entries => {
	res.json(entries[0]);
  	})
  	.catch(err => res.status(400).json('unable to get entries'))
})
//in postman, 'post' localhost:3000/image, body, {"id" : "123"}. Each click of send,
//entries will increase by 1




app.listen(3000,() => {
	console.log('app is running on port 3000');
})

