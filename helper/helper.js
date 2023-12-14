/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
const moment = require('moment')

require('moment/locale/id.js')

function now() {
  return moment().format('YYYY-MM-DD HH:mm:ss')
}

function log(tag, object = '') {
  if (typeof object === 'object') {
    object = JSON.stringify(object)
  }
  console.log(`[${now()}] ${tag} ${object}`)
}

function error(tag, object = '') {
  if (typeof object === 'object') {
    console.error(`[${now()}] ${tag}`, object)
  } else {
    console.error(`[${now()}] ${tag} ${object}`)
  }
}

module.exports = {
  log,
  error,
  now,
}
