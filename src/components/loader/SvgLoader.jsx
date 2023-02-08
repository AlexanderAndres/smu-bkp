import * as React from "react"

const SvgLoader = (props) => (
  <svg width={0} height={0} className="jelly-maker" {...props}>
    <defs>
      <filter id="uib-jelly-triangle-ooze">
        <feGaussianBlur in="SourceGraphic" stdDeviation={7.3} result="blur" />
        <feColorMatrix
          in="blur"
          values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
          result="ooze"
        />
        <feBlend in="SourceGraphic" in2="ooze" />
      </filter>
    </defs>
  </svg>
)

export default SvgLoader