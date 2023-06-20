// Initiate the Vue app
const Exam = new Vue({
    el: '#app',
    data: {
        enviroment: null,
        irisData: [],
        loader: false,
        meanByClass: [],
        predictionEuclidianFormDisabled: false,
        predictionKnnFormDisabled: false,
        showEuclidianRun: false,
        showFormPrediction: false,
        showFormPredictionEuclidian: false,
        showIrisData: false,
        showKnnRun: false,
        showPerformanceEuclidian: false,
        showPerformanceKnn: false,
        showTestingData: false,
        showTrainingData: false,
        showUniqueClasses: false,
        testingData: [],
        testResultsEuclidian: [],
        testResultsKnn: [],
        trainingData: [],
        uniqueClasses: [],
        performanceKnn: {
            totalTesting: 0,
            correctPredictions: 0,
            accuracy: 0
        },
        performanceEuclidian: {
            totalTesting: 0,
            correctPredictions: 0,
            accuracy: 0
        },
        predictionDataKnn: {
            sepalLength: 0,
            sepalWidth: 0,
            petalLength: 0,
            petalWidth: 0,
        },
        predictionDataEuclidian: {
            sepalLength: 0,
            sepalWidth: 0,
            petalLength: 0,
            petalWidth: 0,
        },
        predictionResultsKnn: [],
        predictionResultsEuclidian: [],
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
                    this.testResultsKnn = response.data.testResults;
                    this.trainingData = response.data.trainingData;
                    this.testingData = response.data.testData;
                    console.log(this.testResultsKnn);
                    console.log(this.trainingData);
                    console.log(this.testingData);
                })
                .catch(error => {
                    this.errorMessages.push(error)
                })
        },
        // function to calculate performanceKnn of Knn
        // require the testResults as a parameter called 'testResults'
        // the format of the data sent to the server is JSON
        calculateKNNPerformance() {
            axios.post(`${this.enviroment}${this.paths.knn}/performance`, {
                testResults: this.testResultsKnn
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    this.performanceKnn.totalTesting = response.data.totalTesting;
                    this.performanceKnn.correctPredictions = response.data.correctPredictions;
                    this.performanceKnn.accuracy = response.data.accuracy;
                    console.log(this.performanceKnn);
                })
                .catch(error => {
                    this.errorMessages.push(error)
                })
        },

        // method to create a prediction using the Knn algorithm
        // require the predictionDataKnn as a parameter called 'predictionDataKnn'
        // require the trainingData as a parameter called 'trainingData'
        // the format of the data sent to the server is JSON
        predictKNN() {
            this.predictionKnnFormDisabled = true;
            axios.post(`${this.enviroment}${this.paths.knn}/prediction`, {
                predictionData: this.predictionDataKnn,
                trainingData: this.trainingData
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    this.predictionResultsKnn = response.data.predictionResults;
                    console.log(this.predictionResultsKnn);
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
                    this.testResultsEuclidian = response.data.testResults;
                    console.log(this.testResultsEuclidian);
                    console.log(this.meanByClass);
                })
                .catch(error => {
                    this.errorMessages.push(error)
                })
        },

        // method to calculate the performance of euclidian algorithm
        // require the testResultsEuclidian as a parameter called 'testResults'
        calculateEuclidianPerformance() {
            axios.post(`${this.enviroment}${this.paths.euclidian}/performance`, {
                testResults: this.testResultsEuclidian
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    this.performanceEuclidian.totalTesting = response.data.totalTesting;
                    this.performanceEuclidian.correctPredictions = response.data.correctPredictions;
                    this.performanceEuclidian.accuracy = response.data.accuracy;
                    console.log(this.performanceEuclidian);
                })
                .catch(error => {
                    this.errorMessages.push(error)
                })
        },


        // method to create a prediction using the Euclidian algorithm
        // require the predictionDataEuclidian as a parameter called 'predictionDataEuclidian'
        // require the meanByClass as a parameter called 'meanByClass'
        // the format of the data sent to the server is JSON
        predictEuclidian() {
            this.predictionEuclidianFormDisabled = true;
            axios.post(`${this.enviroment}${this.paths.euclidian}/prediction`, {
                predictionData: this.predictionDataEuclidian,
                meanByClass: this.meanByClass
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    this.predictionResultsEuclidian = response.data.predictionResults;
                    console.log(this.predictionResultsEuclidian);
                })
                .catch(error => {
                    this.errorMessages.push(error)
                })
        },
        // function to crear the prediction form and the prediction results
        clearPredictionKnn() {
            this.predictionDataKnn = {
                sepalLength: 0,
                sepalWidth: 0,
                petalLength: 0,
                petalWidth: 0,
            };
            this.predictionResultsKnn = [];
            this.predictionKnnFormDisabled = false;
        },
        clearPredictionEuclidian() {
            this.predictionDataEuclidian = {
                sepalLength: 0,
                sepalWidth: 0,
                petalLength: 0,
                petalWidth: 0,
            };
            this.predictionResultsEuclidian = [];
            this.predictionEuclidianFormDisabled = false;
        },

    },
    mounted() {
        // mounted goes here
        this.getEnviorment();
    }
})