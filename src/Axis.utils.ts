import { AxisDomain } from './types'

export const filterValuesForDomain = (values: number[], domain: AxisDomain) => {
  return values.filter(v => v >= domain.min && v <= domain.max)
}

export const calculateTickValues = (
  tickValues: number[] | undefined,
  tickCount: number | undefined,
  domain: AxisDomain,
  includeOriginTick?: boolean
): number[] => {
  let ticks = tickValues

  const difference = Math.abs(domain.max - domain.min)

  const originTickOffset = includeOriginTick ? 1 : 0

  if (!ticks && tickCount) {
    ticks = new Array(tickCount)
      .fill(undefined)
      .map((v: any, i: number) => domain.min + (difference * (i + 1 - originTickOffset)) / (tickCount - originTickOffset))
  }

  if (ticks) {
    return filterValuesForDomain(ticks, domain)
  }

  return []
}
