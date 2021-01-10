import React, { useContext, useEffect } from 'react'

import useDarkMode from 'use-dark-mode'

import { Context } from './context'

export default function () {
  const darkMode = useDarkMode()
  const { isClient } = useContext(Context)

  useEffect(() => {
    document.body.style.transition = 'background-color 0.3s ease'
  })

  return (
    <label
      className="dayNight"
      id="dark-mode-label"
      style={{ display: isClient ? 'initial' : 'none' }}>
      <input
        id="dark-mode-toggle"
        type="checkbox"
        checked={darkMode.value}
        onChange={darkMode.toggle}
      />
      <div />
    </label>
  )
}
