const express = require('express');
const {
    getGroupsByInstructor,
    createGroup,
    getWorksheetsByGroupId,
    getGroupById
} = require('../controllers/group.controller');
const router = express.Router();

router.get('/instructor/:id', getGroupsByInstructor);
router.get('/:id', getGroupById);
router.get('/:id/worksheets', getWorksheetsByGroupId);


router.post('/', createGroup);

module.exports = router;