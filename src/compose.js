import { v2 as composeV2 } from 'docker-compose'

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

    return composeV2.upAll(options.toObject())
  }

  /**
   * @param {DockerComposeOptions} options
   * @returns {Promise<IDockerComposeResult>}
   */
  static down(options) {
    console.debug(options.toObject())
    return composeV2.down(options.toObject())
  }
}
