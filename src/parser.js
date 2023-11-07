const core = require('@actions/core')
const fs = require('fs')

const ALLOWED_UP = [
  '--abort-on-container-exit',
  '--build',
  '--exit-code-from',
  '--no-deps',
  '--pull',
  '--quiet-pull',
  '--wait'
]

const ALLOWED_DOWN = ['--volumes', '--remove-orphans', '--rmi']

/**
 * @type {string[]}
 */
let start = []

/**
 * @type {string[]}
 */
let stop = []

/**
 * @type {string[]}
 */
let command = []

/**
 * @param {array<string>} composeFiles
 * @returns {array<string>}
 */
function parseComposeFiles(composeFiles) {
  return composeFiles.filter(composeFile => {
    if (!composeFile.length) {
      return false
    }

    return fs.existsSync(composeFile)
  })
}

/**
 * @returns {string[]}
 */
function parseComposeUpOptions() {
  if (0 === start.length) {
    start = parseOptions(core.getInput('compose-up-options')).filter(option => {
      return ALLOWED_UP.includes(option)
    })

    start.push('--detach')
  }

  return start
}

/**
 * @returns {string[]}
 */
function parseComposeDownOptions() {
  if (0 === stop.length) {
    stop = parseOptions(core.getInput('compose-down-options')).filter(
      option => {
        return ALLOWED_DOWN.includes(option)
      }
    )

    stop.push('--volumes')
  }

  return stop
}

/**
 * @returns {string[]}
 */
function parseComposeOptions() {
  if (0 === command.length) {
    command = parseOptions(core.getInput('compose-options')).filter(option => {
      return ALLOWED_DOWN.includes(option)
    })
  }

  return command
}

/**
 * @param {string} options
 * @returns {array<string>}
 */
function parseOptions(options) {
  if (null !== options && typeof options === 'string' && 0 < options.length) {
    return options.split(' ').map(option => option.replace('/\r|\n/g', ''))
  }

  return []
}

module.exports = {
  parseComposeFiles,
  parseComposeOptions,
  parseComposeUpOptions,
  parseComposeDownOptions
}
