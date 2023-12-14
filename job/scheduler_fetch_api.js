/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-useless-return */
const axios = require('axios')
const helper = require('../helper/helper')

const NAME_CRON_JOB = 'scheduler_fetch_api'
let taskRunning = false
const arrayUsers = []

async function getUsers() {
  try {
    // Make a GET request to the specified endpoint
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')

    // Access the data from the response
    const users = response.data

    if (Array.isArray(users)) {
      Array.prototype.push.apply(arrayUsers, users)
    }
  } catch (error) {
    // Handle errors
    helper.error(error)
  }
}

async function getUsersSpecific(id) {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)

    const usersSpecific = response.data

    return usersSpecific
  } catch (error) {
    helper.error(error)
    return null
  }
}

async function snapProcess() {
  helper.log(`${NAME_CRON_JOB} Start Running`)
  if (taskRunning) {
    helper.log(`${NAME_CRON_JOB} is still running, terminate request`)
    return
  }
  taskRunning = true

  if (arrayUsers.length === 0) {
    await getUsers()
  }

  if (arrayUsers.length !== 0) {
    const dataUser = await getUsersSpecific(arrayUsers[0].id)
    if (dataUser?.id) {
      helper.log(`id_user ${arrayUsers[0].id} =>`, dataUser)
    } else {
      helper.log(`id_user ${arrayUsers[0].id} not found`)
    }
    arrayUsers.shift()
  }

  taskRunning = false
  helper.log(`${NAME_CRON_JOB} finished running`)
}

module.exports = {
  is_active: true,
  description: `Running every 1 Minute for ${NAME_CRON_JOB} job`,
  timing: '0 */1 * * * *',
  process: snapProcess,
}
