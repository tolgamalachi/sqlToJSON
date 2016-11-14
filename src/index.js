var mysql = require('mysql');
var jsonfile = require('jsonfile');
var path = require('path');
var querys = require('../querys.json').querys;
var config = require('../config.json');
var fs = require('fs');
var CronJob = require('cron').CronJob;


function initDatabase() {
    console.log("starting database connection...");

    let connection = mysql.createConnection({
        host: config.sql.host,
        port: config.sql.port,
        user: config.sql.user,
        password: config.sql.password,
        database: config.sql.database
    });

    connection.connect();

    return connection;
}

function closeDatabase(db) {
    console.log("closing database connection...");
    db.end();
}


function callQuery(db, p_query, p_filename) {
    db.query(p_query, function (err, rows, fields) {
        if (err) {
            throw err;
        }
        console.log(JSON.stringify(rows));
        writeFile(path.join(config.outputPath, p_filename), rows);
    });
}


function writeFile(pathToFile, jsonContent) {
    jsonfile.writeFile(pathToFile, jsonContent, {spaces: 2}, function (err) {
        if (err) {
            console.dir(err);
        } else {
            console.log("success: file written to " + pathToFile);
        }
    })
}

function checkOutputDir(outputDir) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
}

function procedure() {
    let database = undefined;
    let connected = false;
    try {
        database = initDatabase();
        connected = true;
    } catch (e) {
        console.error("Database init error.");
        console.dir(e);
    }

    if (connected === true) {
        checkOutputDir(config.outputPath);

        try {
            for (let i = 0; i < querys.length; i++) {
                console.log(querys[i].query);
                callQuery(database, querys[i].query, querys[i].filename);
            }
        } catch (e) {
            console.error("ERROR while calling querys");
            console.dir(e);
        } finally {
            closeDatabase(database);
        }
    }
}


var job = new CronJob({
    cronTime: '00 * * * * *',     // run every minute
    onTick: function () {
        procedure();
    },
    start: true,
    timeZone: "Europe/Berlin"
});


job.start();