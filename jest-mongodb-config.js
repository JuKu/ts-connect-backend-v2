module.exports = {
    mongodbMemoryServerOptions: {
        binary: {
            version: '4.0.3',
            skipMD5: true,
        },
        autoStart: false,
        instance: {},
    },
    // To use separate database for each jest worker pass the useSharedDBForAllJestWorkers: false (doesn't create process.env variable when using this option):
    useSharedDBForAllJestWorkers: false,
};
