const helper = require('../helper/helper')

const NAME_CRON_JOB = 'scheduler_write_log'
let taskRunning = false
let count = 1

async function snapProcess() {
  helper.log(`${NAME_CRON_JOB} Start Running`)
  if (taskRunning) {
    helper.log(`${NAME_CRON_JOB} is still running, terminate request`)
    return
  }
  taskRunning = true

  helper.log(`${count} Round of cronjob`)
  // Add some your code
  count += 1

  taskRunning = false
  helper.log(`${NAME_CRON_JOB} finished running`)
}

module.exports = {
  is_active: true,
  description: `Running every 5 Second for ${NAME_CRON_JOB} job`,
  timing: '*/5 * * * * *',
  process: snapProcess,
}
