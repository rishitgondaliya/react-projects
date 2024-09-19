/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import logo from '../assets/icon.png'

function Logo({width = '100px'}) {
  return (
    <div>
      <img src={logo} alt="" width={width}/>
    </div>
  )
}

export default Logo