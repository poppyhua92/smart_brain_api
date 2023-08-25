const handleProfileGet(req, res, db) => {
	const { id } = req.params;
	db.select('*').from('users')
	.where({id})
	.then(user => {
		res.json(user[0]);
	})
	// if (!found) {
	// 	res.status(400).json('not found');
	// }
}

module.exports = {
	handleProfileGet
}