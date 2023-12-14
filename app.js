/* eslint-disable global-require */
const { CronJob } = require('cron')
const helper = require('./helper/helper')

let order = 1

const JOBS = [require('./job/scheduler_fetch_api'), require('./job/scheduler_write_log')] // Add other job with file.js

JOBS.forEach((job) => {
  if (job.is_active) {
    helper.log(`${order}. Cronjob`, job.description)

    const cronjob = new CronJob(job.timing, job.process, null, true, 'Asia/Jakarta', null, false)
    cronjob.start()
    order += 1
  }
})
