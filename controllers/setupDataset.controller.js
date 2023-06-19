// require request and response from express module 
const { request, response } = require("express");

// require the helpers
const { readFile, getUniqueClasses, separateData } = require('../helpers/datasetTreatment');

// Define the fileName and the path to get the data
let fileName = '';
fileName = '/../assets/files/iris.data';
fileName = '/../assets/files/iris-test.data';
const fullPath = __dirname + fileName;


const getAllData = async (req = request, res = response) => {

    // read the file using the helpers
    try {
        // read the content of the file
        const irisData = await readFile(fullPath);

        // return the response with the irisData
        res.status(200).json({
            ok: true,
            irisData
        });

    } catch (error) {
        // clg message to the console
        console.log(error);

        // return the response with the error message
        res.status(500).json({
            ok: false,
            msg: 'Error reading the content of the file'
        });
    }

}

const getClasses = async (req = request, res = response) => {

    // get the irisData values from the request body in a property called irisData
    const { irisData } = req.body;

    try {

        // get the unique classes using the helpers
        const uniqueClasses = await getUniqueClasses(irisData);

        // return the response with the uniqueClasses
        res.status(200).json({
            ok: true,
            uniqueClasses
        });


    } catch (error) {
        console.log(error);
        // return the response with the error message
        res.status(500).json({
            ok: false,
            msg: 'Error getting the unique classes'
        });
    }

}


module.exports = {
    getAllData,
    getClasses,
}