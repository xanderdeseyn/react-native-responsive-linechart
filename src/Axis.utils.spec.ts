import { calculateTickValues } from './Axis.utils'

it('Calculating tick values for domain - simple', () => {
  const domain = { min: 0, max: 10 }
  const tickCount = 2

  const result = calculateTickValues(undefined, tickCount, domain)
  expect(result).toMatchObject([5, 10])
})

it('Calculating tick values for domain - moderate', () => {
  const domain = { min: -10, max: 10 }
  const tickCount = 2

  const result = calculateTickValues(undefined, tickCount, domain)
  expect(result).toMatchObject([0, 10])
})

it('Calculating tick values for domain - moderate 2', () => {
  const domain = { min: -10, max: 10 }
  const tickCount = 5

  const result = calculateTickValues(undefined, tickCount, domain)
  expect(result).toMatchObject([-6, -2, 2, 6, 10])
})
