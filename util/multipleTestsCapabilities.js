const readFiles = require('./fileHandler.js').readFiles;
const readFile = require('./fileHandler.js').readFileSynchronously;

const getAllTestsNames = (exports.getAllTestsNames = (dir) => {
    let testData = readFiles(dir);
    // for each test file get the suite name and each testcase names
    let tests = {};
    testData.forEach(function (content) {
        // get the suite name
        let suiteName = content.match(/describe(.*?)\)/g);
        if (suiteName.length > 0) {
            suiteName = suiteName[0].replace('describe(\'', '').replace(/'.*/g, '');
            // get testcases names
            let testsNames = content.match(/it\('(.*?)',/g);
            testsNames = testsNames.map(function (testName) {
                return testName.replace('it(\'', '').replace(/'.*/g, '');
            });

            tests[suiteName] = tests[suiteName] || {};
            if(!Array.isArray(tests[suiteName].testcases))
                tests[suiteName].testcases = [];

            tests[suiteName].testcases = tests[suiteName].testcases.concat(testsNames);
        }
    });
    return tests;
});

const getTestsFromFile = (exports.getTestsFromFile = (filePath) => {
    let testData = readFile(filePath);
    // for each test file get the suite name and each testcase names
    let tests = {};

    // get the suite name
    let suiteName = testData.match(/describe(.*?)\)/g);
    if (suiteName.length > 0) {
        suiteName = suiteName[0].replace('describe(\'', '').replace(/'.*/g, '');
        // get testcases names
        let testsNames = testData.match(/it\('(.*?)',/g);
        testsNames = testsNames.map(function (testName) {
            return testName.replace('it(\'', '').replace(/'.*/g, '');
        });
        tests[suiteName] = {};
        tests[suiteName].testcases = testsNames;
    }

    return tests;
});

const getTestByName = (exports.getTestByName = (dir, testCaseName) => {
    let test = {};
    let allTests = {}
    allTests = this.getAllTestsNames(dir);
    for (testSuiteName in allTests) {

        if (allTests[testSuiteName].testcases.includes(testCaseName)) {
            test[testSuiteName] = {};
            test[testSuiteName].testcases = []
            test[testSuiteName].testcases.push(testCaseName);
            return test;
        }
    }

});