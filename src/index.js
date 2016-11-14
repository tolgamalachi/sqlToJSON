var config = require('../config.json');
var CronJob = require('cron').CronJob;
var sqlToJSON = require('../lib/index');

var job = new CronJob({
    cronTime: '45 * * * * *',     // run every minute
    onTick: function () {
        sqlToJSON.procedure(config);
    },
    start: true,
    timeZone: "Europe/Berlin"
});


job.start();
