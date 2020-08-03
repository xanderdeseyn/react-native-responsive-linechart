import { AxisDomain } from './types'

export const filterValuesForDomain = (values: number[], domain: AxisDomain) => {
  return values.filter((v) => v >= domain.min && v <= domain.max)
}

export const calculateTickValues = (tickValues: number[] | undefined, tickCount: number | undefined, domain: AxisDomain): number[] => {
  let ticks = tickValues

  const difference = Math.abs(domain.max - domain.min)

  if (!ticks && tickCount) {
    ticks = new Array(tickCount).fill(undefined).map((v, i) => (difference * i) / tickCount)
  }

  if (ticks) {
    return filterValuesForDomain(ticks, domain)
  }

  return []
}
