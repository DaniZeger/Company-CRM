const express = require('express');
const router = express.Router();
const employees = require('../controllers/employees');

// To get list of costumers to work with you can open Postman and insert -
// PUT http://localhost:3000/employees/init
router.put('/init', employees.reset)

router.get('/', employees.getAll);
router.get('/:id', employees.getOne);

router.post('/', employees.addNew);
router.put('/:id', employees.updateDetails);
router.delete('/:id', employees.deleteOne);

module.exports = router;
