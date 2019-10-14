import { Sidebar } from "./components/Sidebar"
import { SandboxFunctions } from "./components/SandboxFunctions"
import { ApiFunctions } from "./components/ApiFunctions"
import React, { useState } from "react"
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { RouteChangeListener } from "./RouteChangeListener"
import { ThemeProvider, theme, Box, styled } from "looker-lens"
import { ExtensionHostApi, connectExtensionHost } from "./extension/api"

export const App = () => {
  const [pathname, setPathname] = useState("")
  const [hostInitialized, setHostInitialized] = useState(false)
  const [extensionHost, setExtensionHost] = React.useState<ExtensionHostApi>()

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

  return (
    <ThemeProvider theme={theme}>
      {hostInitialized && (
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
    </ThemeProvider>
  )
}

export const Layout = styled(Box)`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 200px auto;
`
