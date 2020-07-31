import { scalePointsToDimensions } from './utils'

it('Scaling from data and domain to dimensions - simple', () => {
  const dimensions = { top: 0, left: 0, width: 100, height: 100 }
  const domain = { x: { min: 0, max: 10 }, y: { min: 0, max: 10 } }
  const data = [
    { x: 1, y: 5 },
    { x: 3, y: 8 },
  ]

  const result = scalePointsToDimensions(data, domain, dimensions)
  expect(result).toMatchObject([
    {
      x: 10,
      y: 50,
    },
    { x: 30, y: 20 },
  ])
})

it('Scaling from data and domain to dimensions - moderate', () => {
  const dimensions = { top: 20, left: 30, width: 100, height: 100 }
  const domain = { x: { min: -30, max: -20 }, y: { min: -50, max: 500 } }
  const data = [
    { x: -29, y: 5 },
    { x: -20, y: 500 },
  ]

  const result = scalePointsToDimensions(data, domain, dimensions)
  expect(result).toMatchObject([
    { x: 40, y: 110 },
    { x: 130, y: 20 },
  ])
})
