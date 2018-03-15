const readTestCaseFiles = require('./fileHandler.js').readTestCaseFiles;
const readTestFile = require('./fileHandler.js').readTestFile;

const getAllTestsNames = (exports.getAllTestsNames = (dir) => {
    let testData = readTestCaseFiles(dir);
    // for each test file get the suite name and each testcase names
    let tests = {};
    testData.forEach(function (content) {
        // get the suite name
        let suiteName = content['content'].match(/describe(.*?)\)/g);
        if (suiteName.length > 0) {
            suiteName = suiteName[0].replace('describe(\'', '').replace(/'.*/g, '');
            // get testcases names
            let testsNames = content['content'].match(/it\('(.*?)',/g);
            testsNames = testsNames.map(function (testName) {
                return testName.replace('it(\'', '').replace(/'.*/g, '');
            });

            tests[suiteName] = tests[suiteName] || {};
            tests[suiteName].fileName = content['fileName'];
            if(!Array.isArray(tests[suiteName].testcases))
                tests[suiteName].testcases = [];

            tests[suiteName].testcases = tests[suiteName].testcases.concat(testsNames);
        }
    });
    return tests;
});

const getTestsFromFile = (exports.getTestsFromFile = (filePath) => {
    let testData = readTestFile(filePath);
    // for each test file get the suite name and each testcase names
    let tests = {};

    // get the suite name
    let suiteName = testData['content'].match(/describe(.*?)\)/g);
    if (suiteName.length > 0) {
        suiteName = suiteName[0].replace('describe(\'', '').replace(/'.*/g, '');
        // get testcases names
        let testsNames = testData['content'].match(/it\('(.*?)',/g);
        testsNames = testsNames.map(function (testName) {
            return testName.replace('it(\'', '').replace(/'.*/g, '');
        });
        tests[suiteName] = {};
        tests[suiteName].testcases = testsNames;
        tests[suiteName].fileName = testData['fileName'];
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
            test[testSuiteName].fileName = allTests[testSuiteName].fileName;
            return test;
        }
    }

});