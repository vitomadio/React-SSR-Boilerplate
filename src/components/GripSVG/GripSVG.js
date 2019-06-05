/*
This is a grip icon svg.
It accepts with, height and radius as props.
*/
import React from 'react'

export default ({ radius, width, height }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 21 35">
      <g id="grip" transform="translate(-848 -1132)">
        <circle id="Ellipse_6" data-name="Ellipse 6" cx="4.5" cy="4.5" r={radius} transform="translate(848 1132)" fill="#aaa" />
        <circle id="Ellipse_9" data-name="Ellipse 9" cx="4.5" cy="4.5" r={radius} transform="translate(860 1132)" fill="#aaa" />
        <circle id="Ellipse_7" data-name="Ellipse 7" cx="4.5" cy="4.5" r={radius} transform="translate(848 1145)" fill="#aaa" />
        <circle id="Ellipse_10" data-name="Ellipse 10" cx="4.5" cy="4.5" r={radius} transform="translate(860 1145)" fill="#aaa" />
        <circle id="Ellipse_8" data-name="Ellipse 8" cx="4.5" cy="4.5" r={radius} transform="translate(848 1158)" fill="#aaa" />
        <circle id="Ellipse_11" data-name="Ellipse 11" cx="4.5" cy="4.5" r={radius} transform="translate(860 1158)" fill="#aaa" />
      </g>
    </svg>
  )
}
