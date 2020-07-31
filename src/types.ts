export type ChartConfig = {
  grid: {
    visible: boolean
    backgroundColor: string
    strokeWidth: number
    strokeColor: string
    stepSize: number
  }
  line: {
    visible: boolean
    strokeWidth: number
    strokeColor: string
  }
  area: {
    visible: boolean
    gradientFrom: string
    gradientFromOpacity: number
    gradientTo: string
    gradientToOpacity: number
  }
  yAxis: {
    visible: boolean
    label: {
      color: string
      fontSize: number
      formatter: (value: number) => string
    }
  }
  xAxis: {
    visible: boolean
    label: {
      color: string
      fontSize: number
    }
  }
  tooltip: {
    visible: boolean
    label: {
      color: string
      fontSize: number
      formatter: (value: number) => string
    }
    lineColor: string
    lineWidth: number
    circleColor: string
    circleBorderColor: string
    circleBorderWidth: number
    boxColor: string
    boxBorderWidth: number
    boxBorderColor: string
    boxBorderRadius: number
    boxPaddingY: number
    boxPaddingX: number
  }
  dataPoint: {
    visible: boolean
    color: string
    radius: number
    label: {
      visible: boolean
      color: string
      fontSize: number
      formatter: (value: number) => string
    }
  }
  insetY: number
  insetX: number
  interpolation: 'none' | 'spline'
  backgroundColor: string
  backgroundOpacity: number
}
