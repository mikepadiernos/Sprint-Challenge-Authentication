const router = require('express').Router();
const bc = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./auth-helper.js');
const middle = require('./auth-middleware.js');

const generate = middle.generator;

router.post('/register', (req, res) => {
  // implement registration
	const user = req.body;
	user.password = bc.hashSync(user.password, 8);

	db.add(user)
		.then(user => {
			res.status(201).json({success: true, message: "Registered User", user});
		})
		.catch(error => {res.status(500).json({success: false, message: "I'm sorry. I'm afraid I can't do that.", error})})
});

router.post('/login', (req, res) => {
  // implement login
	const {username, password} = req.body;

	db.findBy({username})
		.first()
		.then(user => {
			if (user && bc.compareSync(password, user.password)) {
				const token = generate(user);
				res.status(200).json({ success: true, message: `Welcome ${user.username}!`, token: token });
			} else {
				res.status(401).json({ success: false, message: 'Good. Well, why don\'t we take a five minute break?' });
			}
		})
		.catch(error => {
			res.status(500).json({success: false, message: "Open the pod bay doors, HAL.", error});
		});
});

module.exports = router;
