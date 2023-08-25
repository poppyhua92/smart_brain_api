
const handleSignin = (db, bcrypt) => (req, res) => {
	const {email, password} = req.body;
	if (!email || !password) {
		return res.status(400).json('incorrect form submission');
	}
//Load hash from your password DB.
	db.select('email', 'hash').from('login')
	.where('email', '=', email)
	.then(data => {
		const isValid = bcrypt.compareSync(password, data[0].hash);
		//console.log(isValid);
		if (isValid){
			return db.select('*').from('users')
			.where('email','=',email)
			.then(users => {
				// console.log(user);
				res.json(users[0])
			})
			.catch(err => { console.log(err); res.status(400).json('unable to get user') })
		}
	})
	.catch(err => res.status(400).json('wrong credentials'))
	//when we send data from front-end using json, we will need to parse it
	//in postman, post body raw json {"email": "john@gmail.com", "password": "cookies"} to localhost:3000/signin
	//res.send('sighing');//can use send to send json, or res.json('singing')
}


module.exports = {
	handleSignin: handleSignin
}
