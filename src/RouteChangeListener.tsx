import * as React from "react"
import { useLocation } from "react-router-dom"

export const RouteChangeListener = ({ setPathname }) => {
  let location = useLocation()
  React.useEffect(() => {
    setPathname(location.pathname)
  }, [location])

  return <></>
}
