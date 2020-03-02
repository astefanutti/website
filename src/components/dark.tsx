import React, {useEffect} from 'react'

import useDarkMode from 'use-dark-mode'

const DayNightToggle = () => {
  const darkMode = useDarkMode(false)

  useEffect(() => {
    document.body.style.transition = 'background-color 0.3s ease'
  })

  return (
    <label className="dayNight">
      <input type="checkbox" defaultChecked={darkMode.value} onClick={darkMode.toggle} />
      <div></div>
    </label>
  )
}

export default DayNightToggle
