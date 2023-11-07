const compose = require('docker-compose')
const composeV2 = compose.v2

export class Compose {
  /**
   * @param {array<string>} services
   * @param {DockerComposeOptions} options
   * @returns {Promise<IDockerComposeResult>}
   */
  static up(services, options) {
    if (0 < services.length) {
      return composeV2.upMany(services, options.toObject())
    }

    return composeV2.upAll(options)
  }

  /**
   * @param {DockerComposeOptions} options
   * @returns {Promise<IDockerComposeResult>}
   */
  static down(options) {
    return composeV2.down(options.toObject())
  }
}
