/* global
  describe
  expect
  jest
  it
*/

'use strict'

const FILE = '..'

jest.dontMock(FILE)
jest.dontMock('string-source')

describe([
  'LineSource'
].join(' '), function () {
  it([
    'should throw an error',
    "when there is a '\\n' in",
    'the source string'
  ].join(' '), function () {
    const LineSource = require(FILE)
    const errorSource = 'foo\nbar'

    expect(function () {
      const l = new LineSource(errorSource)
      return l
    }).toThrow(new Error("Illegal '\\n' in line source."))
  })
})

describe([
  'LineSource.currentChar'
].join(' '), function () {
  it([
    'should return the first',
    'character in the source line',
    'when the lineSource is just',
    'instantiated'
  ].join(' '), function () {
    const LineSource = require(FILE)
    const source = 'foo'

    const l = new LineSource(source)

    expect(l.currentChar).toBe(source[0])
  })
  it([
    'should afterwards, always',
    'return the same value as',
    'the previous call to',
    '#nextChar()'
  ].join(' '), function () {
    const LineSource = require(FILE)
    const source = 'foo'

    const l = new LineSource(source)

    let c = l.nextChar()

    while (c !== null) {
      expect(l.currentChar).toBe(c)
      c = l.nextChar()
    }
    expect(l.currentChar).toBe(c)
    expect(l.currentChar).toBe(null)
  })
  it([
    'should return null once',
    'past the string length',
    'no matter how many times',
    '#nextChar() is called'
  ].join(' '), function () {
    const LineSource = require(FILE)
    const source = ''

    const l = new LineSource(source)

    expect(l.currentChar).toBe(null)

    let i = 0
    for (; i < 100; i++) {
      l.nextChar()
      expect(l.currentChar).toBe(null)
    }
  })
})
describe([
  'LineSource#nextChar'
].join(' '), function () {
  it([
    'should return each next',
    'character and then null',
    'afterwards'
  ].join(' '), function () {
    const LineSource = require(FILE)
    const source = 'foo'

    const l = new LineSource(source)

    expect(l.nextChar()).toBe('o')
    expect(l.nextChar()).toBe('o')
    expect(l.nextChar()).toBe(null)

    let i = 0
    for (; i < 100; i++) {
      expect(l.nextChar()).toBe(null)
    }
  })
  describe([
    'LineSource#peekChar'
  ].join(' '), function () {
    it([
      'should return the character',
      'that will be returned by the',
      'next call to #nextChar'
    ].join(' '), function () {
      const LineSource = require(FILE)
      const source = 'bar'

      const l = new LineSource(source)

      let i = 0

      for (; i < 100; i++) {
        expect(l.peekChar()).toBe(l.nextChar())
      }
    })
  })
  describe([
    'LineSource.position'
  ].join(' '), function () {
    it([
      'should return the current',
      'position on the line and',
      'null once past the end of',
      'the line (position is 1-indexed)'
    ].join(' '), function () {
      const LineSource = require(FILE)
      const source = 'quux'

      const l = new LineSource(source)

      let i = 0

      for (; i < source.length; ++i) {
        expect(l.currentChar).toBe(source.charAt(i))
        expect(l.position).toBe(i + 1)
        l.nextChar()
      }
      for (; i < 100; ++i) {
        expect(l.position).toBe(null)
        l.nextChar()
      }
    })
  })
})
