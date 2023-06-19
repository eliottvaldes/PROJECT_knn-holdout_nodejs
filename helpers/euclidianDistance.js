// function to calculate the euclidean distance of the test object to the trainingObj of each class
const calculateEuclideanDistance = (testObject, trainingObj) => {
    // calculate the euclidean distance of the test object to the trainingObj of each class
    const distance = Math.sqrt(
        Math.pow((parseFloat(testObject.sepalLength) - trainingObj.sepalLength), 2) +
        Math.pow((parseFloat(testObject.sepalWidth) - trainingObj.sepalWidth), 2) +
        Math.pow((parseFloat(testObject.petalLength) - trainingObj.petalLength), 2) +
        Math.pow((parseFloat(testObject.petalWidth) - trainingObj.petalWidth), 2)
    );

    return distance;

}

module.exports = {
    calculateEuclideanDistance,
}