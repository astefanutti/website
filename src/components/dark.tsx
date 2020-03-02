import React from 'react'

import useDarkMode from 'use-dark-mode'

const DayNightToggle = () => {
  const darkMode = useDarkMode()

  const onChange = function() {
    document.body.style.transition = 'background-color 0.5s ease'
    darkMode.toggle()
  }

  return (
    <label className="dayNight">
      <input type="checkbox" checked={darkMode.value} onChange={onChange} />
      <div></div>
    </label>
  )
}

export default DayNightToggle
