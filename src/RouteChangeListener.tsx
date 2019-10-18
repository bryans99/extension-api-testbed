import * as React from "react"
import { useLocation } from "react-router-dom"
import { ExtensionHostApi } from "bryns-extension-api"

interface RouteChangeListenerProps {
  setPathname: (pathname: string) => void
  extensionHost: ExtensionHostApi
}

export const RouteChangeListener: React.FC<RouteChangeListenerProps> = ({
  setPathname,
  extensionHost
}) => {
  let location = useLocation()
  React.useEffect(() => {
    setPathname(location.pathname)
    extensionHost.clientRouteChanged(location.pathname)
  }, [location])

  return <></>
}
