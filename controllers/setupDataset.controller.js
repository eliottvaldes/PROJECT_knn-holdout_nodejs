// require request and response from express module 
const { request, response } = require("express");

// require the helpers
const { readFile, getUniqueClasses, separateData } = require('../helpers/datasetTreatment');

const getAllData = async (req = request, res = response) => {

    // hardcode to define the fileName and the path
    let fileName = '';
    fileName = '/../assets/files/iris.data';
    fileName = '/../assets/files/iris-test.data';
    const fullPath = __dirname + fileName;


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


module.exports = {
    getAllData,
}