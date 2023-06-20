// require request and response from express module 
const { request, response } = require("express");

const { readFile, getUniqueClasses, separateData } = require('../helpers/datasetTreatment');
const { calculateEuclideanDistance } = require('../helpers/euclidianDistance');
const { calculateCorrectPredictions, getAccuracy } = require('../helpers/calculateResults');

// Define the fileName and the path to get the data
let fileName = '';
fileName = '/../assets/files/iris.data';
// fileName = '/../assets/files/iris-test.data';
const fullPath = __dirname + fileName;



// funcion to calculate distances of each test object to the each training object
const getNeighbors = (trainingData, testData, kNeighbors = 1) => {

    const dataDistances = [];

    // calculate the euclidean distance of the test object to each training object
    testData.forEach(irisTest => {

        // define the array to store the distances
        const distances = [];

        // loop through the trainingData
        trainingData.forEach(irisTraining => {
            // call the function to calculate the euclidean distance and save it in a variable
            const distance = calculateEuclideanDistance(irisTest, irisTraining);

            // push the distance into the distances array
            distances.push({
                class: irisTraining.class,
                distance: distance
            });
        })

        // sort the distances by distance
        const sortedDistances = distances.sort((a, b) => a.distance - b.distance);

        // push the save object into the dataDistances array
        // return the kNeighbors first elements of the sortedDistances array
        dataDistances.push({
            class: irisTest.class,
            prediction: sortedDistances.slice(0, kNeighbors)
        });


    });

    // return the dataDistances array
    return dataDistances;
}

// function to run the KNN model - trining and test data
const runKnnModel = async (req = request, res = response) => {

    try {

        // read the content of the file
        const irisData = await readFile(fullPath);

        // call the function that gives the uniques classes of the all data
        const uniqueClasses = getUniqueClasses(irisData);

        // call the function to separate the irisData in arrays: training and test data
        const { trainingData, testData } = separateData(irisData, uniqueClasses);

        // define the number of neighbors
        const kNeighbors = 1;

        // call the function to calculate distances        
        const testResults = getNeighbors(trainingData, testData, kNeighbors);


        // return the response with the testResults
        res.status(200).json({
            ok: true,
            trainingData,
            testData,
            testResults,
        });



    } catch (error) {
        console.log(error);
        // return the response with the error message
        res.status(500).json({
            ok: false,
            msg: 'Error running the KNN(K=1) model'
        });
    }




}

// function to calculate the performance of the KNN model
const knnModelPerformance = (req = request, res = response) => {
    // get the testResults from the request body
    const { testResults } = req.body;

    const totalTesting = testResults.length;

    try {
        // call the function to calculate the correct predictions
        const correctPredictions = calculateCorrectPredictions(testResults);

        // call the function to calculate the accuracy
        const accuracy = getAccuracy(correctPredictions, totalTesting);

        // return the response with the accuracy
        res.status(200).json({
            ok: true,
            totalTesting,
            correctPredictions,
            accuracy,
        });

    } catch (error) {
        console.log(error);
        // return the response with the error message
        res.status(500).json({
            ok: false,
            msg: 'Error calculating the performance of the KNN(K=1) model'
        });
    }

}


// function to create prediction
const newPrediction = (req = request, res = response) => {
    // get the trainingData and predictionData from the request body
    const { trainingData, predictionData } = req.body;

    // define the prediction array
    const prediction = [
        {
            class: 'Unknown',
            ...predictionData
        }
    ]

    // define the number of neighbors
    const kNeighbors = 1;

    try {
        // call the function to calculate distances        
        const predictionResultsAllData = getNeighbors(trainingData, prediction, kNeighbors);
        // get only the prediction values
        const predictionResults = predictionResultsAllData[0].prediction[0];

        // return the response with the predictionResults
        res.status(200).json({
            ok: true,
            predictionResults,
        });
    } catch (error) {
        console.log(error);
        // return the response with the error message
        res.status(500).json({
            ok: false,
            msg: 'Error creating a new prediction'
        });
    }

}

module.exports = {
    runKnnModel,
    knnModelPerformance,
    newPrediction,
}