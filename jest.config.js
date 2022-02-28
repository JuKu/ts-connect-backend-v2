module.exports = {
    // "testEnvironment": "node",
    "collectCoverage": true,
    "testResultsProcessor": "jest-sonar-reporter",
    "coveragePathIgnorePatterns": [
        "/node_modules/",
        "/test/"
    ],
    "moduleFileExtensions": [
        "js",
        "json",
        "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
        "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
        "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    preset: '@shelf/jest-mongodb',
};
