import path from 'path'

export class DockerComposeOptions {
  constructor(composeFiles, log, composeOptions, commandOptions) {
    this.composeFiles = composeFiles
    this.log = log || true
    this.composeOptions = composeOptions || []
    this.commandOptions = commandOptions || []
  }

  toObject() {
    return {
      cwd: path.join(process.cwd()),
      config: this.composeFiles,
      log: this.log,
      composeOptions: this.composeOptions,
      commandOptions: this.commandOptions
    }
  }
}
