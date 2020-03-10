import React, {useEffect} from 'react'

import useDarkMode from 'use-dark-mode'

export default function() {
  const darkMode = useDarkMode(false)

  useEffect(() => {
    document.body.style.transition = 'background-color 0.3s ease'
  })

  return (
    <label className="dayNight">
      <input
        type="checkbox"
        checked={darkMode.value}
        onInput={darkMode.toggle}
        onChange={() => void 0}
      />
      <div />
    </label>
  )
}
