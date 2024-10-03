import express from 'express';
import {
	getWorksheets,
	getWorksheetById,
	updateWorksheetById,
	createWorksheet,
	deleteWorksheetById,
} from '../controllers/worksheet.controller.js';
const router = express.Router();

//Get
router.get('/', getWorksheets);
router.get('/:id', getWorksheetById);

// ? denotes a query string
// ?filter= or //?sort=<value>&filter=<value>

//Create
router.post('/', createWorksheet);

//Update
router.put('/:id', updateWorksheetById);

//Delete
router.delete('/:id', deleteWorksheetById);

export default router;
