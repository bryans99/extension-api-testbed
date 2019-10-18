import { Sidebar } from "./components/Sidebar"
import { SandboxFunctions } from "./components/SandboxFunctions"
import { ApiFunctions } from "./components/ApiFunctions"
import React, { useState } from "react"
import {
  MemoryRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import { RouteChangeListener } from "./RouteChangeListener"
import { ThemeProvider, theme, Box, styled } from "looker-lens"
import { ExtensionHostApi, connectExtensionHost } from "bryns-extension-api"
import { LensPlayground } from "./components/LensPlayground"

interface AppProps {
  standalone?: boolean
}

enum ROUTES {
  API_ROUTE = "/api",
  SANDBOX_ROUTE = "/sandbox",
  LENS_ROUTE = "/lens"
}
const routes = Object.keys(ROUTES).map(route => ROUTES[route])

export const App: React.FC<AppProps> = ({ standalone }) => {
  const [pathname, setPathname] = useState("")
  const [initialRoute, setInitialRoute] = useState()
  const [hostInitialized, setHostInitialized] = useState(false)
  const [extensionHost, setExtensionHost] = React.useState<ExtensionHostApi>()

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
        setExtensionHost(extensionHost)
      })
      .catch(console.error)
  }, [])

  const renderRouter = hostInitialized || standalone

  let defaultRoute
  if (renderRouter) {
    defaultRoute = initialRoute
    if (!routes.includes(initialRoute)) {
      defaultRoute = ROUTES.API_ROUTE
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        {renderRouter && (
          <Router>
            <RouteChangeListener
              setPathname={setPathname}
              extensionHost={extensionHost}
            />
            <Layout>
              <Sidebar pathname={pathname} />
              <Box>
                <Switch>
                  <Route path={ROUTES.API_ROUTE}>
                    <ApiFunctions extensionHost={extensionHost} />
                  </Route>
                  <Route path={ROUTES.SANDBOX_ROUTE}>
                    <SandboxFunctions />
                  </Route>
                  <Route path={ROUTES.LENS_ROUTE}>
                    <LensPlayground />
                  </Route>
                  <Redirect to={defaultRoute} />
                </Switch>
              </Box>
            </Layout>
          </Router>
        )}
      </div>
    </ThemeProvider>
  )
}

export const Layout = styled(Box)`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 200px auto;
`
