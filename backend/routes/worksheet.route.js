const express = require('express');
const {
	getWorksheets,
	getWorksheetById,
	updateWorksheetById,
    createWorksheet,
	deleteWorksheetById,
	getWorksheetByInstructor,
} = require('../controllers/worksheet.controller.js');
const router = express.Router();

//Get
router.get('/', getWorksheets);
router.get('/:id', getWorksheetById);
router.get('/instructor/:instructorId', getWorksheetByInstructor);

// ? denotes a query string
// ?filter= or //?sort=<value>&filter=<value>

//Create
router.post('/', createWorksheet);

//Update
router.put('/:id', updateWorksheetById);

//Delete
router.delete('/:id', deleteWorksheetById);

module.exports = router;
