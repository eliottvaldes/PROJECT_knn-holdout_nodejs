const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFiles');

const { runKnnModel, knnModelPerformance, newPrediction } = require('../controllers/knn.controller');

const router = Router();


/** 
 * @route GET api/knn/run-model
 * @desc run the KNN(K=1) model - get the testResults
 * @access Public
 * @returns {object} 200 | 400 - Bad request | 500 - Server error
*/
router.get('/run-model',
    runKnnModel
);

/**
 * @route POST api/knn/calculate-performance
 * @desc calculate the performance of the KNN(K=1) model
 * @access Public
 * @param {object} testResults - the testResults from the request body
 * @returns {object} 200 | 400 - Bad request | 500 - Server error
 */
router.post('/calculate-performance',
    [
        check('testResults', 'The testResults object is required').not().isEmpty(),
        validateFields,
    ],
    knnModelPerformance
);

/**
 * @route POST api/knn/create-prediction
 * @desc create a new prediction with the KNN(K=1) model
 * @access Public
 * @param {object} trainingData - the trainingData from the request body
 * @param {object} predictionData - the predictionData from the request body
 * @returns {object} 200 | 400 - Bad request | 500 - Server error
 */
router.post('/create-prediction',
    [
        check('trainingData', 'The trainingData is required').not().isEmpty(),
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