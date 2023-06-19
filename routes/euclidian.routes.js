const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFiles');

// import the controllers
const {
    runEuclidianModel,
    euclidianModelPerformance,
    newPrediction
} = require('../controllers/euclidean.controller');


const router = Router();


/** 
 * @route GET api/euclidian/run
 * @desc run the Euclidian model - get the testResults
 * @access Public
 * @returns {object} 200 | 400 - Bad request | 500 - Server error
*/
router.get('/run',
    runEuclidianModel
);


/**
 * @route POST api/euclidian/calculate-performance
 * @desc calculate the performance of the Euclidian model
 * @access Public
 * @param {object} testResults - the testResults to calculate the performance
 * @returns {object} 200 | 400 - Bad request | 500 - Server error
 */
router.post('/performance',
    [
        check('testResults', 'The testResults is required').not().isEmpty(),
        validateFields
    ],
    euclidianModelPerformance
);


/**
 * @route POST api/euclidian/create-prediction
 * @desc create a new prediction with the euclidian model
 * @access Public
 * @param {object} meanByClass - the meanByClass from the request body
 * @param {object} predictionData - the predictionData from the request body
 * @returns {object} 200 | 400 - Bad request | 500 - Server error
 */
router.post('/prediction',
    [
        check('meanByClass', 'The meanByClass is required').not().isEmpty(),
        validateFields,
        check('predictionData', 'The predictionData is required').not().isEmpty(),
        validateFields,
        check('predictionData.sepalLength', 'The predictionData.sepalLength is required').not().isEmpty(),
        check('predictionData.sepalWidth', 'The predictionData.sepalWidth is required').not().isEmpty(),
        check('predictionData.petalLength', 'The predictionData.petalLength is required').not().isEmpty(),
        check('predictionData.petalWidth', 'The predictionData.petalWidth is required').not().isEmpty(),
        validateFields,
    ],
    newPrediction
);



module.exports = router;