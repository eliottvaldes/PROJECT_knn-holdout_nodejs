// function to count the amount of correct predictions
const calculateCorrectPredictions = (testResults) => {
    // define the variable to store the correct predictions
    let correctPredictions = 0;

    // loop through the testResults
    testResults.forEach(result => {
        const { class: classExpected, prediction } = result;
        // verify if the classExpected is equal to the class of the first neighbor
        if (classExpected === prediction[0].class) {
            // increment the correctPredictions
            correctPredictions++;
        }
    });

    // return the correctPredictions
    return correctPredictions;
}

// function to calculate the accuracy
const getAccuracy = (correctPredictions, testDataLength) => {
    // calculate the accuracy
    return (correctPredictions / testDataLength);
}


module.exprots = {
    calculateCorrectPredictions,
    getAccuracy,
}