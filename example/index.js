var config = require('../config.json');
var CronJob = require('cron').CronJob;
var sqlToJSON = require('../src/index');

var job = new CronJob({
    cronTime: '40 * * * * *',     // run every minute
    onTick: function () {
        sqlToJSON(config);
    },
    start: true,
    timeZone: "Europe/Berlin"
});


job.start();