var jasmine = require('jasmine');
var jasmine = new Jasmine();


jasmine.loadConfig({
    spec_dir: 'test',
    spec_files: [
        'imgrMainTest.js',
    ],
});

jasmine.onComplete(function(passed) {
    if(passed) {
        console.log('All specs have passed');
    }
    else {
        console.log('At least one spec has failed');
    }
});

jasmine.execute();