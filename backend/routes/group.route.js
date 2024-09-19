const express = require('express');
const {
    removeWorksheetsFromGroup,
    deleteGroupById,
    getGroupsByInstructor,
    createGroup,
    getWorksheetsByGroupId,
    getGroupById,
    addWorksheetToGroups
} = require('../controllers/group.controller');
const router = express.Router();


//Get Groups
router.get('/instructor/:id', getGroupsByInstructor);
router.get('/:id', getGroupById);
router.get('/:id/worksheets', getWorksheetsByGroupId);

//Update group (add worksheets)
router.put('/addWorksheetToGroups', addWorksheetToGroups); //FIX THIS GROUPID should not be sent as JSON
router.put('/:id', removeWorksheetsFromGroup);

//Create group
router.post('/', createGroup);

//Delete group
router.delete('/:id', deleteGroupById);

module.exports = router;