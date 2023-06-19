const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFiles');

const router = Router();

// call the controller to get allData
const { getAllData, getClasses, getTainingAndTestingData } = require('../controllers/setupDataset.controller');

/** 
 * @route GET api/setup/all-data
 * @desc get all the data from the dataset file
 * @access Public
 * @returns {object} 200 | 400 - Bad request | 500 - Server error
*/
router.get('/all-data',
    getAllData
);

/**
 * @route GET api/setup/unique-classes
 * @desc get the unique classes from the dataset file
 * @access Public
 * @param {object} irisData - the data from the dataset file
 * @returns {object} 200 | 400 - Bad request | 500 - Server error
 */
router.post('/unique-classes',
    [
        check('irisData', 'The irisData is required').not().isEmpty(),
        validateFields
    ],
    getClasses
);

/**
 * @route POST api/setup/training-testing-data
 * @desc separate the data into training and testing data
 * @access Public
 * @param {object} irisData - the data from the dataset file
 * @param {object} uniqueClasses - the unique classes from the dataset file
 * @returns {object} 200 | 400 - Bad request | 500 - Server error
 */
router.post('/training-testing-data',
    [
        check('irisData', 'The irisData is required').not().isEmpty(),
        validateFields,
        check('uniqueClasses', 'The uniqueClasses is required').not().isEmpty(),
        validateFields,
    ],
    getTainingAndTestingData
);


module.exports = router;