// require the helper functions
const { calculateEuclideanDistance } = require('../helpers/euclidianDistance');


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


module.exports = {
    getNeighbors,    
}