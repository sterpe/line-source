'use strict'

var StringSource = require('string-source')

var e = "Illegal '\\n' in line source."

module.exports = function LineSource (line) {
  if (line.split('\n').length > 1) {
    throw new Error(e)
  }

  return new StringSource(line)
}
