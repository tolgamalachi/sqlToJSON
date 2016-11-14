var sqlToJSON = require('../lib/index');

'use strict';

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('sqlToJSON', 'program to take a sql query and write its output as a json file', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options();
        var done = this.async();

        sqlToJSON.procedure(options).then(() => {
            done(true);
        }).catch((e) => {
            console.error("An error appeared while the sqlToJSON Procedure");
            console.dir(e);
            done(false);
        });

    });

};