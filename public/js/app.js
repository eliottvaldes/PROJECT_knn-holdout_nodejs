// Initiate the Vue app
const Exam = new Vue({
    el: '#app',
    data: {
        loader: false,
        showUniqueClasses: false,
        showIrisData: false,
        showTrainingData: false,
        showTestingData: false,
        showKnnRun: false,
        enviroment: null,
        irisData: [],
        uniqueClasses: [],
        meanByClass: [],
        trainingData: [],
        testingData: [],
        testResults: [],
        performance: {
            totalTesting: 0,
            correctPredictions: 0,
            accuracy: 0
        },
        predictionData: {
            sepalLength: "5.7",
            sepalWidth: "2.1",
            petalLength: "0.0",
            petalWidth: "0.0"
        },
        predictionResults: [],
        paths: {
            euclidian: '/api/euclidian',
            knn: '/api/knn',
            setup: '/api/setup',
        },
        errorMessages: [],

    },
    methods: {
        // method to verify if in the url exist the word 'localhost'
        getEnviorment() {
            this.enviroment = (window.location.hostname.includes('localhost'))
                ? 'http://localhost:3000'
                : 'http://localhost:3000';
            console.log(this.enviroment);
        },
        // method to get all the iris data
        getIrisData() {
            this.loader = true;
            axios.get(`${this.enviroment}${this.paths.setup}/all-data`)
                .then(response => {
                    this.irisData = response.data.irisData;
                    console.log(this.irisData);
                })
                .catch(error => {
                    // push the error to the errors array
                    this.errorMessages.push(error)
                })
            this.loader = false;
        },
        // method to get the unique classes
        getUniqueClasses() {
            // require the variable irisData as a parameter called 'irisData'
            // the data sent to the server is called 'irisData'
            // the format of the data sent to the server is JSON
            axios.post(`${this.enviroment}${this.paths.setup}/unique-classes`, {
                irisData: this.irisData
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    this.uniqueClasses = response.data.uniqueClasses;
                    console.log(this.uniqueClasses);
                })
                .catch(error => {
                    this.errorMessages.push(error)
                })
        },
        // method to separate the irisData into trainingData and testingData
        separateData() {
            // require the variable irisData as a parameter called 'irisData' and the uniqueClasses as a parameter called 'uniqueClasses'                                        
            // the format of the data sent to the server is JSON
            axios.post(`${this.enviroment}${this.paths.setup}/training-testing-data`, {
                irisData: this.irisData,
                uniqueClasses: this.uniqueClasses
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    this.trainingData = response.data.trainingData;
                    this.testingData = response.data.testData;
                    console.log(this.trainingData);
                    console.log(this.testingData);
                })
                .catch(error => {
                    this.errorMessages.push(error)
                })
        },

        //method to run the Knn algorithm
        runKnn() {
            // require the variable irisData as a parameter called 'irisData' and the uniqueClasses as a parameter called 'uniqueClasses'                                        
            // the format of the data sent to the server is JSON
            axios.get(`${this.enviroment}${this.paths.knn}/run`)
                .then(response => {
                    this.testResults = response.data.testResults;
                    this.trainingData = response.data.trainingData;
                    this.testingData = response.data.testData;
                    console.log(this.testResults);
                    console.log(this.trainingData);
                    console.log(this.testingData);
                })
                .catch(error => {
                    this.errorMessages.push(error)
                })
        },
        // function to calculate performance of Knn
        // require the testResults as a parameter called 'testResults'
        // the format of the data sent to the server is JSON
        calculateKNNPerformance() {
            axios.post(`${this.enviroment}${this.paths.knn}/performance`, {
                testResults: this.testResults
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    this.performance.totalTesting = response.data.totalTesting;
                    this.performance.correctPredictions = response.data.correctPredictions;
                    this.performance.accuracy = response.data.accuracy;
                    console.log(this.performance);
                })
                .catch(error => {
                    this.errorMessages.push(error)
                })
        },

        // method to create a prediction using the Knn algorithm
        // require the predictionData as a parameter called 'predictionData'
        // require the trainingData as a parameter called 'trainingData'
        // the format of the data sent to the server is JSON
        predictKNN() {
            axios.post(`${this.enviroment}${this.paths.knn}/prediction`, {
                predictionData: this.predictionData,
                trainingData: this.trainingData
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    this.predictionResults = response.data.predictionResults;
                    console.log(this.predictionResults);
                })
                .catch(error => {
                    this.errorMessages.push(error)
                })
        },

        // method to run the Euclidian algorithm
        runEuclidian() {
            // require the variable irisData as a parameter called 'irisData' and the uniqueClasses as a parameter called 'uniqueClasses'                                        
            // the format of the data sent to the server is JSON
            axios.get(`${this.enviroment}${this.paths.euclidian}/run`)
                .then(response => {
                    this.meanByClass = response.data.meanByClass;
                    this.testResults = response.data.testResults;
                    console.log(this.testResults);
                    console.log(this.meanByClass);
                })
                .catch(error => {
                    this.errorMessages.push(error)
                })
        },

        // method to calculate the performance of euclidian algorithm
        // require the testResults as a parameter called 'testResults'
        calculateEuclidianPerformance() {
            axios.post(`${this.enviroment}${this.paths.euclidian}/performance`, {
                testResults: this.testResults
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    this.performance.totalTesting = response.data.totalTesting;
                    this.performance.correctPredictions = response.data.correctPredictions;
                    this.performance.accuracy = response.data.accuracy;
                    console.log(this.performance);
                })
                .catch(error => {
                    this.errorMessages.push(error)
                })
        },


        // method to create a prediction using the Euclidian algorithm
        // require the predictionData as a parameter called 'predictionData'
        // require the meanByClass as a parameter called 'meanByClass'
        // the format of the data sent to the server is JSON
        predictEuclidian() {
            axios.post(`${this.enviroment}${this.paths.euclidian}/prediction`, {
                predictionData: this.predictionData,
                meanByClass: this.meanByClass
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    this.predictionResults = response.data.predictionResults;
                    console.log(this.predictionResults);
                })
                .catch(error => {
                    this.errorMessages.push(error)
                })
        },

    },
    mounted() {
        // mounted goes here
        this.getEnviorment();
    }
})