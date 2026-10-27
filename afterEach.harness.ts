import { afterEach, describe, expect, test } from 'react-native-harness'

const order: string[] = []

afterEach(() => {
  order.push('outer afterEach')
})

describe('inner', () => {
  afterEach(() => {
    order.push('inner afterEach')
  })

  test('first', () => {})

  // Jest and Vitest run the afterEach hooks of the inner suite first
  test('afterEach hooks of the first test ran inner first', () => {
    expect(order.join(' > ')).toBe('inner afterEach > outer afterEach')
  })
})
