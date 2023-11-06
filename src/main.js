const core = require('@actions/core')
const { OptionResolver } = require('option_resolver')
const { Docker_compose_options } = require('src/docker_compose_options')
const { Compose } = require('compose')

async function start() {
  const resolver = new OptionResolver()
  const files = resolver.resolveComposeFiles()
  const command = resolver.resolveComposeUpFlags()
  const compose = resolver.resolveComposeCommandFlags()
  const services = resolver.resolveServices()

  const options = new Docker_compose_options(files, true, compose, command)

  try {
    const result = await Compose.up(services, options)
    if (0 === result.exitCode) {
      console.log(result.out)
    } else {
      console.log(result.err)
      core.setFailed(`Start up failed ${JSON.stringify(result.err)}`)
    }
  } catch (error) {
    core.setFailed(`Start up failed ${JSON.stringify(error)}`)
  }
}

async function stop() {
  const resolver = new OptionResolver()
  const files = resolver.resolveComposeFiles()
  const command = resolver.resolveComposeDownFlags()
  const compose = resolver.resolveComposeCommandFlags()

  const options = new Docker_compose_options(files, true, compose, command)

  try {
    const result = await Compose.down(options)
    if (0 === result.exitCode) {
      console.log(result.out)
    } else {
      console.log(result.err)
      core.setFailed(`compose down failed: ${JSON.stringify(result.err)}`)
    }
  } catch (error) {
    core.setFailed(`compose down failed: ${JSON.stringify(error)}`)
  }
}

function begin() {
  try {
    start()
  } catch (error) {
    core.setFailed(error.message)
  }
}

function end() {
  try {
    stop()
  } catch (error) {
    core.setFailed(error.message)
  }
}

module.exports = {
  begin,
  end
}
