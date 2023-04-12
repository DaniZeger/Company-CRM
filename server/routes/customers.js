const express = require('express');
const router = express.Router();
const customers = require('../controllers/customers');

// To get list of costumers to work with you can open Postman and insert -
// PUT http://localhost:3000/customers/init
router.put('/init', customers.reset)

router.get('/', customers.getAll);
router.get('/:id', customers.getOne);

router.post('/', customers.addNew);
router.put('/:id', customers.updateDetails);
router.delete('/:id', customers.deleteOne);

module.exports = router;
