import React, { useState } from "react"
import { MemoryRouter, useLocation, Redirect, Switch } from "react-router-dom"
import {
  LookerExtensionSDK,
  ExtensionHostApi,
  connectExtensionHost
} from "bryns-extension-api"
import { LookerSDK } from "@looker/sdk/dist/sdk/methods"

export { LookerSDK }

export interface ExtensionContextData {
  extensionSDK: ExtensionHostApi
  coreSDK: LookerSDK
}

export const ExtensionContext = React.createContext<ExtensionContextData>(
  undefined as any // no one will ever see this undefined!
)

export interface ExtensionWrapperProps {
  setPathname?: (pathname: string) => void
  children: any
}

export const ExtensionWrapper: React.FC<ExtensionWrapperProps> = ({
  setPathname,
  children
}) => {
  const [initialRoute, setInitialRoute] = useState()
  const [hostInitialized, setHostInitialized] = useState(false)
  const [extensionData, setExtensionData] = React.useState<
    ExtensionContextData
  >()

  const initialized = () => {
    setHostInitialized(true)
  }

  React.useEffect(() => {
    connectExtensionHost({
      initializedCallback: initialized,
      restoreRoute: true,
      setInitialRoute
    })
      .then(extensionHost => {
        const ctx = {
          extensionSDK: extensionHost,
          coreSDK: LookerExtensionSDK.createClient(extensionHost)
        }
        setExtensionData(ctx)
      })
      .catch(console.error)
  }, [])

  return (
    <>
      {hostInitialized && (
        <MemoryRouter initialEntries={[initialRoute]}>
          <RouteChangeListener
            setPathname={setPathname}
            extensionHost={extensionData!.extensionSDK}
          />
          <ExtensionContext.Provider value={extensionData!}>
            {children}
          </ExtensionContext.Provider>
        </MemoryRouter>
      )}
    </>
  )
}

interface RouteChangeListenerProps {
  setPathname?: (pathname: string) => void
  extensionHost: ExtensionHostApi
}

const RouteChangeListener: React.FC<RouteChangeListenerProps> = ({
  setPathname,
  extensionHost
}) => {
  let location = useLocation()
  React.useEffect(() => {
    if (setPathname) {
      setPathname(location.pathname)
    }
    extensionHost.clientRouteChanged(location.pathname)
  }, [location])
  return <></>
}
