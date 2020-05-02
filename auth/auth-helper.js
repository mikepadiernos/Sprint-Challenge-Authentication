const db = require('../database/dbConfig.js');

function getAll() {
	return db('users')
}

function add(user) {
	return db('users')
		.insert(user)
}

function findBy(user) {
	return db('users')
		.where(user)
		.first()
}

function findById(id) {
	return db('users')
		.where({ id })
		.first()
}

function remove(id) {
	return db('users')
		.where({ id })
		.first()
		.del();
}

function updateUser(id, changes) {
	return db('users')
		.where({ id })
		.update(changes, '*').returning("*");
}

module.exports = {
	getAll,
	findById,
	findBy,
	add,
	remove,
	updateUser
}
