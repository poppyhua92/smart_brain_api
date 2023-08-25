const handleImage(req, res, db) => {
	const{ id } = req.body;
	// console.log(id);
	// db.select('*').from('users')
	// .where({id})
	// .then(user => {
	// 	console.log(user[0]);
	// 	res.json(user[0]);
	// })
  	db('users').where('id', '=', id)
  	.increment('entries', 1)
  	.returning('entries')
  	.then(entries => {
	res.json(entries[0]);
  	})
  	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage
}