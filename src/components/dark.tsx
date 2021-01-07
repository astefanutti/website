import React, { useEffect, useState } from 'react'

import useDarkMode from 'use-dark-mode'

export default function () {
  const darkMode = useDarkMode()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    document.body.style.transition = 'background-color 0.3s ease'
    setIsClient(true)
  })

  // See https://github.com/donavon/use-dark-mode/issues/44
  return !isClient ? (
    <div style={{ height: '36px', width: '36px' }}></div>
  ) : (
    <label className="dayNight">
      <input type="checkbox" checked={darkMode.value} onChange={darkMode.toggle} />
      <div />
    </label>
  )
}
