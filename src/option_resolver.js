const core = require('@actions/core')
const parser = require('parser')

export class OptionResolver {
  resolveComposeCommandFlags() {
    return parser.parseComposeOptions()
  }

  resolveComposeUpFlags() {
    return parser.parseComposeUpOptions()
  }

  resolveComposeDownFlags() {
    return parser.parseComposeDownOptions()
  }

  resolveServices() {
    return core.getMultilineInput('services', { required: false })
  }

  resolveComposeFiles() {
    const files = parser.parseComposeFiles(
      core.getMultilineInput('compose-file')
    )

    if (!files.length) {
      throw new Error('You must specify minimum one compose-file')
    }

    return files
  }
}
