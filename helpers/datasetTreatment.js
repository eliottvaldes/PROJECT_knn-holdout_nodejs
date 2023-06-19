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




module.exports = {
    readFile,
    getUniqueClasses,
    
}