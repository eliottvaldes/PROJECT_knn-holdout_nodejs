const csv = require('csv-parser');
const fs = require('fs');



// function to read the content of the file and parse it into an array of objects
const readFile = async (fullPath) => {
    const results = [];
    // return a Promise to be able to use async/await
    return new Promise((resolve, reject) => {
        fs.createReadStream(fullPath)
            .pipe(csv())
            .on('data', (data) => {
                // define the object structure
                const iris = {
                    class: data.class,
                    sepalLength: data.sepal_length,
                    sepalWidth: data.sepal_width,
                    petalLength: data.petal_length,
                    petalWidth: data.petal_width,
                }
                // push the object into the array
                results.push(iris);
            })
            .on('end', () => {
                // return the Promise with the array of objects
                resolve(results);
            });
    })

}


// function to get the UNIQUE classes of the all data
const getUniqueClasses = (irisData) => [...new Set(irisData.map(item => item.class))];


// function to separate the irisData in arrays: training and test data
// the training data is 70% of the irisData and the test data is 30% of the irisData
// the training data must be separated by class in the same proportion
// the separation is done using the unique classes of the irisData independently
const separateData = (irisData, uniqueClasses) => {
    // define the arrays to store the training and test data
    const trainingData = [];
    const testData = [];

    // loop through the unique classes
    uniqueClasses.forEach((uniqueClass) => {
        // filter the irisData by class
        const irisDataByClass = irisData.filter(item => item.class === uniqueClass);
        // calculate the 70% of the irisDataByClass
        const trainingDataByClassLength = Math.round(irisDataByClass.length * 0.70);

        // loop through the irisDataByClass
        irisDataByClass.forEach((item, index) => {
            // if the index is less than the trainingDataByClassLength
            if (index < trainingDataByClassLength) {
                // push the item into the trainingData array
                trainingData.push(item);
            } else {
                // push the item into the testData array
                testData.push(item);
            }
        })
    })

    // return the training and test data
    return { trainingData, testData };
}


module.exports = {
    readFile,
    getUniqueClasses,
    separateData,
}