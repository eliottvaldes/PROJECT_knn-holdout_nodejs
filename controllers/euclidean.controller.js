// require the helper functions
const { calculateEuclideanDistance } = require('../helpers/euclidianDistance');


// function to calculate the mean of the training data by class
const calculateMeanByClass = (uniqueClasses, trainingData) => {
    // define the array to store the mean by class
    const meanByClass = [];

    // loop through the unique classes
    uniqueClasses.forEach((uniqueClass) => {
        // filter the trainingData by class
        const trainingDataByClass = trainingData.filter(item => item.class === uniqueClass);

        // define the object to store the mean by class
        const meanByClassObj = {
            class: uniqueClass,
            sepalLength: 0,
            sepalWidth: 0,
            petalLength: 0,
            petalWidth: 0,
        }

        // loop through the trainingDataByClass
        trainingDataByClass.forEach((item) => {
            // sum the values of each property
            meanByClassObj.sepalLength += parseFloat(item.sepalLength);
            meanByClassObj.sepalWidth += parseFloat(item.sepalWidth);
            meanByClassObj.petalLength += parseFloat(item.petalLength);
            meanByClassObj.petalWidth += parseFloat(item.petalWidth);
        })

        // calculate the mean of each property
        meanByClassObj.sepalLength = meanByClassObj.sepalLength / trainingDataByClass.length;
        meanByClassObj.sepalWidth = meanByClassObj.sepalWidth / trainingDataByClass.length;
        meanByClassObj.petalLength = meanByClassObj.petalLength / trainingDataByClass.length;
        meanByClassObj.petalWidth = meanByClassObj.petalWidth / trainingDataByClass.length;

        // push the meanByClassObj into the meanByClass array
        meanByClass.push(meanByClassObj);

    })

    // return the meanByClass array
    return meanByClass;
}


// holdOutMatch function
const holdOutMatch = (testData, meanByClass) => {
    // define the array to store the test model
    const testModel = [];

    // loop through the testData
    testData.forEach(iristTest => {
        const distances = [];
        meanByClass.forEach(item => {
            // calculate the euclidean distance of the test object to the trainingObj of each class
            const distance = calculateEuclideanDistance(iristTest, item);
            // push the distance into the distances array
            distances.push({
                class: item.class,
                distance
            });
        });

        // sort the distances array
        distances.sort((a, b) => a.distance - b.distance);


        // define the prediction object with the class and the distance. use the first element of the distances array
        const prediction = [{
            class: distances[0].class,
            distance: distances[0].distance
        }]

        // push the testModelObj into the testModel array
        testModel.push({
            class: iristTest.class,
            prediction
        });

    });

    // return the testModel array
    return testModel;
}


module.exports = {
    calculateMeanByClass,
    holdOutMatch,
}