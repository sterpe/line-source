'use strict'

const StringSource = require('string-source')

const e = "Illegal '\\n' in line source."

module.exports = function LineSource (line) {
  if (line.split('\n').length > 1) {
    throw new Error(e)
  }

  return new StringSource(line)
}
