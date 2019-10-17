import { Sidebar } from "./components/Sidebar"
import { SandboxFunctions } from "./components/SandboxFunctions"
import { ApiFunctions } from "./components/ApiFunctions"
import React, { useState } from "react"
import {
  MemoryRouter,
  HashRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import { RouteChangeListener } from "./RouteChangeListener"
import { ThemeProvider, theme, Box, styled } from "looker-lens"
import { ExtensionHostApi, connectExtensionHost } from "bryns-extension-api"

interface AppProps {
  standalone?: boolean
}

export const App: React.FC<AppProps> = ({ standalone }) => {
  const [pathname, setPathname] = useState("")
  const [hostInitialized, setHostInitialized] = useState(false)
  const [extensionHost, setExtensionHost] = React.useState<ExtensionHostApi>()

  // Edge does not like updates to location.hash. Fallback to MemoryRouter
  const Router =
    navigator.userAgent.indexOf("Edge") > -1 && !standalone
      ? MemoryRouter
      : HashRouter

  const initialized = () => {
    setHostInitialized(true)
  }

  React.useEffect(() => {
    connectExtensionHost({
      initializedCallback: initialized,
      restoreRoute: true
    })
      .then(extensionHost => {
        setExtensionHost(extensionHost)
      })
      .catch(console.error)
  }, [])

  const renderRouter = hostInitialized || standalone

  console.log(">>>>>", navigator.userAgent, renderRouter)

  return (
    <ThemeProvider theme={theme}>
      <div>
        {renderRouter && (
          <Router>
            <RouteChangeListener setPathname={setPathname} />
            <Layout>
              <Sidebar pathname={pathname} />
              <Box>
                <Switch>
                  <Route path="/api">
                    <ApiFunctions extensionHost={extensionHost} />
                  </Route>
                  <Route path="/sandbox">
                    <SandboxFunctions />
                  </Route>
                  <Redirect to="/api" />
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
