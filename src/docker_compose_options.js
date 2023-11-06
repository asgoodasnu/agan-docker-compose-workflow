export class Docker_compose_options {
  constructor(composeFiles, log, composeOptions, commandOptions) {
    this.composeFiles = composeFiles
    this.log = log || true
    this.composeOptions = composeOptions || []
    this.commandOptions = commandOptions || []
  }

  toObject() {
    return {
      config: this.composeFiles,
      log: this.log,
      composeOptions: this.composeOptions,
      commandOptions: this.commandOptions
    }
  }
}
